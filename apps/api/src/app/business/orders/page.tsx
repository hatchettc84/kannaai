'use client';

import { useState } from 'react';

interface Order {
  id: string;
  customer: string;
  items: string[];
  total: number;
  status: 'pending' | 'confirmed' | 'ready' | 'completed' | 'cancelled';
  pickupTime: string;
  createdAt: string;
}

const mockOrders: Order[] = [
  { id: 'ORD-7K2M', customer: 'Cornelius H.', items: ['Blue Dream Premium Flower', 'Watermelon Gummies 100mg'], total: 62, status: 'pending', pickupTime: 'ASAP', createdAt: '2 min ago' },
  { id: 'ORD-9P4N', customer: 'Sarah M.', items: ['Persy Live Rosin'], total: 75, status: 'confirmed', pickupTime: 'In 1 hour', createdAt: '18 min ago' },
  { id: 'ORD-3L8X', customer: 'Marcus T.', items: ['The Indica Smokes 6-Pack', 'Elderberry Gummies'], total: 62, status: 'ready', pickupTime: 'ASAP', createdAt: '45 min ago' },
  { id: 'ORD-5W1R', customer: 'Jamie K.', items: ['Cann Blood Orange 4-Pack'], total: 24, status: 'completed', pickupTime: 'In 2 hours', createdAt: '2 hrs ago' },
  { id: 'ORD-8Q6T', customer: 'Alex D.', items: ['LIIIL STIIIZY Starter Kit', 'OG Kush 3.5g'], total: 80, status: 'completed', pickupTime: 'ASAP', createdAt: '3 hrs ago' },
];

const statusColors: Record<string, { bg: string; text: string }> = {
  pending: { bg: 'rgba(243,156,18,0.15)', text: 'var(--kanna-warning)' },
  confirmed: { bg: 'rgba(52,152,219,0.15)', text: '#3498db' },
  ready: { bg: 'rgba(46,204,113,0.15)', text: 'var(--kanna-green)' },
  completed: { bg: 'rgba(138,138,163,0.15)', text: 'var(--kanna-text-secondary)' },
  cancelled: { bg: 'rgba(231,76,60,0.15)', text: 'var(--kanna-error)' },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const updateStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--kanna-text)' }}>Orders</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--kanna-text-secondary)' }}>
            {orders.filter(o => o.status === 'pending' || o.status === 'confirmed').length} active orders
          </p>
        </div>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['all', 'pending', 'confirmed', 'ready', 'completed'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap capitalize"
            style={{
              background: filter === s ? 'var(--kanna-green)' : 'var(--kanna-surface)',
              color: filter === s ? 'var(--kanna-bg)' : 'var(--kanna-text-secondary)',
            }}
          >
            {s === 'all' ? 'All Orders' : s}
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-3">
        {filtered.map((order) => {
          const sc = statusColors[order.status];
          return (
            <div key={order.id} className="rounded-2xl p-5" style={{ background: 'var(--kanna-surface)' }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold" style={{ color: 'var(--kanna-text)' }}>{order.id}</span>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full capitalize"
                      style={{ background: sc.bg, color: sc.text }}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: 'var(--kanna-text-secondary)' }}>
                    {order.customer} · {order.createdAt}
                  </p>
                </div>
                <span className="text-lg font-bold" style={{ color: 'var(--kanna-green)' }}>${order.total}</span>
              </div>

              <div className="mb-3">
                {order.items.map((item, idx) => (
                  <p key={idx} className="text-sm" style={{ color: 'var(--kanna-text)' }}>• {item}</p>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs" style={{ color: 'var(--kanna-text-secondary)' }}>
                  Pickup: {order.pickupTime}
                </p>
                <div className="flex gap-2">
                  {order.status === 'pending' && (
                    <button
                      onClick={() => updateStatus(order.id, 'confirmed')}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                      style={{ background: 'var(--kanna-green)', color: 'var(--kanna-bg)' }}
                    >
                      Confirm
                    </button>
                  )}
                  {order.status === 'confirmed' && (
                    <button
                      onClick={() => updateStatus(order.id, 'ready')}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                      style={{ background: 'var(--kanna-green)', color: 'var(--kanna-bg)' }}
                    >
                      Mark Ready
                    </button>
                  )}
                  {order.status === 'ready' && (
                    <button
                      onClick={() => updateStatus(order.id, 'completed')}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                      style={{ background: 'var(--kanna-green)', color: 'var(--kanna-bg)' }}
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
