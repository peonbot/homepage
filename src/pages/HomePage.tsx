import Hero, { type HeroVariant } from '../components/Hero';

const SIGNUP_URL = 'https://app.runhq.io/signup';
const LOGIN_URL = 'https://app.runhq.io';

export default function HomePage({ heroVariant = 'default' }: { heroVariant?: HeroVariant } = {}) {
  return (
    <div className="rh-home">
      <style>{HOME_STYLES}</style>

      <Hero variant={heroVariant} />

      {/* DEMO VIDEO */}
      <section className="rh-section" id="demo">
        <div className="rh-section-head">
          <div className="rh-eyebrow">Watch · 90 seconds</div>
          <h2 className="rh-section-title">
            Watch user feedback <em>become a shipped PR.</em>
          </h2>
        </div>
        <div className="rh-video">
          <div className="rh-video-chrome">
            <div className="rh-video-dots"><span /><span /><span /></div>
            <div className="rh-video-title mono">runhq.io / demo · feedback-loop.flow</div>
          </div>
          <div className="rh-video-surface">
            <video className="rh-video-el" autoPlay loop muted playsInline src="/images/demo.mp4" />
          </div>
        </div>
        <div className="rh-video-captions">
          <div><span className="rh-num">01</span>A user reports a bug or asks for a feature.</div>
          <div><span className="rh-num">02</span>RunHQ routes it to your coding agent with full context.</div>
          <div><span className="rh-num">03</span>You review, merge, ship — the loop closes.</div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="rh-section" id="products">
        <div className="rh-section-head rh-head-2col">
          <div>
            <div className="rh-eyebrow">How the loop works</div>
            <h2 className="rh-section-title">
              Organize agent work. <em>Stay in the loop.</em>
            </h2>
          </div>
          <p className="rh-lede">
            RunHQ captures user signals, routes them to your coding agents with full context, and gives you one place to review every change before it ships.
          </p>
        </div>

        <div className="rh-grid-3">
          <div className="rh-card">
            <div className="rh-card-num mono">01 / CAPTURE</div>
            <div className="rh-card-glyph">
              <svg viewBox="0 0 200 120" width="100%" height="100%">
                <g stroke="currentColor" strokeWidth="1" fill="none" opacity="0.18">
                  <line x1="10" y1="20" x2="190" y2="20" />
                  <line x1="10" y1="50" x2="190" y2="50" />
                  <line x1="10" y1="80" x2="190" y2="80" />
                  <line x1="10" y1="110" x2="190" y2="110" />
                </g>
                <rect x="20" y="26" width="40" height="18" fill="var(--ink)" opacity="0.18" />
                <rect x="64" y="26" width="24" height="18" fill="var(--ink)" opacity="0.10" />
                <rect x="92" y="26" width="88" height="18" fill="var(--accent)" opacity="0.85" />
                <rect x="20" y="56" width="60" height="18" fill="var(--ink)" opacity="0.10" />
                <rect x="84" y="56" width="28" height="18" fill="var(--ink)" opacity="0.20" />
                <rect x="116" y="56" width="40" height="18" fill="var(--ink)" opacity="0.10" />
                <rect x="20" y="86" width="36" height="18" fill="var(--ink)" opacity="0.18" />
                <rect x="60" y="86" width="72" height="18" fill="var(--accent)" opacity="0.4" />
                <rect x="136" y="86" width="24" height="18" fill="var(--ink)" opacity="0.10" />
              </svg>
            </div>
            <h3 className="rh-card-title">Catch every signal.</h3>
            <p className="rh-card-body">
              Bug reports, feature asks, in-app feedback — pulled from Linear, Intercom, Slack, your widget — turned into structured work an agent can act on.
            </p>
          </div>

          <div className="rh-card">
            <div className="rh-card-num mono">02 / ROUTE</div>
            <div className="rh-card-glyph">
              <svg viewBox="0 0 200 120" width="100%" height="100%">
                <g stroke="currentColor" strokeWidth="1" opacity="0.18">
                  <line x1="10" y1="90" x2="190" y2="90" />
                  <line x1="10" y1="60" x2="190" y2="60" strokeDasharray="2 4" />
                  <line x1="10" y1="30" x2="190" y2="30" strokeDasharray="2 4" />
                </g>
                <g>
                  <circle cx="30" cy="60" r="7" fill="var(--ink)" opacity="0.7" />
                  <circle cx="80" cy="35" r="7" fill="var(--ink)" opacity="0.4" />
                  <circle cx="80" cy="85" r="7" fill="var(--ink)" opacity="0.4" />
                  <circle cx="130" cy="60" r="7" fill="var(--accent)" />
                  <circle cx="180" cy="60" r="7" fill="var(--ink)" opacity="0.55" />
                  <g stroke="var(--ink)" strokeWidth="1" opacity="0.3" fill="none">
                    <path d="M37 60 Q 60 40 73 37" />
                    <path d="M37 60 Q 60 80 73 82" />
                    <path d="M87 35 Q 110 48 123 58" />
                    <path d="M87 85 Q 110 72 123 62" />
                    <path d="M137 60 L 173 60" />
                  </g>
                </g>
              </svg>
            </div>
            <h3 className="rh-card-title">Hand it to the right agent.</h3>
            <p className="rh-card-body">
              RunHQ packages the context, picks the agent — Claude Code, Cursor, Codex — and opens a PR. No copy-paste. No lost intent.
            </p>
          </div>

          <div className="rh-card">
            <div className="rh-card-num mono">03 / OVERSEE</div>
            <div className="rh-card-glyph">
              <svg viewBox="0 0 200 120" width="100%" height="100%">
                <g stroke="currentColor" strokeWidth="1" opacity="0.18">
                  <line x1="10" y1="100" x2="190" y2="100" />
                </g>
                <path d="M10 30 C 40 28 60 45 90 55 S 140 85 190 92"
                      stroke="var(--ink)" strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="3 3" />
                <path d="M10 30 C 40 40 70 70 110 82 S 160 96 190 96"
                      stroke="var(--accent)" strokeWidth="2" fill="none" />
                <text x="12" y="22" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="var(--ink-mute)">cycle</text>
                <text x="150" y="22" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="var(--accent)">closed</text>
                <circle cx="190" cy="96" r="3" fill="var(--accent)" />
              </svg>
            </div>
            <h3 className="rh-card-title">You ship. We log.</h3>
            <p className="rh-card-body">
              Every change lands as a PR with full provenance — feedback → context → agent → diff. Approve, request changes, or roll back. The loop only closes when you say so.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="rh-stats">
        <div className="rh-stat">
          <div className="rh-stat-val">&lt;1<span className="rh-stat-unit">h</span></div>
          <div className="rh-stat-label mono">Feedback to first PR</div>
        </div>
        <div className="rh-stat">
          <div className="rh-stat-val">100<span className="rh-stat-unit">%</span></div>
          <div className="rh-stat-label mono">Human-reviewed merges</div>
        </div>
        <div className="rh-stat">
          <div className="rh-stat-val">0</div>
          <div className="rh-stat-label mono">Untracked agent runs</div>
        </div>
        <div className="rh-stat">
          <div className="rh-stat-val">∞</div>
          <div className="rh-stat-label mono">Loop, every cycle</div>
        </div>
      </section>

      {/* CTA */}
      <section className="rh-cta-band">
        <h2 className="rh-cta-title">
          Stop translating feedback by hand. <em>Start shipping it.</em>
        </h2>
        <div className="rh-cta-actions">
          <a className="rh-cta-primary" href={SIGNUP_URL}>Get started</a>
          <a className="rh-cta-ghost" href="/agent-automation">Try the demo</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="rh-footer" id="about">
        <div className="rh-footer-brand">
          <div className="rh-mark-sm" />
          <span>RunHQ</span>
        </div>
        <div className="rh-footer-links">
          <a href="/agent-automation">Agent automation</a>
          <a href="/projects">Project management</a>
          <a href="/runhq">Dev environment</a>
          <a href="/widget">Feedback widget</a>
          <a href="/pricing">Pricing</a>
          <a href="/docs">Docs</a>
          <a href={LOGIN_URL}>Sign in</a>
          <a href={SIGNUP_URL}>Sign up</a>
        </div>
        <div className="rh-footer-meta mono">© 2026 · Closed-loop product development</div>
      </footer>
    </div>
  );
}

const HOME_STYLES = `
  .rh-home {
    background: var(--bg-deep);
    color: var(--ink);
    font-family: 'Inter Tight', system-ui, sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
  }
  .rh-home *, .rh-home *::before, .rh-home *::after { box-sizing: border-box; }

  .rh-section {
    padding: 120px 32px 80px;
    max-width: 1180px;
    margin: 0 auto;
  }
  .rh-section-head { text-align: center; margin-bottom: 56px; }
  .rh-section-head.rh-head-2col {
    display: grid; grid-template-columns: 1fr 1.4fr;
    gap: 56px; align-items: end; text-align: left;
  }
  .rh-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: var(--accent);
    margin-bottom: 14px;
  }
  .rh-section-title {
    font-size: clamp(32px, 4.4vw, 56px);
    line-height: 1.05;
    letter-spacing: -0.025em;
    font-weight: 500;
    margin: 0 auto;
    max-width: 720px;
    text-wrap: balance;
    color: var(--ink);
  }
  .rh-section-head.rh-head-2col .rh-section-title { margin: 0; }
  .rh-section-title em {
    font-style: normal;
    background: linear-gradient(100deg,
      oklch(0.96 0.14 180) 0%,
      oklch(0.88 0.22 160) 60%,
      oklch(0.85 0.22 130) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .rh-lede {
    font-size: 18px;
    line-height: 1.55;
    color: var(--ink-dim);
    max-width: 540px;
    margin: 0;
  }

  /* Demo video */
  .rh-video {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    background: var(--bg);
    aspect-ratio: 16 / 9;
    border: 1px solid var(--line);
    box-shadow:
      0 60px 120px -40px rgba(0,0,0,0.7),
      0 18px 48px -16px rgba(0,0,0,0.45);
  }
  .rh-video-chrome {
    position: absolute; top: 0; left: 0; right: 0; height: 36px;
    background: rgba(8, 11, 16, 0.92);
    border-bottom: 1px solid var(--line);
    z-index: 3;
    display: flex; align-items: center; justify-content: center;
  }
  .rh-video-dots {
    position: absolute; left: 14px;
    display: flex; gap: 6px;
  }
  .rh-video-dots span {
    width: 10px; height: 10px; border-radius: 50%;
    background: rgba(255,255,255,0.18);
  }
  .rh-video-dots span:first-child { background: #ff5f56; }
  .rh-video-dots span:nth-child(2) { background: #ffbd2e; }
  .rh-video-dots span:nth-child(3) { background: #27c93f; }
  .rh-video-title {
    font-size: 11px;
    color: var(--ink-mute);
    letter-spacing: 0.08em;
  }
  .rh-video-surface {
    position: absolute; inset: 36px 0 0 0;
    background: var(--bg);
    overflow: hidden;
  }
  .rh-video-el { width: 100%; height: 100%; object-fit: cover; display: block; }

  .rh-video-captions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-top: 32px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--ink-mute);
  }
  .rh-video-captions > div {
    padding-top: 14px;
    border-top: 1px solid var(--line);
  }
  .rh-num { color: var(--accent); margin-right: 10px; }

  /* 3-card grid */
  .rh-grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .rh-card {
    background: rgba(14, 17, 22, 0.6);
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 28px 24px 26px;
    display: flex; flex-direction: column; gap: 14px;
    backdrop-filter: blur(8px);
    transition: border-color 0.2s, transform 0.2s;
  }
  .rh-card:hover { border-color: var(--line-bold); transform: translateY(-2px); }
  .rh-card-num {
    font-size: 11px;
    color: var(--ink-mute);
    letter-spacing: 0.12em;
  }
  .rh-card-glyph {
    height: 110px;
    margin: 4px 0;
    color: var(--ink);
    display: flex; align-items: center; justify-content: center;
  }
  .rh-card-title {
    font-size: 22px;
    line-height: 1.2;
    letter-spacing: -0.01em;
    margin: 0;
    font-weight: 500;
    color: var(--ink);
  }
  .rh-card-body {
    font-size: 15px;
    line-height: 1.55;
    color: var(--ink-dim);
    margin: 0;
  }

  /* Stats */
  .rh-stats {
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    max-width: 1180px;
    margin: 0 auto;
  }
  .rh-stat {
    padding: 44px 28px;
    border-right: 1px solid var(--line);
  }
  .rh-stat:last-child { border-right: none; }
  .rh-stat-val {
    font-size: 56px;
    line-height: 1;
    letter-spacing: -0.025em;
    font-weight: 500;
    margin-bottom: 12px;
    color: var(--ink);
  }
  .rh-stat-unit { font-size: 22px; color: var(--ink-mute); margin-left: 2px; }
  .rh-stat-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--ink-mute);
  }

  /* CTA band */
  .rh-cta-band {
    padding: 100px 32px;
    max-width: 1180px;
    margin: 0 auto;
    text-align: center;
  }
  .rh-cta-title {
    font-size: clamp(30px, 3.8vw, 48px);
    line-height: 1.1;
    letter-spacing: -0.02em;
    font-weight: 500;
    margin: 0 0 32px;
    text-wrap: balance;
    color: var(--ink);
  }
  .rh-cta-title em {
    font-style: normal;
    background: linear-gradient(100deg,
      oklch(0.96 0.14 180) 0%,
      oklch(0.88 0.22 160) 60%,
      oklch(0.85 0.22 130) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .rh-cta-actions { display: inline-flex; gap: 12px; }
  .rh-cta-primary {
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
  }
  .rh-cta-primary:hover { transform: translateY(-1px); }
  .rh-cta-ghost {
    padding: 14px 22px;
    border-radius: 10px;
    font-size: 14px; font-weight: 500;
    color: var(--ink);
    text-decoration: none;
    background: rgba(14, 17, 22, 0.55);
    border: 1px solid var(--line-bold);
    transition: border-color 0.18s, color 0.18s;
  }
  .rh-cta-ghost:hover { border-color: var(--accent); color: var(--accent); }

  /* Footer */
  .rh-footer {
    border-top: 1px solid var(--line);
    padding: 44px 32px 36px;
    max-width: 1180px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 32px;
    font-size: 12px;
    color: var(--ink-mute);
    letter-spacing: 0.04em;
  }
  .rh-footer-brand {
    display: flex; align-items: center; gap: 10px;
    font-size: 14px; font-weight: 600;
    color: var(--ink);
    letter-spacing: -0.01em;
  }
  .rh-mark-sm {
    width: 14px; height: 14px; position: relative;
  }
  .rh-mark-sm::before {
    content: ""; position: absolute; inset: 0;
    border: 1.5px solid var(--accent);
    border-radius: 50%;
  }
  .rh-footer-links { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; }
  .rh-footer-links a { color: var(--ink-dim); text-decoration: none; }
  .rh-footer-links a:hover { color: var(--accent); }
  .rh-footer-meta { color: var(--ink-faint); }

  /* Responsive */
  @media (max-width: 880px) {
    .rh-section { padding: 80px 22px 60px; }
    .rh-section-head.rh-head-2col { grid-template-columns: 1fr; gap: 16px; align-items: start; }
    .rh-grid-3 { grid-template-columns: 1fr; }
    .rh-stats { grid-template-columns: repeat(2, 1fr); }
    .rh-stat:nth-child(2) { border-right: none; }
    .rh-stat:nth-child(1), .rh-stat:nth-child(2) { border-bottom: 1px solid var(--line); }
    .rh-video-captions { grid-template-columns: 1fr; }
    .rh-footer { grid-template-columns: 1fr; gap: 20px; text-align: center; }
    .rh-footer-links { justify-content: center; }
    .rh-cta-actions { flex-direction: column; }
  }
`;
