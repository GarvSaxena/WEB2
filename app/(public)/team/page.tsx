/**
 * app/(public)/team/page.tsx — Our Team (public member showcase)
 */

import { connectDB } from "@/lib/db";
import Member from "@/models/Member";
import { Users, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team | EPMOC",
  description: "Meet the EPMOC team — the passionate students powering our club.",
};

const DESIGNATION_ORDER = ["president", "vice president", "Treasurer", "Head", "member"];

const DESIGNATION_BADGE: Record<string, string> = {
  president:       "bg-amber-100 text-amber-700 border-amber-200",
  "vice president":"bg-orange-100 text-orange-700 border-orange-200",
  Treasurer:       "bg-emerald-100 text-emerald-700 border-emerald-200",
  Head:            "bg-indigo-100 text-indigo-700 border-indigo-200",
  member:          "bg-slate-100 text-slate-600 border-slate-200",
};

async function getTeam() {
  await connectDB();
  const members = await Member.find({ isActive: true }).lean();

  // Sort by designation order
  return members.sort((a, b) => {
    const ai = DESIGNATION_ORDER.indexOf(a.designation);
    const bi = DESIGNATION_ORDER.indexOf(b.designation);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
}

export default async function TeamPage() {
  let members: Awaited<ReturnType<typeof getTeam>> = [];
  try {
    members = await getTeam();
  } catch {
    // DB offline
  }

  const leadership = members.filter((m) =>
    ["president", "vice president", "Treasurer"].includes(m.designation)
  );
  const heads = members.filter((m) => m.designation === "Head");
  const regular = members.filter((m) => m.designation === "member");

  return (
    <div className="mesh-bg min-h-screen">
      <div className="container-section py-16 space-y-16">
        {/* Hero */}
        <div className="text-center">
          <p className="section-label mb-3">The people behind it all</p>
          <h1 className="font-display text-5xl font-bold text-accent-900 mb-4">
            Our <span className="gradient-text">Team</span>
          </h1>
          <p className="text-accent-500 max-w-2xl mx-auto text-lg">
            {members.length} passionate students across {6} departments — united by one goal.
          </p>
        </div>

        {/* Leadership */}
        {leadership.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold text-accent-900 mb-6 text-center">
              Leadership
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {leadership.map((m) => (
                <MemberCard key={String(m._id)} member={m} featured />
              ))}
            </div>
          </section>
        )}

        {/* Heads */}
        {heads.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold text-accent-900 mb-6 text-center">
              Department Heads
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {heads.map((m) => (
                <MemberCard key={String(m._id)} member={m} />
              ))}
            </div>
          </section>
        )}

        {/* Members */}
        {regular.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold text-accent-900 mb-6 text-center">
              Members
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {regular.map((m) => (
                <MemberCard key={String(m._id)} member={m} />
              ))}
            </div>
          </section>
        )}

        {members.length === 0 && (
          <div className="text-center py-24">
            <Users className="w-12 h-12 text-accent-300 mx-auto mb-4" />
            <p className="text-accent-500">Team info coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MemberCard({
  member,
  featured = false,
}: {
  member: Awaited<ReturnType<typeof getTeam>>[number];
  featured?: boolean;
}) {
  const pic = member.profilePicture ?? member.avatarUrl;

  return (
    <div
      className={cn(
        "card p-6 flex flex-col items-center text-center hover:shadow-sm transition-all",
        featured && "ring-2 ring-indigo-200 w-64"
      )}
    >
      {pic ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={pic}
          alt={member.name}
          className={cn(
            "rounded-full object-cover ring-4 ring-white shadow-sm",
            featured ? "w-24 h-24" : "w-16 h-16"
          )}
        />
      ) : (
        <div
          className={cn(
            "rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600",
            featured ? "w-24 h-24 text-3xl" : "w-16 h-16 text-2xl"
          )}
        >
          {member.name.charAt(0).toUpperCase()}
        </div>
      )}

      <h3 className={cn("font-display font-bold text-accent-900 mt-4 mb-1", featured ? "text-xl" : "text-base")}>
        {member.name}
      </h3>

      <span className={cn(
        "inline-flex text-xs font-semibold px-2.5 py-0.5 rounded-full border capitalize mb-2",
        DESIGNATION_BADGE[member.designation] ?? DESIGNATION_BADGE.member
      )}>
        {member.designation}
      </span>

      <p className="text-xs text-accent-400 mb-3">{member.department} · {member.branch}</p>

      {member.bio && (
        <p className="text-sm text-accent-500 leading-relaxed line-clamp-2 mb-3">
          {member.bio}
        </p>
      )}

      {featured && (
        <div className="space-y-1 text-xs text-accent-400 w-full">
          <div className="flex items-center gap-2 justify-center">
            <Mail className="w-3 h-3" /> {member.instituteEmail}
          </div>
        </div>
      )}
    </div>
  );
}
