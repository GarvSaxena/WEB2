import Link from "next/link";
import { EmptyCarousel } from "@/components/public/EmptyCarousel";
import { Users, BarChart3, Shield, Zap, Star, ArrowRight, Award, Calendar } from "lucide-react";

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
    description: "Browse and search all club members with roles, departments, and contact info at a glance.",
  },
  {
    icon: BarChart3,
    title: "Club Analytics",
    description: "Track membership growth, event participation, and department distribution through charts.",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    description: "Granular permissions ensure Presidents, Core members, and Members see only what they need.",
  },
  {
    icon: Zap,
    title: "Real-Time Updates",
    description: "Member data stays in sync across all sessions — changes propagate instantly to the whole team.",
  },
];

export default function LandingPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* ── Hero Section ────────────────────────────────────────────── */}
      <section className="container-section py-24 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
          Welcome to EPMOC
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
          Engineering Professionals & Management Organization Club — bridging the gap
          between technical knowledge and management excellence at IIIT Una.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sign-in" className="btn-primary px-8 py-3">
            Sign In to Portal <ArrowRight className="w-5 h-5 ml-1" />
          </Link>
          <Link href="/about" className="btn-secondary px-8 py-3">
            Learn More
          </Link>
        </div>
      </section>

      {/* ── Stats Row ────────────────────────────────────────────────── */}
      <section className="container-section pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-stagger">
          {STATS.map(({ label, value, icon: Icon }) => (
            <div key={label} className="card p-8 text-center flex flex-col items-center">
              <Icon className="w-6 h-6 text-slate-400 mb-3" />
              <span className="text-3xl font-bold text-slate-900 mb-1">{value}</span>
              <span className="text-sm text-slate-500 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Events Carousel ─────────────────────────────────────────── */}
      <section className="container-section pb-24 pt-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Events Showcase</h2>
          <p className="text-slate-600">Swipe through our upcoming and past activities.</p>
        </div>
        <EmptyCarousel />
      </section>

      {/* ── Features Section ─────────────────────────────────────────── */}
      <section id="features" className="container-section pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Inside the Portal
          </h2>
          <p className="text-slate-600">Everything you need to manage the club.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="card p-6">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-slate-700" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────── */}
      <section className="container-section">
        <div className="card p-12 text-center bg-slate-900 text-white border-0">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
            Sign in with your club credentials to access the member portal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-in" className="btn-primary bg-white text-slate-900 hover:bg-slate-100">
              Access the Portal
            </Link>
            <Link href="/join" className="btn-secondary border-slate-700 bg-slate-800 text-white hover:bg-slate-700">
              Apply to Join
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
