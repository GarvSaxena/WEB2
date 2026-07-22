/**
 * app/(dashboard)/dashboard/members/manage/page.tsx
 * — Manage Members Page (President Only)
 *
 * Allows the president to view all members with full details and
 * perform admin actions (edit role, deactivate, delete).
 *
 * Access is guarded server-side via requirePermission("manage_members").
 */

import { requirePermission } from "@/lib/rbac";
import { connectDB } from "@/lib/db";
import Member from "@/models/Member";
import { formatDate, cn } from "@/lib/utils";
import { ROLE_LABELS, ROLE_COLORS } from "@/lib/roles";
import { UserCog, Trash2, Crown } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Manage Members" };

async function getAllMembers() {
  await connectDB();
  return Member.find({}).sort({ role: 1, joinDate: -1 }).lean();
}

export default async function ManageMembersPage() {
  // President-only guard — redirects to /dashboard if role check fails
  await requirePermission("manage_members");

  let members: Awaited<ReturnType<typeof getAllMembers>> = [];
  try {
    members = await getAllMembers();
  } catch {
    // DB not connected
  }

  return (
    <div className="space-y-6">
      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Crown className="w-5 h-5 text-amber-400" />
            <h2 className="font-display text-2xl font-bold text-white">
              Manage Members
            </h2>
          </div>
          <p className="text-gray-500 text-sm">
            {members.length} total member{members.length !== 1 ? "s" : ""} ·
            President-only view
          </p>
        </div>

        {/* Add Member button — wire up to a modal/form */}
        <button className="btn-primary text-sm">
          + Add Member
        </button>
      </div>

      {/* ── Full Member Table ─────────────────────────────────────── */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-border text-gray-500
                             text-xs uppercase tracking-wider">
                <th className="text-left px-6 py-4">Member</th>
                <th className="text-left px-6 py-4">Role</th>
                <th className="text-left px-6 py-4">Department</th>
                <th className="text-left px-6 py-4">Join Date</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-right px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {members.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-600">
                    No members yet — run{" "}
                    <code className="bg-white/10 px-1.5 py-0.5 rounded text-brand-300">
                      npm run seed
                    </code>
                  </td>
                </tr>
              ) : (
                members.map((member) => {
                  const role = member.role as "president" | "core" | "member";
                  return (
                    <tr
                      key={String(member._id)}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      {/* Name + Email */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-brand-500/20
                                          flex items-center justify-center
                                          text-brand-300 font-bold flex-shrink-0">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white font-medium">{member.name}</p>
                            <p className="text-gray-500 text-xs">{member.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="px-6 py-4">
                        <span className={cn("role-badge", ROLE_COLORS[role])}>
                          {ROLE_LABELS[role]}
                        </span>
                      </td>

                      {/* Department */}
                      <td className="px-6 py-4 text-gray-400">
                        {member.department}
                      </td>

                      {/* Join Date */}
                      <td className="px-6 py-4 text-gray-500">
                        {formatDate(member.joinDate as Date)}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={cn(
                          "text-xs font-medium px-2 py-0.5 rounded-full",
                          member.status === "active"   ? "bg-emerald-500/20 text-emerald-400" :
                          member.status === "alumni"   ? "bg-amber-500/20 text-amber-400"    :
                                                         "bg-gray-500/20 text-gray-400"
                        )}>
                          {member.status}
                        </span>
                      </td>

                      {/* Action Buttons */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="p-1.5 rounded-lg text-gray-500
                                       hover:text-brand-400 hover:bg-brand-500/10
                                       transition-all"
                            title="Edit member"
                            // TODO: open edit modal — wire to /api/members/[id] PATCH
                          >
                            <UserCog className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1.5 rounded-lg text-gray-500
                                       hover:text-rose-400 hover:bg-rose-500/10
                                       transition-all"
                            title="Delete member"
                            // TODO: confirm dialog → DELETE /api/members/[id]
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
