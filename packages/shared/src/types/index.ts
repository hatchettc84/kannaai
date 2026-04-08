export interface User {
  id: string;
  email: string;
  name: string | null;
  dateOfBirth: string;
  ageVerified: boolean;
  toleranceLevel: 'low' | 'medium' | 'high' | null;
  preferredTypes: StrainType[];
  medicalConditions: string[];
  createdAt: string;
}

export type StrainType = 'sativa' | 'indica' | 'hybrid';

export type StrainTier = 'popular' | 'classic' | 'trending';

export interface Strain {
  id: string;
  name: string;
  type: StrainType;
  thcMin: number | null;
  thcMax: number | null;
  cbdMin: number | null;
  cbdMax: number | null;
  effects: string[];
  flavors: string[];
  terpenes: string[];
  medical: string[];
  tier: StrainTier;
  description: string | null;
  imageUrl: string | null;
}

export interface Dispensary {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  website: string | null;
  hours: Record<string, string> | null;
  isVerified: boolean;
  distance?: number; // miles from user, computed at query time
}

export interface DispensaryInventory {
  id: string;
  dispensaryId: string;
  strainId: string;
  strain?: Strain;
  dispensary?: Dispensary;
  priceEighth: number | null;
  priceQuarter: number | null;
  priceHalf: number | null;
  priceOunce: number | null;
  inStock: boolean;
}

// === Products ===

export type ProductCategory =
  | 'flower'
  | 'edibles'
  | 'drinks'
  | 'concentrates'
  | 'pre-rolls'
  | 'topicals'
  | 'tinctures'
  | 'accessories';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  description: string;
  imageUrl: string;
  thcContent: number | null;
  cbdContent: number | null;
  priceMin: number;
  priceMax: number;
  strainType: StrainType | null;
  strainId: string | null;
  tags: string[];
  rating: number;
  reviewCount: number;
  dispensaryId?: string;      // which dispensary listed this product
  promoted?: boolean;         // boosted/featured by dispensary (paid placement)
}

export interface ProductAvailability {
  productId: string;
  dispensaryId: string;
  dispensary: Dispensary;
  price: number;
  inStock: boolean;
}

export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  strainCards?: Strain[];
  dispensaryCards?: DispensaryWithInventory[];
  createdAt: string;
}

export interface DispensaryWithInventory extends Dispensary {
  inventory: DispensaryInventory[];
}

export interface Conversation {
  id: string;
  userId: string;
  title: string | null;
  messages: ChatMessage[];
  createdAt: string;
}
