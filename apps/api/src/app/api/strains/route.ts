import { NextRequest, NextResponse } from 'next/server';
import { STRAIN_DATABASE } from '@/lib/strain-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const search = searchParams.get('search');
  const effect = searchParams.get('effect');
  const medical = searchParams.get('medical');
  const tier = searchParams.get('tier');
  const limit = parseInt(searchParams.get('limit') || '100');
  const offset = parseInt(searchParams.get('offset') || '0');

  let results = [...STRAIN_DATABASE];

  // Filter by type
  if (type && type !== 'all') {
    results = results.filter((s) => s.type === type);
  }

  // Filter by effect
  if (effect) {
    results = results.filter((s) =>
      s.effects.some((e) => e.toLowerCase() === effect.toLowerCase())
    );
  }

  // Filter by medical use
  if (medical) {
    results = results.filter((s) =>
      s.medical.some((m) => m.toLowerCase() === medical.toLowerCase())
    );
  }

  // Filter by tier
  if (tier) {
    results = results.filter((s) => s.tier === tier);
  }

  // Search by name, effects, or medical uses
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.effects.some((e) => e.toLowerCase().includes(q)) ||
        s.medical.some((m) => m.toLowerCase().includes(q)) ||
        s.flavors.some((f) => f.toLowerCase().includes(q)) ||
        s.description?.toLowerCase().includes(q)
    );
  }

  const total = results.length;
  results = results.slice(offset, offset + limit);

  return NextResponse.json({
    strains: results,
    total,
    offset,
    limit,
  });
}
