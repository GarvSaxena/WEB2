# EPMOC Web — College Club Management Portal

> **Engineering Professionals & Management Organization Club**
> A production-ready Next.js 15 + Clerk + MongoDB starter template.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Clerk Auth** | Email/password + OAuth sign-in, session management |
| 🛡️ **RBAC** | 3 roles: `president`, `core`, `member` with granular permissions |
| 🗄️ **MongoDB** | Mongoose schema with indexes, hot-reload safe singleton |
| ⚡ **App Router** | Next.js 15 with route groups, Server Components, Server Actions |
| 🎨 **Premium UI** | Dark glassmorphism design, Tailwind CSS, custom animations |
| 📊 **Analytics** | Aggregated membership stats (pluggable with Recharts/Chart.js) |
| 🌱 **Mock Data** | One-command seed script with 10 realistic members |

---

## 🗂️ Project Structure

```
EPMOC_WEB/
├── app/
│   ├── (public)/                    # Public route group (no auth required)
│   │   ├── layout.tsx               # → Wraps: PublicNavbar + Footer
│   │   ├── page.tsx                 # → Route: /  (Landing Page)
│   │   └── sign-in/[[...sign-in]]/ 
│   │       └── page.tsx             # → Route: /sign-in (Clerk UI)
│   ├── (dashboard)/                 # Protected route group
│   │   ├── layout.tsx               # → Wraps: DashboardSidebar + Header
│   │   └── dashboard/
│   │       ├── page.tsx             # → Route: /dashboard (Overview)
│   │       ├── profile/page.tsx     # → Route: /dashboard/profile
│   │       ├── members/page.tsx     # → Route: /dashboard/members
│   │       └── analytics/page.tsx   # → Route: /dashboard/analytics
│   ├── api/
│   │   └── members/route.ts         # REST API: GET + POST /api/members
│   ├── globals.css                  # Design tokens + component classes
│   └── layout.tsx                   # Root layout: ClerkProvider + fonts
├── components/
│   ├── public/
│   │   └── PublicNavbar.tsx         # Sticky nav with Clerk-aware auth buttons
│   └── dashboard/
│       ├── DashboardSidebar.tsx     # Role-filtered nav, collapsible
│       └── DashboardHeader.tsx      # Page title + greeting + search
├── lib/
│   ├── db.ts                        # MongoDB singleton connection
│   ├── rbac.ts                      # Role checking + permission matrix
│   └── utils.ts                     # cn(), formatDate(), truncate()
├── models/
│   └── Member.ts                    # Mongoose schema + TypeScript interface
├── scripts/
│   └── seed.ts                      # Mock data seeder (npm run seed)
├── middleware.ts                     # Clerk route protection
├── .env.local                        # 🔑 Your secrets (never commit!)
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Edit `.env.local` and replace the placeholder values:

```bash
# Get from https://dashboard.clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Get from https://cloud.mongodb.com
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/epmoc
```

### 3. Set up Clerk

1. Go to [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. Create a new application
3. Copy **Publishable Key** and **Secret Key** into `.env.local`
4. Under **Redirect URLs**, add:
   - Sign-in URL: `/sign-in`
   - After sign-in URL: `/dashboard`

### 4. Seed the database (optional)

```bash
npm run seed
```

This inserts 10 mock members (1 president, 3 core, 6 members) into MongoDB.

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🔑 Setting User Roles (RBAC)

Roles are stored in Clerk's `publicMetadata`.  
**To assign a role to a user:**

1. Go to Clerk Dashboard → Users → Select a user
2. Click **Metadata** → **Public**
3. Add:
   ```json
   { "role": "president" }
   ```
4. Save. The role takes effect immediately on the next request.

**Available roles:**

| Role | What they can do |
|---|---|
| `president` | Full access: manage members, view analytics, settings |
| `core` | Edit members, view analytics (no settings) |
| `member` | View-only: profile + member directory |

---

## 📡 API Reference

### `GET /api/members`
Returns all members. Requires authentication.

```bash
curl http://localhost:3000/api/members \
  -H "Authorization: Bearer <session_token>"
```

### `POST /api/members`
Creates a new member. Requires `president` or `core` role.

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "department": "Computer Science",
  "role": "member",
  "status": "active"
}
```

---

## 🧩 Adding More Pages

1. Create `app/(dashboard)/dashboard/your-page/page.tsx`
2. Add a nav entry in `components/dashboard/DashboardSidebar.tsx` with the `roles` array
3. Call `await requirePermission("your_action")` at the top of the page
4. If it's a new action type, add it to `lib/rbac.ts`

---

## 🔧 Tech Stack

- **[Next.js 15](https://nextjs.org/)** — App Router, Server Components
- **[TypeScript](https://www.typescriptlang.org/)** — Full type safety
- **[Tailwind CSS 3](https://tailwindcss.com/)** — Utility-first styling
- **[Clerk](https://clerk.com/)** — Authentication + user management
- **[MongoDB Atlas](https://www.mongodb.com/atlas)** + **[Mongoose](https://mongoosejs.com/)** — Database
- **[Lucide React](https://lucide.dev/)** — Icons

---

## 📝 Extending the Schema

To add a field to `Member` (e.g., `phone`):

1. Add to `models/Member.ts`:
   ```typescript
   phone?: string;
   ```
2. Add to the Schema object:
   ```typescript
   phone: { type: String, trim: true }
   ```
3. Update `lib/rbac.ts` if the new field needs permission gating.
4. Update the relevant page components to display / edit the field.

---

## 🤝 Contributing

This is a starter template. Feel free to extend it with:
- [ ] Rich text editor for announcements
- [ ] Event management module
- [ ] Attendance tracking
- [ ] Email notifications (Resend/Nodemailer)
- [ ] File uploads (UploadThing)
- [ ] Real-time updates (Pusher/Socket.IO)
