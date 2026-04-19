
export default function WidgetPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 md:py-24 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-cyan-400 mb-4">RunHQ Widget</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            100x Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Feedback Loop
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Collect user feedback anywhere on your website and turn it into a working product instantly with agents.
          </p>
          <a href="https://forms.gle/imCy2kktZUhvrWfA8" className="inline-block px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg transition-colors text-sm">
            Request access
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 md:px-6 border-t border-slate-700/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Everything you need, nothing you don't</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8">
              <div className="text-cyan-400 text-sm font-mono mb-4">{'<script>'}</div>
              <h3 className="text-white font-semibold text-lg mb-3">2 Lines of Code</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Drop the widget on any page. No npm install, no build step, no framework dependency. Just two lines of HTML and you're live.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8">
              <div className="text-cyan-400 text-sm font-mono mb-4">{'{ ctx }'}</div>
              <h3 className="text-white font-semibold text-lg mb-3">Auto-Captured Context</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Every submission automatically includes the page URL, browser info, console logs, and JavaScript errors. No manual reproduction steps needed.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8">
              <div className="text-cyan-400 text-sm font-mono mb-4">{'agent()'}</div>
              <h3 className="text-white font-semibold text-lg mb-3">Feedback to Product</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Submissions feed into your workflow where AI agents turn user feedback into shipped features. From request to release, automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 md:px-6 border-t border-slate-700/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How it works</h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 text-center flex-1 max-w-[200px]">
              <div className="text-cyan-400 text-sm font-mono mb-2">01</div>
              <p className="text-sm text-white font-medium">User submits feedback</p>
            </div>
            <span className="text-slate-500 text-xl hidden md:block">&rarr;</span>
            <span className="text-slate-500 text-xl md:hidden">&darr;</span>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 text-center flex-1 max-w-[200px]">
              <div className="text-cyan-400 text-sm font-mono mb-2">02</div>
              <p className="text-sm text-white font-medium">Context auto-captured</p>
            </div>
            <span className="text-slate-500 text-xl hidden md:block">&rarr;</span>
            <span className="text-slate-500 text-xl md:hidden">&darr;</span>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 text-center flex-1 max-w-[200px]">
              <div className="text-cyan-400 text-sm font-mono mb-2">03</div>
              <p className="text-sm text-white font-medium">Agent processes</p>
            </div>
            <span className="text-slate-500 text-xl hidden md:block">&rarr;</span>
            <span className="text-slate-500 text-xl md:hidden">&darr;</span>
            <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-5 text-center flex-1 max-w-[200px]">
              <div className="text-cyan-400 text-sm font-mono mb-2">04</div>
              <p className="text-sm text-white font-medium">Feature ships</p>
            </div>
          </div>
        </div>
      </section>

      {/* Code example */}
      <section className="py-16 px-4 md:px-6 border-t border-slate-700/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Get started in seconds</h2>
          <p className="text-slate-400 text-center mb-8">Add the widget to any page with just two lines.</p>

          <div className="bg-slate-950 border border-slate-700/50 rounded-xl p-6 font-mono text-sm overflow-x-auto">
            <div className="text-slate-500 mb-2">{'<!-- Add to your HTML -->'}</div>
            <div>
              <span className="text-cyan-400">{'<script '}</span>
              <span className="text-blue-400">src</span>
              <span className="text-white">{"="}</span>
              <span className="text-green-400">"https://widget.runhq.io/v1.js"</span>
              <span className="text-cyan-400">{'></script>'}</span>
            </div>
            <div>
              <span className="text-cyan-400">{'<script>'}</span>
              <span className="text-white">RunHQ.</span>
              <span className="text-blue-400">init</span>
              <span className="text-white">{'({ '}</span>
              <span className="text-blue-400">project</span>
              <span className="text-white">{': '}</span>
              <span className="text-green-400">"your-project-id"</span>
              <span className="text-white">{' })'}</span>
              <span className="text-cyan-400">{'</script>'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-6 border-t border-slate-700/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Close the loop on user feedback</h2>
          <p className="text-slate-400 mb-8">Stop losing feedback in spreadsheets. Start shipping what users actually want.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://forms.gle/imCy2kktZUhvrWfA8" className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg transition-colors text-sm">
              Request access
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
