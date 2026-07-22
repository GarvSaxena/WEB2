/**
 * app/(public)/layout.tsx — Public Route Group Layout
 *
 * Wraps all public pages (/, /sign-in, /sign-up) with the PublicNavbar.
 * Route groups with parentheses (public) do NOT affect the URL path.
 */

import { PublicNavbar } from "@/components/public/PublicNavbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavbar />
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-surface-border py-8 mt-16">
        <div className="container-section text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-brand-400 font-semibold">EPMOC</span> —
            Engineering Professionals & Management Organization Club. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
