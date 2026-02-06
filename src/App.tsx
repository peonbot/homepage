import { Fish, Github, ExternalLink } from 'lucide-react';
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
  // State machine for behavior
  stateTimer: number;
}

const ANIMATIONS: AnimationName[] = ['idle', 'working', 'done', 'needHelp', 'searching'];

function FishTank() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [characters, setCharacters] = useState<CharacterState[]>([]);
  const [spriteSheets, setSpriteSheets] = useState<SpriteSheet[]>([]);
  const [loading, setLoading] = useState(true);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  // Load and analyze sprite sheets
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

  // Initialize characters once sprites are loaded
  useEffect(() => {
    if (spriteSheets.length === 0) return;

    const initialCharacters: CharacterState[] = [];

    // One of each character, all same size
    for (let i = 0; i < spriteSheets.length; i++) {
      initialCharacters.push({
        id: i,
        x: Math.random() * 500 + 50,
        y: Math.random() * 180 + 40,
        vx: (Math.random() - 0.5) * 50,
        vy: (Math.random() - 0.5) * 25,
        facingLeft: Math.random() < 0.5,
        spriteSheet: spriteSheets[i],
        currentAnimation: ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)],
        frameIndex: 0,
        frameTime: 0,
        scale: 2,
        stateTimer: Math.random() * 5 + 2,
      });
    }
    setCharacters(initialCharacters);
  }, [spriteSheets]);

  // Animation loop
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
        // First pass: update positions and wall collisions
        const updated = prevChars.map(char => {
          let { x, y, vx, vy, frameIndex, frameTime, currentAnimation, stateTimer, facingLeft } = char;
          const { spriteSheet, scale } = char;

          // Update position
          x += vx * deltaTime;
          y += vy * deltaTime;

          // Get current animation data
          const animation = spriteSheet.animations.find(a => a.name === currentAnimation);
          const frameWidth = animation?.frames[0]?.width || 32;
          const frameHeight = animation?.frames[0]?.height || 32;

          // Bounce off walls
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

          // Add slight random movement
          vx += (Math.random() - 0.5) * 2;
          vy += (Math.random() - 0.5) * 1;

          // Limit speed
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

          // Only update facing direction when velocity is strong enough
          if (vx < -5) facingLeft = true;
          else if (vx > 5) facingLeft = false;

          // Update animation frame
          frameTime += deltaTime;
          const frameDuration = 0.15;

          if (animation && animation.frames.length > 0) {
            if (frameTime >= frameDuration) {
              frameTime = 0;
              frameIndex = (frameIndex + 1) % animation.frames.length;
            }
          }

          return { ...char, x, y, vx, vy, facingLeft, frameIndex, frameTime, currentAnimation, stateTimer };
        });

        // Second pass: character-to-character collisions
        const collisionRadius = 30; // Approximate radius for collision
        for (let i = 0; i < updated.length; i++) {
          for (let j = i + 1; j < updated.length; j++) {
            const a = updated[i];
            const b = updated[j];

            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = collisionRadius * 2;

            if (dist < minDist && dist > 0) {
              // Normalize collision vector
              const nx = dx / dist;
              const ny = dy / dist;

              // Push apart
              const overlap = (minDist - dist) / 2;
              a.x -= nx * overlap;
              a.y -= ny * overlap;
              b.x += nx * overlap;
              b.y += ny * overlap;

              // Swap velocity components along collision axis
              const dvx = a.vx - b.vx;
              const dvy = a.vy - b.vy;
              const dotProduct = dvx * nx + dvy * ny;

              // Only resolve if moving towards each other
              if (dotProduct > 0) {
                a.vx -= nx * dotProduct * 0.8;
                a.vy -= ny * dotProduct * 0.8;
                b.vx += nx * dotProduct * 0.8;
                b.vy += ny * dotProduct * 0.8;
              }
            }
          }
        }

        // Third pass: state timer for animation switching
        return updated.map(char => {
          let { currentAnimation, stateTimer, frameIndex } = char;
          const { spriteSheet } = char;

          // State timer - occasionally switch animations
          stateTimer -= deltaTime;
          if (stateTimer <= 0) {
            // Pick a new random animation
            const validAnimations = spriteSheet.animations.filter(a => a.frames.length > 0);
            if (validAnimations.length > 0) {
              const newAnim = validAnimations[Math.floor(Math.random() * validAnimations.length)];
              currentAnimation = newAnim.name as AnimationName;
              frameIndex = 0;
            }
            stateTimer = Math.random() * 4 + 2;
          }

          return { ...char, currentAnimation, stateTimer, frameIndex };
        });
      });

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
      className="relative w-full max-w-2xl h-80 mx-auto rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0c4a6e 0%, #0e7490 50%, #155e75 100%)',
        boxShadow: 'inset 0 0 60px rgba(0,0,0,0.3), 0 0 40px rgba(34,211,238,0.2)',
      }}
    >
      {/* Water surface effect */}
      <div
        className="absolute top-0 left-0 right-0 h-8 opacity-30"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)',
        }}
      />

      {/* Bubbles */}
      <Bubbles />

      {/* Sand/gravel at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(194,165,132,0.4) 50%, rgba(161,130,100,0.6) 100%)',
        }}
      />

      {/* Seaweed */}
      <Seaweed x={80} height={100} />
      <Seaweed x={150} height={70} />
      <Seaweed x={480} height={90} />
      <Seaweed x={550} height={60} />

      {/* Loading indicator */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-cyan-300 text-sm">Loading sprites...</div>
        </div>
      )}

      {/* Characters */}
      {characters.map(char => (
        <SpriteCharacter key={char.id} character={char} />
      ))}

      {/* Glass reflection */}
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
    // Fallback to first animation with frames
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

function Seaweed({ x, height }: { x: number; height: number }) {
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
      style={{ left: x }}
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Fish className="w-8 h-8 text-cyan-400" />
              <span className="text-xl font-bold text-white">Fishtank</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#docs" className="text-slate-300 hover:text-white transition-colors">
                Docs
              </a>
              <a
                href="https://github.com"
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Human + Agent
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Collaborative Workspace
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Instantly deploy agents like OpenClaw and watch them collaborate in real time.
          </p>
        </div>

        {/* Fish Tank */}
        <div className="max-w-4xl mx-auto mb-10">
          <FishTank />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#get-started"
            className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg transition-colors"
          >
            Get Started
          </a>
          <a
            href="#demo"
            className="px-8 py-3 border border-slate-600 hover:border-slate-500 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            View Demo
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Instant Deploy"
              description="Deploy OpenClaw agents to your workspace in seconds with zero configuration."
            />
            <FeatureCard
              title="Real-time Collaboration"
              description="Watch your AI agents work in real-time with seamless updates and progress tracking."
            />
            <FeatureCard
              title="Developer Friendly"
              description="Built for developers with first-class support for code projects and workflows."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Fish className="w-6 h-6 text-cyan-400" />
            <span className="text-lg font-semibold text-white">Fishtank</span>
          </div>
          <p className="text-slate-400">
            AI-powered development platform
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition-colors">
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
}

export default App;
