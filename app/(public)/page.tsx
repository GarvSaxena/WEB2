/**
 * app/(public)/page.tsx — Landing Page
 *
 * The public-facing root route ("/").
 * Sections:
 *   1. Hero           — Bold headline, CTA buttons, animated badge
 *   2. Stats          — Key club metrics
 *   3. Features       — What the portal offers
 *   4. CTA Banner     — Final sign-up prompt
 *
 * This is a Server Component by default (no "use client" directive).
 * This page remains accessible whether or not the visitor is signed in.
 */

import Link from "next/link";
import { EmptyCarousel } from "@/components/public/EmptyCarousel";
import {
  Users,
  BarChart3,
  Shield,
  Zap,
  Star,
  ArrowRight,
  Award,
  Calendar,
} from "lucide-react";

// ── Redirect authenticated users straight to dashboard ─────────────────────
// ── Data ──────────────────────────────────────────────────────────────────
const STATS = [
  { label: "Active Members", value: "120+", icon: Users },
  { label: "Events Organised", value: "48",  icon: Calendar },
  { label: "Departments",      value: "12",  icon: Award },
  { label: "Years Active",     value: "6",   icon: Star },
];

const FEATURES = [
  {
    icon: Users,
    title: "Member Directory",
    description:
      "Browse and search all club members with roles, departments, and contact info at a glance.",
    color: "text-brand-400",
    bg: "bg-brand-500/10 border-brand-500/20",
  },
  {
    icon: BarChart3,
    title: "Club Analytics",
    description:
      "Track membership growth, event participation, and department distribution through beautiful charts.",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    description:
      "Granular permissions ensure Presidents, Core members, and Members see only what they need.",
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20",
  },
  {
    icon: Zap,
    title: "Real-Time Updates",
    description:
      "Member data stays in sync across all sessions — changes propagate instantly to the whole team.",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
];

// ── Page Component ────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="mesh-bg">
      {/* ── Hero Section ─────────────────────────────────────────────── */}
      <section className="container-section py-24 lg:py-36 text-center">
        {/* Animated badge */}


        <h1
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold
                     leading-tight mb-6 animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          Welcome to{" "}
          <span className="gradient-text">EPMOC</span>
        </h1>

        <p
          className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          Engineering Professionals & Management Organization Club — your
          centralized hub for member management, event tracking, and club
          analytics.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          <Link href="/sign-in" className="btn-primary text-base px-8 py-3">
            Sign In to Portal
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a href="#features" className="btn-secondary text-base px-8 py-3">
            Learn More
          </a>
        </div>

        {/* Hero gradient orb */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[600px] h-[600px] rounded-full
                     bg-brand-500/5 blur-3xl pointer-events-none -z-10"
          aria-hidden
        />
      </section>

      {/* ── Stats Row ────────────────────────────────────────────────── */}
      <section className="container-section pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-stagger">
          {STATS.map(({ label, value, icon: Icon }) => (
            <div key={label} className="stat-card text-center">
              <Icon className="w-6 h-6 text-brand-400 mx-auto mb-2" />
              <span className="text-3xl font-bold font-display gradient-text">
                {value}
              </span>
              <span className="text-sm text-gray-500">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Carousel Placeholder ────────────────────────────────────── */}
      <section className="container-section py-20">
        <EmptyCarousel />
      </section>



      {/* ── CTA Banner ───────────────────────────────────────────────── */}
      <section className="container-section py-20">
        <div className="glass-card p-12 text-center relative overflow-hidden
                        border border-brand-500/20 animate-glow">
          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-brand-500/10
                          rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10
                          rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <h2 className="font-display text-4xl font-bold mb-4 relative">
            Ready to get started?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto relative">
            Sign in with your club credentials to access the member portal and
            manage your club activities.
          </p>
          <Link href="/sign-in" className="btn-primary text-base px-10 py-3 relative">
            Access the Portal
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
