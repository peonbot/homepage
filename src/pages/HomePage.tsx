import { useEffect, useRef, useState } from 'react';
import { analyzeSpriteSheet, SpriteSheet, AnimationName } from '../SpriteAnalyzer';

interface CharacterState {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  spriteSheet: SpriteSheet;
  currentAnimation: AnimationName;
  frameIndex: number;
  frameTime: number;
  scale: number;
  facingLeft: boolean;
  reactionLoops: number;
}

interface CollisionBubble {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

function WorkspaceScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [characters, setCharacters] = useState<CharacterState[]>([]);
  const [spriteSheets, setSpriteSheets] = useState<SpriteSheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [collisionBubbles, setCollisionBubbles] = useState<CollisionBubble[]>([]);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const bubbleIdRef = useRef(0);

  useEffect(() => {
    async function loadSprites() {
      try {
        const sheets = await Promise.all([
          analyzeSpriteSheet('/images/bot.png', 9, 5),
          analyzeSpriteSheet('/images/dog.png', 10, 5),
          analyzeSpriteSheet('/images/man.png', 10, 5),
          analyzeSpriteSheet('/images/witch.png', 8, 5),
          analyzeSpriteSheet('/images/woman.png', 6, 5),
        ]);
        setSpriteSheets(sheets);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load sprites:', err);
        setLoading(false);
      }
    }
    loadSprites();
  }, []);

  useEffect(() => {
    if (spriteSheets.length === 0) return;

    const initialCharacters: CharacterState[] = [];

    for (let i = 0; i < spriteSheets.length; i++) {
      initialCharacters.push({
        id: i,
        x: Math.random() * 500 + 50,
        y: Math.random() * 180 + 40,
        vx: (Math.random() - 0.5) * 50,
        vy: (Math.random() - 0.5) * 25,
        facingLeft: Math.random() < 0.5,
        spriteSheet: spriteSheets[i],
        currentAnimation: 'idle',
        frameIndex: 0,
        frameTime: 0,
        scale: 2,
        reactionLoops: 0,
      });
    }
    setCharacters(initialCharacters);
  }, [spriteSheets]);

  useEffect(() => {
    if (characters.length === 0) return;

    const animate = (currentTime: number) => {
      if (!containerRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = lastTimeRef.current ? (currentTime - lastTimeRef.current) / 1000 : 0.016;
      lastTimeRef.current = currentTime;

      const bounds = containerRef.current.getBoundingClientRect();
      const width = bounds.width;
      const height = bounds.height;

      setCharacters(prevChars => {
        const updated = prevChars.map(char => {
          let { x, y, vx, vy, frameIndex, frameTime, currentAnimation, facingLeft, reactionLoops } = char;
          const { spriteSheet, scale } = char;

          x += vx * deltaTime;
          y += vy * deltaTime;

          const animation = spriteSheet.animations.find(a => a.name === currentAnimation);
          const frameWidth = animation?.frames[0]?.width || 32;
          const frameHeight = animation?.frames[0]?.height || 32;

          const paddingX = (frameWidth * scale) / 2;
          const paddingY = (frameHeight * scale) / 2;

          if (x < paddingX) {
            x = paddingX;
            vx = Math.abs(vx) * 0.95;
          } else if (x > width - paddingX) {
            x = width - paddingX;
            vx = -Math.abs(vx) * 0.95;
          }

          if (y < paddingY + 10) {
            y = paddingY + 10;
            vy = Math.abs(vy) * 0.95;
          } else if (y > height - paddingY - 50) {
            y = height - paddingY - 50;
            vy = -Math.abs(vy) * 0.95;
          }

          vx += (Math.random() - 0.5) * 2;
          vy += (Math.random() - 0.5) * 1;

          const maxSpeed = 60;
          const minSpeed = 10;
          const speed = Math.sqrt(vx * vx + vy * vy);
          if (speed > maxSpeed) {
            vx = (vx / speed) * maxSpeed;
            vy = (vy / speed) * maxSpeed;
          } else if (speed < minSpeed && speed > 0) {
            vx = (vx / speed) * minSpeed;
            vy = (vy / speed) * minSpeed;
          }

          if (vx < -5) facingLeft = true;
          else if (vx > 5) facingLeft = false;

          frameTime += deltaTime;
          const frameDuration = 0.15;

          if (animation && animation.frames.length > 0) {
            if (frameTime >= frameDuration) {
              frameTime = 0;
              const nextFrame = (frameIndex + 1) % animation.frames.length;
              if (nextFrame < frameIndex && reactionLoops > 0) {
                reactionLoops--;
                if (reactionLoops === 0) {
                  currentAnimation = 'idle';
                  frameIndex = 0;
                } else {
                  frameIndex = nextFrame;
                }
              } else {
                frameIndex = nextFrame;
              }
            }
          }

          return { ...char, x, y, vx, vy, facingLeft, frameIndex, frameTime, currentAnimation, reactionLoops };
        });

        const collisionRadius = 30;
        for (let i = 0; i < updated.length; i++) {
          for (let j = i + 1; j < updated.length; j++) {
            const a = updated[i];
            const b = updated[j];

            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = collisionRadius * 2;

            if (dist < minDist && dist > 0) {
              const nx = dx / dist;
              const ny = dy / dist;

              const overlap = (minDist - dist) / 2;
              a.x -= nx * overlap;
              a.y -= ny * overlap;
              b.x += nx * overlap;
              b.y += ny * overlap;

              const dvx = a.vx - b.vx;
              const dvy = a.vy - b.vy;
              const dotProduct = dvx * nx + dvy * ny;

              if (dotProduct > 0) {
                a.vx -= nx * dotProduct * 0.8;
                a.vy -= ny * dotProduct * 0.8;
                b.vx += nx * dotProduct * 0.8;
                b.vy += ny * dotProduct * 0.8;

                const midX = (a.x + b.x) / 2;
                const midY = (a.y + b.y) / 2;
                const newBubbles: CollisionBubble[] = [];
                for (let k = 0; k < 6; k++) {
                  const angle = (Math.PI * 2 * k) / 6 + Math.random() * 0.5;
                  const speed = 20 + Math.random() * 30;
                  newBubbles.push({
                    id: bubbleIdRef.current++,
                    x: midX,
                    y: midY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed - 30,
                    size: 2 + Math.random() * 4,
                    opacity: 0.8,
                  });
                }
                setCollisionBubbles(prev => [...prev, ...newBubbles]);

                const nonIdleAnimsA = a.spriteSheet.animations.filter(anim => anim.frames.length > 0 && anim.name !== 'idle');
                const nonIdleAnimsB = b.spriteSheet.animations.filter(anim => anim.frames.length > 0 && anim.name !== 'idle');
                if (nonIdleAnimsA.length > 0) {
                  const newAnimA = nonIdleAnimsA[Math.floor(Math.random() * nonIdleAnimsA.length)];
                  a.currentAnimation = newAnimA.name as AnimationName;
                  a.frameIndex = 0;
                  a.reactionLoops = 3;
                }
                if (nonIdleAnimsB.length > 0) {
                  const newAnimB = nonIdleAnimsB[Math.floor(Math.random() * nonIdleAnimsB.length)];
                  b.currentAnimation = newAnimB.name as AnimationName;
                  b.frameIndex = 0;
                  b.reactionLoops = 3;
                }
              }
            }
          }
        }

        return updated;
      });

      setCollisionBubbles(prev =>
        prev
          .map(b => ({
            ...b,
            x: b.x + b.vx * deltaTime,
            y: b.y + b.vy * deltaTime,
            vx: b.vx * 0.95,
            vy: b.vy - 80 * deltaTime,
            opacity: b.opacity - deltaTime * 0.4,
          }))
          .filter(b => b.opacity > 0 && b.y > -20)
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [characters.length]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-full sm:max-w-2xl h-48 sm:h-64 md:h-80 mx-auto rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 60%, #334155 100%)',
        boxShadow: 'inset 0 0 60px rgba(0,0,0,0.4), 0 0 40px rgba(34,211,238,0.15)',
      }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-14"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(30,41,59,0.8) 40%, rgba(15,23,42,0.95) 100%)',
          borderTop: '1px solid rgba(34,211,238,0.15)',
        }}
      />

      <DataParticles />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-cyan-300 text-sm">Loading agents...</div>
        </div>
      )}

      {characters.map(char => (
        <SpriteCharacter key={char.id} character={char} />
      ))}

      {collisionBubbles.map(bubble => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-cyan-400/40 border border-cyan-300/60"
          style={{
            left: bubble.x - bubble.size / 2,
            top: bubble.y - bubble.size / 2,
            width: bubble.size,
            height: bubble.size,
            opacity: bubble.opacity,
          }}
        />
      ))}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.08) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}

function SpriteCharacter({ character }: { character: CharacterState }) {
  const { x, y, spriteSheet, currentAnimation, frameIndex, scale, facingLeft } = character;

  const animation = spriteSheet.animations.find(a => a.name === currentAnimation);

  if (!animation || animation.frames.length === 0) {
    const fallback = spriteSheet.animations.find(a => a.frames.length > 0);
    if (!fallback) return null;

    const frame = fallback.frames[frameIndex % fallback.frames.length];
    return (
      <div
        className="absolute"
        style={{
          left: x - (frame.width * scale) / 2,
          top: y - (frame.height * scale) / 2,
          width: frame.width * scale,
          height: frame.height * scale,
          transform: facingLeft ? 'scaleX(-1)' : undefined,
        }}
      >
        <div
          style={{
            width: frame.width * scale,
            height: frame.height * scale,
            backgroundImage: `url(${spriteSheet.image.src})`,
            backgroundPosition: `-${frame.x * scale}px -${frame.y * scale}px`,
            backgroundSize: `${spriteSheet.image.width * scale}px ${spriteSheet.image.height * scale}px`,
            imageRendering: 'pixelated',
          }}
        />
      </div>
    );
  }

  const frame = animation.frames[frameIndex % animation.frames.length];

  return (
    <div
      className="absolute"
      style={{
        left: x - (frame.width * scale) / 2,
        top: y - (frame.height * scale) / 2,
        width: frame.width * scale,
        height: frame.height * scale,
        transform: facingLeft ? 'scaleX(-1)' : undefined,
      }}
    >
      <div
        style={{
          width: frame.width * scale,
          height: frame.height * scale,
          backgroundImage: `url(${spriteSheet.image.src})`,
          backgroundPosition: `-${frame.x * scale}px -${frame.y * scale}px`,
          backgroundSize: `${spriteSheet.image.width * scale}px ${spriteSheet.image.height * scale}px`,
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
}

function DataParticles() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; speed: number; opacity: number }[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => {
        const updated = [...prev];
        if (Math.random() < 0.25) {
          updated.push({
            id: idRef.current++,
            x: Math.random() * 100,
            y: 105,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 0.4 + 0.2,
            opacity: Math.random() * 0.5 + 0.2,
          });
        }
        return updated
          .map(p => ({ ...p, y: p.y - p.speed, opacity: p.opacity - 0.003 }))
          .filter(p => p.y > -5 && p.opacity > 0);
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-cyan-400"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
        />
      ))}
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="py-8 px-4 md:py-16 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-cyan-400 mb-4">AI agents for your workflows</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Put your operations
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              on autopilot.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-6 leading-relaxed">
            RunHQ deploys AI agents that handle your workflows end to end. Up to <span className="text-cyan-400 font-semibold">80% cost reduction</span>, without ripping and replacing your stack.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 md:mb-10">
            <a href="https://forms.gle/imCy2kktZUhvrWfA8" className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg transition-colors text-sm">
              Request access
            </a>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-10">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10 border border-slate-700/50">
            <video
              className="w-full h-auto"
              autoPlay
              loop
              muted
              playsInline
              poster=""
            >
              <source src="/images/demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-white text-center mb-2">How it works</h2>
          <p className="text-slate-400 text-center mb-8 text-sm">From manual chaos to managed agents</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
              <div className="text-cyan-400 text-sm font-mono mb-3">01</div>
              <h3 className="text-white font-semibold mb-2">Map your workflows</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Point RunHQ at the processes your team runs manually &mdash; data pipelines, vendor integrations, internal tooling, reporting loops.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
              <div className="text-cyan-400 text-sm font-mono mb-3">02</div>
              <h3 className="text-white font-semibold mb-2">Deploy agents</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                RunHQ spins up purpose-built agents that own each workflow end to end. They execute, monitor, and escalate &mdash; your team reviews.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
              <div className="text-cyan-400 text-sm font-mono mb-3">03</div>
              <h3 className="text-white font-semibold mb-2">Retire the old stuff</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                As agents prove out, decommission the scripts, cron jobs, and manual steps they replaced. Less infrastructure, fewer tickets, lower costs.
              </p>
            </div>
          </div>

          <div className="mt-6 bg-slate-800/50 border border-cyan-500/20 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">RunHQ in action, every day</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Support ticket comes in. An agent picks it up immediately, resolves or escalates, and your team only steps in when needed.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs shrink-0">
                <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-full px-3 py-1.5 whitespace-nowrap">Ticket in</span>
                <span className="text-slate-500">&rarr;</span>
                <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-full px-3 py-1.5 whitespace-nowrap">Agent resolves</span>
                <span className="text-slate-500">&rarr;</span>
                <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-full px-3 py-1.5 whitespace-nowrap">Team reviews</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">Up to 80%</div>
            <div className="text-sm text-slate-300">Reduction in operational costs and manual overhead</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">Direct feedback loop</div>
            <div className="text-sm text-slate-300">Agents resolve immediately &mdash; your team reviews outcomes, not tasks</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">No replatform</div>
            <div className="text-sm text-slate-300">Works alongside your existing stack &mdash; replace incrementally</div>
          </div>
        </div>

      </section>

      <div className="max-w-6xl mx-auto px-6 pb-8">
        <WorkspaceScene />
      </div>
    </>
  );
}
