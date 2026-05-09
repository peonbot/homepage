import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

  if (loading) {
    return (
      <div className="rh-projects">
        <style>{PROJECTS_STYLES}</style>
        <div className="rh-projects-spinner-wrap">
          <div className="rh-projects-spinner" />
        </div>
      </div>
    );
  }

  return (
    <div className="rh-projects">
      <style>{PROJECTS_STYLES}</style>

      <div className="rh-projects-header">
        <div className="rh-eyebrow">Public Projects</div>
        <h1 className="rh-projects-title">Browse what teams are shipping.</h1>
        <p className="rh-projects-sub">
          Public feedback boards from teams using RunHQ. Vote, watch, get inspired.
        </p>
      </div>

      {projects.length === 0 ? (
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
    </div>
  );
}

const PROJECTS_STYLES = `
  .rh-projects {
    background: var(--bg-deep);
    color: var(--ink);
    font-family: 'Inter Tight', system-ui, sans-serif;
    min-height: 100vh;
  }
  .rh-projects *, .rh-projects *::before, .rh-projects *::after { box-sizing: border-box; }

  .rh-projects-spinner-wrap {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .rh-projects-spinner {
    width: 32px;
    height: 32px;
    border: 2px solid transparent;
    border-top-color: var(--accent);
    border-right-color: var(--accent);
    border-radius: 50%;
    animation: rh-spin 0.7s linear infinite;
  }
  @keyframes rh-spin {
    to { transform: rotate(360deg); }
  }

  .rh-projects-header {
    max-width: 1180px;
    margin: 0 auto;
    padding: 100px 32px 64px;
    text-align: center;
  }
  .rh-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: var(--accent);
    margin-bottom: 14px;
  }
  .rh-projects-title {
    font-size: clamp(28px, 4vw, 48px);
    line-height: 1.07;
    letter-spacing: -0.025em;
    font-weight: 500;
    margin: 0 auto 16px;
    max-width: 640px;
    text-wrap: balance;
    color: var(--ink);
  }
  .rh-projects-sub {
    font-size: 17px;
    line-height: 1.55;
    color: var(--ink-dim);
    max-width: 480px;
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
    background: rgba(14, 17, 22, 0.6);
    border: 1px solid var(--line);
    border-radius: 14px;
    font-size: 16px;
    color: var(--ink-mute);
    margin: 0;
  }

  .rh-projects-grid {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 32px 100px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  .rh-project-card {
    background: rgba(14, 17, 22, 0.6);
    border: 1px solid var(--line);
    border-radius: 14px;
    padding: 24px;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    backdrop-filter: blur(8px);
    transition: border-color 0.2s, transform 0.2s;
  }
  .rh-project-card:hover {
    border-color: var(--line-bold);
    transform: translateY(-2px);
  }
  .rh-project-card:hover .rh-project-name {
    color: var(--accent);
  }
  .rh-project-name {
    font-size: 19px;
    font-weight: 500;
    line-height: 1.25;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin: 0;
    transition: color 0.2s;
  }
  .rh-project-meta {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
    color: var(--ink-mute);
    text-transform: uppercase;
  }

  @media (max-width: 700px) {
    .rh-projects-header { padding: 72px 22px 48px; }
    .rh-projects-grid { grid-template-columns: 1fr; padding: 0 22px 72px; }
    .rh-projects-empty { padding: 0 22px 72px; }
  }
`;
