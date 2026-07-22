/**
 * app/(dashboard)/dashboard/analytics/page.tsx — Analytics Page
 *
 * Restricted to "president" and "core" roles via requirePermission().
 * Shows aggregated member statistics in a visual format.
 *
 * In a real app, replace the placeholder charts with Recharts or Chart.js.
 */

import { requirePermission, getCurrentUserRole } from "@/lib/rbac";
import { connectDB } from "@/lib/db";
import Member from "@/models/Member";
import { BarChart3, TrendingUp, Users, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Analytics" };

interface AggResult { _id: string; count: number; }
interface AnalyticsData {
  byDept:       AggResult[];
  byStatus:     AggResult[];
  byRole:       AggResult[];
  totalMembers: number;
}

async function getAnalytics(): Promise<AnalyticsData> {
  await connectDB();
  const [byDept, byStatus, byRole, totalMembers] = await Promise.all([
    Member.aggregate<AggResult>([
      { $group: { _id: "$department", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 },
    ]),
    Member.aggregate<AggResult>([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
    Member.aggregate<AggResult>([
      { $group: { _id: "$role", count: { $sum: 1 } } },
    ]),
    Member.countDocuments({}),
  ]);
  return { byDept, byStatus, byRole, totalMembers };
}

export default async function AnalyticsPage() {
  // Only president and core can access analytics
  await requirePermission("view_analytics");

  let data: AnalyticsData = { byDept: [], byStatus: [], byRole: [], totalMembers: 0 };
  try {
    data = await getAnalytics();
  } catch {
    // DB not yet connected — show placeholder
  }

  const maxDeptCount = Math.max(...data.byDept.map((d: { count: number }) => d.count), 1);

  // Colour map for the horizontal bar chart
  const barColors = [
    "bg-brand-500", "bg-purple-500", "bg-pink-500", "bg-amber-500",
    "bg-emerald-500", "bg-cyan-500", "bg-rose-500", "bg-indigo-500",
  ];

  return (
    <div className="space-y-8">
      {/* ── Summary Cards ───────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Members", value: data.totalMembers,  icon: Users,      color: "text-brand-400",   bg: "bg-brand-500/10" },
          { label: "Departments",   value: data.byDept.length, icon: BarChart3,  color: "text-purple-400",  bg: "bg-purple-500/10" },
          { label: "Active",        value: data.byStatus.find((s) => s._id === "active")?.count ?? 0,
            icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { label: "Roles",         value: data.byRole.length, icon: PieChart,   color: "text-amber-400",   bg: "bg-amber-500/10"  },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="stat-card">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", bg)}>
              <Icon className={cn("w-5 h-5", color)} />
            </div>
            <span className="text-2xl font-bold font-display gradient-text">{value}</span>
            <span className="text-xs text-gray-500">{label}</span>
          </div>
        ))}
      </div>

      {/* ── Members by Department (Horizontal Bar Chart) ─────────────── */}
      <section className="glass-card p-6">
        <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-brand-400" />
          Members by Department
        </h3>

        {data.byDept.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">
            No data yet — run <code className="bg-white/10 px-1.5 py-0.5 rounded text-brand-300">npm run seed</code>
          </p>
        ) : (
          <div className="space-y-3">
            {data.byDept.map(({ _id, count }, i) => (
              <div key={_id} className="flex items-center gap-3">
                <span className="text-sm text-gray-400 w-36 truncate flex-shrink-0">
                  {_id}
                </span>
                <div className="flex-1 h-7 bg-white/5 rounded-lg overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-lg flex items-center px-2 transition-all duration-700",
                      barColors[i % barColors.length]
                    )}
                    style={{ width: `${(count / maxDeptCount) * 100}%` }}
                  >
                    <span className="text-xs text-white font-semibold">{count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Role & Status Breakdown ──────────────────────────────────── */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* By Role */}
        <div className="glass-card p-6">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            Members by Role
          </h3>
          <div className="space-y-3">
            {data.byRole.map(({ _id, count }) => (
              <div key={_id} className="flex items-center justify-between">
                <span className="text-sm text-gray-400 capitalize">{_id}</span>
                <span className="text-sm font-bold text-white">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* By Status */}
        <div className="glass-card p-6">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            Membership Status
          </h3>
          <div className="space-y-3">
            {data.byStatus.map(({ _id, count }) => (
              <div key={_id} className="flex items-center justify-between">
                <span className="text-sm text-gray-400 capitalize">{_id}</span>
                <span className={cn(
                  "text-sm font-bold",
                  _id === "active" ? "text-emerald-400" :
                  _id === "alumni" ? "text-amber-400" : "text-gray-400"
                )}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Placeholder for Chart.js / Recharts integration ──────────── */}
      <div className="glass-card p-8 text-center border-dashed border-2 border-surface-border">
        <PieChart className="w-10 h-10 text-gray-600 mx-auto mb-3" />
        <p className="text-gray-500 text-sm">
          Add <code className="bg-white/10 px-1.5 py-0.5 rounded">recharts</code> or{" "}
          <code className="bg-white/10 px-1.5 py-0.5 rounded">chart.js</code> here for
          rich interactive charts.
        </p>
      </div>
    </div>
  );
}
