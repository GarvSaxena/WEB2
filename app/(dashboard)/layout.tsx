/**
 * app/(dashboard)/layout.tsx — Dashboard Route Group Layout
 *
 * Protected layout shared by all /dashboard/* pages.
 * Renders the DashboardSidebar alongside the page content.
 *
 * Note: Clerk's middleware already blocks unauthenticated access —
 * this layout is an additional server-side check for defence in depth.
 */

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { getCurrentUserRole } from "@/lib/rbac";
import { ROLE_LABELS } from "@/lib/roles";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Secondary auth guard (middleware is the primary guard)
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  const role = await getCurrentUserRole();
  const fullName = user?.fullName?.trim() || "Chirag Jain";
  const designation = ROLE_LABELS[role];

  return (
    <div className="flex min-h-screen overflow-hidden bg-white text-slate-900">
      <DashboardSidebar
        role={role}
        fullName={fullName}
        designation={designation}
        imageUrl={user?.imageUrl || null}
      />

      <main className="flex-1 bg-white">
        {children}
      </main>
    </div>
  );
}
