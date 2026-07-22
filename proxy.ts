/**
 * middleware.ts — Next.js Edge Middleware
 *
 * Uses Clerk's `clerkMiddleware` to:
 *   1. Protect all /dashboard/* routes — redirect unauthenticated users to /sign-in
 *   2. Allow public routes (/, /sign-in, /sign-up, /api/webhook/*) without auth
 *
 * HOW IT WORKS:
 *   - Clerk attaches a session token to each request.
 *   - `createRouteMatcher` builds a fast URL pattern matcher.
 *   - Inside the middleware we call `auth().protect()` only on private routes.
 *
 * IMPORTANT: This file MUST live at the project root (same level as /app).
 */

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// ── Define which routes are publicly accessible ────────────────────────────
const isPublicRoute = createRouteMatcher([
  "/",              // Landing page
  "/sign-in(.*)",   // Clerk hosted sign-in (supports sub-paths)
  "/sign-up(.*)",   // Clerk hosted sign-up
  "/api/webhook(.*)", // Clerk webhook endpoint (no auth header — signed by Svix)
]);

// ── Define dashboard routes that need protection ───────────────────────────
const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  // If the user hits a dashboard route and is NOT authenticated,
  // Clerk will automatically redirect them to NEXT_PUBLIC_CLERK_SIGN_IN_URL
  if (isDashboardRoute(request)) {
    await auth.protect();
  }

  // For all other routes: allow the request to pass through
  return NextResponse.next();
});

export const config = {
  // Run middleware on ALL routes except Next.js internals and static files.
  // This pattern is recommended by Clerk docs.
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
