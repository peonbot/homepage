import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/chrome';

const API_URL = import.meta.env.VITE_API_URL || 'https://console.runhq.io';

interface Project {
  name: string;
  slug: string;
  ticketCount: number;
  createdAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/widget/projects`)
      .then(async (res) => {
        if (!res.ok) { setLoading(false); return; }
        const data = await res.json();
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="rh-projects rhp-root">
      <style>{PROJECTS_STYLES}</style>
      <Navbar />

      <div className="rh-projects-header">
        <div className="rh-projects-eyebrow">Public Projects</div>
        <h1 className="rh-projects-title">Browse what teams are shipping.</h1>
        <p className="rh-projects-sub">
          Public feedback boards from teams using RunHQ. Vote, watch, get inspired.
        </p>
      </div>

      {loading ? (
        <div className="rh-projects-spinner-wrap">
          <div className="rh-projects-spinner" />
        </div>
      ) : projects.length === 0 ? (
        <div className="rh-projects-empty">
          <p className="rh-projects-empty-msg">No public projects yet.</p>
        </div>
      ) : (
        <div className="rh-projects-grid">
          {projects.map((project) => (
            <Link
              key={project.slug}
              to={`/project/${project.slug}`}
              className="rh-project-card"
            >
              <h3 className="rh-project-name">{project.name}</h3>
              <div className="rh-project-meta mono">
                {project.ticketCount} {project.ticketCount === 1 ? 'TICKET' : 'TICKETS'}
              </div>
            </Link>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}

const PROJECTS_STYLES = `
  .rh-projects {
    background: var(--rhw-bg);
    color: var(--rhw-ink);
    font-family: 'Geist', 'Inter Tight', system-ui, sans-serif;
    min-height: 100vh;
  }
  .rh-projects *, .rh-projects *::before, .rh-projects *::after { box-sizing: border-box; }

  .rh-projects-spinner-wrap {
    min-height: 320px;
    display: flex; align-items: center; justify-content: center;
  }
  .rh-projects-spinner {
    width: 32px; height: 32px;
    border: 2px solid transparent;
    border-top-color: var(--rhw-accent);
    border-right-color: var(--rhw-accent);
    border-radius: 50%;
    animation: rh-spin 0.7s linear infinite;
  }
  @keyframes rh-spin { to { transform: rotate(360deg); } }

  .rh-projects-header {
    max-width: 1100px;
    margin: 0 auto;
    padding: 80px 32px 48px;
    text-align: center;
  }
  .rh-projects-eyebrow {
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
  .rh-projects-title {
    font-size: clamp(34px, 4.4vw, 56px);
    line-height: 1.05;
    letter-spacing: -0.034em;
    font-weight: 600;
    margin: 0 auto 18px;
    max-width: 720px;
    text-wrap: balance;
    color: var(--rhw-ink);
  }
  .rh-projects-sub {
    font-size: 18px;
    line-height: 1.55;
    color: var(--rhw-ink-soft);
    max-width: 520px;
    margin: 0 auto;
  }

  .rh-projects-empty {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 32px 80px;
    text-align: center;
  }
  .rh-projects-empty-msg {
    display: inline-block;
    padding: 32px 40px;
    background: var(--rhw-surface);
    border: 1px solid var(--rhw-line);
    border-radius: 14px;
    font-size: 16px;
    color: var(--rhw-ink-mute);
    margin: 0;
  }

  .rh-projects-grid {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 32px 96px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  .rh-project-card {
    background: var(--rhw-surface);
    border: 1px solid var(--rhw-line);
    border-radius: 14px;
    padding: 24px;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: border-color 0.2s, transform 0.2s;
    color: inherit;
  }
  .rh-project-card:hover {
    border-color: var(--rhw-ink);
    transform: translateY(-2px);
  }
  .rh-project-card:hover .rh-project-name { color: var(--rhw-accent); }
  .rh-project-name {
    font-size: 19px;
    font-weight: 600;
    line-height: 1.25;
    letter-spacing: -0.01em;
    color: var(--rhw-ink);
    margin: 0;
    transition: color 0.2s;
  }
  .rh-project-meta {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
    color: var(--rhw-ink-mute);
    text-transform: uppercase;
  }

  @media (max-width: 700px) {
    .rh-projects-header { padding: 56px 22px 32px; }
    .rh-projects-grid { grid-template-columns: 1fr; padding: 0 22px 64px; }
    .rh-projects-empty { padding: 0 22px 64px; }
  }
`;
