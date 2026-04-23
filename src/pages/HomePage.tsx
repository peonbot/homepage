import Hero from '../components/Hero';

const SIGNUP_URL = 'https://app.runhq.io/signup';
const LOGIN_URL = 'https://app.runhq.io';

export default function HomePage() {
  return (
    <div className="rh-home">
      <style>{HOME_STYLES}</style>

      <Hero />

      {/* DEMO VIDEO */}
      <section className="demo" id="demo">
        <div className="demo-head">
          <div className="section-eyebrow">Watch · 90 sec</div>
          <h2 className="section-title">Watch user feedback<br /><span className="em">become a shipped PR.</span></h2>
        </div>
        <div className="video-frame">
          <div className="chrome-dots"><span /><span /><span /></div>
          <div className="chrome-title">runhq.io / demo — feedback-loop.flow</div>
          <div className="video-surface">
            <video
              className="video-el"
              autoPlay
              loop
              muted
              playsInline
              src="/images/demo.mp4"
            />
          </div>
        </div>
        <div className="demo-captions">
          <div><span className="num">01</span>A user reports a bug or asks for a feature</div>
          <div><span className="num">02</span>RunHQ routes it to your coding agent with context</div>
          <div><span className="num">03</span>You review, merge, ship — the loop closes</div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="products">
        <div className="features-head">
          <div>
            <div className="section-eyebrow">How the loop works</div>
            <h2 className="section-title">Organize agent work.<br /><span className="em">Stay in the loop.</span></h2>
          </div>
          <p className="features-lede">
            RunHQ captures user signals, routes them to your coding agents with
            full context, and gives you one place to review every change before
            it ships.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature">
            <div className="num">01 / CAPTURE</div>
            <div className="glyph">
              <svg viewBox="0 0 200 120" width="100%" height="100%">
                <g stroke="currentColor" strokeWidth="1" fill="none" opacity="0.25">
                  <line x1="10" y1="20" x2="190" y2="20" />
                  <line x1="10" y1="50" x2="190" y2="50" />
                  <line x1="10" y1="80" x2="190" y2="80" />
                  <line x1="10" y1="110" x2="190" y2="110" />
                </g>
                <rect x="20" y="26" width="40" height="18" fill="var(--ink)" opacity="0.18" />
                <rect x="64" y="26" width="24" height="18" fill="var(--ink)" opacity="0.12" />
                <rect x="92" y="26" width="88" height="18" fill="var(--accent)" opacity="0.9" />
                <rect x="20" y="56" width="60" height="18" fill="var(--ink)" opacity="0.12" />
                <rect x="84" y="56" width="28" height="18" fill="var(--ink)" opacity="0.22" />
                <rect x="116" y="56" width="40" height="18" fill="var(--ink)" opacity="0.12" />
                <rect x="20" y="86" width="36" height="18" fill="var(--ink)" opacity="0.2" />
                <rect x="60" y="86" width="72" height="18" fill="var(--accent)" opacity="0.4" />
                <rect x="136" y="86" width="24" height="18" fill="var(--ink)" opacity="0.12" />
              </svg>
            </div>
            <h3>Catch every signal.</h3>
            <p>Bug reports, feature asks, in-app feedback — pulled from your tools and turned into structured work your agents can act on.</p>
          </div>

          <div className="feature">
            <div className="num">02 / ROUTE</div>
            <div className="glyph">
              <svg viewBox="0 0 200 120" width="100%" height="100%">
                <g stroke="currentColor" strokeWidth="1" opacity="0.2">
                  <line x1="10" y1="90" x2="190" y2="90" />
                  <line x1="10" y1="60" x2="190" y2="60" strokeDasharray="2 4" />
                  <line x1="10" y1="30" x2="190" y2="30" strokeDasharray="2 4" />
                </g>
                <g>
                  <circle cx="30" cy="60" r="7" fill="var(--ink)" opacity="0.75" />
                  <circle cx="80" cy="35" r="7" fill="var(--ink)" opacity="0.4" />
                  <circle cx="80" cy="85" r="7" fill="var(--ink)" opacity="0.4" />
                  <circle cx="130" cy="60" r="7" fill="var(--accent)" />
                  <circle cx="180" cy="60" r="7" fill="var(--ink)" opacity="0.6" />
                  <g stroke="var(--ink)" strokeWidth="1" opacity="0.35" fill="none">
                    <path d="M37 60 Q 60 40 73 37" />
                    <path d="M37 60 Q 60 80 73 82" />
                    <path d="M87 35 Q 110 48 123 58" />
                    <path d="M87 85 Q 110 72 123 62" />
                    <path d="M137 60 L 173 60" />
                  </g>
                </g>
              </svg>
            </div>
            <h3>Hand it to the right agent.</h3>
            <p>RunHQ packages the context, picks the agent — Claude Code, Cursor, Codex — and opens a PR. No copy-paste. No lost intent.</p>
          </div>

          <div className="feature">
            <div className="num">03 / OVERSEE</div>
            <div className="glyph">
              <svg viewBox="0 0 200 120" width="100%" height="100%">
                <g stroke="currentColor" strokeWidth="1" opacity="0.2">
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
            <h3>You ship. We log.</h3>
            <p>Every change lands as a PR with full provenance — feedback → context → agent → diff. Approve, request changes, or roll back. The loop only closes when you say so.</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stat">
          <div className="val">&lt;1<span className="unit">h</span></div>
          <div className="label">Feedback to first PR</div>
        </div>
        <div className="stat">
          <div className="val">100<span className="unit">%</span></div>
          <div className="label">Human-reviewed merges</div>
        </div>
        <div className="stat">
          <div className="val">0</div>
          <div className="label">Untracked agent runs</div>
        </div>
        <div className="stat">
          <div className="val">Closed</div>
          <div className="label">Loop, every cycle</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="about">
        <div className="fbrand">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
            <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
            <circle cx="17" cy="7" r="2.2" fill="var(--accent)" />
          </svg>
          RunHQ
        </div>
        <div className="links">
          <a href="#about">About</a>
          <a href="#products">Products</a>
          <a href={LOGIN_URL}>Login</a>
          <a href={SIGNUP_URL}>Sign up</a>
        </div>
        <div>© 2026 · BUILT FOR WORKFLOWS</div>
      </footer>
    </div>
  );
}

const HOME_STYLES = `
  .rh-home {
    --paper: #f3ede2;
    --paper-2: #ebe3d4;
    --ink: #14110e;
    --ink-soft: #4a443b;
    --ink-mute: #7a7366;
    --rule: #1a1612;
    --accent: #e6552a;
    --accent-ink: #ffffff;
    --chip: rgba(20,17,14,0.06);
    --glass: rgba(20,17,14,0.88);

    background: var(--paper);
    color: var(--ink);
    font-family: "Newsreader", Georgia, "Times New Roman", serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
  }
  .rh-home *, .rh-home *::before, .rh-home *::after { box-sizing: border-box; }

  /* Grain overlay */
  .rh-home::after {
    content: "";
    position: fixed; inset: 0;
    pointer-events: none;
    z-index: 60;
    opacity: 0.055;
    mix-blend-mode: multiply;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0   0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  }

  /* DEMO */
  .rh-home .demo {
    padding: 120px 32px 80px;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
  }
  .rh-home .demo-head { text-align: center; margin-bottom: 48px; }
  .rh-home .demo-head .section-eyebrow { margin-bottom: 16px; }
  .rh-home .demo-head .section-title { max-width: 720px; margin: 0 auto; }

  .rh-home .video-frame {
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    background: var(--ink);
    aspect-ratio: 16 / 9;
    box-shadow:
      0 40px 80px -30px rgba(0,0,0,0.35),
      0 12px 32px -12px rgba(0,0,0,0.2),
      0 0 0 1px color-mix(in srgb, var(--ink) 14%, transparent);
  }
  .rh-home .video-frame::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 32px;
    background: color-mix(in srgb, var(--ink) 90%, var(--paper));
    border-bottom: 1px solid rgba(255,255,255,0.06);
    z-index: 3;
  }
  .rh-home .video-frame .chrome-dots {
    position: absolute;
    top: 11px; left: 14px;
    display: flex; gap: 6px;
    z-index: 4;
  }
  .rh-home .video-frame .chrome-dots span {
    width: 10px; height: 10px; border-radius: 50%;
    background: color-mix(in srgb, var(--paper) 20%, transparent);
  }
  .rh-home .video-frame .chrome-dots span:first-child { background: #ff5f56; }
  .rh-home .video-frame .chrome-dots span:nth-child(2) { background: #ffbd2e; }
  .rh-home .video-frame .chrome-dots span:nth-child(3) { background: #27c93f; }
  .rh-home .video-frame .chrome-title {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 32px;
    display: flex; align-items: center; justify-content: center;
    font-family: "JetBrains Mono", monospace;
    font-size: 11px;
    color: color-mix(in srgb, var(--paper) 50%, transparent);
    letter-spacing: 0.08em;
    z-index: 3;
  }
  .rh-home .video-surface {
    position: absolute;
    inset: 32px 0 0 0;
    background: var(--ink);
    overflow: hidden;
  }
  .rh-home .video-el {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .rh-home .demo-captions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-top: 32px;
    font-family: "JetBrains Mono", monospace;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--ink-mute);
  }
  .rh-home .demo-captions > div {
    padding-top: 14px;
    border-top: 1px solid color-mix(in srgb, var(--ink) 14%, transparent);
  }
  .rh-home .demo-captions .num {
    color: var(--accent);
    margin-right: 10px;
  }
  @media (max-width: 880px) {
    .rh-home .demo-captions { grid-template-columns: 1fr; }
  }

  /* FEATURES */
  .rh-home .features {
    padding: 120px 32px 80px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .rh-home .features-head {
    display: grid; grid-template-columns: 1fr 1.4fr;
    gap: 48px;
    margin-bottom: 64px;
    align-items: end;
  }
  .rh-home .section-eyebrow {
    font-family: "JetBrains Mono", monospace;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-mute);
    margin-bottom: 12px;
  }
  .rh-home .section-title {
    font-family: "Newsreader", serif;
    font-size: clamp(32px, 4vw, 54px);
    line-height: 1.05;
    letter-spacing: -0.015em;
    margin: 0;
    text-wrap: balance;
    font-weight: 400;
  }
  .rh-home .section-title .em { font-style: italic; font-weight: 300; color: var(--ink-soft); }
  .rh-home .features-lede {
    font-family: "Newsreader", serif;
    font-size: 19px;
    line-height: 1.5;
    color: var(--ink-soft);
    max-width: 520px;
    margin: 0;
  }

  .rh-home .feature-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: color-mix(in srgb, var(--ink) 14%, transparent);
    border: 1px solid color-mix(in srgb, var(--ink) 14%, transparent);
  }
  .rh-home .feature {
    background: var(--paper);
    padding: 36px 28px 32px;
    display: flex; flex-direction: column; gap: 16px;
    min-height: 340px;
    position: relative;
  }
  .rh-home .feature .num {
    font-family: "JetBrains Mono", monospace;
    font-size: 11px;
    color: var(--ink-mute);
    letter-spacing: 0.12em;
  }
  .rh-home .feature .glyph {
    height: 120px;
    margin: 8px 0 4px;
    display: flex; align-items: center; justify-content: center;
  }
  .rh-home .feature h3 {
    font-family: "Newsreader", serif;
    font-size: 26px;
    line-height: 1.15;
    letter-spacing: -0.01em;
    margin: 0;
    font-weight: 400;
  }
  .rh-home .feature p {
    font-family: "Newsreader", serif;
    font-size: 16px;
    line-height: 1.5;
    color: var(--ink-soft);
    margin: 0;
  }

  /* STATS */
  .rh-home .stats {
    border-top: 1px solid color-mix(in srgb, var(--ink) 14%, transparent);
    border-bottom: 1px solid color-mix(in srgb, var(--ink) 14%, transparent);
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    max-width: 1200px;
    margin: 0 auto;
  }
  .rh-home .stat {
    padding: 40px 24px;
    border-right: 1px solid color-mix(in srgb, var(--ink) 14%, transparent);
  }
  .rh-home .stat:last-child { border-right: none; }
  .rh-home .stat .val {
    font-family: "Newsreader", serif;
    font-size: 54px;
    line-height: 1;
    letter-spacing: -0.02em;
    font-weight: 400;
    margin-bottom: 8px;
  }
  .rh-home .stat .val .unit { font-size: 22px; color: var(--ink-mute); font-style: italic; }
  .rh-home .stat .label {
    font-family: "JetBrains Mono", monospace;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--ink-mute);
  }

  /* FOOTER */
  .rh-home footer {
    padding: 60px 32px 40px;
    max-width: 1200px;
    margin: 0 auto;
    display: flex; justify-content: space-between; align-items: center;
    font-family: "JetBrains Mono", monospace;
    font-size: 12px;
    color: var(--ink-mute);
    letter-spacing: 0.06em;
  }
  .rh-home footer .fbrand {
    display: flex; align-items: center; gap: 10px;
    font-family: "Newsreader", serif; font-size: 18px;
    color: var(--ink); letter-spacing: 0; text-transform: none;
  }
  .rh-home footer .links { display: flex; gap: 22px; }
  .rh-home footer a { color: inherit; text-decoration: none; }
  .rh-home footer a:hover { color: var(--ink); }

  /* responsive */
  @media (max-width: 880px) {
    .rh-home .nav .hide-sm { display: none; }
    .rh-home .features-head { grid-template-columns: 1fr; gap: 20px; }
    .rh-home .feature-grid { grid-template-columns: 1fr; }
    .rh-home .stats { grid-template-columns: repeat(2, 1fr); }
    .rh-home .stat:nth-child(2) { border-right: none; }
    .rh-home .stat:nth-child(1), .rh-home .stat:nth-child(2) {
      border-bottom: 1px solid color-mix(in srgb, var(--ink) 14%, transparent);
    }
    .rh-home footer { flex-direction: column; gap: 16px; text-align: center; }
  }
`;
