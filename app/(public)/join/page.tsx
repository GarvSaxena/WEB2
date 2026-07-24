/**
 * app/(public)/join/page.tsx — Join EPMOC
 */

import type { Metadata } from "next";
import JoinForm from "@/components/public/JoinForm";

export const metadata: Metadata = {
  title: "Join Us | EPMOC",
  description: "Apply to join EPMOC — the Engineering Professionals & Management Organization Club at IIIT Una.",
};

export default function JoinPage() {
  return (
    <div className="mesh-bg min-h-screen">
      <div className="container-section py-16">
        {/* Hero */}
        <div className="text-center mb-14">
          <p className="section-label mb-3">Become a part of us</p>
          <h1 className="font-display text-5xl font-bold text-accent-900 mb-4">
            Join <span className="gradient-text">EPMOC</span>
          </h1>
          <p className="text-accent-500 max-w-xl mx-auto text-lg">
            Fill in this form to express your interest. Our team will review your application
            and reach out to you with the next steps.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <JoinForm />
        </div>
      </div>
    </div>
  );
}
