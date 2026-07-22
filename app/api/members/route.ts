/**
 * app/api/members/route.ts — REST API Endpoints for Members
 *
 * GET  /api/members  → List members (all authenticated users)
 * POST /api/members  → Create a member (president/core only)
 *
 * HOW CLERK AUTH WORKS IN ROUTE HANDLERS:
 *   Use `auth()` from "@clerk/nextjs/server" to get the userId.
 *   The middleware has already verified the session cookie by the time
 *   this route handler runs, so no manual token verification is needed.
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Member from "@/models/Member";
import { getCurrentUserRole, hasPermission } from "@/lib/rbac";

// ── GET /api/members ──────────────────────────────────────────────────────
export async function GET(_req: NextRequest) {
  try {
    // Authenticate the request
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // All authenticated users can list members
    const members = await Member.find({})
      .select("-__v") // Exclude Mongoose version key
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: members });
  } catch (err) {
    console.error("[GET /api/members]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ── POST /api/members ─────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only president and core can create members
    const role = await getCurrentUserRole();
    if (!hasPermission(role, "edit_member")) {
      return NextResponse.json(
        { error: "Forbidden: insufficient permissions" },
        { status: 403 }
      );
    }

    const body = await req.json();

    // Basic validation (Mongoose handles the full validation)
    const name = body.name ?? body.fullName;
    const instituteEmail = body.instituteEmail ?? body.email;
    const phoneNumber = body.phoneNumber;
    const department = body.department;
    const branch = body.branch;
    const year = body.year;
    const designation = body.designation ?? body.role;
    const domain = body.domain;

    if (!name || !instituteEmail || !phoneNumber || !department || !branch || !year || !designation || !domain) {
      return NextResponse.json(
        {
          error:
            "name, instituteEmail, phoneNumber, department, branch, year, designation, and domain are required",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const member = await Member.create({
      clerkUserId: body.clerkUserId ?? body.clerkId ?? `manual_${Date.now()}`,
      clerkId: body.clerkId ?? body.clerkUserId ?? `manual_${Date.now()}`,
      name,
      profilePicture: body.profilePicture ?? body.avatarUrl,
      phoneNumber,
      instituteEmail,
      email: instituteEmail,
      department,
      branch,
      year: Number(year),
      designation,
      role: designation,
      domain,
      joinDate: body.joinDate ?? new Date(),
      isApproved: body.isApproved ?? false,
      isActive: body.isActive ?? true,
      status: body.isActive === false ? "inactive" : "active",
      avatarUrl: body.avatarUrl ?? body.profilePicture,
    });

    return NextResponse.json({ success: true, data: member }, { status: 201 });
  } catch (err: unknown) {
    console.error("[POST /api/members]", err);
    // Handle MongoDB duplicate key errors (e.g., duplicate email)
    if ((err as { code?: number }).code === 11000) {
      return NextResponse.json(
        { error: "A member with this email already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
