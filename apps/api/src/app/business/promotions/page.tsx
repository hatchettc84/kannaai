export default function PromotionsPage() {
  const promoTypes = [
    { icon: '🏷️', name: 'Percentage Off', desc: 'Offer % discount on selected products', example: '20% off all edibles' },
    { icon: '🎁', name: 'BOGO Deals', desc: 'Buy one get one free or discounted', example: 'Buy 2 pre-rolls, get 1 free' },
    { icon: '⭐', name: 'Featured Placement', desc: 'Boost visibility in Kanna recommendations', example: 'Your products shown first' },
    { icon: '🆕', name: 'First-Time Visitor', desc: 'Special deals for new customers', example: '15% off first purchase' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--kanna-text)' }}>Promotions</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--kanna-text-secondary)' }}>
          Create deals to attract more customers through Kanna
        </p>
      </div>

      <div className="rounded-2xl p-8 text-center mb-8" style={{ background: 'var(--kanna-surface)' }}>
        <span className="text-4xl mb-4 block">🚀</span>
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--kanna-text)' }}>Promotions Coming Soon</h2>
        <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--kanna-text-secondary)' }}>
          Launch deals, discounts, and featured placements to reach more customers through Kanna AI recommendations.
        </p>
      </div>

      <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--kanna-text)' }}>Available Promotion Types</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {promoTypes.map((promo) => (
          <div key={promo.name} className="rounded-2xl p-5" style={{ background: 'var(--kanna-surface)' }}>
            <span className="text-2xl">{promo.icon}</span>
            <h4 className="text-sm font-bold mt-3" style={{ color: 'var(--kanna-text)' }}>{promo.name}</h4>
            <p className="text-xs mt-1" style={{ color: 'var(--kanna-text-secondary)' }}>{promo.desc}</p>
            <p className="text-xs mt-2 italic" style={{ color: 'var(--kanna-green)' }}>e.g. "{promo.example}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
