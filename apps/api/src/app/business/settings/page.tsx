'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--kanna-text)' }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--kanna-text-secondary)' }}>
          Manage your dispensary profile
        </p>
      </div>

      <div className="rounded-2xl p-6 mb-6" style={{ background: 'var(--kanna-surface)' }}>
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--kanna-text)' }}>Dispensary Profile</h2>
        <div className="space-y-4">
          {[
            { label: 'Dispensary Name', value: 'GreenLeaf Dispensary', type: 'text' },
            { label: 'Address', value: '420 Cannabis Blvd, Los Angeles, CA 90001', type: 'text' },
            { label: 'Phone', value: '(213) 555-0420', type: 'tel' },
            { label: 'Website', value: 'https://greenleaf.example.com', type: 'url' },
            { label: 'License Number', value: 'C10-0000123-LIC', type: 'text' },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--kanna-text-secondary)' }}>
                {field.label}
              </label>
              <input
                type={field.type}
                defaultValue={field.value}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: 'var(--kanna-bg)', color: 'var(--kanna-text)' }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl p-6 mb-6" style={{ background: 'var(--kanna-surface)' }}>
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--kanna-text)' }}>Hours of Operation</h2>
        <div className="space-y-2">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <div key={day} className="flex items-center gap-4">
              <span className="w-24 text-sm" style={{ color: 'var(--kanna-text-secondary)' }}>{day}</span>
              <input
                type="text"
                defaultValue={day === 'Sunday' ? '10am - 8pm' : day === 'Saturday' ? '10am - 10pm' : '9am - 9pm'}
                className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                style={{ background: 'var(--kanna-bg)', color: 'var(--kanna-text)' }}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        className="px-6 py-3 rounded-xl text-sm font-semibold"
        style={{ background: 'var(--kanna-green)', color: 'var(--kanna-bg)' }}
      >
        {saved ? '✓ Saved!' : 'Save Changes'}
      </button>
    </div>
  );
}
