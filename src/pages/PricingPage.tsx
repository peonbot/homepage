export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 md:py-24 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Simple, transparent
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              pricing.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            No per-seat charges. Everyone on your team gets access.
          </p>
        </div>
      </section>

      {/* Price card */}
      <section className="px-4 md:px-6 pb-16">
        <div className="max-w-xl mx-auto">
          <div className="bg-slate-800/50 border border-cyan-500/20 rounded-2xl p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
            <p className="text-sm text-cyan-400 font-semibold uppercase tracking-widest mb-6">All-inclusive</p>
            <div className="mb-2">
              <span className="text-slate-400 text-lg">Starting at</span>
            </div>
            <div className="mb-2">
              <span className="text-5xl md:text-6xl font-bold text-white">$12,000</span>
              <span className="text-slate-400 text-lg">/year</span>
            </div>
            <p className="text-slate-400 text-sm mb-8">
              Custom packages based on your team's volume and integrations.
            </p>
            <a href="https://forms.gle/imCy2kktZUhvrWfA8" className="inline-block px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg transition-colors text-sm">
              Talk to us
            </a>
          </div>
        </div>
      </section>

      {/* Included features */}
      <section className="py-16 px-4 md:px-6 border-t border-slate-700/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Included in all plans</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'AI Agent Deployment', desc: 'Purpose-built agents that own your workflows end to end' },
              { title: 'Workflow Automation', desc: 'Map, deploy, and automate any manual process' },
              { title: 'RunHQ Widget', desc: 'Collect user feedback anywhere on your website' },
              { title: 'Team Collaboration', desc: 'Unlimited team members with no per-seat charges' },
              { title: 'Priority Support', desc: 'Dedicated support to get you up and running fast' },
              { title: 'Security & Compliance', desc: 'Enterprise-grade security for your data and workflows' },
            ].map((feature) => (
              <div key={feature.title} className="flex items-start gap-3 bg-slate-800/30 border border-slate-700/50 rounded-xl p-5">
                <svg className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="text-white font-medium mb-1">{feature.title}</h3>
                  <p className="text-sm text-slate-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / Bottom CTA */}
      <section className="py-16 px-4 md:px-6 border-t border-slate-700/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Questions?</h2>
          <p className="text-slate-400 mb-8">
            We'll walk you through RunHQ and help you figure out the right package for your team.
          </p>
          <a href="https://forms.gle/imCy2kktZUhvrWfA8" className="inline-block px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg transition-colors text-sm">
            Talk to us
          </a>
        </div>
      </section>
    </>
  );
}
