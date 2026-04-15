import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'https://console.runhq.io';

interface Ticket {
  id: string;
  title: string;
  description: string | null;
  status: string;
  source?: string;
  yesVotes: number;
  noVotes: number;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-slate-600 text-slate-200',
  planned: 'bg-blue-600/20 text-blue-400 border border-blue-500/30',
  in_progress: 'bg-amber-600/20 text-amber-400 border border-amber-500/30',
  needs_review: 'bg-purple-600/20 text-purple-400 border border-purple-500/30',
  done: 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30',
  cancelled: 'bg-red-600/20 text-red-400 border border-red-500/30',
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  planned: 'Planned',
  in_progress: 'In Progress',
  needs_review: 'Needs Review',
  done: 'Done',
  cancelled: 'Cancelled',
};

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const [projectName, setProjectName] = useState('');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    fetch(`${API_URL}/api/widget/tickets`, {
      headers: { 'X-RW-Project': slug },
    })
      .then(async (res) => {
        if (!res.ok) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setProjectName(data.projectName || slug);
        setTickets(data.tickets || []);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-white">Project Not Found</h1>
        <p className="text-slate-400">This project doesn't exist or isn't public.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-white mb-2">{projectName}</h1>
      <p className="text-slate-400 mb-8">{tickets.length} ticket{tickets.length !== 1 ? 's' : ''}</p>

      {tickets.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-500 text-lg">No tickets yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <Link
              key={ticket.id}
              to={`/project/${slug}/proposals/${ticket.id}`}
              className="flex items-stretch bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-cyan-500/40 hover:bg-slate-800/70 transition-colors"
            >
              <div className="flex flex-col items-center justify-center px-4 py-4 border-r border-slate-700/50 min-w-[3.5rem]">
                <svg className={`w-4 h-4 ${ticket.yesVotes - ticket.noVotes > 0 ? 'text-emerald-400' : 'text-slate-500'}`} viewBox="0 0 16 8" fill="currentColor">
                  <path d="M8 0l8 8H0z" />
                </svg>
                <span className={`text-base font-bold my-1 ${ticket.yesVotes - ticket.noVotes > 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {ticket.yesVotes - ticket.noVotes}
                </span>
                <svg className="w-4 h-4 text-slate-500" viewBox="0 0 16 8" fill="currentColor">
                  <path d="M8 8L0 0h16z" />
                </svg>
              </div>

              <div className="flex-1 min-w-0 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white mb-1">{ticket.title}</h3>
                    {ticket.description && (
                      <p className="text-slate-400 text-sm line-clamp-3">{ticket.description}</p>
                    )}
                  </div>
                  <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[ticket.status] || STATUS_COLORS.pending}`}>
                    {STATUS_LABELS[ticket.status] || ticket.status}
                  </span>
                </div>
                {ticket.source && (
                  <div className="mt-3 text-sm">
                    <span className="text-xs uppercase tracking-wide text-slate-500">
                      {ticket.source === 'workspace' ? 'Workspace' : 'Widget'}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
