const SIGNUP_URL = 'https://app.runhq.io/signup';

const QUICK_LINKS: { title: string; desc: string; href: string }[] = [
  { title: 'Get an account', desc: 'Create your workspace and your first project.', href: SIGNUP_URL },
  { title: 'Install the widget', desc: 'Two lines of code to start collecting feedback.', href: '/widget' },
  { title: 'Talk to us', desc: 'Walkthroughs, integrations, and onboarding help.', href: SIGNUP_URL },
];

const CONCEPTS: { title: string; desc: string }[] = [
  {
    title: 'Feedback loop',
    desc: 'A signal lifecycle: feedback comes in, an agent does the work, you review, the loop closes. Every step is tracked.',
  },
  {
    title: 'Projects',
    desc: 'A workspace for a single product surface. Each project has its own feedback inbox, agents, and integrations.',
  },
  {
    title: 'Agents',
    desc: 'Purpose-built workers that own a workflow end to end. They pick up structured work, execute it, and surface a result for human review.',
  },
  {
    title: 'Tickets',
    desc: 'The unit of work an agent acts on. Tickets carry user signal, captured context, and the agent\'s proposed change.',
  },
];

const SECTIONS: { id: string; title: string; rows: { label: string; status?: string }[] }[] = [
  {
    id: 'install',
    title: 'Installation & setup',
    rows: [
      { label: 'Create a workspace' },
      { label: 'Connect Slack, Linear, GitHub, or Intercom' },
      { label: 'Drop the widget into your site (2 lines)' },
      { label: 'Invite your team — no per-seat charges' },
    ],
  },
  {
    id: 'widget',
    title: 'Widget',
    rows: [
      { label: 'Quick install' },
      { label: 'Auto-captured context (page, browser, console, errors)' },
      { label: 'Custom themes', status: 'Coming soon' },
      { label: 'Programmatic API (RunHQ.identify / .open)', status: 'Coming soon' },
    ],
  },
  {
    id: 'agents',
    title: 'Agents',
    rows: [
      { label: 'How agents pick up tickets' },
      { label: 'Reviewing and approving proposed changes' },
      { label: 'Routing rules and prioritization' },
      { label: 'Custom agent workflows', status: 'Coming soon' },
    ],
  },
  {
    id: 'api',
    title: 'API & webhooks',
    rows: [
      { label: 'REST endpoints', status: 'Coming soon' },
      { label: 'Webhook payloads', status: 'Coming soon' },
      { label: 'Authentication (API keys)', status: 'Coming soon' },
    ],
  },
];

export default function DocsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 md:py-24 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-cyan-400 mb-4">Documentation</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Build the loop
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              in an afternoon.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Get the widget on your site, hook up your tools, and let agents start turning user feedback into shipped product.
          </p>
        </div>
      </section>

      {/* Quick start */}
      <section className="py-12 px-4 md:px-6 border-t border-slate-700/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2">Start here</h2>
          <p className="text-slate-400 mb-8 text-sm">Three actions get you from zero to your first agent run.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {QUICK_LINKS.map((link, i) => (
              <a
                key={link.title}
                href={link.href}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/30 transition-colors group block"
              >
                <div className="text-cyan-400 text-sm font-mono mb-3">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-white font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{link.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Concepts */}
      <section className="py-16 px-4 md:px-6 border-t border-slate-700/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2">Concepts</h2>
          <p className="text-slate-400 mb-8 text-sm">The four primitives RunHQ is built on.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CONCEPTS.map((c) => (
              <div key={c.title} className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-white font-semibold text-lg mb-2">{c.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reference table of contents */}
      <section className="py-16 px-4 md:px-6 border-t border-slate-700/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2">Reference</h2>
          <p className="text-slate-400 mb-8 text-sm">
            We're filling these in as we ship. Items marked <em className="text-slate-500 not-italic">Coming soon</em> aren't yet documented — for now, sign up and we'll walk you through them directly.
          </p>

          <div className="space-y-6">
            {SECTIONS.map((section) => (
              <div key={section.id} className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-white font-semibold text-lg mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.rows.map((row) => (
                    <li key={row.label} className="flex items-center justify-between text-sm">
                      <span className={row.status ? 'text-slate-500' : 'text-slate-300'}>{row.label}</span>
                      {row.status && (
                        <span className="text-xs text-slate-500 border border-slate-700/60 rounded-full px-2 py-0.5">
                          {row.status}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-6 border-t border-slate-700/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need a hand getting set up?</h2>
          <p className="text-slate-400 mb-8">
            Sign up and we'll walk you through your first integration personally — most teams are live in under an hour.
          </p>
          <a
            href={SIGNUP_URL}
            className="inline-block px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg transition-colors text-sm"
          >
            Get started
          </a>
        </div>
      </section>
    </>
  );
}
