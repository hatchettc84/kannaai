import type { Strain, DispensaryWithInventory } from '@kannaai/shared';
import { STRAIN_DATABASE } from '../data/strain-database';

// Use the full 105-strain database
export const mockStrains: Strain[] = (STRAIN_DATABASE as Strain[]).map(s => ({ ...s, imageUrl: null }));

// Legacy inline array kept for reference (replaced by import above)
const _legacy: Strain[] = [
  {
    id: '1',
    name: 'Green Crack',
    type: 'sativa',
    thcMin: 18,
    thcMax: 24,
    cbdMin: 0.1,
    cbdMax: 0.3,
    effects: ['Energizing', 'Focused', 'Uplifting', 'Creative'],
    flavors: ['Citrus', 'Mango', 'Earthy'],
    terpenes: ['Myrcene', 'Caryophyllene', 'Limonene'],
    medical: ['Fatigue', 'Depression', 'Stress', 'ADHD'],
    tier: 'popular',
    description: 'A potent sativa that provides an invigorating mental buzz. Perfect for daytime use when you need energy and focus.',
    imageUrl: null,
  },
  {
    id: '2',
    name: 'Durban Poison',
    type: 'sativa',
    thcMin: 15,
    thcMax: 20,
    cbdMin: 0.1,
    cbdMax: 0.2,
    effects: ['Creative', 'Energizing', 'Happy', 'Uplifting'],
    flavors: ['Sweet', 'Pine', 'Earthy'],
    terpenes: ['Terpinolene', 'Myrcene', 'Ocimene'],
    medical: ['Depression', 'Fatigue', 'Stress', 'Nausea'],
    tier: 'classic',
    description: 'A pure sativa landrace from South Africa. Known for its sweet smell and energetic, uplifting effects.',
    imageUrl: null,
  },
  {
    id: '3',
    name: 'Jack Herer',
    type: 'sativa',
    thcMin: 18,
    thcMax: 23,
    cbdMin: 0.1,
    cbdMax: 0.2,
    effects: ['Happy', 'Creative', 'Energizing', 'Focused'],
    flavors: ['Pine', 'Spicy', 'Woody'],
    terpenes: ['Terpinolene', 'Pinene', 'Caryophyllene'],
    medical: ['Depression', 'Stress', 'Fatigue', 'ADHD'],
    tier: 'classic',
    description: 'Named after the legendary cannabis activist, this sativa-dominant strain delivers a blissful, clear-headed high.',
    imageUrl: null,
  },
  {
    id: '71',
    name: 'Blue Dream',
    type: 'hybrid',
    thcMin: 17,
    thcMax: 24,
    cbdMin: 0.1,
    cbdMax: 0.2,
    effects: ['Relaxing', 'Happy', 'Creative', 'Euphoric'],
    flavors: ['Berry', 'Sweet', 'Vanilla'],
    terpenes: ['Myrcene', 'Caryophyllene', 'Pinene'],
    medical: ['Stress', 'Depression', 'Chronic Pain', 'Anxiety'],
    tier: 'classic',
    description: 'America\'s most popular strain. A balanced hybrid delivering full-body relaxation with gentle cerebral invigoration.',
    imageUrl: null,
  },
  {
    id: '36',
    name: 'Granddaddy Purple',
    type: 'indica',
    thcMin: 17,
    thcMax: 23,
    cbdMin: 0.1,
    cbdMax: 0.1,
    effects: ['Relaxing', 'Sleepy', 'Happy', 'Pain Relief'],
    flavors: ['Grape', 'Berry', 'Sweet'],
    terpenes: ['Myrcene', 'Pinene', 'Caryophyllene'],
    medical: ['Insomnia', 'Chronic Pain', 'Stress', 'Appetite Loss'],
    tier: 'classic',
    description: 'A famous indica cross known for its purple hues and deeply relaxing effects. Ideal for evening use.',
    imageUrl: null,
  },
  {
    id: '72',
    name: 'OG Kush',
    type: 'hybrid',
    thcMin: 19,
    thcMax: 26,
    cbdMin: 0.1,
    cbdMax: 0.3,
    effects: ['Euphoric', 'Relaxing', 'Happy', 'Appetite'],
    flavors: ['Earthy', 'Pine', 'Woody'],
    terpenes: ['Myrcene', 'Limonene', 'Caryophyllene'],
    medical: ['Stress', 'Chronic Pain', 'Depression', 'Insomnia'],
    tier: 'classic',
    description: 'The backbone of West Coast cannabis. Delivers a heavy, mixed head and body effect with a complex fuel-forward flavor.',
    imageUrl: null,
  },
  {
    id: '37',
    name: 'Northern Lights',
    type: 'indica',
    thcMin: 16,
    thcMax: 21,
    cbdMin: 0.1,
    cbdMax: 0.1,
    effects: ['Relaxing', 'Sleepy', 'Euphoric', 'Pain Relief'],
    flavors: ['Earthy', 'Pine', 'Sweet'],
    terpenes: ['Myrcene', 'Caryophyllene', 'Pinene'],
    medical: ['Insomnia', 'Chronic Pain', 'Stress', 'Depression'],
    tier: 'classic',
    description: 'One of the most iconic indica strains. Known for its fast-acting, dreamy euphoria and full-body relaxation.',
    imageUrl: null,
  },
  {
    id: '73',
    name: 'Girl Scout Cookies',
    type: 'hybrid',
    thcMin: 25,
    thcMax: 28,
    cbdMin: 0.1,
    cbdMax: 0.2,
    effects: ['Euphoric', 'Happy', 'Relaxing', 'Creative'],
    flavors: ['Sweet', 'Earthy', 'Mint'],
    terpenes: ['Caryophyllene', 'Limonene', 'Humulene'],
    medical: ['Chronic Pain', 'Nausea', 'Appetite Loss', 'Stress'],
    tier: 'classic',
    description: 'A potent hybrid famous for its euphoric effects and sweet, earthy aroma. Award-winning strain with high THC.',
    imageUrl: null,
  },
];

void _legacy; // suppress unused warning

export const mockDispensaries: DispensaryWithInventory[] = [
  {
    id: 'd1',
    name: 'GreenLeaf Dispensary',
    address: '420 Cannabis Blvd',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    latitude: 34.0522,
    longitude: -118.2437,
    phone: '(213) 555-0420',
    website: 'https://greenleaf.example.com',
    hours: { mon: '9am-9pm', tue: '9am-9pm', wed: '9am-9pm', thu: '9am-9pm', fri: '9am-10pm', sat: '10am-10pm', sun: '10am-8pm' },
    isVerified: true,
    distance: 0.8,
    inventory: [
      { id: 'inv1', dispensaryId: 'd1', strainId: '1', priceEighth: 35, priceQuarter: 60, priceHalf: 110, priceOunce: 200, inStock: true },
      { id: 'inv2', dispensaryId: 'd1', strainId: '2', priceEighth: 30, priceQuarter: 55, priceHalf: 100, priceOunce: 180, inStock: true },
    ],
  },
  {
    id: 'd2',
    name: 'Cloud 9 Cannabis',
    address: '710 High Street',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90012',
    latitude: 34.0620,
    longitude: -118.2350,
    phone: '(213) 555-0710',
    website: null,
    hours: { mon: '10am-10pm', tue: '10am-10pm', wed: '10am-10pm', thu: '10am-10pm', fri: '10am-11pm', sat: '10am-11pm', sun: '11am-8pm' },
    isVerified: true,
    distance: 1.2,
    inventory: [
      { id: 'inv3', dispensaryId: 'd2', strainId: '1', priceEighth: 40, priceQuarter: 70, priceHalf: 125, priceOunce: 230, inStock: true },
      { id: 'inv4', dispensaryId: 'd2', strainId: '71', priceEighth: 45, priceQuarter: 80, priceHalf: 140, priceOunce: 260, inStock: true },
    ],
  },
  {
    id: 'd3',
    name: 'Kush Gardens',
    address: '1200 Sunset Blvd',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90026',
    latitude: 34.0775,
    longitude: -118.2600,
    phone: '(323) 555-0111',
    website: 'https://kushgardens.example.com',
    hours: { mon: '9am-8pm', tue: '9am-8pm', wed: '9am-8pm', thu: '9am-8pm', fri: '9am-9pm', sat: '10am-9pm', sun: '10am-7pm' },
    isVerified: false,
    distance: 2.1,
    inventory: [
      { id: 'inv5', dispensaryId: 'd3', strainId: '3', priceEighth: 38, priceQuarter: 65, priceHalf: 115, priceOunce: 210, inStock: true },
      { id: 'inv6', dispensaryId: 'd3', strainId: '36', priceEighth: 42, priceQuarter: 75, priceHalf: 130, priceOunce: 240, inStock: true },
    ],
  },
];

// Mock chat response logic
export function getMockRecommendations(userMessage: string): {
  text: string;
  strains: Strain[];
  dispensaries?: DispensaryWithInventory[];
} {
  const msg = userMessage.toLowerCase();

  if (msg.includes('tired') || msg.includes('energy') || msg.includes('pick me up') || msg.includes('wake') || msg.includes('focus')) {
    return {
      text: "I hear you! For a nice energy boost, I'd recommend these sativa strains that are great for focus and motivation:",
      strains: [mockStrains[0], mockStrains[1], mockStrains[2]], // Green Crack, Durban Poison, Jack Herer
    };
  }

  if (msg.includes('pain') || msg.includes('hurt') || msg.includes('ache') || msg.includes('sore')) {
    return {
      text: "I'm sorry to hear that. For pain relief, these strains are known to help. Remember, I'm not a doctor — always consult your physician for medical advice:",
      strains: [mockStrains[4], mockStrains[6], mockStrains[5]], // GDP, Northern Lights, OG Kush
    };
  }

  if (msg.includes('sleep') || msg.includes('insomnia') || msg.includes('relax') || msg.includes('anxiety') || msg.includes('stress') || msg.includes('calm')) {
    return {
      text: "Let's get you relaxed! These indica-dominant strains are perfect for winding down:",
      strains: [mockStrains[4], mockStrains[6]], // GDP, Northern Lights
    };
  }

  if (msg.includes('creative') || msg.includes('art') || msg.includes('music') || msg.includes('write')) {
    return {
      text: "Time to get those creative juices flowing! These strains are known for inspiring creativity:",
      strains: [mockStrains[2], mockStrains[3], mockStrains[7]], // Jack Herer, Blue Dream, GSC
    };
  }

  if (msg.includes('yes') || msg.includes('find') || msg.includes('dispensary') || msg.includes('dispensaries') || msg.includes('nearby') || msg.includes('where')) {
    return {
      text: "Great! I found these dispensaries near you that have what you're looking for:",
      strains: [],
      dispensaries: mockDispensaries,
    };
  }

  // Default response
  return {
    text: "I'd love to help you find the perfect strain! Tell me — are you looking to relax, get energized, relieve pain, or get creative? Or just describe how you're feeling and I'll match you up.",
    strains: [],
  };
}
