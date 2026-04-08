'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [dispensaryName, setDispensaryName] = useState('Your Dispensary');

  useEffect(() => {
    const stored = localStorage.getItem('biz_session');
    if (stored) {
      try {
        const session = JSON.parse(stored);
        setDispensaryName(session.dispensaryName);
      } catch {}
    }
  }, []);
  const stats = [
    { label: 'Total Products', value: '24', change: '+3 this week', icon: '📦' },
    { label: 'Views This Week', value: '1,247', change: '+12%', icon: '👁️' },
    { label: 'Kanna Recommendations', value: '89', change: '+23%', icon: '🌿' },
    { label: 'Navigation Clicks', value: '342', change: '+8%', icon: '🗺️' },
  ];

  const recentActivity = [
    { action: 'Blue Dream Flower recommended by Kanna', time: '2 min ago', type: 'recommendation' },
    { action: 'User navigated to your dispensary', time: '15 min ago', type: 'navigation' },
    { action: 'Watermelon Gummies viewed 12 times', time: '1 hr ago', type: 'view' },
    { action: 'New review: "Great selection!" ★★★★★', time: '3 hrs ago', type: 'review' },
    { action: '10% off promotion started', time: '5 hrs ago', type: 'promo' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--kanna-text)' }}>Dashboard</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--kanna-text-secondary)' }}>
            Welcome back, {dispensaryName}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 rounded-xl text-sm font-semibold"
            style={{ background: 'var(--kanna-surface)', color: 'var(--kanna-text)' }}
          >
            Update Hours
          </button>
          <button
            className="px-4 py-2 rounded-xl text-sm font-semibold"
            style={{ background: 'var(--kanna-green)', color: 'var(--kanna-bg)' }}
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl p-5"
            style={{ background: 'var(--kanna-surface)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: 'rgba(46,204,113,0.15)', color: 'var(--kanna-green)' }}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold" style={{ color: 'var(--kanna-text)' }}>{stat.value}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--kanna-text-secondary)' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl p-6" style={{ background: 'var(--kanna-surface)' }}>
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--kanna-text)' }}>Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-3 border-b last:border-0"
              style={{ borderColor: 'rgba(255,255,255,0.05)' }}
            >
              <p className="text-sm" style={{ color: 'var(--kanna-text)' }}>{item.action}</p>
              <p className="text-xs shrink-0 ml-4" style={{ color: 'var(--kanna-text-secondary)' }}>{item.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
