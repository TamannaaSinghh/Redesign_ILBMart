export interface ProductVariant {
  id: string;
  size: string;
  price: number;
  originalPrice?: number;
  unit: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  images: ProductImage[];
  variants: ProductVariant[];
  selectedVariant: string;
  deliveryTime: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  nutritionalInfo?: {
    fat: string;
    protein: string;
    carbs: string;
    calories: string;
  };
  benefits?: string[];
  ingredients?: string[];
  storageInstructions?: string;
  expiryInfo?: string;
} 