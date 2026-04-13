import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'https://console.runhq.io';

interface Ticket {
  id: string;
  title: string;
  description: string | null;
  status: string;
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
            <div
              key={ticket.id}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6"
            >
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

              <div className="flex items-center gap-4 mt-4 text-sm text-slate-400">
                <span className="flex items-center gap-1" title="Yes votes">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
                  </svg>
                  {ticket.yesVotes}
                </span>
                <span className="flex items-center gap-1" title="No votes">
                  <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 15V19a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z" />
                  </svg>
                  {ticket.noVotes}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
