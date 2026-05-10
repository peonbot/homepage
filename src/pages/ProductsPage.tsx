import { Link } from 'react-router-dom';
import { Navbar, Footer, Avatar, SIGNUP_URL } from '../components/chrome';

const PV_Auto = () => (
  <div className="rhw-pv-auto">
    <div className="rhw-pv-auto-line"><span className="rhw-pv-key">workflow</span> daily-triage</div>
    <div className="rhw-pv-auto-line rhw-pv-indent"><span className="rhw-pv-prop">on:</span> 09:00 UTC + widget:new</div>
    <div className="rhw-pv-auto-line rhw-pv-indent"><span className="rhw-pv-prop">group:</span> by-component</div>
    <div className="rhw-pv-auto-line rhw-pv-indent"><span className="rhw-pv-prop">route:</span> sev:P1 → claude</div>
    <div className="rhw-pv-auto-line rhw-pv-indent"><span className="rhw-pv-prop">review:</span> #eng-prs</div>
  </div>
);

const PV_Projects = () => (
  <div className="rhw-pv-proj">
    {[
      { v: 47, t: 'Bulk archive in projects table', s: 'shipping' },
      { v: 23, t: 'Stripe portal redirect',         s: 'merged' },
      { v: 18, t: 'Dark mode for public boards',    s: 'planned' },
    ].map((r, i) => (
      <div key={i} className="rhw-pv-proj-row">
        <span className="rhw-pv-vote">▲ {r.v}</span>
        <span className="rhw-pv-proj-t">{r.t}</span>
        <span className={`rhw-pv-proj-s rhw-pv-proj-s-${r.s}`}>{r.s}</span>
      </div>
    ))}
  </div>
);

const PV_Dev = () => (
  <div className="rhw-pv-dev">
    <div className="rhw-pv-dev-row"><span className="rhw-pv-add">+</span> ./auth/portal.tsx</div>
    <div className="rhw-pv-dev-row rhw-pv-indent"><span className="rhw-pv-rem">−</span> withCredentials: false</div>
    <div className="rhw-pv-dev-row rhw-pv-indent"><span className="rhw-pv-add">+</span> withCredentials: true</div>
    <div className="rhw-pv-dev-foot">tests: <strong>23 passed</strong> · diff +8 −3</div>
  </div>
);

const PV_Widget = () => (
  <div className="rhw-pv-widget">
    <div className="rhw-pv-widget-msg">
      <Avatar name="Jen K." size={20} />
      <div>
        <div>Stripe portal redirect drops my session in Safari…</div>
        <div className="rhw-pv-widget-sub">/billing · Safari 17.4 · 1 console err</div>
      </div>
    </div>
    <div className="rhw-pv-widget-tag">↓ auto-attached</div>
    <div className="rhw-pv-widget-trace">Set-Cookie blocked: SameSite=Lax</div>
  </div>
);

type Product = {
  key: string;
  n: string;
  tag: string;
  name: string;
  pitch: string;
  blurb: string;
  highlights: string[];
  Visual: () => JSX.Element;
};

const PRODUCTS: Product[] = [
  {
    key: 'agent',
    n: '01',
    tag: '/auto',
    name: 'Agent automation',
    pitch: 'Capture user feedback, package the run-context, and dispatch to Claude Code, Cursor, Codex, or Devin — never lose a screenshot, repro, or stack trace again.',
    blurb: 'The orchestration layer.',
    highlights: [
      'Multi-agent dispatch with policy guardrails',
      'Context bundles: repro, logs, screenshots, prior runs',
      'Two-way sync with Linear, GitHub, Slack, Intercom',
      'Audit-grade provenance on every diff',
    ],
    Visual: PV_Auto,
  },
  {
    key: 'projects',
    n: '02',
    tag: '/projects',
    name: 'Project management',
    pitch: 'Tickets that know who their agent is, what context they ran with, and which diff they produced. The whole loop, one queue, no swivel-chair.',
    blurb: 'Where the work lives.',
    highlights: [
      'Provenance from feedback → ticket → run → diff',
      'Reviewer routing with codeowner-aware rules',
      'Bidirectional sync with Linear and GitHub Issues',
      'Per-project policies and rate caps',
    ],
    Visual: PV_Projects,
  },
  {
    key: 'runhq',
    n: '03',
    tag: '/dev',
    name: 'Dev environment',
    pitch: 'Spin up isolated, deterministic dev sandboxes in seconds — pre-warmed, scoped credentials, every run logged. The cleanroom your agents needed.',
    blurb: 'Where the agents work.',
    highlights: [
      'Deterministic Nix-based environments',
      'Per-run secrets with scoped lifetimes',
      'Streaming logs piped into the audit log',
      'BYO model + private runners on Business+',
    ],
    Visual: PV_Dev,
  },
  {
    key: 'widget',
    n: '04',
    tag: '/widget',
    name: 'Feedback widget',
    pitch: 'A few lines of script, every browser. Captures DOM state, console, network, video, and user identity — and routes it straight into the queue.',
    blurb: 'Where the loop starts.',
    highlights: [
      'Auto-captures DOM, console, network, session video',
      'PII-aware redaction with per-field controls',
      'Identity via Clerk, Auth0, Supabase, custom JWT',
      'Style-matches your brand in 30 seconds',
    ],
    Visual: PV_Widget,
  },
];

const LOOP_STEPS = [
  { i: '01', label: 'Capture',  source: 'Feedback widget',     desc: 'A real user hits a snag. The widget bundles repro, console, network, video — and a ticket is born.' },
  { i: '02', label: 'Route',    source: 'Project management',  desc: 'Tickets land in the queue with provenance, codeowner routing, and policy applied — ready for an agent.' },
  { i: '03', label: 'Run',      source: 'Agent automation · Dev environment', desc: 'Claude, Cursor, Codex, or Devin picks up the ticket inside a deterministic sandbox. Every keystroke logged.' },
  { i: '04', label: 'Review',   source: 'Project management',  desc: 'Diff lands back in the queue with run logs and provenance attached. A human merges, or sends it back.' },
];

export default function ProductsPage() {
  return (
    <div className="rhp-root rhpp-root">
      <style>{PRODUCTS_STYLES}</style>
      <Navbar active="products" />

      <section className="rhp-hero">
        <div className="rhp-hero-eyebrow">Products · The closed loop</div>
        <h1 className="rhp-hero-h1">One platform. Four surfaces. The whole loop.</h1>
        <p className="rhp-hero-lede">
          RunHQ captures the moment someone tells you something is broken, hands it to the right agent in a reproducible workspace, then routes the diff back to a reviewer. Four products. One queue. One audit log.
        </p>
        <div className="rhpp-hero-cta">
          <a className="rhp-btn-primary" href={SIGNUP_URL}>Start free →</a>
          <Link className="rhp-btn-ghost" to="/pricing">See pricing</Link>
        </div>
      </section>

      <section className="rhpp-grid">
        {PRODUCTS.map((p) => (
          <article key={p.key} className="rhpp-card">
            <div className="rhpp-card-top">
              <span className="rhpp-card-tag">{p.tag}</span>
              <span className="rhpp-card-num">{p.n} / 04</span>
            </div>
            <div className="rhpp-card-visual"><p.Visual /></div>
            <h3 className="rhpp-card-name">{p.name}</h3>
            <p className="rhpp-card-pitch">{p.pitch}</p>
            <ul className="rhpp-card-feats">
              {p.highlights.map((h) => (
                <li key={h}>
                  <span className="rhpp-card-tick">✓</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="rhpp-card-foot">
              <span className="rhpp-card-blurb">{p.blurb}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="rhpp-loop">
        <div className="rhpp-loop-h">
          <div className="rhpp-loop-eyebrow">How it fits together</div>
          <h2 className="rhpp-loop-title">The closed loop.</h2>
          <p className="rhpp-loop-sub">
            The four products are designed as one surface. Feedback enters at the widget, leaves at a merged PR — and every step in between is observable.
          </p>
        </div>
        <ol className="rhpp-loop-list">
          {LOOP_STEPS.map((s) => (
            <li key={s.i} className="rhpp-loop-step">
              <span className="rhpp-loop-num">{s.i}</span>
              <div>
                <div className="rhpp-loop-row">
                  <span className="rhpp-loop-label">{s.label}</span>
                  <span className="rhpp-loop-source">{s.source}</span>
                </div>
                <p className="rhpp-loop-desc">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="rhpp-cta">
        <h2 className="rhpp-cta-h">Run the whole loop on one queue.</h2>
        <p className="rhpp-cta-sub">Free for solo projects. 14-day Team trial. No card.</p>
        <div className="rhpp-cta-row">
          <a className="rhp-btn-primary" href={SIGNUP_URL}>Start free →</a>
          <Link className="rhp-btn-ghost" to="/pricing">See pricing</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const PRODUCTS_STYLES = `
  .rhp-root {
    background: var(--rhw-bg);
    color: var(--rhw-ink);
    font-family: 'Geist', 'Inter Tight', system-ui, sans-serif;
    font-size: 15px;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
  }
  .rhp-root *, .rhp-root *::before, .rhp-root *::after { box-sizing: border-box; }
  .rhp-root a { color: inherit; text-decoration: none; }

  .rhp-hero { padding: 80px 48px 36px; text-align: center; max-width: 1100px; margin: 0 auto; }
  .rhp-hero-eyebrow {
    display: inline-block;
    padding: 4px 11px;
    background: var(--rhw-bg-2);
    border: 1px solid var(--rhw-line);
    border-radius: 999px;
    font-size: 11.5px;
    color: var(--rhw-ink-soft);
    letter-spacing: 0.04em;
    margin-bottom: 22px;
  }
  .rhp-hero-h1 {
    font-size: 56px;
    line-height: 1.05;
    letter-spacing: -0.034em;
    font-weight: 600;
    margin: 0 0 18px;
    text-wrap: balance;
  }
  .rhp-hero-lede {
    font-size: 19px;
    line-height: 1.55;
    color: var(--rhw-ink-soft);
    max-width: 700px;
    margin: 0 auto;
    text-wrap: pretty;
  }
  .rhpp-hero-cta {
    display: flex; gap: 10px; justify-content: center;
    margin-top: 32px;
  }
  .rhp-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 11px 20px;
    background: var(--rhw-ink); color: #fff !important;
    border-radius: 9px;
    font-size: 14px; font-weight: 500;
    border: none; cursor: pointer;
    transition: background 0.15s;
  }
  .rhp-btn-primary:hover { background: var(--rhw-accent); }
  .rhp-btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 11px 18px;
    background: var(--rhw-surface);
    color: var(--rhw-ink) !important;
    border: 1px solid var(--rhw-line);
    border-radius: 9px;
    font-size: 14px; font-weight: 500;
    cursor: pointer;
    transition: border-color 0.15s;
  }
  .rhp-btn-ghost:hover { border-color: var(--rhw-ink); }

  .rhpp-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding: 40px 48px 28px;
    max-width: 1200px; margin: 0 auto;
  }
  .rhpp-card {
    position: relative;
    background: var(--rhw-surface);
    border: 1px solid var(--rhw-line);
    border-radius: 18px;
    padding: 28px 28px 24px;
    display: flex; flex-direction: column;
  }
  .rhpp-card-top {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 18px;
  }
  .rhpp-card-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11.5px;
    padding: 3px 9px;
    background: var(--rhw-bg-2);
    border-radius: 999px;
    color: var(--rhw-ink-soft);
  }
  .rhpp-card-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--rhw-ink-faint);
  }
  .rhpp-card-visual {
    background: var(--rhw-bg-2);
    border: 1px solid var(--rhw-line-soft);
    border-radius: 12px;
    padding: 20px;
    height: 200px;
    margin-bottom: 22px;
    overflow: hidden;
    position: relative;
  }
  .rhpp-card-name {
    font-size: 24px;
    font-weight: 600;
    letter-spacing: -0.025em;
    line-height: 1.2;
    margin: 0 0 10px;
    text-wrap: balance;
  }
  .rhpp-card-pitch {
    font-size: 14.5px;
    color: var(--rhw-ink-soft);
    margin: 0 0 18px;
    line-height: 1.55;
    text-wrap: pretty;
  }
  .rhpp-card-feats {
    list-style: none;
    margin: 0 0 22px;
    padding: 14px 0 0;
    border-top: 1px solid var(--rhw-line-soft);
    display: grid;
    gap: 7px;
  }
  .rhpp-card-feats li {
    display: grid;
    grid-template-columns: 16px 1fr;
    gap: 9px;
    font-size: 13.5px;
    color: var(--rhw-ink-soft);
    align-items: start;
  }
  .rhpp-card-tick {
    font-size: 13px;
    line-height: 1.55;
    font-weight: 600;
    color: var(--rhw-accent);
  }
  .rhpp-card-foot {
    margin-top: auto;
    padding-top: 18px;
    border-top: 1px dashed var(--rhw-line);
    display: flex; align-items: center; justify-content: space-between;
    gap: 12px;
  }
  .rhpp-card-blurb {
    font-size: 12.5px;
    color: var(--rhw-ink-mute);
    font-style: italic;
  }

  /* Product visuals (mockups inside .rhpp-card-visual) */
  .rhw-pv-auto { font-family: 'JetBrains Mono', monospace; font-size: 12px; line-height: 1.85; color: var(--rhw-ink); }
  .rhw-pv-key { color: var(--rhw-accent); font-weight: 500; }
  .rhw-pv-prop { color: var(--rhw-ink-mute); }
  .rhw-pv-indent { padding-left: 18px; }

  .rhw-pv-proj { display: flex; flex-direction: column; gap: 8px; }
  .rhw-pv-proj-row {
    display: grid; grid-template-columns: 50px 1fr auto;
    gap: 10px; align-items: center;
    background: var(--rhw-surface);
    border: 1px solid var(--rhw-line-soft);
    border-radius: 8px;
    padding: 8px 12px;
  }
  .rhw-pv-vote { color: var(--rhw-accent); font-size: 11px; font-weight: 500; }
  .rhw-pv-proj-t { font-size: 12.5px; }
  .rhw-pv-proj-s { font-size: 10.5px; padding: 2px 8px; border-radius: 999px; }
  .rhw-pv-proj-s-shipping { background: oklch(0.78 0.18 290 / 0.18); color: oklch(0.42 0.20 290); }
  .rhw-pv-proj-s-merged { background: oklch(0.85 0.16 145 / 0.22); color: oklch(0.38 0.16 145); }
  .rhw-pv-proj-s-planned { background: var(--rhw-bg-2); color: var(--rhw-ink-mute); }

  .rhw-pv-dev { font-family: 'JetBrains Mono', monospace; font-size: 12px; line-height: 1.7; }
  .rhw-pv-dev-row { color: var(--rhw-ink); }
  .rhw-pv-add { color: var(--rhw-good); font-weight: 700; }
  .rhw-pv-rem { color: var(--rhw-bad); font-weight: 700; }
  .rhw-pv-dev-foot { color: var(--rhw-ink-mute); margin-top: 12px; padding-top: 10px; border-top: 1px solid var(--rhw-line-soft); font-size: 11px; }
  .rhw-pv-dev-foot strong { color: var(--rhw-good); font-weight: 500; }

  .rhw-pv-widget { display: flex; flex-direction: column; }
  .rhw-pv-widget-msg {
    background: var(--rhw-surface);
    border: 1px solid var(--rhw-line-soft);
    border-radius: 8px;
    padding: 10px 12px;
    display: flex; gap: 10px; align-items: flex-start;
    font-size: 12.5px; color: var(--rhw-ink);
    line-height: 1.4;
  }
  .rhw-pv-widget-sub { font-size: 10.5px; color: var(--rhw-ink-mute); margin-top: 4px; font-family: 'JetBrains Mono', monospace; }
  .rhw-pv-widget-tag { font-size: 10.5px; color: var(--rhw-accent); margin: 8px 4px; letter-spacing: 0.04em; }
  .rhw-pv-widget-trace {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    background: var(--rhw-ink);
    color: #f3c98a;
    padding: 8px 12px;
    border-radius: 6px;
  }

  .rhpp-loop {
    max-width: 1200px;
    margin: 0 auto;
    padding: 56px 48px;
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 56px;
    align-items: start;
  }
  .rhpp-loop-eyebrow {
    font-size: 11.5px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--rhw-ink-mute);
    margin-bottom: 14px;
  }
  .rhpp-loop-title {
    font-size: 38px;
    font-weight: 600;
    letter-spacing: -0.028em;
    line-height: 1.05;
    margin: 0 0 14px;
    text-wrap: balance;
  }
  .rhpp-loop-sub {
    font-size: 15.5px;
    color: var(--rhw-ink-soft);
    line-height: 1.6;
    text-wrap: pretty;
    margin: 0;
  }
  .rhpp-loop-list {
    list-style: none;
    margin: 0; padding: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .rhpp-loop-step {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 18px;
    padding: 18px 0;
    border-bottom: 1px solid var(--rhw-line-soft);
  }
  .rhpp-loop-step:last-child { border-bottom: 0; }
  .rhpp-loop-num {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 12px;
    color: var(--rhw-ink-mute);
    letter-spacing: 0.06em;
    padding-top: 3px;
  }
  .rhpp-loop-row {
    display: flex; align-items: baseline; gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 4px;
  }
  .rhpp-loop-label {
    font-size: 17px;
    font-weight: 600;
    letter-spacing: -0.018em;
    color: var(--rhw-ink);
  }
  .rhpp-loop-source {
    font-size: 11.5px;
    color: var(--rhw-ink-mute);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .rhpp-loop-desc {
    font-size: 14px;
    color: var(--rhw-ink-soft);
    line-height: 1.55;
    margin: 0;
    text-wrap: pretty;
  }

  .rhpp-cta {
    text-align: center;
    padding: 56px 48px 96px;
    max-width: 880px;
    margin: 0 auto;
  }
  .rhpp-cta-h {
    font-size: 36px;
    font-weight: 600;
    letter-spacing: -0.028em;
    line-height: 1.1;
    margin: 0 0 12px;
    text-wrap: balance;
  }
  .rhpp-cta-sub {
    font-size: 14.5px;
    color: var(--rhw-ink-mute);
    margin: 0 0 24px;
  }
  .rhpp-cta-row {
    display: flex; gap: 10px; justify-content: center;
  }

  @media (max-width: 920px) {
    .rhpp-grid { grid-template-columns: 1fr; padding: 28px 24px 20px; }
    .rhpp-loop { grid-template-columns: 1fr; gap: 28px; padding: 40px 24px; }
    .rhpp-loop-title { font-size: 30px; }
    .rhp-hero { padding: 56px 24px 24px; }
    .rhp-hero-h1 { font-size: 36px; }
    .rhp-hero-lede { font-size: 16px; }
    .rhpp-cta { padding: 40px 24px 64px; }
    .rhpp-cta-h { font-size: 26px; }
  }
`;
