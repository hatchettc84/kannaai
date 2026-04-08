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
          Your Personal Cannabis Concierge
        </p>
        <p className="text-sm mb-10 leading-relaxed" style={{ color: 'var(--kanna-text-secondary)' }}>
          Tell Kanna how you feel and get personalized strain recommendations,
          find dispensaries near you, and reserve for pickup — all powered by AI.
        </p>

        <a
          href="https://www.kannai.com"
          className="px-8 py-4 rounded-2xl text-base font-bold inline-block mb-4"
          style={{ background: 'var(--kanna-green)', color: 'var(--kanna-bg)' }}
        >
          Download the App
        </a>

        <div className="flex gap-3 justify-center mb-4">
          <a
            href="https://biz.kannai.com"
            className="text-sm underline"
            style={{ color: 'var(--kanna-text-secondary)' }}
          >
            Are you a dispensary? →
          </a>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-4 gap-4 max-w-4xl w-full">
        {[
          { icon: '💬', title: 'Chat with Kanna', desc: 'Tell her how you feel — she recommends the perfect strain' },
          { icon: '🛒', title: 'Shop Products', desc: 'Browse flower, edibles, drinks, and more from local dispensaries' },
          { icon: '🗺️', title: 'Find Nearby', desc: 'GPS-powered dispensary search with real-time inventory' },
          { icon: '📱', title: 'Reserve Ahead', desc: 'Reserve products for pickup — pay when you arrive' },
        ].map((f) => (
          <div key={f.title} className="rounded-2xl p-5 text-center" style={{ background: 'var(--kanna-surface)' }}>
            <span className="text-2xl">{f.icon}</span>
            <h3 className="text-sm font-bold mt-3" style={{ color: 'var(--kanna-text)' }}>{f.title}</h3>
            <p className="text-xs mt-1" style={{ color: 'var(--kanna-text-secondary)' }}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Business CTA */}
      <div className="mt-16 rounded-2xl p-8 max-w-2xl w-full text-center" style={{ background: 'var(--kanna-surface)' }}>
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--kanna-text)' }}>
          Own a Dispensary?
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--kanna-text-secondary)' }}>
          List your products on KannaAI, manage inventory, run promotions, and get discovered by customers through AI-powered recommendations.
        </p>
        <a
          href="https://biz.kannai.com"
          className="px-6 py-3 rounded-2xl text-sm font-bold inline-block"
          style={{ background: 'var(--kanna-green)', color: 'var(--kanna-bg)' }}
        >
          Get Started — Kanna for Business
        </a>
      </div>

      <footer className="mt-16 pb-8 text-center">
        <p className="text-xs" style={{ color: 'var(--kanna-text-secondary)' }}>
          KannaAI · Must be 21+ · Not medical advice · © 2026
        </p>
      </footer>
    </div>
  );
}
