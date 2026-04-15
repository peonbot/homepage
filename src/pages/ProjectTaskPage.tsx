import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ImageLightbox from '../components/ImageLightbox';

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
  attachments?: Attachment[] | null;
}

interface Attachment {
  id?: string;
  filename?: string;
  originalName?: string | null;
  mimeType?: string;
  url?: string | null;
}

interface TicketDetail {
  ticket: Ticket;
  comments: Array<{
    id: string;
    body: string;
    authorName: string | null;
    createdAt: string;
    attachments?: Attachment[] | null;
  }>;
  activity: Array<{
    id: string;
    type: string;
    content?: string | null;
    createdByName?: string | null;
    createdAt: string;
    metadata?: Record<string, unknown> | null;
    attachments?: Attachment[] | null;
  }>;
}

type TimelineItem =
  | {
      kind: 'comment';
      id: string;
      authorName: string | null;
      body: string;
      createdAt: string;
      attachments?: Attachment[] | null;
    }
  | {
      kind: 'activity';
      id: string;
      type: string;
      content?: string | null;
      createdByName?: string | null;
      createdAt: string;
      metadata?: Record<string, unknown> | null;
      attachments?: Attachment[] | null;
    };

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

function isImageAttachment(attachment: Attachment) {
  if (attachment.mimeType) return attachment.mimeType.startsWith('image/');
  return !!attachment.filename?.match(/\.(png|jpe?g|gif|webp|svg)$/i);
}

function AttachmentList({ attachments }: { attachments?: Attachment[] | null }) {
  const [lightboxUrl, setLightboxUrl] = useState<{ src: string; alt: string } | null>(null);

  if (!attachments?.length) return null;
  return (
    <>
      <div className="flex flex-wrap gap-2 mt-3">
        {attachments.map((attachment) => (
          attachment.url ? (
            isImageAttachment(attachment) ? (
              <button
                key={attachment.id || attachment.url || attachment.filename}
                type="button"
                onClick={() => setLightboxUrl({ src: attachment.url!, alt: attachment.originalName || attachment.filename || 'attachment' })}
                className="block cursor-pointer"
              >
                <img
                  src={attachment.url}
                  alt={attachment.originalName || attachment.filename || 'attachment'}
                  className="w-16 h-16 object-cover rounded-lg border border-slate-700"
                />
              </button>
            ) : (
              <a
                key={attachment.id || attachment.url || attachment.filename}
                href={attachment.url}
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                <div className="px-3 py-2 rounded-lg border border-slate-700 text-xs text-slate-300 hover:border-cyan-500/50">
                  {attachment.originalName || attachment.filename || 'Attachment'}
                </div>
              </a>
            )
          ) : null
        ))}
      </div>
      {lightboxUrl && (
        <ImageLightbox
          src={lightboxUrl.src}
          alt={lightboxUrl.alt}
          onClose={() => setLightboxUrl(null)}
        />
      )}
    </>
  );
}

export default function ProjectTaskPage() {
  const { slug, ticketId } = useParams<{ slug: string; ticketId: string }>();
  const [projectName, setProjectName] = useState('');
  const [detail, setDetail] = useState<TicketDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug || !ticketId) return;

    setLoading(true);
    Promise.all([
      fetch(`${API_URL}/api/widget/tickets`, { headers: { 'X-RW-Project': slug } }),
      fetch(`${API_URL}/api/widget/tickets/${ticketId}`, { headers: { 'X-RW-Project': slug } }),
    ])
      .then(async ([ticketsRes, detailRes]) => {
        if (!ticketsRes.ok || !detailRes.ok) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        const ticketsData = await ticketsRes.json();
        const detailData = await detailRes.json();
        setProjectName(ticketsData.projectName || slug);
        setDetail(detailData);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [slug, ticketId]);

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

  const timeline: TimelineItem[] = detail
    ? [
        ...detail.comments.map((comment) => ({
          kind: 'comment' as const,
          id: comment.id,
          authorName: comment.authorName,
          body: comment.body,
          createdAt: comment.createdAt,
          attachments: comment.attachments,
        })),
        ...detail.activity.map((entry) => ({
          kind: 'activity' as const,
          id: entry.id,
          type: entry.type,
          content: entry.content,
          createdByName: entry.createdByName,
          createdAt: entry.createdAt,
          metadata: entry.metadata,
          attachments: entry.attachments,
        })),
      ].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !detail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-white">Task Not Found</h1>
        <p className="text-slate-400">This task doesn't exist or isn't public.</p>
        <Link to={`/project/${slug}`} className="text-cyan-400 hover:text-cyan-300">
          Back to project
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link to={`/project/${slug}`} className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 mb-6">
        <span>←</span>
        <span>{projectName || slug}</span>
      </Link>

      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-800">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-white">{detail.ticket.title}</h1>
              {detail.ticket.description && (
                <p className="text-slate-400 mt-3 whitespace-pre-wrap">{detail.ticket.description}</p>
              )}
              <AttachmentList attachments={detail.ticket.attachments} />
            </div>
            <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[detail.ticket.status] || STATUS_COLORS.pending}`}>
              {STATUS_LABELS[detail.ticket.status] || detail.ticket.status}
            </span>
          </div>

          <div className="flex items-center gap-4 mt-5 text-sm text-slate-400">
            <span>{detail.ticket.yesVotes} upvotes</span>
            {detail.ticket.source && (
              <span className="text-xs uppercase tracking-wide text-slate-500">
                {detail.ticket.source === 'workspace' ? 'Workspace' : 'Widget'}
              </span>
            )}
          </div>
        </div>

        <div className="px-6 py-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-5">
            Timeline ({timeline.length})
          </h2>
          {timeline.length === 0 ? (
            <p className="text-slate-500 text-sm">No activity yet.</p>
          ) : (
            <div className="space-y-0">
              {timeline.map((item, index) => (
                <div key={item.id} className="relative pl-12 pb-6 last:pb-0">
                  {index < timeline.length - 1 && (
                    <div className="absolute left-[19px] top-10 bottom-0 w-px bg-slate-800" />
                  )}
                  <div className="absolute left-0 top-1 w-10 h-10 rounded-full border border-slate-700 bg-slate-950 flex items-center justify-center text-slate-300 text-sm">
                    {item.kind === 'comment' ? '💬' : '•'}
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-sm font-medium text-white">
                        {item.kind === 'comment' ? (item.authorName || 'Anonymous') : (item.createdByName || 'System')}
                      </span>
                      <span className="text-xs text-slate-500">{new Date(item.createdAt).toLocaleString()}</span>
                    </div>

                    {item.kind === 'comment' ? (
                      <>
                        <p className="text-sm text-slate-300 whitespace-pre-wrap">{item.body}</p>
                        <AttachmentList attachments={item.attachments} />
                      </>
                    ) : (
                      <>
                        <div className="text-sm text-slate-200">{renderActivityLabel(item)}</div>
                        <AttachmentList attachments={item.attachments} />
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
