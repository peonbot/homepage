import { useEffect, useRef, useState } from 'react';
import { analyzeSpriteSheet, SpriteSheet, AnimationName } from './SpriteAnalyzer';

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

const ANIMATIONS: AnimationName[] = ['idle', 'working', 'done', 'needHelp', 'searching'];

interface CollisionBubble {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

function FishTank() {
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
          analyzeSpriteSheet('/images/lobster.png', 6, 3),
          analyzeSpriteSheet('/images/fish.png', 10, 3),
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
              // Check if animation looped
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

                // Spawn bubble burst at collision point
                const midX = (a.x + b.x) / 2;
                const midY = (a.y + b.y) / 2;
                const newBubbles: CollisionBubble[] = [];
                for (let k = 0; k < 8; k++) {
                  const angle = (Math.PI * 2 * k) / 8 + Math.random() * 0.5;
                  const speed = 30 + Math.random() * 40;
                  newBubbles.push({
                    id: bubbleIdRef.current++,
                    x: midX,
                    y: midY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed - 20,
                    size: 4 + Math.random() * 6,
                    opacity: 1,
                  });
                }
                setCollisionBubbles(prev => [...prev, ...newBubbles]);

                // Change to a random non-idle animation on collision
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

      // Update collision bubbles
      setCollisionBubbles(prev =>
        prev
          .map(b => ({
            ...b,
            x: b.x + b.vx * deltaTime,
            y: b.y + b.vy * deltaTime,
            vx: b.vx * 0.95, // Slow horizontal movement
            vy: b.vy - 80 * deltaTime, // Float upward
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
        background: 'linear-gradient(180deg, #0c4a6e 0%, #0e7490 50%, #155e75 100%)',
        boxShadow: 'inset 0 0 60px rgba(0,0,0,0.3), 0 0 40px rgba(34,211,238,0.2)',
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-8 opacity-30"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)',
        }}
      />

      <Bubbles />

      <div
        className="absolute bottom-0 left-0 right-0 h-12"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(194,165,132,0.4) 50%, rgba(161,130,100,0.6) 100%)',
        }}
      />

      <Seaweed xPercent={12} height={100} />
      <Seaweed xPercent={25} height={70} />
      <Seaweed xPercent={75} height={90} />
      <Seaweed xPercent={88} height={60} />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-cyan-300 text-sm">Loading sprites...</div>
        </div>
      )}

      {characters.map(char => (
        <SpriteCharacter key={char.id} character={char} />
      ))}

      {collisionBubbles.map(bubble => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-white/40 border border-white/60"
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
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
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

function Bubbles() {
  const [bubbles, setBubbles] = useState<{ id: number; x: number; y: number; size: number; speed: number }[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles(prev => {
        const newBubbles = [...prev];
        if (Math.random() < 0.3) {
          newBubbles.push({
            id: idRef.current++,
            x: Math.random() * 100,
            y: 100,
            size: Math.random() * 6 + 2,
            speed: Math.random() * 0.5 + 0.3,
          });
        }
        return newBubbles
          .map(b => ({ ...b, y: b.y - b.speed, x: b.x + Math.sin(b.y * 0.1) * 0.2 }))
          .filter(b => b.y > -10);
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-white/20 border border-white/30"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: bubble.size,
            height: bubble.size,
          }}
        />
      ))}
    </>
  );
}

function Seaweed({ xPercent, height }: { xPercent: number; height: number }) {
  const [sway, setSway] = useState(0);

  useEffect(() => {
    let phase = Math.random() * Math.PI * 2;
    const interval = setInterval(() => {
      phase += 0.05;
      setSway(Math.sin(phase) * 10);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      className="absolute bottom-3"
      style={{ left: `${xPercent}%` }}
      width="30"
      height={height}
      viewBox={`0 0 30 ${height}`}
    >
      <path
        d={`M 15 ${height} Q ${15 + sway * 0.5} ${height * 0.6} ${15 + sway} ${height * 0.3} Q ${15 + sway * 0.7} ${height * 0.1} ${15 + sway * 0.3} 0`}
        stroke="#22c55e"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        opacity={0.7}
      />
    </svg>
  );
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">Tank.Fish</span>
              <span className="text-xs font-medium text-cyan-400 border border-cyan-400/30 rounded px-1.5 py-0.5">Beta</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="https://discord.gg/NnpcadkJVJ" className="px-4 py-2 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-medium rounded-lg transition-colors text-sm">
                Discord
              </a>
              <a href="https://app.fishtank.bot" className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg transition-colors text-sm">
                Login
              </a>
            </div>
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden flex flex-col gap-3 pt-4 pb-2">
              <a href="https://discord.gg/NnpcadkJVJ" className="px-4 py-2 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-medium rounded-lg transition-colors text-sm text-center">
                Discord
              </a>
              <a href="https://app.fishtank.bot" className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg transition-colors text-sm text-center">
                Login
              </a>
            </div>
          )}
        </div>
      </nav>

      <section className="py-8 px-4 md:py-16 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Human + Agent
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Collaborative Workspace
            </span>
          </h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg mb-6 md:mb-10">
            <span className="text-amber-400 text-sm font-medium">Under heavy development. Invite only.</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-10">
          <FishTank />
        </div>

      </section>

    </div>
  );
}

export default App;
