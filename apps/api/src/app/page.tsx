import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-8"
      style={{ background: 'var(--kanna-bg)' }}
    >
      <div className="text-center max-w-lg">
        <div className="text-6xl mb-6">🌿</div>
        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--kanna-text)' }}>
          KannaAI
        </h1>
        <p className="text-lg font-semibold mb-4" style={{ color: 'var(--kanna-green)' }}>
          AI-Powered Cannabis Recommendations
        </p>
        <p className="text-sm mb-10" style={{ color: 'var(--kanna-text-secondary)' }}>
          The smartest way to discover cannabis. For consumers and dispensaries.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/business"
            className="px-6 py-3 rounded-2xl text-sm font-bold inline-block"
            style={{ background: 'var(--kanna-green)', color: 'var(--kanna-bg)' }}
          >
            Kanna for Business →
          </Link>
          <a
            href="http://localhost:8081"
            className="px-6 py-3 rounded-2xl text-sm font-semibold inline-block"
            style={{ background: 'var(--kanna-surface)', color: 'var(--kanna-text)' }}
          >
            Open Consumer App
          </a>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full">
        {[
          { icon: '💬', title: 'AI Concierge', desc: 'Kanna understands your mood and recommends the perfect strain' },
          { icon: '🗺️', title: 'Find Nearby', desc: 'Locate dispensaries with stock and get turn-by-turn directions' },
          { icon: '📊', title: 'For Business', desc: 'Dispensaries manage inventory, run promotions, and track analytics' },
        ].map((f) => (
          <div key={f.title} className="rounded-2xl p-5 text-center" style={{ background: 'var(--kanna-surface)' }}>
            <span className="text-3xl">{f.icon}</span>
            <h3 className="text-sm font-bold mt-3" style={{ color: 'var(--kanna-text)' }}>{f.title}</h3>
            <p className="text-xs mt-1" style={{ color: 'var(--kanna-text-secondary)' }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
