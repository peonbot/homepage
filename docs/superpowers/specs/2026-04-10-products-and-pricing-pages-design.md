# Products & Pricing Pages Design

## Overview

Add multi-page routing to the RunHQ homepage with dedicated product pages for RunHQ and Widget, plus a pricing page inspired by UserVoice's single-tier enterprise model.

## Technical Approach

- **Routing:** React Router (`react-router-dom`) with client-side routing
- **Framework:** Same stack — React 18, TypeScript, Vite, Tailwind CSS
- **Styling:** Match existing dark theme (slate-900 backgrounds, cyan-400/500 accents, gradient text)

## Navigation Changes

Current: `RunHQ [Beta] ... Login`

New structure:
- **RunHQ** logo (links to `/`)
- **Products** dropdown (hover to open on desktop, tap to expand on mobile)
  - **RunHQ** — AI agents for your workflows (links to `/runhq`)
  - **Widget** — Collect feedback, ship faster (links to `/widget`)
- **Pricing** (links to `/pricing`)
- **Login** button (unchanged, links to `https://app.runhq.io`)

Mobile: Products becomes an expandable section in the hamburger menu. Pricing is a direct link.

## File Structure

```
src/
├── App.tsx              (refactored: Router shell, shared nav with dropdown, route definitions)
├── pages/
│   ├── HomePage.tsx     (extracted from current App.tsx — hero, demo, how it works, benefits, workspace scene)
│   ├── RunHQPage.tsx    (new product page)
│   ├── WidgetPage.tsx   (new product page)
│   └── PricingPage.tsx  (new pricing page)
├── SpriteAnalyzer.ts    (unchanged)
├── index.css            (unchanged)
└── main.tsx             (unchanged)
```

## Page Designs

### HomePage (`/`)

Extracted as-is from current App.tsx. Contains:
- Hero section ("AI agents for your workflows" / "Put your operations on autopilot")
- Demo video
- How it Works (3-step grid)
- Benefits/stats cards
- Interactive workspace scene (sprite animation)

No content changes — just moved into its own component.

### RunHQ Product Page (`/runhq`)

**Hero Section:**
- Headline: "AI Agents for Your Workflows"
- Subheadline: "Put your operations on autopilot. RunHQ deploys AI agents that handle repetitive tasks, resolve tickets, and keep your team focused on what matters."
- CTA: "Request Access" button (links to existing Google Forms URL)

**How It Works (expanded 3-step):**
1. **Map your workflows** — Connect your tools and let RunHQ learn how your team operates
2. **Deploy agents** — AI agents start handling tasks autonomously with human oversight
3. **Retire the old stuff** — Reduce costs up to 80% as agents take over routine operations

**Key Benefits (3-column cards):**
- Up to 80% cost reduction
- Direct feedback loop
- No replatform needed

### Widget Product Page (`/widget`)

**Hero Section:**
- Headline: "100x Your Feedback Loop"
- Subheadline: "Collect user feedback anywhere on your website and turn it into a working product instantly with agents."
- CTA: "Request Access" button

**Key Features (3-column grid):**
1. **2 Lines of Code** — Drop the widget on any page. No npm install, no build step.
2. **Auto-Captured Context** — Every submission includes URL, browser info, console logs, and JS errors automatically.
3. **Feedback to Product** — Submissions feed into your workflow where AI agents turn feedback into shipped features.

**How It Works (horizontal flow):**
User submits feedback -> Context auto-captured -> Agent processes -> Team reviews -> Feature ships

### Pricing Page (`/pricing`)

Inspired by UserVoice's enterprise pricing model: single tier, consultation-based.

**Hero:**
- Headline: "Simple, transparent pricing"
- Subheadline: "No per-seat charges. Everyone on your team gets access."

**Price Card (single, centered):**
- "Starting at **$12,000**/year"
- "Custom packages based on your team's volume and integrations"

**Included in all plans (feature list):**
- AI agent deployment
- Workflow automation
- RunHQ Widget
- Team collaboration
- Priority support
- Security & compliance

**CTA:** "Talk to Us" / "Request Access" button

## Shared Elements

All pages share:
- Navigation bar (with products dropdown)
- Dark gradient background (`bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900`)
- Color palette: slate-700/800/900, cyan-400/500, blue-500
- Typography: same font sizes and gradient text treatments
- CTA buttons: same cyan gradient style

## Shared Links

- Request Access CTA: `https://forms.gle/imCy2kktZUhvrWfA8`
- Login: `https://app.runhq.io`
- Discord: existing link in nav

## Dependencies

- `react-router-dom` — client-side routing
