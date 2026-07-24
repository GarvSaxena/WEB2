"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CARDS = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  tone: ["from-slate-50 to-white", "from-zinc-50 to-white", "from-stone-50 to-white", "from-neutral-50 to-white", "from-gray-50 to-white"][index],
}));

export function EmptyCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalCards = CARDS.length;

  const slides = useMemo(
    () =>
      CARDS.map((card, index) => ({
        ...card,
        offset: (index - activeIndex + totalCards) % totalCards,
      })),
    [activeIndex, totalCards]
  );

  const goPrevious = () => setActiveIndex((current) => (current - 1 + totalCards) % totalCards);
  const goNext = () => setActiveIndex((current) => (current + 1) % totalCards);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] items-center">
      <div className="card p-7 sm:p-8 bg-slate-900 border-slate-800 text-left">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-3">Carousel Placeholder</p>
        <h3 className="text-3xl sm:text-4xl font-bold text-white">
          Empty cards for future event content
        </h3>
        <p className="mt-4 text-slate-400 leading-relaxed max-w-xl">
          This section is set up as a 5-card carousel. Add your event text, images, or any
          other content later without changing the layout.
        </p>

        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={goPrevious}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-white transition-all hover:bg-slate-700"
            aria-label="Previous card"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-900 transition-all hover:bg-white"
            aria-label="Next card"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="ml-2 text-sm text-slate-500">
            {activeIndex + 1} of {totalCards}
          </div>
        </div>
      </div>

      <div className="relative h-[460px] sm:h-[520px] overflow-visible">
        {slides.map((card) => {
          const isActive = card.offset === 0;
          const isLeft = card.offset === totalCards - 1;
          const isRight = card.offset === 1;

          const positionClass = isActive
            ? "translate-x-0 scale-100 rotate-0 opacity-100 z-30"
            : isLeft
              ? "-translate-x-[18%] sm:-translate-x-[24%] lg:-translate-x-[30%] scale-[0.92] -rotate-[4deg] opacity-80 z-20"
              : isRight
                ? "translate-x-[18%] sm:translate-x-[24%] lg:translate-x-[30%] scale-[0.92] rotate-[4deg] opacity-80 z-20"
                : "translate-y-6 scale-[0.84] opacity-0 z-10 pointer-events-none";

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => setActiveIndex(card.id - 1)}
              className={`absolute inset-0 rounded-[2rem] border border-slate-700 bg-slate-800 transition-all duration-500 ease-out overflow-hidden ${positionClass}`}
              aria-label={`Show placeholder card ${card.id}`}
            >
              <div className={`h-full w-full bg-gradient-to-br from-slate-800 to-slate-900`}>
                <div className="absolute inset-5 rounded-[1.5rem] border border-dashed border-slate-600 bg-slate-800/50" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}