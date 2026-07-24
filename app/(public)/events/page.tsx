/**
 * app/(public)/events/page.tsx — Public Events Page
 */

import { connectDB } from "@/lib/db";
import Event from "@/models/Event";
import { CalendarDays, MapPin, Tag, ExternalLink, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | EPMOC",
  description: "Upcoming and past events organised by EPMOC at IIIT Una.",
};

const CATEGORY_COLORS: Record<string, string> = {
  technical:  "bg-indigo-100 text-indigo-700 border-indigo-200",
  cultural:   "bg-pink-100 text-pink-700 border-pink-200",
  management: "bg-amber-100 text-amber-700 border-amber-200",
  workshop:   "bg-emerald-100 text-emerald-700 border-emerald-200",
  seminar:    "bg-violet-100 text-violet-700 border-violet-200",
  other:      "bg-slate-100 text-slate-600 border-slate-200",
};

async function getPublishedEvents() {
  await connectDB();
  return Event.find({ isPublished: true }).sort({ date: -1 }).lean();
}

export default async function EventsPage() {
  let events: Awaited<ReturnType<typeof getPublishedEvents>> = [];
  try {
    events = await getPublishedEvents();
  } catch {
    // DB offline — show empty
  }

  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.date) >= now);
  const past = events.filter((e) => new Date(e.date) < now);

  return (
    <div className="mesh-bg min-h-screen">
      <div className="container-section py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">What we do</p>
          <h1 className="font-display text-5xl font-bold text-accent-900 mb-4">
            Club <span className="gradient-text">Events</span>
          </h1>
          <p className="text-accent-500 max-w-2xl mx-auto text-lg">
            From technical hackathons to cultural fests — EPMOC organises diverse events
            throughout the year.
          </p>
        </div>

        {/* Upcoming events */}
        {upcoming.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display text-2xl font-bold text-accent-900 mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-500" />
              Upcoming Events
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((event) => (
                <EventCard key={String(event._id)} event={event} upcoming />
              ))}
            </div>
          </section>
        )}

        {/* Past events */}
        {past.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold text-accent-900 mb-6">
              Past Events
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((event) => (
                <EventCard key={String(event._id)} event={event} />
              ))}
            </div>
          </section>
        )}

        {events.length === 0 && (
          <div className="text-center py-24">
            <CalendarDays className="w-12 h-12 text-accent-300 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-accent-700 mb-2">
              Events Coming Soon
            </h3>
            <p className="text-accent-400">
              Stay tuned — exciting events are being planned!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function EventCard({
  event,
  upcoming = false,
}: {
  event: Awaited<ReturnType<typeof getPublishedEvents>>[number];
  upcoming?: boolean;
}) {
  const d = new Date(event.date);
  const dateStr = d.toLocaleDateString("en-IN", {
    weekday: "short", day: "numeric", month: "long", year: "numeric",
  });
  const timeStr = d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className={cn(
      "card p-6 flex flex-col gap-4 hover:shadow-sm transition-all group",
      upcoming && "border-indigo-200 ring-1 ring-indigo-100"
    )}>
      {upcoming && (
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          Upcoming
        </div>
      )}

      <div>
        <span className={cn(
          "inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full border capitalize mb-3",
          CATEGORY_COLORS[event.category] ?? CATEGORY_COLORS.other
        )}>
          <Tag className="w-3 h-3 mr-1" />
          {event.category}
        </span>
        <h3 className="font-display font-bold text-accent-900 text-lg leading-snug mb-2">
          {event.title}
        </h3>
        <p className="text-accent-500 text-sm leading-relaxed line-clamp-3">
          {event.description}
        </p>
      </div>

      <div className="space-y-1.5 text-sm text-accent-500 mt-auto">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-indigo-400 flex-shrink-0" />
          <span>{dateStr} · {timeStr}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0" />
          <span>{event.venue}</span>
        </div>
      </div>

      {event.registrationLink && (
        <a
          href={event.registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-sm mt-2 w-full justify-center"
        >
          Register Now <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  );
}
