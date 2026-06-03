# SaaS Pro — Implementation Plan

## Tech Stack
- **Framework:** Next.js 16 App Router (TypeScript)
- **Styling:** Tailwind CSS v4 (CSS-first `@theme` config in `app/globals.css`)
- **Icons:** Material Symbols Outlined (Google Fonts, loaded in `app/layout.tsx`)
- **Auth + DB:** Supabase (`@supabase/ssr`)
- **Payments:** Stripe (Checkout + Webhooks + Customer Portal)
- **Design:** Royal Amethyst theme (see `AGENTS.md` for full token reference)

---

## ✅ Completed Steps

### Step 1 — Project Scaffolding
**Status: Done**

- Next.js 16 scaffolded with TypeScript, Tailwind v4, App Router
- `app/globals.css` — full Royal Amethyst `@theme` token set (colors, spacing, border-radius, shadows) + typography utilities (`headline-xl` → `label-sm`)
- `app/layout.tsx` — Inter font + Material Symbols Outlined loaded in `<head>`
- `.env.local` — all variable names pre-filled, values blank (fill before Step 6)

Key files: `app/globals.css`, `app/layout.tsx`, `.env.local`, `tailwind.config.ts` (not used — Tailwind v4 is CSS-first)

---

### Step 2 — UI Primitive Components
**Status: Done**

All built in `components/ui/` — no external UI library used.

| File | Props / Notes |
|---|---|
| `Button.tsx` | `variant`: primary/outlined/text · `size`: sm/md/lg · `loading`, `icon`, `fullWidth`, `href` (renders as Next.js Link when provided) |
| `Input.tsx` | `label`, `error`, `helperText`, `prefixIcon`, `suffixIcon` (Material Symbol name strings) · `size`: md (48px) / lg (56px) · password eye-toggle built-in |
| `Card.tsx` | `variant`: elevated / filled / glass |
| `Badge.tsx` | `variant`: primary / success / warning / default |
| `Toggle.tsx` | Controlled: `checked`, `onChange` — used for billing toggle |

---

### Step 3 — Layout Components
**Status: Done**

All built in `components/layout/`.

| File | Notes |
|---|---|
| `Header.tsx` | Fixed public nav · scroll shadow · mobile hamburger with slide-down menu · Sign In + Get Started as Button with `href` |
| `Footer.tsx` | 4-column link grid (Product / Company / Resources / Legal) + copyright + social icons |
| `Sidebar.tsx` | 288px desktop fixed sidebar + mobile slide-in drawer · `usePathname` for active state · accepts `isOpen` + `onClose` props (wired in Step 8 dashboard layout) |
| `TopBar.tsx` | Dashboard top bar · mobile hamburger (calls `onMenuClick` prop) · notification bell · user avatar with click-away dropdown (Profile / Settings / Sign Out) |

---

### Step 4 — Landing Page
**Status: Done**

`app/page.tsx` — assembles all sections. All sections are Server Components.

| File | Section |
|---|---|
| `components/landing/Hero.tsx` | Dark gradient hero, feature pill, headline, 2 CTAs |
| `components/landing/TrustLogos.tsx` | Grayscale company logos row |
| `components/landing/HowItWorks.tsx` | 3-column steps with step badge + icon (hover turns primary) |
| `components/landing/FeatureGrid.tsx` | 12-col bento: 8-col glass main card + 4 smaller feature cards |
| `components/landing/CTASection.tsx` | bg-primary card, headline, dual CTAs, avatar stack + "10,000+ teams" |

---

### Step 5 — Auth Pages (UI Only)
**Status: Done · No Supabase yet — forms log to console**

| Route | File | Notes |
|---|---|---|
| `/auth/login` | `app/auth/login/page.tsx` | Email + password, eye-toggle, Forgot Password link, Google/Facebook social buttons |
| `/auth/signup` | `app/auth/signup/page.tsx` | Social buttons first, Full Name/Email/Password with icon prefixes, client-side validation (≥8 chars), success state |

Both pages link to each other. Submit handlers have `// TODO Step 7` comments where Supabase calls go.

---

## 🔲 Remaining Steps

### Step 6 — Supabase Setup
**Requires:** Supabase project URL + keys in `.env.local`

**What to do:**
1. Fill in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
2. Install packages:
   ```bash
   npm install @supabase/ssr @supabase/supabase-js
   ```
3. Create these files:
   - `lib/supabase/client.ts` — browser Supabase client
   - `lib/supabase/server.ts` — server Supabase client (cookies)
   - `lib/supabase/middleware.ts` — session refresh helper
   - `types/database.ts` — Supabase generated types
4. Run the SQL migrations in your Supabase SQL editor (full SQL is in `AGENTS.md` → "Supabase Database Schema"):
   - `profiles` table (extends `auth.users`)
   - `subscriptions` table
   - RLS policies for both tables
   - `handle_new_user` trigger (auto-creates profile on signup)

**Done when:** Supabase clients import without errors; tables visible in Supabase dashboard.

---

### Step 7 — Auth Flows + Middleware
**Requires:** Step 6 complete

**What to do:**
1. Wire login form (`app/auth/login/page.tsx`) — replace `console.log` with:
   ```ts
   const { error } = await supabase.auth.signInWithPassword({ email, password })
   // on success: router.push('/dashboard')
   // on error: setError(error.message)
   ```
2. Wire signup form (`app/auth/signup/page.tsx`) — replace `console.log` with:
   ```ts
   const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } })
   ```
3. Wire Google OAuth buttons (both pages):
   ```ts
   supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${origin}/auth/callback` } })
   ```
4. Create `app/auth/callback/route.ts` — exchange OAuth code for session, redirect to `/dashboard`
5. Create `middleware.ts` (project root) — protect `/dashboard/*`, redirect `/auth/*` when already logged in

**Done when:** Full login → dashboard → logout flow works end-to-end.

---

### Step 8 — Dashboard
**Requires:** Step 7 complete (for real user session)

**What to do:**
1. Create `app/dashboard/layout.tsx` — Sidebar (288px) + TopBar (64px) + scrollable main, manage `sidebarOpen` state and pass to both components
2. Create `app/dashboard/page.tsx` — 12-column bento grid (CSS Grid):
   - **Row 1:** Welcome card (greet user by name from session) + Quick Actions (4 icon buttons)
   - **Row 2:** 4 Stats cards with metric + trend indicators
   - **Row 3:** Bar chart (pure CSS/SVG — no library) + Recent Activity feed
   - **Row 4:** Recent Files table — striped rows, status badges (from `Badge.tsx`), action buttons
3. Add FAB (fixed bottom-right "+" button)
4. Add skeleton loading states (pulse-animated gray boxes while data loads)

Reference: `design/.../home_dashboard_royal_amethyst/code.html`

**Done when:** Dashboard loads for authenticated users; all sections render; mobile collapses correctly.

---

### Step 9 — Pricing Page (Static UI)
**Requires:** Steps 3-4 (Header + Footer already done)

**What to do:**
1. Create `app/pricing/page.tsx` (uses existing `Header` and `Footer`)
2. Create `components/pricing/BillingToggle.tsx` — monthly/yearly `useState`, "Save 20%" badge when yearly active
3. Create `components/pricing/PricingCard.tsx` — feature list with `check_circle` / `block` icons, props: `name`, `price`, `features`, `unavailable`, `featured` (Pro card gets `border-2 border-primary md:scale-105`)
4. Build 3-column pricing grid: Basic ($9/mo) · Pro ($29/mo — "Most Popular" badge) · Enterprise ("Contact Us")
5. Security badges row (payment icons + guarantees)
6. Pricing CTA buttons call `console.log` for now (wired in Step 11)

Reference: `design/.../subscription_pricing_royal_amethyst/code.html`

**Done when:** Page renders with working monthly/yearly toggle that swaps prices.

---

### Step 10 — Stripe Setup
**Requires:** Stripe account + keys, Step 7 complete

**What to do:**
1. Fill in `.env.local` Stripe values (publishable key, secret key, webhook secret, 6 price IDs)
2. Install: `npm install stripe`
3. Create files:
   - `lib/stripe/client.ts` — server-side Stripe instance
   - `lib/stripe/plans.ts` — PLANS config with price IDs (see `AGENTS.md` → "Plans Configuration")
4. Create API routes:
   - `app/api/stripe/checkout/route.ts` — get user session → get/create Stripe customer → create Checkout Session
   - `app/api/stripe/webhook/route.ts` — verify signature, handle 4 events (checkout.session.completed, subscription.updated, subscription.deleted, invoice.payment_failed), sync to `subscriptions` table. **Must use** `export const runtime = 'nodejs'` and `request.text()` for raw body
   - `app/api/stripe/portal/route.ts` — create Billing Portal session

**Done when:** Checkout session creates successfully in Stripe test mode; `stripe listen --forward-to localhost:3000/api/stripe/webhook` receives events.

---

### Step 11 — Connect Pricing CTAs
**Requires:** Steps 9 + 10 complete

**What to do:**
1. Wire PricingCard CTA buttons to POST `/api/stripe/checkout` with `{ priceId, interval }` → redirect to Stripe Checkout URL
2. On `?checkout=success` redirect back to `/dashboard`, show a success toast
3. Show current subscription plan in the dashboard welcome card (query `subscriptions` table via Supabase)

**Done when:** Full test checkout flow works end-to-end in Stripe test mode.

---

### Step 12 — Customer Portal
**Requires:** Step 11 complete

**What to do:**
1. Add "Manage Billing" button in the TopBar dropdown (or a Settings page)
2. Button POSTs to `/api/stripe/portal` → redirects to Stripe Customer Portal
3. Return URL: `/dashboard`

**Done when:** User with active subscription can open the Stripe portal and return to dashboard.

---

### Step 13 — Polish
**What to do:**
1. **Loading states** — spinning circle SVG on all async buttons (already in `Button.tsx` with `loading` prop — just pass it everywhere)
2. **Toast notifications** — build a simple fixed top-right toast component (no library), show success/error on auth actions + checkout
3. **Mobile responsiveness pass** — test all 5 pages at 375px viewport width
4. **Accessibility pass:**
   - All `<input>` have associated `<label>` ✓ (done in `Input.tsx`)
   - Icon-only buttons have `aria-label` ✓ (done in `TopBar.tsx`, `Sidebar.tsx`)
   - `aria-current="page"` on active sidebar nav items ✓ (done in `Sidebar.tsx`)
   - `focus-visible:outline-2 focus-visible:outline-primary` on interactive elements ✓ (done in `Button.tsx`, `Toggle.tsx`)
   - Modal/drawer focus trap + Escape close ✓ (Escape done in `Sidebar.tsx`, `TopBar.tsx`)
5. **Production build** — `npm run build` must pass with zero errors

**Done when:** App passes full walkthrough on desktop + mobile; `npm run build` succeeds cleanly.

---

## File Tree (current state)

```
/
├── app/
│   ├── globals.css              ← Royal Amethyst @theme tokens
│   ├── layout.tsx               ← Inter font + Material Symbols
│   ├── page.tsx                 ← Landing page
│   └── auth/
│       ├── login/page.tsx       ← Login UI (needs Supabase in Step 7)
│       └── signup/page.tsx      ← Sign Up UI (needs Supabase in Step 7)
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── Toggle.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── TopBar.tsx
│   └── landing/
│       ├── Hero.tsx
│       ├── TrustLogos.tsx
│       ├── HowItWorks.tsx
│       ├── FeatureGrid.tsx
│       └── CTASection.tsx
├── .env.local                   ← Fill Supabase keys before Step 6
├── AGENTS.md                    ← Full spec reference
└── Implementation_Plan.md       ← This file
```

**Still to create (Steps 6–13):**
```
lib/supabase/client.ts
lib/supabase/server.ts
lib/supabase/middleware.ts
lib/stripe/client.ts
lib/stripe/plans.ts
types/database.ts
middleware.ts
app/auth/callback/route.ts
app/dashboard/layout.tsx
app/dashboard/page.tsx
app/pricing/page.tsx
app/api/stripe/checkout/route.ts
app/api/stripe/webhook/route.ts
app/api/stripe/portal/route.ts
components/pricing/BillingToggle.tsx
components/pricing/PricingCard.tsx
components/dashboard/StatsCard.tsx
components/dashboard/BarChart.tsx
components/dashboard/QuickActions.tsx
components/dashboard/RecentFilesTable.tsx
```

---

## How to Resume

1. Open terminal in `c:\Users\diego\Documents\Web Template`
2. Run `npm run dev` to start the dev server
3. Visit `http://localhost:3000` — landing page should load
4. Visit `/auth/login` and `/auth/signup` — both pages work (UI only)
5. Fill in `.env.local` Supabase values (needed for Step 6)
6. Tell Claude **"next"** to continue from Step 6
