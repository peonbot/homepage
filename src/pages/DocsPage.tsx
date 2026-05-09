export default function DocsPage() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Documentation</h1>
        <p className="text-lg text-slate-300 mb-8">
          We're putting together the docs. In the meantime, sign up and ping us — we'll walk you through it.
        </p>
        <a
          href="https://app.runhq.io/signup"
          className="inline-block px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg transition-colors"
        >
          Get started
        </a>
      </div>
    </section>
  );
}
