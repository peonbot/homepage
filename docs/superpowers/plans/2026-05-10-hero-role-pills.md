# Hero role pills — implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static `Capture / Execute / Ship` integration text list at the bottom of the homepage hero with an interactive 7-pill role switcher (PM / Engineer / Design / QA / Support / Sales / Founder) where each pill swaps a single descriptive paragraph below.

**Architecture:** Single inline component inside `src/pages/HomePage.tsx`. Component is a small function component using `useState` for the active index, a `useRef<boolean>` for "user has interacted" gating, and a `useEffect` that runs a 5s `setInterval`. Styles live in the existing `HOME_STYLES` template-string CSS block in the same file.

**Tech Stack:** React 18 (function components, hooks), TypeScript, Vite, plain CSS via `<style>{HOME_STYLES}</style>` template string. No new dependencies.

**No automated tests:** This repo has Vitest installed but no test files and no `vitest.config.*` — the homepage is verified manually in the browser via `npm run dev`. Each task ends with a manual browser-verification step. Don't add a test framework as part of this work.

**Design source:** `docs/superpowers/specs/2026-05-10-hero-role-pills-design.md`

---

## File Structure

Only one source file is touched.

| File | Action | Sections |
|---|---|---|
| `src/pages/HomePage.tsx` | Modify | Replace JSX block at lines 201–211 (the `<div className="rhw-hero-bullets">…</div>` and its data array). Replace CSS rules at lines 480–493 inside the `HOME_STYLES` string. Add a new inline component `HeroRoles` defined near other inline components (around line 41, near `LoopCapture`). |
| `docs/superpowers/plans/2026-05-10-hero-role-pills.md` | This plan | n/a |

The new inline component is named `HeroRoles`. It takes no props. Define it next to `LoopCapture` (around line 41) so it sits with other small page-local components.

---

## Task 1: Replace the integration list with the static role pills + paragraph

Goal: get the new visual block on screen with click-to-switch behavior. No auto-rotate, no keyboard arrow nav, no reduced-motion handling yet — those come in later tasks.

**Files:**
- Modify: `src/pages/HomePage.tsx`
  - Add `HeroRoles` component near line 41 (next to `LoopCapture`)
  - Replace JSX at `src/pages/HomePage.tsx:201-211`
  - Replace CSS at `src/pages/HomePage.tsx:480-493`

- [ ] **Step 1: Add the `HeroRoles` component definition**

In `src/pages/HomePage.tsx`, add this component right after the `LoopCapture` component definition (which currently ends near line 60 — find it and add the new component immediately below it, before the next existing component definition):

```tsx
const HERO_ROLES: { label: string; copy: string }[] = [
  {
    label: 'PM',
    copy: 'Ship product without rewriting your ticket as a spec. You file the work, RunHQ scopes the branch, an agent opens the PR. Engineering reviews — you stay out of the rewriting loop.',
  },
  {
    label: 'Engineer',
    copy: 'Triage to agents instead of context-switching. The small fixes, the cleanups, the "while you\'re in there" — an agent picks them up, you review the diff. You keep the deep work.',
  },
  {
    label: 'Design',
    copy: 'Push a copy tweak or a spacing fix straight to a branch. An agent ships the diff, you check the preview, no eng meeting needed for the changes you can already see.',
  },
  {
    label: 'QA',
    copy: 'File the bug with a repro and assign it. The agent writes a failing test, lands the fix, and you re-run your suite against the PR. No "added to the backlog" black hole.',
  },
  {
    label: 'Support',
    copy: 'Turn the Intercom thread into a fix in motion. Captured ticket → scoped task → agent shipping a branch — often before the customer hears back from you.',
  },
  {
    label: 'Sales',
    copy: 'The deal-blocking edge case the prospect demoed yesterday? Open a ticket, assign an agent. By the next call you\'re showing them the PR, not promising a roadmap slot.',
  },
  {
    label: 'Founder',
    copy: 'Your whole company can ship to the codebase. The hundred small fixes that pile up between the things engineering "should be doing" finally get shipped — without anyone context-switching to do them.',
  },
];

const HeroRoles = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="rhw-hero-roles">
      <div className="rhw-hero-roles-h">Built for everyone who ships</div>
      <div className="rhw-hero-roles-pills" role="group" aria-label="Roles">
        {HERO_ROLES.map((role, i) => (
          <button
            key={role.label}
            type="button"
            className="rhw-hero-role-pill"
            aria-pressed={i === active}
            onClick={() => setActive(i)}
          >
            {role.label}
          </button>
        ))}
      </div>
      <p
        key={active}
        className="rhw-hero-role-copy"
        aria-live="polite"
      >
        {HERO_ROLES[active].copy}
      </p>
    </div>
  );
};
```

The `key={active}` on the paragraph forces React to remount it on each role change, which re-fires the CSS fade-in animation defined in Step 3.

- [ ] **Step 2: Replace the integration list JSX in the hero**

In `src/pages/HomePage.tsx`, find this block (currently around lines 201–211):

```tsx
          <div className="rhw-hero-bullets">
            {[
              { k: 'Capture', v: 'Intercom · Linear · Slack · Widget · Email · Front · GitHub · Webhook' },
              { k: 'Execute', v: 'Claude Code · Cursor · Codex · Devin · Aider · BYO model' },
              { k: 'Ship',    v: 'GitHub · GitLab · Bitbucket — agents never hold merge rights' },
            ].map((b) => (
              <div key={b.k} className="rhw-hero-bullet">
                <div className="rhw-hero-bullet-k">{b.k}</div>
                <div className="rhw-hero-bullet-v">{b.v}</div>
              </div>
            ))}
          </div>
```

Replace it with:

```tsx
          <HeroRoles />
```

- [ ] **Step 3: Replace the CSS for the bullets block with role-pills CSS**

In `src/pages/HomePage.tsx`, find this CSS block inside the `HOME_STYLES` template string (currently around lines 480–493):

```css
  .rhw-hero-bullets {
    display: flex; flex-direction: column;
    gap: 12px;
    padding-top: 20px;
    border-top: 1px solid var(--rhw-line);
  }
  .rhw-hero-bullet { display: grid; grid-template-columns: 80px 1fr; gap: 16px; }
  .rhw-hero-bullet-k {
    font-size: 11px; letter-spacing: 0.12em;
    color: var(--rhw-ink-mute);
    text-transform: uppercase;
    padding-top: 2px;
  }
  .rhw-hero-bullet-v { font-size: 13.5px; color: var(--rhw-ink); line-height: 1.5; }
```

Replace it with:

```css
  .rhw-hero-roles {
    padding-top: 20px;
    border-top: 1px solid var(--rhw-line);
  }
  .rhw-hero-roles-h {
    font-size: 11px; letter-spacing: 0.12em;
    color: var(--rhw-ink-mute);
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  .rhw-hero-roles-pills {
    display: flex; flex-wrap: wrap; gap: 8px;
    margin-bottom: 16px;
  }
  .rhw-hero-role-pill {
    appearance: none;
    background: transparent;
    border: 1px solid var(--rhw-line);
    color: var(--rhw-ink-mute);
    font-size: 12px;
    font-weight: 500;
    line-height: 1;
    padding: 9px 14px;
    border-radius: 999px;
    cursor: pointer;
    transition: background 120ms ease, color 120ms ease, border-color 120ms ease;
  }
  .rhw-hero-role-pill:hover {
    border-color: var(--rhw-ink);
    color: var(--rhw-ink);
  }
  .rhw-hero-role-pill[aria-pressed="true"] {
    background: var(--rhw-ink);
    color: #fff;
    border-color: var(--rhw-ink);
  }
  .rhw-hero-role-pill:focus-visible {
    outline: 2px solid var(--rhw-accent);
    outline-offset: 2px;
  }
  .rhw-hero-role-copy {
    font-size: 13.5px;
    color: var(--rhw-ink);
    line-height: 1.5;
    min-height: 4.5em;
    margin: 0;
  }
  @media (prefers-reduced-motion: no-preference) {
    .rhw-hero-role-copy {
      animation: rhw-hero-role-fade 150ms ease-out;
    }
  }
  @keyframes rhw-hero-role-fade {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
```

The `min-height: 4.5em` on `.rhw-hero-role-copy` reserves room for ~3 lines of text so swaps don't shift content below. After step 4, you may need to bump this number — see the verify step.

- [ ] **Step 4: Run the dev server and verify in a browser**

Run:

```bash
cd /app/data/home/homepage && npm run dev
```

Open `http://localhost:5173/` (or whatever port Vite reports). At the bottom of the hero left column, you should see:

1. The eyebrow text "Built for everyone who ships" in small caps grey.
2. A row of 7 pills (PM, Engineer, Design, QA, Support, Sales, Founder). The PM pill is dark/filled, the rest are outlined.
3. A paragraph below showing the PM copy.

Click each pill in turn and verify:
- The clicked pill becomes the active (filled) one.
- The paragraph text changes immediately.
- **Nothing below the paragraph shifts vertically** as the text changes. If it shifts, increase `min-height` on `.rhw-hero-role-copy` until the longest copy (Engineer or Founder) fits without pushing anything.
- The pill row wraps to a second line at narrower hero widths — resize the window down to ~900px width to confirm the wrap is graceful (no overflow, no jagged spacing).

If anything looks broken, fix it before committing.

- [ ] **Step 5: Commit**

```bash
cd /app/data/home/homepage && git add src/pages/HomePage.tsx && git commit -m "$(cat <<'EOF'
Replace hero integration list with role pills (static)

Removes the Capture/Execute/Ship integration text list at the bottom of
the homepage hero and replaces it with a 7-pill role switcher (PM /
Engineer / Design / QA / Support / Sales / Founder). Pills are click-to-
switch only at this stage; auto-rotation and keyboard nav land in
follow-up commits.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Add 5s auto-rotation with reduced-motion handling

Goal: pills advance automatically every 5s until the user clicks any pill, after which rotation stops permanently for the session. Respect `prefers-reduced-motion`.

**Files:**
- Modify: `src/pages/HomePage.tsx` (the `HeroRoles` component added in Task 1)

- [ ] **Step 1: Add the auto-rotate effect to `HeroRoles`**

In `src/pages/HomePage.tsx`, replace the body of the `HeroRoles` component (the function definition added in Task 1, Step 1) with this version:

```tsx
const HeroRoles = () => {
  const [active, setActive] = useState(0);
  const interactedRef = useRef(false);

  useEffect(() => {
    if (interactedRef.current) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const id = window.setInterval(() => {
      if (interactedRef.current) {
        window.clearInterval(id);
        return;
      }
      setActive((i) => (i + 1) % HERO_ROLES.length);
    }, 5000);

    return () => window.clearInterval(id);
  }, []);

  const handleClick = (i: number) => {
    interactedRef.current = true;
    setActive(i);
  };

  return (
    <div className="rhw-hero-roles">
      <div className="rhw-hero-roles-h">Built for everyone who ships</div>
      <div className="rhw-hero-roles-pills" role="group" aria-label="Roles">
        {HERO_ROLES.map((role, i) => (
          <button
            key={role.label}
            type="button"
            className="rhw-hero-role-pill"
            aria-pressed={i === active}
            onClick={() => handleClick(i)}
          >
            {role.label}
          </button>
        ))}
      </div>
      <p className="rhw-hero-role-copy" aria-live="polite">
        {HERO_ROLES[active].copy}
      </p>
    </div>
  );
};
```

The change vs. Task 1: a `useRef<boolean>` flag named `interactedRef`, a `useEffect` that sets up a 5s interval (skipped entirely under reduced-motion or before hydration), and a `handleClick` helper that flips the ref before updating state. The interval body double-checks the ref so a click that lands between ticks still stops rotation immediately.

- [ ] **Step 2: Verify auto-rotate in the browser**

If the dev server isn't running:

```bash
cd /app/data/home/homepage && npm run dev
```

Open the homepage. Without clicking anything:
- After ~5s, the active pill advances from PM to Engineer.
- After another ~5s, it advances to Design.
- It cycles through all seven and wraps back to PM. Full cycle is ~35s.

Then click any pill (e.g., Sales):
- The clicked pill becomes active.
- Wait 10–15 seconds. The active pill should NOT change anymore — rotation is stopped for the session.
- Reload the page. Rotation resumes from PM.

- [ ] **Step 3: Verify reduced-motion behavior**

In Chrome DevTools, open Rendering panel (`Cmd+Shift+P` → "Show Rendering"). Find "Emulate CSS media feature prefers-reduced-motion" and set it to `reduce`. Reload the page.

- The PM pill is active.
- After 10+ seconds with no interaction, the active pill is **still** PM. Auto-rotate is disabled.
- Clicking a pill still works (instant swap).

Reset the emulation when done.

- [ ] **Step 4: Commit**

```bash
cd /app/data/home/homepage && git add src/pages/HomePage.tsx && git commit -m "$(cat <<'EOF'
Auto-rotate hero role pills every 5s, stop on first interaction

Adds a setInterval-driven rotation through the seven role pills. The
first click on any pill cancels rotation for the session. Disabled
entirely when prefers-reduced-motion: reduce is matched.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Add keyboard arrow-key navigation between pills

Goal: arrow-left / arrow-right move focus and selection between pills (wrapping at the ends). Tab moves into and out of the pill group as a single tab stop.

**Files:**
- Modify: `src/pages/HomePage.tsx` (the `HeroRoles` component)

- [ ] **Step 1: Add keyboard handling and roving-tabindex behavior**

In `src/pages/HomePage.tsx`, replace the body of `HeroRoles` again with this version:

```tsx
const HeroRoles = () => {
  const [active, setActive] = useState(0);
  const interactedRef = useRef(false);
  const pillRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (interactedRef.current) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const id = window.setInterval(() => {
      if (interactedRef.current) {
        window.clearInterval(id);
        return;
      }
      setActive((i) => (i + 1) % HERO_ROLES.length);
    }, 5000);

    return () => window.clearInterval(id);
  }, []);

  const select = (i: number) => {
    interactedRef.current = true;
    setActive(i);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    const next = (active + dir + HERO_ROLES.length) % HERO_ROLES.length;
    select(next);
    pillRefs.current[next]?.focus();
  };

  return (
    <div className="rhw-hero-roles">
      <div className="rhw-hero-roles-h">Built for everyone who ships</div>
      <div
        className="rhw-hero-roles-pills"
        role="group"
        aria-label="Roles"
        onKeyDown={handleKeyDown}
      >
        {HERO_ROLES.map((role, i) => (
          <button
            key={role.label}
            ref={(el) => { pillRefs.current[i] = el; }}
            type="button"
            className="rhw-hero-role-pill"
            aria-pressed={i === active}
            tabIndex={i === active ? 0 : -1}
            onClick={() => select(i)}
          >
            {role.label}
          </button>
        ))}
      </div>
      <p className="rhw-hero-role-copy" aria-live="polite">
        {HERO_ROLES[active].copy}
      </p>
    </div>
  );
};
```

What changed vs. Task 2:
- `pillRefs` ref array to hold each pill DOM node.
- `tabIndex={i === active ? 0 : -1}` so only the active pill is in the tab order — standard roving-tabindex pattern.
- `handleKeyDown` on the pills container handles Left/Right, wraps at ends, and moves focus to the new active pill.
- `handleClick` was renamed to `select` (used by both click and keyboard paths).

The `import` line at the top of the file already imports `useEffect`, `useRef`, and `useState` (verify by checking line 1 of `HomePage.tsx`). No import changes needed.

- [ ] **Step 2: Verify keyboard navigation in the browser**

If the dev server isn't running:

```bash
cd /app/data/home/homepage && npm run dev
```

Open the homepage and verify:
- Press Tab repeatedly until focus reaches the pill row. Only one pill (the active one — PM on load) receives focus. The other pills are skipped.
- With a pill focused, press Right Arrow → focus moves to the next pill, that pill becomes active, the paragraph swaps.
- Press Right Arrow repeatedly to wrap from Founder back to PM.
- Press Left Arrow to walk the other direction; Left from PM should wrap to Founder.
- Tab again from a focused pill — focus moves out of the pill group entirely (i.e., to the next focusable element below the hero).
- Pressing Right/Left arrows when focus is NOT on a pill should do nothing relevant to the pills.

Auto-rotation should stop the moment the first arrow key is pressed, just like clicks.

- [ ] **Step 3: Commit**

```bash
cd /app/data/home/homepage && git add src/pages/HomePage.tsx && git commit -m "$(cat <<'EOF'
Add arrow-key navigation to hero role pills

Implements roving tabindex on the pill row: only the active pill is in
the tab order, and Left/Right arrows move both focus and selection
between pills (wrapping at the ends). Keyboard interaction also stops
auto-rotation, matching click behavior.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Final verification (after all three tasks)

Run a build to make sure nothing is broken:

```bash
cd /app/data/home/homepage && npm run build
```

Expected: build succeeds, no TypeScript errors. If TypeScript complains about `pillRefs.current[i] = el` (the ref callback), confirm the explicit `: void` return — the callback body uses braces and an explicit assignment so it returns `undefined`, which is what React expects. If you see a warning about the callback returning a value, double-check the braces in the `ref={(el) => { pillRefs.current[i] = el; }}` line.

**Do not deploy.** Per `CLAUDE.md`, deployment is manual and requires explicit user instruction.
