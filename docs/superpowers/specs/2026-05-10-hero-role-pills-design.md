# Hero role pills — replacing the Capture/Execute/Ship integration list

**Status:** Spec, ready for implementation
**Owner:** jaeyun
**Date:** 2026-05-10

## Problem

The bottom of the hero on `HomePage.tsx` (lines 221–232) is a quiet 3-row text list grouping integration names under `CAPTURE / EXECUTE / SHIP`. It restates breadth that is already implied by the trusted-by logo strip directly below the hero, and it doesn't answer the question every visitor is silently asking: *is this for me?*

The hero lede claims "anyone on your team assigns tickets to coding agents" — the supporting block underneath should make that concrete role by role, not list integrations a third time.

## Goal

Replace the integration list with a **role pills** block that names who RunHQ is for and shows, in one short paragraph per role, what RunHQ does for that person. The slot should add interactivity to an otherwise static hero without becoming heavy.

## Non-goals

- Don't redesign the hero layout, the lede, the CTAs, or the screenshot column.
- Don't add a new integration grid anywhere on the page — the logo strip below already handles breadth.
- Don't introduce a new navigation pattern (no full tab pages, no filter URLs). The pills change inline copy only.

## Scope

Only the `rhw-hero-bullets` block in `src/pages/HomePage.tsx` and its scoped CSS in the same file are changed. The data array `[{k, v}, …]` is replaced with the new roles array. Old integration strings move out of this slot entirely.

## Design

### Layout

The block keeps its position at the bottom of the hero left column, beneath the CTAs, separated from the lede above by the existing 1px top border.

```
─────────────────────────────────────────── (existing border-top)

Built for the whole team

◉ PM    ○ Engineer    ○ Support

Ship product without rewriting your ticket as a spec.
You file the work, RunHQ scopes the branch, an agent
opens the PR. Engineering reviews — you stay out of
the rewriting loop.
```

### Roles and copy

Three pills, in this order. First (PM) is selected on initial render.

| Pill label | Role copy (≤ 280 chars) |
|---|---|
| **PM** | Ship product without rewriting your ticket as a spec. You file the work, RunHQ scopes the branch, an agent opens the PR. Engineering reviews — you stay out of the rewriting loop. |
| **Engineer** | Triage to agents instead of context-switching. The small fixes, the cleanups, the "while you're in there" — an agent picks them up, you review the diff. You keep the deep work. |
| **Support** | Turn the Intercom thread into a fix in motion. Captured ticket → scoped task → agent shipping a branch — often before the customer hears back from you. |

Header above the pills: **"Built for the whole team"** (small caps eyebrow, same treatment as existing `.rhw-eyebrow` style on the page).

### Interaction

- **Default selection:** PM pill is active on mount.
- **Click:** Switching pills swaps the paragraph below with a soft fade (~150ms opacity transition, no layout shift — paragraph slot has a fixed min-height matching the longest copy).
- **Auto-rotate:** Every 5 seconds, the active pill advances to the next role (PM → Engineer → Support → PM …). The first user click on any pill cancels the rotation permanently for the session.
- **Keyboard:** Pills are buttons in a single tab stop with arrow-key navigation between them (left/right). Enter / Space activates.
- **Reduced motion:** If `prefers-reduced-motion: reduce` matches, auto-rotate is disabled and the fade is skipped (instant swap).

### Visual treatment

- Pills: pill-shaped buttons, ~32px tall, 12px horizontal padding, gap of 8px between them. Inactive: transparent background, `var(--rhw-line)` border, `var(--rhw-ink-mute)` text. Active: `var(--rhw-ink)` background, white text, no border.
- Header eyebrow: 11px, 0.12em letter-spacing, uppercase, `var(--rhw-ink-mute)` — matches the existing `.rhw-hero-bullet-k` styling so the section still visually anchors to the hero's typographic system.
- Paragraph: 13.5px, `var(--rhw-ink)`, line-height 1.5 — same as the current `.rhw-hero-bullet-v`.
- Spacing: 12px between header and pill row, 16px between pill row and paragraph.

No icons in pills. No counts, no badges. Plain word, plain pill.

## Implementation notes

- New component is **inline** inside `HomePage.tsx`, not a separate file. The block is small and used in one place; pulling it out adds ceremony without payoff.
- State: a single `useState<number>` for the active index, plus a `useRef<boolean>` flag for "user has interacted". A `useEffect` sets up the 5s `setInterval` and clears it when the ref flips true or on unmount.
- The roles array lives next to the existing `LOGOS` / `EVENTS` constants at the top of the file, named `HERO_ROLES`.
- Replace the existing `[{k, v}, …]` array and `.map(...)` block at lines 221–232. Delete the now-unused `.rhw-hero-bullet`, `.rhw-hero-bullet-k`, `.rhw-hero-bullet-v` rules in the scoped CSS (lines 553–560) and add new rules for `.rhw-hero-roles`, `.rhw-hero-roles-h`, `.rhw-hero-roles-pills`, `.rhw-hero-role-pill`, `.rhw-hero-role-pill[aria-pressed="true"]`, `.rhw-hero-role-copy`.
- The paragraph slot has a `min-height` sized so the longest of the three copy strings fits without overflow at every breakpoint — swapping pills must not shift any element below it. Implementer measures and sets this empirically.

## Accessibility

- Pills render as `<button>` with `aria-pressed` reflecting active state.
- Copy paragraph uses `aria-live="polite"` so screen readers announce changes without interrupting.
- Auto-rotation respects `prefers-reduced-motion`.

## Out of scope (intentionally deferred)

- Linking each role to a dedicated landing page.
- Tracking which pill the user clicks (analytics).
- Adding a fourth role (Founders / Designer / etc.). The block is sized for three.
- Showing an integration chip strip beneath the paragraph. The logo strip below the hero carries breadth already.

## Acceptance

- The hero left column ends with a `Built for the whole team` header, three role pills, and a single paragraph that swaps when a pill is clicked.
- PM is selected on load. Auto-rotation advances every 5s until first interaction.
- No vertical layout shift between role swaps.
- Reduced-motion users get instant swaps and no rotation.
- The integration text strings (`Intercom · Linear · Slack · …`) are removed from the hero entirely; the trusted-by logo strip below remains the only breadth signal in the upper page.
