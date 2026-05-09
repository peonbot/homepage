
const SIGNUP_URL = 'https://app.runhq.io/signup';

export default function RunHQPage() {
  return (
    <div className="rh-runhq">
      <style>{RUNHQ_STYLES}</style>

      {/* Hero */}
      <section className="rq-hero">
        <div className="rq-hero-inner">
          <div className="rq-eyebrow mono">RUNHQ · DEV ENVIRONMENT</div>
          <h1 className="rq-hero-title">
            The dev environment <em>built for AI agents.</em>
          </h1>
          <p className="rq-hero-sub">
            Pick your agent. Hand it a ticket with full context. Ship from user feedback in hours, not sprints.
          </p>
          <div className="rq-hero-actions">
            <a className="rq-cta-primary" href={SIGNUP_URL}>Get started</a>
            <a className="rq-cta-ghost" href="/agent-automation">Try the demo</a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="rq-section" id="how-it-works">
        <div className="rq-section-head">
          <div className="rq-eyebrow mono">WORKFLOW</div>
          <h2 className="rq-section-title">
            Pick the agent. <em>We package the rest.</em>
          </h2>
        </div>

        <div className="rq-steps">
          <div className="rq-step">
            <div className="rq-step-num mono">01</div>
            <div className="rq-step-body">
              <h3 className="rq-step-title">Capture</h3>
              <p className="rq-step-text">
                Bug reports, feature requests, NPS, in-app signals — pulled from Linear, Intercom, Slack, your widget, your inbox. RunHQ structures them into work an agent can act on.
              </p>
            </div>
          </div>

          <div className="rq-step">
            <div className="rq-step-num mono">02</div>
            <div className="rq-step-body">
              <h3 className="rq-step-title">Route</h3>
              <p className="rq-step-text">
                Choose your coding agent — Claude Code, Cursor, Codex, Devin. RunHQ packages the context — repo state, related issues, prior PRs, user thread — and opens a branch.
              </p>
            </div>
          </div>

          <div className="rq-step">
            <div className="rq-step-num mono">03</div>
            <div className="rq-step-body">
              <h3 className="rq-step-title">Review</h3>
              <p className="rq-step-text">
                Every change lands as a PR with full provenance. Approve, request edits, or roll back. The loop only closes when you say so.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="rq-stats">
        <div className="rq-stat">
          <div className="rq-stat-val">&lt;1<span className="rq-stat-unit">h</span></div>
          <div className="rq-stat-label mono">Feedback to first PR</div>
        </div>
        <div className="rq-stat">
          <div className="rq-stat-val">100<span className="rq-stat-unit">%</span></div>
          <div className="rq-stat-label mono">Human-reviewed merges</div>
        </div>
        <div className="rq-stat">
          <div className="rq-stat-val">4</div>
          <div className="rq-stat-label mono">Coding agents supported (today)</div>
        </div>
        <div className="rq-stat">
          <div className="rq-stat-val">0</div>
          <div className="rq-stat-label mono">Untracked agent runs</div>
        </div>
      </div>

      {/* What you stop doing */}
      <section className="rq-section" id="what-you-get">
        <div className="rq-section-head">
          <h2 className="rq-section-title">What you <em>stop doing.</em></h2>
        </div>

        <div className="rq-grid-3">
          <div className="rq-card">
            <div className="rq-card-num mono">01 / TRANSLATE</div>
            <h3 className="rq-card-title">Translating tickets</h3>
            <p className="rq-card-body">
              No more rewriting Intercom threads into Linear stories. RunHQ does the structuring.
            </p>
          </div>

          <div className="rq-card">
            <div className="rq-card-num mono">02 / OBSERVE</div>
            <h3 className="rq-card-title">Babysitting agents</h3>
            <p className="rq-card-body">
              Every agent run logs context, prompts, diffs, and outcomes. No black-box runs.
            </p>
          </div>

          <div className="rq-card">
            <div className="rq-card-num mono">03 / REVIEW</div>
            <h3 className="rq-card-title">Reviewing in five tools</h3>
            <p className="rq-card-body">
              One queue. One review surface. Approve from Slack, browser, or CLI.
            </p>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="rq-cta-band">
        <h2 className="rq-cta-title">
          Stop translating feedback by hand. <em>Start shipping it.</em>
        </h2>
        <div className="rq-cta-actions">
          <a className="rq-cta-primary" href={SIGNUP_URL}>Get started</a>
          <a className="rq-cta-ghost" href="/agent-automation">Try the demo</a>
        </div>
      </section>
    </div>
  );
}

const RUNHQ_STYLES = `
  .rh-runhq {
    background: var(--bg-deep);
    color: var(--ink);
    font-family: 'Inter Tight', system-ui, sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }
  .rh-runhq *, .rh-runhq *::before, .rh-runhq *::after { box-sizing: border-box; }

  /* Shared eyebrow */
  .rq-eyebrow {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: var(--accent);
    margin-bottom: 14px;
  }

  /* Hero */
  .rq-hero {
    padding: 140px 32px 100px;
    background:
      radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.86 0.19 180 / 0.07) 0%, transparent 70%),
      var(--bg-deep);
    border-bottom: 1px solid var(--line);
  }
  .rq-hero-inner {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }
  .rq-hero-title {
    font-size: clamp(36px, 5.5vw, 72px);
    line-height: 1.04;
    letter-spacing: -0.03em;
    font-weight: 500;
    margin: 0 0 24px;
    text-wrap: balance;
    color: var(--ink);
  }
  .rq-hero-title em {
    font-style: normal;
    background: linear-gradient(100deg,
      oklch(0.96 0.14 180) 0%,
      oklch(0.88 0.22 160) 60%,
      oklch(0.85 0.22 130) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .rq-hero-sub {
    font-size: clamp(16px, 2vw, 20px);
    line-height: 1.55;
    color: var(--ink-dim);
    max-width: 600px;
    margin: 0 auto 40px;
    text-wrap: balance;
  }
  .rq-hero-actions {
    display: inline-flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }

  /* Section */
  .rq-section {
    padding: 100px 32px 80px;
    max-width: 1180px;
    margin: 0 auto;
  }
  .rq-section-head {
    text-align: center;
    margin-bottom: 56px;
  }
  .rq-section-title {
    font-size: clamp(28px, 4vw, 52px);
    line-height: 1.07;
    letter-spacing: -0.025em;
    font-weight: 500;
    margin: 0 auto;
    max-width: 720px;
    text-wrap: balance;
    color: var(--ink);
  }
  .rq-section-title em {
    font-style: normal;
    background: linear-gradient(100deg,
      oklch(0.96 0.14 180) 0%,
      oklch(0.88 0.22 160) 60%,
      oklch(0.85 0.22 130) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  /* Steps */
  .rq-steps {
    display: flex;
    flex-direction: column;
    gap: 0;
    max-width: 800px;
    margin: 0 auto;
  }
  .rq-step {
    display: grid;
    grid-template-columns: 72px 1fr;
    gap: 24px;
    padding: 40px 0;
    border-bottom: 1px solid var(--line);
  }
  .rq-step:first-child {
    border-top: 1px solid var(--line);
  }
  .rq-step-num {
    font-size: 13px;
    color: var(--accent);
    letter-spacing: 0.1em;
    padding-top: 4px;
  }
  .rq-step-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .rq-step-title {
    font-size: 22px;
    font-weight: 500;
    letter-spacing: -0.01em;
    margin: 0;
    color: var(--ink);
  }
  .rq-step-text {
    font-size: 16px;
    line-height: 1.6;
    color: var(--ink-dim);
    margin: 0;
    max-width: 620px;
  }

  /* Stats band */
  .rq-stats {
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    max-width: 1180px;
    margin: 0 auto;
  }
  .rq-stat {
    padding: 44px 28px;
    border-right: 1px solid var(--line);
  }
  .rq-stat:last-child { border-right: none; }
  .rq-stat-val {
    font-size: 56px;
    line-height: 1;
    letter-spacing: -0.025em;
    font-weight: 500;
    margin-bottom: 12px;
    color: var(--ink);
  }
  .rq-stat-unit { font-size: 22px; color: var(--ink-mute); margin-left: 2px; }
  .rq-stat-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--ink-mute);
  }

  /* 3-col card grid */
  .rq-grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .rq-card {
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
  .rq-card:hover { border-color: var(--line-bold); transform: translateY(-2px); }
  .rq-card-num {
    font-size: 11px;
    color: var(--ink-mute);
    letter-spacing: 0.12em;
  }
  .rq-card-title {
    font-size: 22px;
    line-height: 1.2;
    letter-spacing: -0.01em;
    margin: 0;
    font-weight: 500;
    color: var(--ink);
  }
  .rq-card-body {
    font-size: 15px;
    line-height: 1.55;
    color: var(--ink-dim);
    margin: 0;
  }

  /* CTA band */
  .rq-cta-band {
    padding: 100px 32px;
    max-width: 1180px;
    margin: 0 auto;
    text-align: center;
  }
  .rq-cta-title {
    font-size: clamp(28px, 3.8vw, 48px);
    line-height: 1.1;
    letter-spacing: -0.02em;
    font-weight: 500;
    margin: 0 0 32px;
    text-wrap: balance;
    color: var(--ink);
  }
  .rq-cta-title em {
    font-style: normal;
    background: linear-gradient(100deg,
      oklch(0.96 0.14 180) 0%,
      oklch(0.88 0.22 160) 60%,
      oklch(0.85 0.22 130) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .rq-cta-actions {
    display: inline-flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }

  /* Shared buttons */
  .rq-cta-primary {
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
      inset 0 1px 0 rgba(255, 255, 255, 0.30);
    transition: transform 0.18s;
  }
  .rq-cta-primary:hover { transform: translateY(-1px); }
  .rq-cta-ghost {
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
  .rq-cta-ghost:hover { border-color: var(--accent); color: var(--accent); }

  /* Responsive */
  @media (max-width: 880px) {
    .rq-hero { padding: 100px 22px 72px; }
    .rq-section { padding: 72px 22px 56px; }
    .rq-step { grid-template-columns: 48px 1fr; gap: 16px; }
    .rq-stats { grid-template-columns: repeat(2, 1fr); }
    .rq-stat:nth-child(2) { border-right: none; }
    .rq-stat:nth-child(1),
    .rq-stat:nth-child(2) { border-bottom: 1px solid var(--line); }
    .rq-grid-3 { grid-template-columns: 1fr; }
    .rq-cta-band { padding: 72px 22px; }
    .rq-cta-actions { flex-direction: column; align-items: stretch; }
    .rq-cta-primary,
    .rq-cta-ghost { text-align: center; }
  }
`;
