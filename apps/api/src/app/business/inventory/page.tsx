'use client';

import { useState } from 'react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  thc: string;
  inStock: boolean;
  promoted: boolean;
}

const initialInventory: InventoryItem[] = [
  { id: '1', name: 'Blue Dream Premium Flower', category: 'Flower', brand: 'Cookies', price: 40, thc: '21%', inStock: true, promoted: true },
  { id: '2', name: 'Watermelon Gummies 100mg', category: 'Edibles', brand: 'Kanha', price: 22, thc: '100mg', inStock: true, promoted: false },
  { id: '3', name: 'Blood Orange Cardamom', category: 'Drinks', brand: 'Cann', price: 6, thc: '2mg', inStock: true, promoted: false },
  { id: '4', name: 'Persy Live Rosin', category: 'Concentrates', brand: '710 Labs', price: 75, thc: '78%', inStock: true, promoted: false },
  { id: '5', name: 'The Indica Smokes 6-Pack', category: 'Pre-rolls', brand: 'Lowell Farms', price: 38, thc: '24%', inStock: true, promoted: false },
  { id: '6', name: 'Releaf Balm 1:3 CBD', category: 'Topicals', brand: 'Papa & Barkley', price: 34, thc: '60mg', inStock: true, promoted: false },
  { id: '7', name: '1:1 CBD:THC Drops', category: 'Tinctures', brand: 'Care By Design', price: 38, thc: '150mg', inStock: true, promoted: false },
  { id: '8', name: 'LIIIL STIIIZY Starter Kit', category: 'Accessories', brand: 'Stiiizy', price: 25, thc: 'N/A', inStock: true, promoted: false },
  { id: '9', name: 'Elderberry Gummies', category: 'Edibles', brand: 'Wyld', price: 24, thc: '100mg', inStock: true, promoted: false },
  { id: '10', name: 'OG Kush 3.5g', category: 'Flower', brand: 'Connected', price: 55, thc: '26%', inStock: false, promoted: false },
  { id: '11', name: 'Mango Cart 1g', category: 'Concentrates', brand: 'Raw Garden', price: 45, thc: '85%', inStock: true, promoted: false },
  { id: '12', name: 'Midnight Mint CBN Gummies', category: 'Edibles', brand: 'Camino', price: 22, thc: '5mg+CBN', inStock: true, promoted: false },
];

const categories = ['All', 'Flower', 'Edibles', 'Drinks', 'Concentrates', 'Pre-rolls', 'Topicals', 'Tinctures', 'Accessories'];

export default function InventoryPage() {
  const [inventory, setInventory] = useState(initialInventory);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = inventory.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = !search || item.name.toLowerCase().includes(search.toLowerCase()) || item.brand.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleStock = (id: string) => {
    setInventory((prev) => prev.map((item) => item.id === id ? { ...item, inStock: !item.inStock } : item));
  };

  const togglePromoted = (id: string) => {
    setInventory((prev) => prev.map((item) => item.id === id ? { ...item, promoted: !item.promoted } : item));
  };

  const deleteItem = (id: string) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--kanna-text)' }}>Inventory</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--kanna-text-secondary)' }}>
            {inventory.filter(i => i.inStock).length} of {inventory.length} products in stock
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl text-sm font-semibold"
          style={{ background: 'var(--kanna-green)', color: 'var(--kanna-bg)' }}
        >
          + Add Product
        </button>
      </div>

      {/* Search + Category Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products or brands..."
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{ background: 'var(--kanna-surface)', color: 'var(--kanna-text)' }}
          />
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
            style={{
              background: activeCategory === cat ? 'var(--kanna-green)' : 'var(--kanna-surface)',
              color: activeCategory === cat ? 'var(--kanna-bg)' : 'var(--kanna-text-secondary)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--kanna-surface)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--kanna-text-secondary)' }}>Product</th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider hidden sm:table-cell" style={{ color: 'var(--kanna-text-secondary)' }}>Category</th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--kanna-text-secondary)' }}>Price</th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider hidden md:table-cell" style={{ color: 'var(--kanna-text-secondary)' }}>THC</th>
              <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--kanna-text-secondary)' }}>Stock</th>
              <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider hidden sm:table-cell" style={{ color: 'var(--kanna-text-secondary)' }}>Boost</th>
              <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--kanna-text-secondary)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td className="px-4 py-4">
                  <p className="text-sm font-semibold" style={{ color: 'var(--kanna-text)' }}>{item.name}</p>
                  <p className="text-xs" style={{ color: 'var(--kanna-text-secondary)' }}>{item.brand}</p>
                </td>
                <td className="px-4 py-4 hidden sm:table-cell">
                  <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'var(--kanna-surface-light)', color: 'var(--kanna-text-secondary)' }}>
                    {item.category}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm font-semibold" style={{ color: 'var(--kanna-green)' }}>${item.price}</p>
                </td>
                <td className="px-4 py-4 hidden md:table-cell">
                  <p className="text-sm" style={{ color: 'var(--kanna-text-secondary)' }}>{item.thc}</p>
                </td>
                <td className="px-4 py-4 text-center">
                  <button
                    onClick={() => toggleStock(item.id)}
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: item.inStock ? 'rgba(46,204,113,0.15)' : 'rgba(231,76,60,0.15)',
                      color: item.inStock ? 'var(--kanna-green)' : 'var(--kanna-error)',
                    }}
                  >
                    {item.inStock ? 'In Stock' : 'Out'}
                  </button>
                </td>
                <td className="px-4 py-4 text-center hidden sm:table-cell">
                  <button
                    onClick={() => togglePromoted(item.id)}
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: item.promoted ? 'rgba(212,168,67,0.15)' : 'rgba(138,138,138,0.1)',
                      color: item.promoted ? 'var(--kanna-gold, #D4A843)' : 'var(--kanna-text-secondary)',
                    }}
                  >
                    {item.promoted ? '⭐ Promoted' : 'Boost'}
                  </button>
                </td>
                <td className="px-4 py-4 text-right">
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-xs px-2 py-1 rounded"
                    style={{ color: 'var(--kanna-error)' }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm" style={{ color: 'var(--kanna-text-secondary)' }}>No products found</p>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md rounded-2xl p-6" style={{ background: 'var(--kanna-surface)' }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--kanna-text)' }}>Add Product</h2>
            <div className="space-y-3">
              {['Product Name', 'Brand', 'Price', 'THC Content'].map((label) => (
                <div key={label}>
                  <label className="text-xs font-semibold uppercase tracking-wider mb-1 block" style={{ color: 'var(--kanna-text-secondary)' }}>{label}</label>
                  <input
                    type="text"
                    placeholder={label}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--kanna-bg)', color: 'var(--kanna-text)' }}
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-1 block" style={{ color: 'var(--kanna-text-secondary)' }}>Category</label>
                <select className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--kanna-bg)', color: 'var(--kanna-text)' }}>
                  {categories.filter(c => c !== 'All').map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: 'var(--kanna-bg)', color: 'var(--kanna-text-secondary)' }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: 'var(--kanna-green)', color: 'var(--kanna-bg)' }}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
