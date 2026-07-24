/**
 * app/(public)/about/page.tsx — About EPMOC
 */

import Link from "next/link";
import {
  Users, CalendarDays, Award, Star,
  Target, Eye, Zap, Heart, BookOpen,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | EPMOC",
  description: "Learn about EPMOC — the Engineering Professionals & Management Organization Club at IIIT Una.",
};

const STATS = [
  { label: "Active Members", value: "120+", icon: Users },
  { label: "Events Organised", value: "48", icon: CalendarDays },
  { label: "Departments", value: "6", icon: Award },
  { label: "Years Active", value: "6", icon: Star },
];

const DEPARTMENTS = [
  { name: "Designing", desc: "Visual identity and creative assets" },
  { name: "PR", desc: "Public relations and sponsorships" },
  { name: "Social Media", desc: "Online presence and content" },
  { name: "Volunteering", desc: "Event logistics and ground support" },
  { name: "Coverage", desc: "Photography and videography" },
  { name: "Technical", desc: "Web platforms and digital tools" },
];

const VALUES = [
  { icon: Target, title: "Purpose-Driven", desc: "Every initiative aligns with our mission of developing management skills in engineers." },
  { icon: Heart, title: "Community First", desc: "We build lasting bonds between members through collaborative events and projects." },
  { icon: Zap, title: "Excellence", desc: "We hold ourselves to the highest standards in everything we organise and create." },
  { icon: Eye, title: "Transparency", desc: "Open communication and accountability across all club activities." },
];

export default function AboutPage() {
  return (
    <div className="mesh-bg min-h-screen">
      <div className="container-section py-16 space-y-24">

        {/* Hero */}
        <section className="text-center">
          <div className="inline-flex items-center gap-2 bg-accent-100 rounded-full px-4 py-1.5 text-sm font-semibold text-accent-700 mb-6">
            <BookOpen className="w-4 h-4" /> IIIT Una
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-accent-900 mb-6">
            About <span className="gradient-text">EPMOC</span>
          </h1>
          <p className="text-xl text-accent-500 max-w-3xl mx-auto leading-relaxed">
            The Engineering Professionals &amp; Management Organization Club — bridging the gap
            between engineering knowledge and management excellence at IIIT Una.
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-stagger">
          {STATS.map(({ label, value, icon: Icon }) => (
            <div key={label} className="stat-card text-center items-center">
              <Icon className="w-6 h-6 text-indigo-500" />
              <span className="text-4xl font-bold font-display gradient-text">{value}</span>
              <span className="text-sm text-accent-500">{label}</span>
            </div>
          ))}
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="card p-8">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center mb-5">
              <Target className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-accent-900 mb-3">Our Mission</h2>
            <p className="text-accent-500 leading-relaxed">
              To develop the management potential of engineering students at IIIT Una by providing
              hands-on experience in event organisation, leadership, communication, and teamwork through
              a structured and supportive club environment.
            </p>
          </div>
          <div className="card p-8">
            <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center mb-5">
              <Eye className="w-6 h-6 text-violet-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-accent-900 mb-3">Our Vision</h2>
            <p className="text-accent-500 leading-relaxed">
              To be the premier student organisation at IIIT Una that transforms engineers into
              well-rounded professionals — leaders who can innovate technically and manage effectively,
              driving positive change in industry and society.
            </p>
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="font-display text-3xl font-bold text-accent-900 text-center mb-10">
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6 text-center hover:shadow-sm transition-all">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-display font-bold text-accent-900 mb-2">{title}</h3>
                <p className="text-accent-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Departments */}
        <section>
          <h2 className="font-display text-3xl font-bold text-accent-900 text-center mb-4">
            Our Departments
          </h2>
          <p className="text-accent-500 text-center mb-10">
            Six focused teams that work together to make every event a success.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEPARTMENTS.map(({ name, desc }) => (
              <div key={name} className="card p-5 flex items-start gap-3 hover:shadow-sm transition-all">
                <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-accent-900">{name}</p>
                  <p className="text-sm text-accent-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="card p-12 text-center animate-glow">
          <h2 className="font-display text-3xl font-bold text-accent-900 mb-4">
            Want to be part of EPMOC?
          </h2>
          <p className="text-accent-500 mb-8 max-w-xl mx-auto">
            Join a community of passionate students building real-world skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join" className="btn-primary text-base px-8 py-3">
              Join Us <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="btn-secondary text-base px-8 py-3">
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
