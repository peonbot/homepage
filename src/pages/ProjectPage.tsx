import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

interface TicketDetail {
  ticket: Ticket;
  comments: Array<{
    id: string;
    body: string;
    authorName: string | null;
    createdAt: string;
    attachments?: Array<{
      id?: string;
      filename?: string;
      originalName?: string | null;
      mimeType?: string;
      url?: string | null;
    }> | null;
  }>;
  activity: Array<{
    id: string;
    type: string;
    content?: string | null;
    createdByName?: string | null;
    createdAt: string;
    metadata?: Record<string, unknown> | null;
    attachments?: Array<{
      id?: string;
      filename?: string;
      originalName?: string | null;
      mimeType?: string;
      url?: string | null;
    }> | null;
  }>;
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

function isImageAttachment(attachment: { mimeType?: string; filename?: string }) {
  if (attachment.mimeType) return attachment.mimeType.startsWith('image/');
  return !!attachment.filename?.match(/\.(png|jpe?g|gif|webp|svg)$/i);
}

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const [projectName, setProjectName] = useState('');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [selectedTicketDetail, setSelectedTicketDetail] = useState<TicketDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

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

  useEffect(() => {
    if (!slug || !selectedTicketId) {
      setSelectedTicketDetail(null);
      return;
    }

    setDetailLoading(true);
    fetch(`${API_URL}/api/widget/tickets/${selectedTicketId}`, {
      headers: { 'X-RW-Project': slug },
    })
      .then(async (res) => {
        if (!res.ok) {
          setSelectedTicketDetail(null);
          setDetailLoading(false);
          return;
        }
        const data = await res.json();
        setSelectedTicketDetail(data);
        setDetailLoading(false);
      })
      .catch(() => {
        setSelectedTicketDetail(null);
        setDetailLoading(false);
      });
  }, [slug, selectedTicketId]);

  const renderActivityLabel = (entry: TicketDetail['activity'][number]) => {
    const actor = entry.createdByName || 'Someone';
    switch (entry.type) {
      case 'task_created':
        return `${actor} created this task`;
      case 'status_change':
        return `${actor} changed status${entry.metadata?.to ? ` to ${String(entry.metadata.to).replaceAll('_', ' ')}` : ''}`;
      case 'agent_assigned':
        return `${actor} assigned ${entry.metadata?.agentName ? String(entry.metadata.agentName) : 'an agent'}`;
      case 'task_archived':
        return `${actor} archived this task`;
      case 'task_unarchived':
        return `${actor} unarchived this task`;
      case 'task_deleted':
        return `${actor} deleted this task`;
      default:
        return entry.content || `${actor} updated this task`;
    }
  };

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
            <button
              key={ticket.id}
              type="button"
              onClick={() => setSelectedTicketId(ticket.id)}
              className="w-full text-left bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/40 hover:bg-slate-800/70 transition-colors"
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
                {ticket.source && (
                  <span className="text-xs uppercase tracking-wide text-slate-500">
                    {ticket.source === 'workspace' ? 'Workspace' : 'Widget'}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedTicketId && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedTicketId(null)}
        >
          <div
            className="w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-slate-800 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {selectedTicketDetail?.ticket.title || 'Loading task...'}
                </h2>
                {selectedTicketDetail?.ticket.description && (
                  <p className="text-slate-400 mt-2 whitespace-pre-wrap">
                    {selectedTicketDetail.ticket.description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedTicketId(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {detailLoading || !selectedTicketDetail ? (
              <div className="px-6 py-10 text-center text-slate-400">Loading details...</div>
            ) : (
              <div className="grid md:grid-cols-2 gap-0">
                <div className="px-6 py-5 border-b md:border-b-0 md:border-r border-slate-800">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-4">
                    Comments ({selectedTicketDetail.comments.length})
                  </h3>
                  {selectedTicketDetail.comments.length === 0 ? (
                    <p className="text-slate-500 text-sm">No comments yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {selectedTicketDetail.comments.map((comment) => (
                        <div key={comment.id} className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                          <div className="flex items-center justify-between gap-3 mb-2">
                            <span className="text-sm font-medium text-white">
                              {comment.authorName || 'Anonymous'}
                            </span>
                            <span className="text-xs text-slate-500">
                              {new Date(comment.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-slate-300 whitespace-pre-wrap">{comment.body}</p>
                          {(comment.attachments?.length ?? 0) > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {comment.attachments!.map((attachment) => (
                                attachment.url ? (
                                  <a
                                    key={attachment.id || attachment.url || attachment.filename}
                                    href={attachment.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block"
                                  >
                                    {isImageAttachment(attachment) ? (
                                      <img
                                        src={attachment.url}
                                        alt={attachment.originalName || attachment.filename || 'attachment'}
                                        className="w-16 h-16 object-cover rounded-lg border border-slate-700"
                                      />
                                    ) : (
                                      <div className="px-3 py-2 rounded-lg border border-slate-700 text-xs text-slate-300 hover:border-cyan-500/50">
                                        {attachment.originalName || attachment.filename || 'Attachment'}
                                      </div>
                                    )}
                                  </a>
                                ) : null
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="px-6 py-5">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-4">
                    Activity ({selectedTicketDetail.activity.length})
                  </h3>
                  {selectedTicketDetail.activity.length === 0 ? (
                    <p className="text-slate-500 text-sm">No activity yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {selectedTicketDetail.activity.map((entry) => (
                        <div key={entry.id} className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                          <div className="text-sm text-slate-200">{renderActivityLabel(entry)}</div>
                          {(entry.attachments?.length ?? 0) > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {entry.attachments!.map((attachment) => (
                                attachment.url ? (
                                  <a
                                    key={attachment.id || attachment.url || attachment.filename}
                                    href={attachment.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block"
                                  >
                                    {isImageAttachment(attachment) ? (
                                      <img
                                        src={attachment.url}
                                        alt={attachment.originalName || attachment.filename || 'attachment'}
                                        className="w-16 h-16 object-cover rounded-lg border border-slate-700"
                                      />
                                    ) : (
                                      <div className="px-3 py-2 rounded-lg border border-slate-700 text-xs text-slate-300 hover:border-cyan-500/50">
                                        {attachment.originalName || attachment.filename || 'Attachment'}
                                      </div>
                                    )}
                                  </a>
                                ) : null
                              ))}
                            </div>
                          )}
                          <div className="text-xs text-slate-500 mt-2">
                            {new Date(entry.createdAt).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
