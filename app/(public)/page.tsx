/**
 * app/(public)/page.tsx — Landing Page
 */

import Link from "next/link";
import { connectDB } from "@/lib/db";
import Event from "@/models/Event";
import {
  Users,
  BarChart3,
  Shield,
  Zap,
  Star,
  ArrowRight,
  Award,
  Calendar,
  CalendarDays,
  MapPin,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STATS = [
  { label: "Active Members", value: "120+", icon: Users },
  { label: "Events Organised", value: "48",  icon: Calendar },
  { label: "Departments",      value: "6",   icon: Award },
  { label: "Years Active",     value: "6",   icon: Star },
];

const FEATURES = [
  {
    icon: Users,
    title: "Member Directory",
    description:
      "Browse and search all club members with roles, departments, and contact info at a glance.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
  },
  {
    icon: BarChart3,
    title: "Club Analytics",
    description:
      "Track membership growth, event participation, and department distribution through beautiful charts.",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    description:
      "Granular permissions ensure Presidents, Core members, and Members see only what they need.",
    color: "text-pink-600",
    bg: "bg-pink-50",
    border: "border-pink-200",
  },
  {
    icon: Zap,
    title: "Real-Time Updates",
    description:
      "Member data stays in sync across all sessions — changes propagate instantly to the whole team.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  technical:  "bg-indigo-100 text-indigo-700",
  cultural:   "bg-pink-100 text-pink-700",
  management: "bg-amber-100 text-amber-700",
  workshop:   "bg-emerald-100 text-emerald-700",
  seminar:    "bg-violet-100 text-violet-700",
  other:      "bg-slate-100 text-slate-600",
};

async function getRecentEvents() {
  try {
    await connectDB();
    return Event.find({ isPublished: true }).sort({ date: -1 }).limit(3).lean();
  } catch {
    return [];
  }
}

export default async function LandingPage() {
  const recentEvents = await getRecentEvents();

  return (
    <div className="mesh-bg">
      {/* ── Hero Section ────────────────────────────────────────────── */}
      <section className="container-section py-24 lg:py-36 text-center relative">
        <div
          className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-full
                     px-4 py-1.5 text-sm font-semibold text-indigo-700 mb-8 animate-fade-in"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          IIIT Una — Est. 2019
        </div>

        <h1
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold
                     leading-tight mb-6 animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          Welcome to{" "}
          <span className="gradient-text">EPMOC</span>
        </h1>

        <p
          className="text-xl text-accent-500 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          Engineering Professionals &amp; Management Organization Club — your
          centralized hub for member management, event tracking, and club analytics.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          <Link href="/sign-in" className="btn-primary text-base px-8 py-3">
            Sign In to Portal
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/about" className="btn-secondary text-base px-8 py-3">
            Learn More
          </Link>
        </div>

        {/* Hero gradient orb */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[700px] h-[700px] rounded-full
                     bg-indigo-500/5 blur-3xl pointer-events-none -z-10"
          aria-hidden
        />
      </section>

      {/* ── Stats Row ────────────────────────────────────────────────── */}
      <section className="container-section pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-stagger">
          {STATS.map(({ label, value, icon: Icon }) => (
            <div key={label} className="stat-card text-center items-center">
              <Icon className="w-6 h-6 text-indigo-500 mx-auto" />
              <span className="text-3xl font-bold font-display gradient-text">
                {value}
              </span>
              <span className="text-sm text-accent-500">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features Section ─────────────────────────────────────────── */}
      <section id="features" className="container-section py-20">
        <div className="text-center mb-12">
          <p className="section-label mb-3">What&apos;s inside the portal</p>
          <h2 className="font-display text-4xl font-bold text-accent-900">
            Everything your club needs
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(({ icon: Icon, title, description, color, bg, border }) => (
            <div
              key={title}
              className={`card p-6 border ${border} hover:shadow-sm transition-all group`}
            >
              <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <h3 className="font-display font-bold text-accent-900 mb-2">{title}</h3>
              <p className="text-accent-500 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Recent Events ─────────────────────────────────────────────── */}
      <section className="container-section py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="section-label mb-1">What we&apos;ve been up to</p>
            <h2 className="font-display text-4xl font-bold text-accent-900">
              Recent Events
            </h2>
          </div>
          <Link
            href="/events"
            className="btn-secondary hidden sm:flex"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recentEvents.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {recentEvents.map((event) => {
              const d = new Date(event.date);
              return (
                <div key={String(event._id)} className="card p-6 hover:shadow-sm transition-all">
                  <span className={cn(
                    "inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full capitalize mb-3",
                    CATEGORY_COLORS[event.category] ?? CATEGORY_COLORS.other
                  )}>
                    <Tag className="w-3 h-3 mr-1" /> {event.category}
                  </span>
                  <h3 className="font-display font-bold text-accent-900 mb-2 leading-snug">
                    {event.title}
                  </h3>
                  <p className="text-accent-500 text-sm line-clamp-2 mb-4">
                    {event.description}
                  </p>
                  <div className="space-y-1 text-xs text-accent-400">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" /> {event.venue}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card p-14 text-center">
            <CalendarDays className="w-10 h-10 text-accent-300 mx-auto mb-3" />
            <p className="font-semibold text-accent-600 mb-1">Events Coming Soon</p>
            <p className="text-sm text-accent-400">
              Stay tuned — exciting events are being planned by our team!
            </p>
          </div>
        )}

        <div className="mt-6 text-center sm:hidden">
          <Link href="/events" className="btn-secondary">
            View All Events <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────── */}
      <section className="container-section py-20">
        <div
          className="card p-12 text-center relative overflow-hidden
                      border-indigo-200 animate-glow"
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/10
                          rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-violet-500/10
                          rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <h2 className="font-display text-4xl font-bold text-accent-900 mb-4 relative">
            Ready to get started?
          </h2>
          <p className="text-accent-500 text-lg mb-8 max-w-xl mx-auto relative">
            Sign in with your club credentials to access the member portal and
            manage your club activities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
            <Link href="/sign-in" className="btn-primary text-base px-10 py-3">
              Access the Portal
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/join" className="btn-secondary text-base px-10 py-3">
              Apply to Join
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
