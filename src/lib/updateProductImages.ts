// Utility to update all product images in the database
import { getProductImage } from './productImages';

/**
 * Updates image URLs for all products to use the enhanced image system
 * This function can be used to bulk update product images
 */
export function updateAllProductImages(products: any[]): any[] {
  return products.map(product => ({
    ...product,
    images: product.images.map((image: any, index: number) => ({
      ...image,
      url: getProductImage(product.id, product.name, product.brand)
    }))
  }));
}

/**
 * Get enhanced image URL for a legacy product card
 * @param product - Product data with imageUrl field
 * @returns Enhanced image URL
 */
export function getEnhancedImageUrl(product: {
  id: string;
  title: string;
  imageUrl?: string;
  brand?: string;
}): string {
  // If product already has a good image URL, use it
  if (product.imageUrl && 
      product.imageUrl !== "/assets/images/default-img.png" && 
      product.imageUrl !== "/assets/images/surfexcel.png" &&
      !product.imageUrl.includes('placeholder')) {
    return product.imageUrl;
  }
  
  // Otherwise, use enhanced image system
  return getProductImage(product.id, product.title, product.brand);
}

/**
 * Preload images for better performance
 */
export function preloadCriticalImages(): void {
  if (typeof window === 'undefined') return;
  
  // Preload common category images
  const criticalImages = [
    'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop&crop=center', // milk
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop&crop=center', // bread
    'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&h=300&fit=crop&crop=center', // butter
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop&crop=center', // vegetables
    'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=300&fit=crop&crop=center', // fruits
  ];
  
  criticalImages.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}
