export default function AnalyticsPage() {
  const topProducts = [
    { name: 'Blue Dream Premium Flower', recommendations: 234, views: 567, navClicks: 89 },
    { name: 'Watermelon Gummies 100mg', recommendations: 189, views: 423, navClicks: 67 },
    { name: 'Persy Live Rosin', recommendations: 156, views: 312, navClicks: 45 },
    { name: 'The Indica Smokes 6-Pack', recommendations: 134, views: 287, navClicks: 38 },
    { name: 'Elderberry Gummies', recommendations: 112, views: 234, navClicks: 32 },
  ];

  const weeklyData = [
    { day: 'Mon', views: 145, recs: 12, nav: 8 },
    { day: 'Tue', views: 189, recs: 15, nav: 11 },
    { day: 'Wed', views: 167, recs: 13, nav: 9 },
    { day: 'Thu', views: 203, recs: 18, nav: 14 },
    { day: 'Fri', views: 256, recs: 22, nav: 18 },
    { day: 'Sat', views: 312, recs: 28, nav: 24 },
    { day: 'Sun', views: 198, recs: 16, nav: 12 },
  ];

  const maxViews = Math.max(...weeklyData.map(d => d.views));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--kanna-text)' }}>Analytics</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--kanna-text-secondary)' }}>
          Track how your products perform on Kanna
        </p>
      </div>

      {/* Weekly Chart */}
      <div className="rounded-2xl p-6 mb-6" style={{ background: 'var(--kanna-surface)' }}>
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--kanna-text)' }}>This Week</h2>
        <div className="flex items-end gap-3 h-40">
          {weeklyData.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-lg"
                style={{
                  height: `${(d.views / maxViews) * 100}%`,
                  background: 'var(--kanna-green)',
                  opacity: 0.8,
                  minHeight: 4,
                }}
              />
              <span className="text-[10px]" style={{ color: 'var(--kanna-text-secondary)' }}>{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Products */}
      <div className="rounded-2xl p-6" style={{ background: 'var(--kanna-surface)' }}>
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--kanna-text)' }}>Top Performing Products</h2>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <th className="text-left py-2 text-xs font-semibold uppercase" style={{ color: 'var(--kanna-text-secondary)' }}>Product</th>
              <th className="text-right py-2 text-xs font-semibold uppercase" style={{ color: 'var(--kanna-text-secondary)' }}>Recs</th>
              <th className="text-right py-2 text-xs font-semibold uppercase hidden sm:table-cell" style={{ color: 'var(--kanna-text-secondary)' }}>Views</th>
              <th className="text-right py-2 text-xs font-semibold uppercase" style={{ color: 'var(--kanna-text-secondary)' }}>Nav Clicks</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((p, idx) => (
              <tr key={p.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td className="py-3">
                  <span className="text-sm" style={{ color: 'var(--kanna-text)' }}>{idx + 1}. {p.name}</span>
                </td>
                <td className="py-3 text-right">
                  <span className="text-sm font-semibold" style={{ color: 'var(--kanna-green)' }}>{p.recommendations}</span>
                </td>
                <td className="py-3 text-right hidden sm:table-cell">
                  <span className="text-sm" style={{ color: 'var(--kanna-text-secondary)' }}>{p.views}</span>
                </td>
                <td className="py-3 text-right">
                  <span className="text-sm" style={{ color: 'var(--kanna-text-secondary)' }}>{p.navClicks}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
