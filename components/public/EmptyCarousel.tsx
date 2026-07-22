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
      <div className="glass-card rounded-[2rem] border border-accent-200 p-7 sm:p-8 bg-white/95">
        <p className="section-label mb-3">Carousel Placeholder</p>
        <h3 className="font-display text-3xl sm:text-4xl font-bold text-accent-900">
          Empty cards for future event content
        </h3>
        <p className="mt-4 text-accent-500 leading-relaxed max-w-xl">
          This section is set up as a 5-card carousel. Add your event text, images, or any
          other content later without changing the layout.
        </p>

        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={goPrevious}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-accent-200 bg-white text-accent-900 transition-all hover:-translate-y-0.5 hover:shadow-md"
            aria-label="Previous card"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-900 text-white transition-all hover:-translate-y-0.5 hover:shadow-md dark:bg-accent-50 dark:text-accent-900"
            aria-label="Next card"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="ml-2 text-sm text-accent-500">
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
              className={`absolute inset-0 rounded-[2rem] border border-accent-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)] transition-all duration-500 ease-out overflow-hidden ${positionClass}`}
              aria-label={`Show placeholder card ${card.id}`}
            >
              <div className={`h-full w-full bg-gradient-to-br ${card.tone}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.9),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.04),_transparent_36%)]" />
                <div className="absolute inset-5 rounded-[1.5rem] border border-dashed border-accent-200/80 bg-white/55 backdrop-blur-sm" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}