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
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-white mb-2">Public Projects</h1>
      <p className="text-slate-400 mb-8">Browse community feedback boards and vote on ideas.</p>

      {projects.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-500 text-lg">No public projects yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              to={`/project/${project.slug}`}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/30 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                {project.name}
              </h3>
              <div className="flex items-center gap-3 mt-3 text-sm text-slate-400">
                <span>{project.ticketCount} ticket{project.ticketCount !== 1 ? 's' : ''}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
