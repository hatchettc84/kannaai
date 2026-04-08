import { NextRequest, NextResponse } from 'next/server';

// TODO: Replace with Prisma + geo queries
const mockDispensaries = [
  {
    id: 'd1',
    name: 'GreenLeaf Dispensary',
    address: '420 Cannabis Blvd, Los Angeles, CA',
    latitude: 34.0522,
    longitude: -118.2437,
    isVerified: true,
  },
  {
    id: 'd2',
    name: 'Cloud 9 Cannabis',
    address: '710 High Street, Los Angeles, CA',
    latitude: 34.062,
    longitude: -118.235,
    isVerified: true,
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = parseFloat(searchParams.get('lat') || '0');
  const lng = parseFloat(searchParams.get('lng') || '0');
  const radius = parseFloat(searchParams.get('radius') || '10');

  // TODO: Implement Haversine distance filtering
  // TODO: Include inventory availability
  // TODO: Sort by distance

  return NextResponse.json({
    dispensaries: mockDispensaries,
    query: { lat, lng, radius },
  });
}
