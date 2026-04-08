'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BusinessLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Mock auth — check against known dispensary accounts
    const accounts: Record<string, { password: string; dispensaryId: string; name: string; city: string }> = {
      'greenleaf@kannaai.com': { password: 'greenleaf2026', dispensaryId: 'd1', name: 'GreenLeaf Dispensary', city: 'Los Angeles, CA' },
      'cloud9@kannaai.com': { password: 'cloud92026', dispensaryId: 'd2', name: 'Cloud 9 Cannabis', city: 'Los Angeles, CA' },
      'kushgardens@kannaai.com': { password: 'kush2026', dispensaryId: 'd3', name: 'Kush Gardens', city: 'Los Angeles, CA' },
      'demo@kannaai.com': { password: 'demo', dispensaryId: 'd1', name: 'GreenLeaf Dispensary', city: 'Los Angeles, CA' },
    };

    await new Promise((r) => setTimeout(r, 800)); // Simulate network delay

    const account = accounts[email.toLowerCase()];
    if (account && account.password === password) {
      // Store session in localStorage
      localStorage.setItem('biz_session', JSON.stringify({
        email: email.toLowerCase(),
        dispensaryId: account.dispensaryId,
        dispensaryName: account.name,
        city: account.city,
        loggedInAt: new Date().toISOString(),
      }));
      router.push('/business');
    } else {
      setError('Invalid email or password');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--kanna-bg)' }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-5xl">🌿</span>
          <h1 className="text-2xl font-bold mt-4" style={{ color: 'var(--kanna-text)' }}>Kanna for Business</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--kanna-text-secondary)' }}>
            Dispensary Management Portal
          </p>
        </div>

        <form onSubmit={handleLogin} className="rounded-2xl p-6" style={{ background: 'var(--kanna-surface)' }}>
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(231,76,60,0.15)', color: 'var(--kanna-error)' }}>
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--kanna-text-secondary)' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@dispensary.com"
              required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: 'var(--kanna-bg)', color: 'var(--kanna-text)' }}
            />
          </div>

          <div className="mb-6">
            <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--kanna-text-secondary)' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: 'var(--kanna-bg)', color: 'var(--kanna-text)' }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl text-sm font-bold"
            style={{
              background: isLoading ? 'var(--kanna-surface-light)' : 'var(--kanna-green)',
              color: isLoading ? 'var(--kanna-text-secondary)' : 'var(--kanna-bg)',
            }}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-xs" style={{ color: 'var(--kanna-text-secondary)' }}>
            Want to list your dispensary on KannaAI?
          </p>
          <a href="mailto:business@kannaai.com" className="text-xs font-semibold" style={{ color: 'var(--kanna-green)' }}>
            Contact us to get started
          </a>
        </div>

        {/* Demo hint */}
        <div className="mt-8 rounded-xl p-4 text-center" style={{ background: 'var(--kanna-surface)' }}>
          <p className="text-xs mb-1" style={{ color: 'var(--kanna-text-secondary)' }}>Demo accounts:</p>
          <p className="text-xs" style={{ color: 'var(--kanna-text-secondary)' }}>
            <span style={{ color: 'var(--kanna-text)' }}>demo@kannaai.com</span> / <span style={{ color: 'var(--kanna-text)' }}>demo</span>
          </p>
        </div>
      </div>
    </div>
  );
}
