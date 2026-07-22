/**
 * app/(dashboard)/dashboard/settings/page.tsx — Club Settings (President Only)
 *
 * A stub settings page for the president role.
 * Extend with real form handling + Server Actions as needed.
 */

import { requirePermission } from "@/lib/rbac";
import { Settings, Shield, Bell, Palette } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Settings" };

const SETTING_SECTIONS = [
  {
    icon: Shield,
    title: "Security & Access",
    description: "Manage roles, permissions, and access control settings.",
    color: "text-brand-400",
    bg: "bg-brand-500/10 border-brand-500/20",
    items: ["Role assignments", "Session policies", "Audit log"],
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Configure how and when club members receive notifications.",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
    items: ["Email notifications", "New member alerts", "Event reminders"],
  },
  {
    icon: Palette,
    title: "Branding",
    description: "Customize the club portal appearance and club information.",
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20",
    items: ["Club name & logo", "Colour theme", "About page content"],
  },
];

export default async function SettingsPage() {
  // President-only guard
  await requirePermission("manage_members");

  return (
    <div className="max-w-3xl space-y-6">
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <Settings className="w-6 h-6 text-brand-400" />
        <div>
          <h2 className="font-display text-2xl font-bold text-white">
            Club Settings
          </h2>
          <p className="text-gray-500 text-sm">
            Manage your club portal configuration
          </p>
        </div>
      </div>

      {/* ── Setting Sections ─────────────────────────────────────── */}
      {SETTING_SECTIONS.map(({ icon: Icon, title, description, color, bg, items }) => (
        <div key={title} className={`glass-card p-6 border ${bg}`}>
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg} border flex-shrink-0`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-1">{title}</h3>
              <p className="text-sm text-gray-500 mb-4">{description}</p>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center justify-between py-2
                               border-b border-surface-border last:border-0"
                  >
                    <span className="text-sm text-gray-400">{item}</span>
                    <button className="text-xs text-brand-400 hover:text-brand-300
                                       transition-colors font-medium">
                      Configure →
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}

      {/* ── Danger Zone ─────────────────────────────────────────── */}
      <div className="glass-card p-6 border border-rose-500/20 bg-rose-500/5">
        <h3 className="font-semibold text-rose-400 mb-2">Danger Zone</h3>
        <p className="text-sm text-gray-500 mb-4">
          These actions are irreversible. Proceed with caution.
        </p>
        <button
          className="px-4 py-2 rounded-xl border border-rose-500/40 text-rose-400
                     text-sm font-medium hover:bg-rose-500/10 transition-all"
        >
          Reset All Member Data
        </button>
      </div>
    </div>
  );
}
