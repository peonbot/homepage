const SIGNUP_URL = 'https://app.runhq.io/signup';

const QUICK_LINKS: { title: string; desc: string; href: string }[] = [
  { title: 'Get an account', desc: 'Create your workspace and your first project.', href: SIGNUP_URL },
  { title: 'Install the widget', desc: 'Two lines of code to start collecting feedback.', href: '/widget' },
  { title: 'Talk to us', desc: 'Walkthroughs, integrations, and onboarding help.', href: SIGNUP_URL },
];

const CONCEPTS: { title: string; desc: string }[] = [
  {
    title: 'Feedback loop',
    desc: 'A signal lifecycle: feedback comes in, an agent does the work, you review, the loop closes. Every step is tracked.',
  },
  {
    title: 'Projects',
    desc: 'A workspace for a single product surface. Each project has its own feedback inbox, agents, and integrations.',
  },
  {
    title: 'Agents',
    desc: 'Purpose-built workers that own a workflow end to end. They pick up structured work, execute it, and surface a result for human review.',
  },
  {
    title: 'Tickets',
    desc: "The unit of work an agent acts on. Tickets carry user signal, captured context, and the agent's proposed change.",
  },
];

const SECTIONS: { id: string; title: string; rows: { label: string; status?: string }[] }[] = [
  {
    id: 'install',
    title: 'Installation & setup',
    rows: [
      { label: 'Create a workspace' },
      { label: 'Connect Slack, Linear, GitHub, or Intercom' },
      { label: 'Drop the widget into your site (2 lines)' },
      { label: 'Invite your team — no per-seat charges' },
    ],
  },
  {
    id: 'widget',
    title: 'Widget',
    rows: [
      { label: 'Quick install' },
      { label: 'Auto-captured context (page, browser, console, errors)' },
      { label: 'Custom themes', status: 'Coming soon' },
      { label: 'Programmatic API (RunHQ.identify / .open)', status: 'Coming soon' },
    ],
  },
  {
    id: 'agents',
    title: 'Agents',
    rows: [
      { label: 'How agents pick up tickets' },
      { label: 'Reviewing and approving proposed changes' },
      { label: 'Routing rules and prioritization' },
      { label: 'Custom agent workflows', status: 'Coming soon' },
    ],
  },
  {
    id: 'api',
    title: 'API & webhooks',
    rows: [
      { label: 'REST endpoints', status: 'Coming soon' },
      { label: 'Webhook payloads', status: 'Coming soon' },
      { label: 'Authentication (API keys)', status: 'Coming soon' },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="rh-docs">
      <style>{DOCS_STYLES}</style>

      {/* Hero */}
      <section className="docs-hero">
        <div className="docs-hero-inner">
          <div className="rh-eyebrow">Documentation</div>
          <h1 className="rh-section-title docs-hero-title">
            Build the loop <em>in an afternoon.</em>
          </h1>
          <p className="rh-lede docs-hero-lede">
            Widget on your site, tools connected, agents turning user feedback into shipped product.
          </p>
        </div>
      </section>

      {/* Quick start */}
      <section className="docs-section" id="start">
        <div className="docs-section-head">
          <div className="rh-eyebrow">Start here</div>
          <p className="docs-section-sub">Three actions get you from zero to your first agent run.</p>
        </div>
        <div className="docs-grid-3">
          {QUICK_LINKS.map((link, i) => (
            <a key={link.title} href={link.href} className="rh-card docs-qs-card">
              <div className="docs-card-num mono">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="rh-card-title">{link.title}</h3>
              <p className="rh-card-body">{link.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Concepts */}
      <section className="docs-section docs-section-ruled" id="concepts">
        <div className="docs-section-head">
          <div className="rh-eyebrow">Concepts</div>
          <p className="docs-section-sub">The four primitives RunHQ is built on.</p>
        </div>
        <div className="docs-grid-2">
          {CONCEPTS.map((c) => (
            <div key={c.title} className="docs-concept-card">
              <h3 className="docs-concept-title">{c.title}</h3>
              <p className="rh-card-body">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reference TOC */}
      <section className="docs-section docs-section-ruled" id="reference">
        <div className="docs-section-head">
          <div className="rh-eyebrow">Reference</div>
          <p className="docs-section-sub">
            We&rsquo;re filling these in as we ship. Items marked <span className="docs-coming-inline">Coming soon</span> aren&rsquo;t yet documented — sign up and we&rsquo;ll walk you through them directly.
          </p>
        </div>
        <div className="docs-ref-stack">
          {SECTIONS.map((section) => (
            <div key={section.id} className="docs-ref-card">
              <h3 className="docs-ref-title">{section.title}</h3>
              <ul className="docs-ref-list">
                {section.rows.map((row) => (
                  <li key={row.label} className="docs-ref-row">
                    <span className={row.status ? 'docs-ref-label-mute' : 'docs-ref-label'}>{row.label}</span>
                    {row.status && (
                      <span className="docs-badge mono">{row.status}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="rh-cta-band docs-cta-band">
        <h2 className="rh-cta-title">
          Need a hand <em>getting set up?</em>
        </h2>
        <p className="docs-cta-sub">
          Sign up and we&rsquo;ll walk you through your first integration personally — most teams are live in under an hour.
        </p>
        <div className="docs-cta-actions">
          <a className="rh-cta-primary" href={SIGNUP_URL}>Get started</a>
        </div>
      </section>
    </div>
  );
}

const DOCS_STYLES = `
  .rh-docs {
    background: var(--bg-deep);
    color: var(--ink);
    font-family: 'Inter Tight', system-ui, sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }
  .rh-docs *, .rh-docs *::before, .rh-docs *::after { box-sizing: border-box; }

  /* Shared typography */
  .rh-docs .rh-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: var(--accent);
    margin-bottom: 14px;
  }
  .rh-docs .rh-section-title {
    font-size: clamp(32px, 4.4vw, 56px);
    line-height: 1.05;
    letter-spacing: -0.025em;
    font-weight: 500;
    margin: 0 auto;
    max-width: 720px;
    text-wrap: balance;
    color: var(--ink);
  }
  .rh-docs .rh-section-title em {
    font-style: normal;
    background: linear-gradient(100deg,
      oklch(0.96 0.14 180) 0%,
      oklch(0.88 0.22 160) 60%,
      oklch(0.85 0.22 130) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .rh-docs .rh-lede {
    font-size: 18px;
    line-height: 1.55;
    color: var(--ink-dim);
    max-width: 540px;
    margin: 0;
  }
  .rh-docs .rh-card-title {
    font-size: 20px;
    line-height: 1.2;
    letter-spacing: -0.01em;
    margin: 0;
    font-weight: 500;
    color: var(--ink);
  }
  .rh-docs .rh-card-body {
    font-size: 15px;
    line-height: 1.55;
    color: var(--ink-dim);
    margin: 0;
  }
  .rh-docs .rh-card {
    background: rgba(14, 17, 22, 0.6);
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 28px 24px 26px;
    display: flex; flex-direction: column; gap: 14px;
    backdrop-filter: blur(8px);
    transition: border-color 0.2s, transform 0.2s;
    text-decoration: none;
    color: inherit;
  }
  .rh-docs .rh-card:hover { border-color: var(--line-bold); transform: translateY(-2px); }

  /* Hero */
  .docs-hero {
    padding: 120px 32px 80px;
    text-align: center;
  }
  .docs-hero-inner {
    max-width: 800px;
    margin: 0 auto;
  }
  .docs-hero-title {
    margin: 0 auto 24px;
  }
  .docs-hero-lede {
    margin: 0 auto;
    text-align: center;
    max-width: 480px;
  }

  /* Sections */
  .docs-section {
    padding: 80px 32px;
    max-width: 1060px;
    margin: 0 auto;
  }
  .docs-section-ruled {
    border-top: 1px solid var(--line);
  }
  .docs-section-head {
    margin-bottom: 44px;
  }
  .docs-section-sub {
    font-size: 15px;
    line-height: 1.55;
    color: var(--ink-mute);
    margin: 0;
    max-width: 600px;
  }

  /* Quick-start 3-col grid */
  .docs-grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .docs-qs-card { display: flex; flex-direction: column; gap: 12px; }
  .docs-card-num {
    font-size: 28px;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: var(--accent);
    line-height: 1;
  }

  /* Concepts 2-col grid */
  .docs-grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .docs-concept-card {
    background: rgba(14, 17, 22, 0.4);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 22px 20px;
    display: flex; flex-direction: column; gap: 10px;
  }
  .docs-concept-title {
    font-size: 16px;
    font-weight: 500;
    letter-spacing: -0.01em;
    margin: 0;
    color: var(--ink);
  }

  /* Reference TOC */
  .docs-ref-stack {
    display: flex; flex-direction: column; gap: 12px;
  }
  .docs-ref-card {
    background: rgba(14, 17, 22, 0.4);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 28px;
  }
  .docs-ref-title {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.01em;
    margin: 0 0 16px;
    color: var(--ink);
    text-transform: uppercase;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
    color: var(--accent);
  }
  .docs-ref-list {
    list-style: none;
    margin: 0; padding: 0;
    display: flex; flex-direction: column; gap: 0;
  }
  .docs-ref-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid var(--line);
    font-size: 14px;
  }
  .docs-ref-row:last-child { border-bottom: none; }
  .docs-ref-label { color: var(--ink-dim); }
  .docs-ref-label-mute { color: var(--ink-faint); }
  .docs-badge {
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-faint);
    border: 1px solid var(--line);
    border-radius: 100px;
    padding: 2px 8px;
    white-space: nowrap;
  }
  .docs-coming-inline {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--ink-faint);
    border: 1px solid var(--line);
    border-radius: 100px;
    padding: 1px 7px;
    vertical-align: middle;
  }

  /* CTA band */
  .rh-docs .rh-cta-band {
    padding: 100px 32px;
    max-width: 1060px;
    margin: 0 auto;
    text-align: center;
    border-top: 1px solid var(--line);
  }
  .rh-docs .rh-cta-title {
    font-size: clamp(28px, 3.4vw, 44px);
    line-height: 1.1;
    letter-spacing: -0.02em;
    font-weight: 500;
    margin: 0 0 16px;
    text-wrap: balance;
    color: var(--ink);
  }
  .rh-docs .rh-cta-title em {
    font-style: normal;
    background: linear-gradient(100deg,
      oklch(0.96 0.14 180) 0%,
      oklch(0.88 0.22 160) 60%,
      oklch(0.85 0.22 130) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .docs-cta-sub {
    font-size: 16px;
    line-height: 1.55;
    color: var(--ink-mute);
    margin: 0 auto 32px;
    max-width: 420px;
  }
  .docs-cta-actions { display: inline-flex; gap: 12px; }
  .rh-docs .rh-cta-primary {
    padding: 14px 24px;
    border-radius: 10px;
    font-size: 14px; font-weight: 500;
    color: #061014;
    text-decoration: none;
    background: linear-gradient(180deg, oklch(0.93 0.17 180), oklch(0.78 0.2 180));
    border: 1px solid oklch(0.86 0.18 180);
    box-shadow:
      0 0 0 1px oklch(0.86 0.19 180 / 0.25),
      0 12px 44px -10px oklch(0.86 0.19 180 / 0.5),
      inset 0 1px 0 rgba(255,255,255,0.30);
    transition: transform 0.18s;
    display: inline-block;
  }
  .rh-docs .rh-cta-primary:hover { transform: translateY(-1px); }

  /* Responsive */
  @media (max-width: 880px) {
    .docs-hero { padding: 80px 22px 60px; }
    .docs-section { padding: 60px 22px; }
    .docs-grid-3 { grid-template-columns: 1fr; }
    .docs-grid-2 { grid-template-columns: 1fr; }
    .rh-docs .rh-cta-band { padding: 72px 22px; }
    .docs-cta-actions { flex-direction: column; }
  }
`;
