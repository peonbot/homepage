import { Navbar, Footer } from '../components/chrome';

const SIGNUP_URL = 'https://app.runhq.io/signup';

export default function WidgetPage() {
  return (
    <div className="rh-widget">
      <style>{WIDGET_STYLES}</style>
      <Navbar />

      {/* Hero */}
      <section className="rw-hero">
        <div className="rw-hero-inner">
          <div className="rh-eyebrow">RUNHQ · WIDGET</div>
          <h1 className="rw-hero-title">
            Two lines of code.{' '}
            <em>The whole feedback loop.</em>
          </h1>
          <p className="rw-hero-sub">
            Drop the widget on any page. Capture context automatically. Hand it to an agent. Review the PR. That&rsquo;s it.
          </p>
          <div className="rw-hero-actions">
            <a className="rh-cta-primary" href={SIGNUP_URL}>Get started</a>
            <a className="rh-cta-ghost" href="/agent-automation">See it live</a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="rh-section" id="features">
        <div className="rh-section-head">
          <div className="rh-eyebrow">What gets captured</div>
          <h2 className="rh-section-title">
            Everything the widget <em>catches.</em>
          </h2>
        </div>
        <div className="rh-grid-3">
          <div className="rh-card">
            <div className="rh-card-num mono">01 / ENV</div>
            <h3 className="rh-card-title">Page + browser + console</h3>
            <p className="rh-card-body">
              URL, viewport, browser, OS, time, locale — captured on every submit. No more &ldquo;what page were you on?&rdquo;
            </p>
          </div>
          <div className="rh-card">
            <div className="rh-card-num mono">02 / TRACE</div>
            <h3 className="rh-card-title">Errors + network</h3>
            <p className="rh-card-body">
              JS errors, recent console logs, failing network calls — attached as a structured trace your agent can read.
            </p>
          </div>
          <div className="rh-card">
            <div className="rh-card-num mono">03 / USER</div>
            <h3 className="rh-card-title">User session context</h3>
            <p className="rh-card-body">
              If you&rsquo;ve called <span className="mono">RunHQ.identify()</span>, the user&rsquo;s recent activity is bundled too. Reproduction steps, free.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="rh-section rw-flow-section" id="how-it-works">
        <div className="rh-section-head">
          <div className="rh-eyebrow">End to end</div>
          <h2 className="rh-section-title">
            From feedback to PR. <em>Fully tracked.</em>
          </h2>
        </div>
        <div className="rw-flow">
          <div className="rw-step">
            <div className="rh-card-num mono">01</div>
            <p className="rw-step-label">User submits feedback</p>
          </div>
          <span className="rw-arrow" aria-hidden="true">&rarr;</span>
          <div className="rw-step">
            <div className="rh-card-num mono">02</div>
            <p className="rw-step-label">Context auto-captured</p>
          </div>
          <span className="rw-arrow" aria-hidden="true">&rarr;</span>
          <div className="rw-step">
            <div className="rh-card-num mono">03</div>
            <p className="rw-step-label">Agent picks it up</p>
          </div>
          <span className="rw-arrow" aria-hidden="true">&rarr;</span>
          <div className="rw-step rw-step-accent">
            <div className="rh-card-num mono">04</div>
            <p className="rw-step-label">PR opens for review</p>
          </div>
        </div>
      </section>

      {/* Code example */}
      <section className="rh-section" id="install">
        <div className="rw-code-wrap">
          <div className="rh-section-head">
            <div className="rh-eyebrow">Install</div>
            <h2 className="rh-section-title">
              Get live in <em>under 60 seconds.</em>
            </h2>
            <p className="rw-code-sub">
              Paste two lines into your <span className="mono">&lt;head&gt;</span>. That&rsquo;s the install.
            </p>
          </div>
          <div className="rw-code-block">
            <div className="rw-code-chrome">
              <div className="rw-code-dots"><span /><span /><span /></div>
              <span className="rw-code-lang mono">html</span>
            </div>
            <pre className="rw-code-pre mono">
              <span className="rw-tok-tag">&lt;script </span>
              <span className="rw-tok-attr">src</span>
              <span className="rw-tok-eq">=</span>
              <span className="rw-tok-str">&quot;https://widget.runhq.io/v1.js&quot;</span>
              <span className="rw-tok-tag">&gt;&lt;/script&gt;</span>
              {'\n'}
              <span className="rw-tok-tag">&lt;script&gt;</span>
              <span className="rw-tok-plain">RunHQ.</span>
              <span className="rw-tok-attr">init</span>
              <span className="rw-tok-plain">{'({ '}</span>
              <span className="rw-tok-attr">project</span>
              <span className="rw-tok-plain">{': '}</span>
              <span className="rw-tok-str">&quot;your-project-id&quot;</span>
              <span className="rw-tok-plain">{' })'}</span>
              <span className="rw-tok-tag">&lt;/script&gt;</span>
            </pre>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="rh-cta-band">
        <h2 className="rh-cta-title">
          Stop losing feedback in spreadsheets. <em>Start shipping it.</em>
        </h2>
        <div className="rh-cta-actions">
          <a className="rh-cta-primary" href={SIGNUP_URL}>Get started</a>
          <a className="rh-cta-ghost" href="/agent-automation">See it live</a>
        </div>
      </section>
      <Footer />
    </div>
  );
}

const WIDGET_STYLES = `
  .rh-widget {
    background: var(--bg-deep);
    color: var(--ink);
    font-family: 'Inter Tight', system-ui, sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
  }
  .rh-widget *, .rh-widget *::before, .rh-widget *::after { box-sizing: border-box; }

  /* ── Shared typography primitives ─────────────────── */
  .rh-widget .mono { font-family: 'JetBrains Mono', monospace; }

  .rh-widget .rh-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: var(--accent);
    margin-bottom: 14px;
  }

  .rh-widget .rh-section-title {
    font-size: clamp(32px, 4.4vw, 56px);
    line-height: 1.05;
    letter-spacing: -0.025em;
    font-weight: 500;
    margin: 0 auto;
    max-width: 720px;
    text-wrap: balance;
    color: var(--ink);
  }
  .rh-widget .rh-section-title em {
    font-style: normal;
    background: linear-gradient(100deg,
      oklch(0.96 0.14 180) 0%,
      oklch(0.88 0.22 160) 60%,
      oklch(0.85 0.22 130) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  /* ── Layout ────────────────────────────────────────── */
  .rh-widget .rh-section {
    padding: 120px 32px 80px;
    max-width: 1180px;
    margin: 0 auto;
  }
  .rh-widget .rh-section-head {
    text-align: center;
    margin-bottom: 56px;
  }

  /* ── Hero ──────────────────────────────────────────── */
  .rw-hero {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100svh;
    padding: 80px 32px;
    text-align: center;
  }
  .rw-hero-inner {
    max-width: 760px;
    width: 100%;
  }
  .rw-hero-title {
    font-size: clamp(40px, 6vw, 72px);
    line-height: 1.05;
    letter-spacing: -0.03em;
    font-weight: 500;
    color: var(--ink);
    margin: 0 0 24px;
    text-wrap: balance;
  }
  .rw-hero-title em {
    font-style: normal;
    background: linear-gradient(100deg,
      oklch(0.96 0.14 180) 0%,
      oklch(0.88 0.22 160) 60%,
      oklch(0.85 0.22 130) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .rw-hero-sub {
    font-size: 18px;
    line-height: 1.55;
    color: var(--ink-dim);
    max-width: 540px;
    margin: 0 auto 36px;
  }
  .rw-hero-actions {
    display: inline-flex;
    gap: 12px;
  }

  /* ── Cards ─────────────────────────────────────────── */
  .rh-widget .rh-grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .rh-widget .rh-card {
    background: rgba(14, 17, 22, 0.6);
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 28px 24px 26px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    backdrop-filter: blur(8px);
    transition: border-color 0.2s, transform 0.2s;
  }
  .rh-widget .rh-card:hover {
    border-color: var(--line-bold);
    transform: translateY(-2px);
  }
  .rh-widget .rh-card-num {
    font-size: 11px;
    color: var(--ink-mute);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .rh-widget .rh-card-title {
    font-size: 22px;
    line-height: 1.2;
    letter-spacing: -0.01em;
    margin: 0;
    font-weight: 500;
    color: var(--ink);
  }
  .rh-widget .rh-card-body {
    font-size: 15px;
    line-height: 1.55;
    color: var(--ink-dim);
    margin: 0;
  }

  /* ── 4-step flow ───────────────────────────────────── */
  .rw-flow-section {}
  .rw-flow {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    flex-wrap: nowrap;
  }
  .rw-step {
    background: rgba(14, 17, 22, 0.6);
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 24px 20px;
    text-align: center;
    flex: 1;
    max-width: 200px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    backdrop-filter: blur(8px);
    transition: border-color 0.2s, transform 0.2s;
  }
  .rw-step:hover {
    border-color: var(--line-bold);
    transform: translateY(-2px);
  }
  .rw-step-accent {
    border-color: rgba(var(--accent), 0.25);
    border-color: oklch(0.86 0.19 180 / 0.25);
  }
  .rw-step-label {
    font-size: 14px;
    line-height: 1.35;
    font-weight: 500;
    color: var(--ink);
    margin: 0;
  }
  .rw-arrow {
    font-size: 18px;
    color: var(--ink-faint);
    padding: 0 12px;
    flex-shrink: 0;
    user-select: none;
  }

  /* ── Code block ────────────────────────────────────── */
  .rw-code-wrap {
    max-width: 720px;
    margin: 0 auto;
  }
  .rw-code-sub {
    font-size: 16px;
    line-height: 1.5;
    color: var(--ink-dim);
    margin: 16px auto 0;
    max-width: 480px;
  }
  .rw-code-block {
    margin-top: 40px;
    background: var(--bg-deep);
    border: 1px solid var(--line);
    border-radius: 14px;
    overflow: hidden;
  }
  .rw-code-chrome {
    height: 36px;
    background: var(--bg);
    border-bottom: 1px solid var(--line);
    display: flex;
    align-items: center;
    padding: 0 14px;
    gap: 10px;
  }
  .rw-code-dots {
    display: flex;
    gap: 6px;
  }
  .rw-code-dots span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);
  }
  .rw-code-lang {
    font-size: 11px;
    color: var(--ink-faint);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-left: auto;
  }
  .rw-code-pre {
    margin: 0;
    padding: 24px 28px;
    font-size: 14px;
    line-height: 1.7;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-all;
  }
  .rw-tok-tag   { color: oklch(0.86 0.19 180 / 0.85); }
  .rw-tok-attr  { color: oklch(0.82 0.21 145 / 0.9); }
  .rw-tok-eq    { color: var(--ink-mute); }
  .rw-tok-str   { color: oklch(0.82 0.18 70 / 0.9); }
  .rw-tok-plain { color: var(--ink-dim); }

  /* ── CTAs ──────────────────────────────────────────── */
  .rh-widget .rh-cta-band {
    padding: 100px 32px;
    max-width: 1180px;
    margin: 0 auto;
    text-align: center;
  }
  .rh-widget .rh-cta-title {
    font-size: clamp(30px, 3.8vw, 48px);
    line-height: 1.1;
    letter-spacing: -0.02em;
    font-weight: 500;
    margin: 0 0 32px;
    text-wrap: balance;
    color: var(--ink);
  }
  .rh-widget .rh-cta-title em {
    font-style: normal;
    background: linear-gradient(100deg,
      oklch(0.96 0.14 180) 0%,
      oklch(0.88 0.22 160) 60%,
      oklch(0.85 0.22 130) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .rh-widget .rh-cta-actions { display: inline-flex; gap: 12px; }

  .rh-widget .rh-cta-primary {
    padding: 14px 24px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    color: #061014;
    text-decoration: none;
    background: linear-gradient(180deg, oklch(0.93 0.17 180), oklch(0.78 0.2 180));
    border: 1px solid oklch(0.86 0.18 180);
    box-shadow:
      0 0 0 1px oklch(0.86 0.19 180 / 0.25),
      0 12px 44px -10px oklch(0.86 0.19 180 / 0.5),
      inset 0 1px 0 rgba(255,255,255,0.30);
    transition: transform 0.18s;
  }
  .rh-widget .rh-cta-primary:hover { transform: translateY(-1px); }

  .rh-widget .rh-cta-ghost {
    padding: 14px 22px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    color: var(--ink);
    text-decoration: none;
    background: rgba(14, 17, 22, 0.55);
    border: 1px solid var(--line-bold);
    transition: border-color 0.18s, color 0.18s;
  }
  .rh-widget .rh-cta-ghost:hover { border-color: var(--accent); color: var(--accent); }

  /* ── Responsive ────────────────────────────────────── */
  @media (max-width: 880px) {
    .rw-hero { padding: 80px 22px; }
    .rw-hero-actions { flex-direction: column; width: 100%; max-width: 280px; }
    .rw-hero-actions .rh-cta-primary,
    .rw-hero-actions .rh-cta-ghost { text-align: center; }

    .rh-widget .rh-section { padding: 80px 22px 60px; }
    .rh-widget .rh-grid-3 { grid-template-columns: 1fr; }

    .rw-flow {
      flex-direction: column;
      align-items: stretch;
      max-width: 280px;
      margin: 0 auto;
      gap: 0;
    }
    .rw-step { max-width: none; }
    .rw-arrow {
      font-size: 18px;
      padding: 10px 0;
      text-align: center;
      display: block;
    }
    .rw-arrow::before { content: '↓'; }
    .rw-arrow { font-size: 0; }
    .rw-arrow::before { font-size: 18px; }

    .rh-widget .rh-cta-actions { flex-direction: column; }

    .rw-code-pre { font-size: 12px; padding: 18px 16px; }
  }
`;
