import { Link } from 'react-router-dom';

export default function RunHQPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 md:py-24 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-cyan-400 mb-4">RunHQ Platform</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            AI Agents for
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Your Workflows
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Put your operations on autopilot. RunHQ deploys AI agents that handle repetitive tasks, resolve tickets, and keep your team focused on what matters.
          </p>
          <a href="https://forms.gle/imCy2kktZUhvrWfA8" className="inline-block px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg transition-colors text-sm">
            Request access
          </a>
        </div>
      </section>

      {/* How it works — expanded */}
      <section className="py-16 px-4 md:px-6 border-t border-slate-700/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-2">How it works</h2>
          <p className="text-slate-400 text-center mb-12 text-sm">From manual chaos to managed agents</p>

          <div className="space-y-12">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center">
                <span className="text-cyan-400 text-2xl font-bold font-mono">01</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl text-white font-semibold mb-3">Map your workflows</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Connect your tools and let RunHQ learn how your team operates. Point it at the processes you run manually &mdash; data pipelines, vendor integrations, internal tooling, reporting loops.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-slate-800 text-slate-300 border border-slate-700/50 rounded-full px-3 py-1">Data pipelines</span>
                  <span className="text-xs bg-slate-800 text-slate-300 border border-slate-700/50 rounded-full px-3 py-1">Vendor integrations</span>
                  <span className="text-xs bg-slate-800 text-slate-300 border border-slate-700/50 rounded-full px-3 py-1">Internal tooling</span>
                  <span className="text-xs bg-slate-800 text-slate-300 border border-slate-700/50 rounded-full px-3 py-1">Reporting loops</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center">
                <span className="text-cyan-400 text-2xl font-bold font-mono">02</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl text-white font-semibold mb-3">Deploy agents</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  RunHQ spins up purpose-built AI agents that own each workflow end to end. They execute, monitor, and escalate &mdash; your team reviews outcomes, not tasks.
                </p>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-full px-3 py-1.5 whitespace-nowrap">Ticket in</span>
                    <span className="text-slate-500">&rarr;</span>
                    <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-full px-3 py-1.5 whitespace-nowrap">Agent resolves</span>
                    <span className="text-slate-500">&rarr;</span>
                    <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-full px-3 py-1.5 whitespace-nowrap">Team reviews</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center">
                <span className="text-cyan-400 text-2xl font-bold font-mono">03</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl text-white font-semibold mb-3">Retire the old stuff</h3>
                <p className="text-slate-400 leading-relaxed">
                  As agents prove out, decommission the scripts, cron jobs, and manual steps they replaced. Reduce costs up to 80% as agents take over routine operations. Less infrastructure, fewer tickets, lower costs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 md:px-6 border-t border-slate-700/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-3">80%</div>
              <h3 className="text-white font-semibold mb-2">Cost Reduction</h3>
              <p className="text-sm text-slate-400">Reduction in operational costs and manual overhead</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-3">24/7</div>
              <h3 className="text-white font-semibold mb-2">Always On</h3>
              <p className="text-sm text-slate-400">Agents resolve immediately &mdash; your team reviews outcomes, not tasks</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-3">0</div>
              <h3 className="text-white font-semibold mb-2">Replatforming</h3>
              <p className="text-sm text-slate-400">Works alongside your existing stack &mdash; replace incrementally</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-6 border-t border-slate-700/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to automate?</h2>
          <p className="text-slate-400 mb-8">Get started with RunHQ and put your operations on autopilot.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://forms.gle/imCy2kktZUhvrWfA8" className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg transition-colors text-sm">
              Request access
            </a>
            <Link to="/pricing" className="px-8 py-3 border border-slate-600 hover:border-slate-500 text-white rounded-lg transition-colors text-sm">
              View pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
