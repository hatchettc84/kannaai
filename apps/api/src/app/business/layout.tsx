'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/business', label: 'Dashboard', icon: '📊' },
  { href: '/business/orders', label: 'Orders', icon: '🛒' },
  { href: '/business/inventory', label: 'Inventory', icon: '📦' },
  { href: '/business/promotions', label: 'Promotions', icon: '🔥' },
  { href: '/business/analytics', label: 'Analytics', icon: '📈' },
  { href: '/business/settings', label: 'Settings', icon: '⚙️' },
];

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname === '/business/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen" style={{ background: 'var(--kanna-bg)' }}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform duration-200 md:relative md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: 'var(--kanna-surface)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <span className="text-2xl">🌿</span>
          <div>
            <h1 className="text-lg font-bold" style={{ color: 'var(--kanna-text)' }}>Kanna</h1>
            <p className="text-xs" style={{ color: 'var(--kanna-green)' }}>for Business</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-colors"
                style={{
                  background: isActive ? 'rgba(46,204,113,0.15)' : 'transparent',
                  color: isActive ? 'var(--kanna-green)' : 'var(--kanna-text-secondary)',
                }}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Dispensary info */}
        <div className="px-6 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <p className="text-sm font-semibold" style={{ color: 'var(--kanna-text)' }}>GreenLeaf Dispensary</p>
          <p className="text-xs" style={{ color: 'var(--kanna-text-secondary)' }}>Los Angeles, CA</p>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile header */}
        <div className="flex items-center gap-3 px-4 py-3 md:hidden border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg"
            style={{ background: 'var(--kanna-surface)' }}
          >
            <span className="text-lg">☰</span>
          </button>
          <span className="text-lg">🌿</span>
          <span className="font-bold" style={{ color: 'var(--kanna-text)' }}>Kanna for Business</span>
        </div>

        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
