import { useEffect, useRef } from 'react';

const SIGNUP_URL = 'https://forms.gle/imCy2kktZUhvrWfA8';
const LOGIN_URL = 'https://app.runhq.io';

type AgentSpec = {
  strip: string;
  frames: number;
  cw: number;
  ch: number;
  fps: number;
  scale: number;
};

const AGENTS: AgentSpec[] = [
  { strip: '/images/sprites/dog_strip.png',     frames: 4, cw: 31, ch: 23, fps: 6, scale: 1.5 },
  { strip: '/images/sprites/bot_strip.png',     frames: 4, cw: 26, ch: 22, fps: 5, scale: 1.5 },
  { strip: '/images/sprites/lobster_strip.png', frames: 4, cw: 31, ch: 25, fps: 4, scale: 1.4 },
  { strip: '/images/sprites/witch_strip.png',   frames: 4, cw: 44, ch: 28, fps: 6, scale: 1.1 },
  { strip: '/images/sprites/man_strip.png',     frames: 4, cw: 34, ch: 27, fps: 4, scale: 1.3 },
  { strip: '/images/sprites/woman_strip.png',   frames: 4, cw: 23, ch: 24, fps: 5, scale: 1.5 },
  { strip: '/images/sprites/fish_strip.png',    frames: 5, cw: 35, ch: 22, fps: 6, scale: 1.4 },
];

const RAILS = [
  { rx: 0.300, ry: 0.180, speed: 0.000192 },
  { rx: 0.380, ry: 0.260, speed: 0.000144 },
  { rx: 0.460, ry: 0.330, speed: 0.000108 },
  { rx: 0.540, ry: 0.390, speed: 0.000084 },
  { rx: 0.620, ry: 0.440, speed: 0.000060 },
];

const ROSTER = [
  { a: 1, r: 4, t: 0.30, d:  1 },
  { a: 2, r: 3, t: 2.40, d: -1 },
  { a: 5, r: 2, t: 4.70, d:  1 },
  { a: 4, r: 1, t: 1.10, d:  1 },
];

export default function HomePage() {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;

    type Actor = {
      el: HTMLDivElement;
      rail: typeof RAILS[number];
      t: number;
      d: number;
      speed: number;
      w: number;
      h: number;
      flip: boolean;
      phase: number;
    };
    const actors: Actor[] = [];

    ROSTER.forEach(({ a, r, t, d }) => {
      const spec = AGENTS[a];
      const rail = RAILS[r];

      const el = document.createElement('div');
      el.className = 'sprite';
      const bob = document.createElement('div');
      bob.className = 'bob';

      const inner = document.createElement('div');
      inner.className = 'sprite-inner';
      const W = spec.cw * spec.scale;
      const H = spec.ch * spec.scale;
      const stripW = W * spec.frames;
      inner.style.width  = W + 'px';
      inner.style.height = H + 'px';
      inner.style.backgroundImage = `url(${spec.strip})`;
      inner.style.backgroundSize  = `${stripW}px ${H}px`;
      inner.style.setProperty('--strip-w', stripW + 'px');
      const animName = spec.frames === 5 ? 'walk-5' : 'walk-4';
      const dur = (spec.frames / spec.fps).toFixed(2) + 's';
      inner.style.animation = `${animName} ${dur} steps(${spec.frames}) infinite`;

      bob.appendChild(inner);
      el.appendChild(bob);
      field.appendChild(el);

      actors.push({
        el, rail, t, d,
        speed: rail.speed * (0.8 + Math.random() * 0.4),
        w: W, h: H,
        flip: false,
        phase: Math.random() * Math.PI * 2,
      });
    });

    let last = performance.now();
    let raf = 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let rafFired = false;

    function tick(now: number) {
      const dt = Math.min(50, now - last);
      last = now;
      if (!field) return;
      const W = field.clientWidth;
      const H = field.clientHeight;
      const cx = W * 0.5;
      const cy = H * 0.53;

      for (const a of actors) {
        a.t += a.speed * a.d * dt;

        const rx = a.rail.rx * W;
        const ry = a.rail.ry * H;
        const px = cx + Math.cos(a.t) * rx - a.w / 2;
        const py = cy + Math.sin(a.t) * ry - a.h / 2;

        const vx = -Math.sin(a.t) * a.d;
        const shouldFlip = vx < 0;
        if (shouldFlip !== a.flip) {
          a.flip = shouldFlip;
          a.el.classList.toggle('flip', shouldFlip);
        }

        const bob = Math.sin(now * 0.008 + a.phase) * 1.6;
        a.el.style.transform = `translate3d(${px}px, ${py + bob}px, 0)`;
      }
    }

    function loop(t: number) {
      rafFired = true;
      tick(t);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    const fallbackTimeout = setTimeout(() => {
      if (!rafFired) intervalId = setInterval(() => tick(performance.now()), 33);
    }, 200);
    tick(performance.now());

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fallbackTimeout);
      if (intervalId) clearInterval(intervalId);
      while (field.firstChild) field.removeChild(field.firstChild);
    };
  }, []);

  return (
    <div className="rh-home">
      <style>{HOME_STYLES}</style>

      {/* NAV */}
      <div className="nav-wrap">
        <nav className="nav">
          <div className="brand">
            <svg className="brand-mark" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
              <circle cx="12" cy="12" r="6"  stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
              <circle cx="17" cy="7"  r="2.2" fill="var(--accent)" />
            </svg>
            RunHQ
          </div>
          <span className="sep" />
          <a href="#products" className="hide-sm">Products</a>
          <a href="#demo" className="hide-sm">Demo</a>
          <a href="#about" className="hide-sm">About</a>
          <span className="sep hide-sm" />
          <a href={LOGIN_URL} className="cta-login">Login</a>
          <a href={SIGNUP_URL} className="cta-signup">Sign up →</a>
        </nav>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-art" aria-hidden="true">
          <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--paper-2)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="var(--paper)" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
                <stop offset="55%" stopColor="transparent" />
                <stop offset="100%" stopColor="var(--paper)" stopOpacity="0.7" />
              </radialGradient>
            </defs>

            <rect width="1600" height="900" fill="url(#sky)" />

            <g transform="translate(800 477)" stroke="var(--ink)" fill="none">
              <ellipse cx="0" cy="0" rx="992" ry="396" strokeWidth="1" opacity="0.09" />
              <ellipse cx="0" cy="0" rx="864" ry="351" strokeWidth="1" opacity="0.11" />
              <ellipse cx="0" cy="0" rx="736" ry="297" strokeWidth="1" opacity="0.14" />
              <ellipse cx="0" cy="0" rx="608" ry="234" strokeWidth="1" opacity="0.18" />
              <ellipse cx="0" cy="0" rx="480" ry="162" strokeWidth="1" opacity="0.22" />

              <g stroke="var(--ink)" opacity="0.06" strokeWidth="1">
                <line x1="-896" y1="0" x2="896" y2="0" />
                <line x1="0" y1="-540" x2="0" y2="540" />
                <line x1="-633" y1="-381" x2="633" y2="381" />
                <line x1="-633" y1="381" x2="633" y2="-381" />
              </g>

              <ellipse cx="0" cy="0" rx="736" ry="297" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 180" opacity="0.6" />

              <g fill="var(--ink)" opacity="0.32">
                <circle cx="480" cy="0" r="2" /><circle cx="-480" cy="0" r="2" />
                <circle cx="608" cy="0" r="2" /><circle cx="-608" cy="0" r="2" />
                <circle cx="736" cy="0" r="2" /><circle cx="-736" cy="0" r="2" />
                <circle cx="864" cy="0" r="2" /><circle cx="-864" cy="0" r="2" />
              </g>
            </g>

            <g fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--ink-mute)" opacity="0.5">
              <text x="30" y="30">▸ RUNHQ.SYS // ORBIT.VIEW</text>
              <text x="30" y="48">  agents:14  rails:5  status:nominal</text>
              <text x="1460" y="870">t+00:42:08</text>
            </g>

            <rect width="1600" height="900" fill="url(#vignette)" />
          </svg>
        </div>
        <div className="horizon" />

        <div className="sprite-field" ref={fieldRef} aria-hidden="true" />

        <div className="hero-content">
          <div className="eyebrow"><span className="dot" /><span>FEEDBACK → AGENTS → SHIPPED</span></div>

          <h1 className="display">
            <span className="em">Turn your product into a</span><br />
            <span className="mark">self-evolving</span> machine.
          </h1>

          <p className="sub">
            Route user feedback directly to <b style={{ color: 'var(--ink)', fontWeight: 500 }}>AI coding agents</b>.
            Cut the bottlenecks, not the oversight.
          </p>

          <div className="ctas">
            <a href={SIGNUP_URL} className="btn btn-primary">
              Request access
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="arrow">
                <path d="M7 17 17 7M10 7h7v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#demo" className="btn btn-ghost">Watch demo</a>
          </div>
        </div>
      </section>

      {/* RULE META ROW */}
      <div className="rule-row">
        <div><span className="dot-small" />Built for teams that ship daily</div>
        <div className="hide-sm">Works with Claude Code · Cursor · Codex</div>
        <div>SOC 2 · HIPAA · EU-AI-ACT ready</div>
      </div>

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

  /* NAV */
  .rh-home .nav-wrap {
    position: fixed; top: 18px; left: 0; right: 0;
    display: flex; justify-content: center;
    z-index: 50;
    pointer-events: none;
  }
  .rh-home .nav {
    pointer-events: auto;
    display: flex; align-items: center; gap: 6px;
    background: var(--glass);
    color: var(--paper);
    backdrop-filter: blur(12px);
    border-radius: 999px;
    padding: 8px 10px;
    box-shadow: 0 10px 40px -10px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.08) inset;
    font-family: "JetBrains Mono", monospace;
    font-size: 13px;
    font-weight: 500;
  }
  .rh-home .nav .brand {
    display: flex; align-items: center; gap: 9px;
    padding: 6px 14px 6px 10px;
    font-family: "Newsreader", serif;
    font-size: 17px;
    font-weight: 500;
    letter-spacing: 0.01em;
  }
  .rh-home .nav .brand-mark { width: 22px; height: 22px; display: inline-block; }
  .rh-home .nav a {
    color: inherit; text-decoration: none;
    padding: 8px 14px;
    border-radius: 999px;
    opacity: 0.78;
    transition: opacity .15s, background .15s;
  }
  .rh-home .nav a:hover { opacity: 1; background: rgba(255,255,255,0.06); }
  .rh-home .nav .sep { width: 1px; height: 18px; background: currentColor; opacity: 0.18; margin: 0 4px; }
  .rh-home .nav .cta-login { opacity: 1; padding: 8px 14px; }
  .rh-home .nav .cta-signup {
    background: var(--accent);
    color: var(--accent-ink);
    opacity: 1;
    padding: 8px 16px;
    border-radius: 999px;
    margin-left: 2px;
    transition: transform .15s, filter .15s;
  }
  .rh-home .nav .cta-signup:hover { background: var(--accent); filter: brightness(1.05); transform: translateY(-1px); }

  /* HERO */
  .rh-home .hero {
    position: relative;
    min-height: 100vh;
    padding: 140px 32px 80px;
    display: grid;
    grid-template-rows: 1fr auto;
    overflow: hidden;
  }
  .rh-home .sprite-field {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
  }
  .rh-home .sprite {
    position: absolute;
    left: 0; top: 0;
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
    will-change: transform;
    filter: drop-shadow(0 2px 0 rgba(0,0,0,0.10));
    transform-origin: center;
  }
  .rh-home .sprite-inner {
    display: block;
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
    background-repeat: no-repeat;
    background-position: 0 0;
  }
  .rh-home .sprite.flip .sprite-inner { transform: scaleX(-1); }
  .rh-home .sprite .bob { display: block; }

  @keyframes walk-4 {
    from { background-position: 0 0; }
    to   { background-position: calc(var(--strip-w) * -1) 0; }
  }
  @keyframes walk-5 {
    from { background-position: 0 0; }
    to   { background-position: calc(var(--strip-w) * -1) 0; }
  }

  .rh-home .hero-art {
    position: absolute; inset: 0;
    z-index: 0;
    overflow: hidden;
  }
  .rh-home .hero-art svg { width: 100%; height: 100%; display: block; }

  .rh-home .horizon {
    position: absolute; inset: 0;
    z-index: 1; pointer-events: none;
    background: linear-gradient(to bottom, transparent 0%, transparent 55%, var(--paper) 92%);
  }

  .rh-home .hero-content {
    position: relative; z-index: 2;
    align-self: end;
    max-width: 960px;
    margin: 0 auto;
    text-align: center;
    padding-bottom: 40px;
  }
  .rh-home .eyebrow {
    font-family: "JetBrains Mono", monospace;
    font-size: 12px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-mute);
    margin-bottom: 24px;
    display: inline-flex; align-items: center; gap: 10px;
  }
  .rh-home .eyebrow .dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 22%, transparent);
    animation: rh-pulse 1.8s ease-in-out infinite;
  }
  @keyframes rh-pulse {
    0%, 100% { box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 22%, transparent); }
    50%      { box-shadow: 0 0 0 8px color-mix(in srgb, var(--accent) 0%, transparent); }
  }

  .rh-home .display {
    font-family: "Newsreader", serif;
    font-weight: 400;
    font-size: clamp(44px, 7.2vw, 104px);
    line-height: 1.02;
    letter-spacing: -0.02em;
    color: var(--ink);
    margin: 0 0 22px;
    text-wrap: balance;
  }
  .rh-home .display .em {
    font-style: italic;
    font-weight: 300;
    color: var(--ink-soft);
  }
  .rh-home .display .mark {
    color: var(--accent);
    font-style: italic;
    font-weight: 400;
  }

  .rh-home .sub {
    font-family: "Newsreader", serif;
    font-size: clamp(17px, 1.4vw, 21px);
    line-height: 1.45;
    color: var(--ink-soft);
    max-width: 560px;
    margin: 0 auto 34px;
    text-wrap: pretty;
  }

  .rh-home .ctas {
    display: inline-flex; gap: 10px;
    flex-wrap: wrap; justify-content: center;
  }
  .rh-home .btn {
    font-family: "JetBrains Mono", monospace;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.01em;
    padding: 14px 22px;
    border-radius: 999px;
    border: 1px solid transparent;
    text-decoration: none;
    display: inline-flex; align-items: center; gap: 8px;
    cursor: pointer;
    transition: transform .15s, background .15s, border-color .15s;
  }
  .rh-home .btn-primary { background: var(--ink); color: var(--paper); }
  .rh-home .btn-primary:hover { transform: translateY(-1px); }
  .rh-home .btn-ghost {
    background: transparent;
    color: var(--ink);
    border-color: color-mix(in srgb, var(--ink) 28%, transparent);
  }
  .rh-home .btn-ghost:hover { background: var(--chip); }
  .rh-home .btn .arrow { transition: transform .2s; }
  .rh-home .btn:hover .arrow { transform: translate(2px, -2px); }

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

  /* RULE ROW */
  .rh-home .rule-row {
    position: relative; z-index: 2;
    border-top: 1px solid color-mix(in srgb, var(--ink) 14%, transparent);
    border-bottom: 1px solid color-mix(in srgb, var(--ink) 14%, transparent);
    padding: 18px 32px;
    display: flex; justify-content: space-between; align-items: center;
    gap: 24px;
    font-family: "JetBrains Mono", monospace;
    font-size: 12px;
    color: var(--ink-mute);
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }
  .rh-home .rule-row .dot-small {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent);
    display: inline-block; margin-right: 8px; vertical-align: middle;
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
