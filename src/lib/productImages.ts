// Product Image Mapping System
// This file provides category-specific and product-specific image mappings

export interface ProductImageMap {
  [key: string]: string;
}

// Category-based image mapping
export const categoryImages: ProductImageMap = {
  // Dairy & Bread
  'dairy': 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop&crop=center',
  'milk': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop&crop=center',
  'bread': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop&crop=center',
  'butter': 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&h=300&fit=crop&crop=center',
  'curd': 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=300&h=300&fit=crop&crop=center',
  'paneer': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=300&fit=crop&crop=center',
  'cheese': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&h=300&fit=crop&crop=center',
  'eggs': 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&h=300&fit=crop&crop=center',

  // Vegetables & Fruits
  'vegetables': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop&crop=center',
  'fruits': 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=300&fit=crop&crop=center',
  'onions': 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=300&h=300&fit=crop&crop=center',
  'potatoes': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=300&fit=crop&crop=center',
  'tomatoes': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&h=300&fit=crop&crop=center',
  'carrots': 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=300&h=300&fit=crop&crop=center',
  'bananas': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop&crop=center',
  'apples': 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop&crop=center',
  'oranges': 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=300&h=300&fit=crop&crop=center',

  // Cold Drinks & Juices
  'beverages': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=300&fit=crop&crop=center',
  'juice': 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=300&h=300&fit=crop&crop=center',
  'cola': 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=300&h=300&fit=crop&crop=center',
  'water': 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=300&h=300&fit=crop&crop=center',
  'energy-drink': 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=300&h=300&fit=crop&crop=center',

  // Tea & Coffee
  'tea': 'https://images.unsplash.com/photo-1564890396387-6f099d2abe82?w=300&h=300&fit=crop&crop=center',
  'coffee': 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=300&h=300&fit=crop&crop=center',

  // Atta, Rice & Dal
  'rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop&crop=center',
  'dal': 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&h=300&fit=crop&crop=center',
  'flour': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=300&fit=crop&crop=center',
  'wheat': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=300&fit=crop&crop=center',

  // Masala, Oil & Dry Fruits
  'spices': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop&crop=center',
  'oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop&crop=center',
  'nuts': 'https://images.unsplash.com/photo-1599599810694-57a2ca8276a8?w=300&h=300&fit=crop&crop=center',
  'almonds': 'https://images.unsplash.com/photo-1508747703725-719777637510?w=300&h=300&fit=crop&crop=center',

  // Snacks & Munchies
  'snacks': 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop&crop=center',
  'chips': 'https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=300&h=300&fit=crop&crop=center',
  'biscuits': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop&crop=center',

  // Instant & Frozen Food
  'instant': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=300&fit=crop&crop=center',
  'noodles': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=300&fit=crop&crop=center',
  'frozen': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=center',

  // Chicken, Meat & Fish
  'chicken': 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&h=300&fit=crop&crop=center',
  'meat': 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=300&h=300&fit=crop&crop=center',
  'fish': 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=300&h=300&fit=crop&crop=center',

  // Default fallback
  'default': 'https://images.unsplash.com/photo-1506617420156-8e4536971650?w=300&h=300&fit=crop&crop=center'
};

// Specific product image mapping (overrides category mapping)
export const productImages: ProductImageMap = {
  // Amul Products
  'dairy-001': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop&crop=center', // Amul Fresh Milk
  'dairy-003': 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&h=300&fit=crop&crop=center', // Amul Butter
  
  // Britannia Products
  'dairy-002': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop&crop=center', // Britannia Bread
  
  // Nandini Products
  'dairy-004': 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=300&h=300&fit=crop&crop=center', // Nandini Curd
  
  // Mother Dairy Products
  'dairy-005': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=300&fit=crop&crop=center', // Mother Dairy Paneer
};

/**
 * Get the appropriate image URL for a product
 * @param productId - The unique product identifier
 * @param productName - The product name for category detection
 * @param category - Optional category override
 * @returns The image URL for the product
 */
export function getProductImage(productId: string, productName: string, category?: string): string {
  // First check for specific product mapping
  if (productImages[productId]) {
    return productImages[productId];
  }
  
  // Then check category mapping
  if (category && categoryImages[category.toLowerCase()]) {
    return categoryImages[category.toLowerCase()];
  }
  
  // Auto-detect category from product name
  const name = productName.toLowerCase();
  
  // Dairy products
  if (name.includes('milk')) return categoryImages.milk;
  if (name.includes('bread')) return categoryImages.bread;
  if (name.includes('butter')) return categoryImages.butter;
  if (name.includes('curd') || name.includes('yogurt')) return categoryImages.curd;
  if (name.includes('paneer') || name.includes('cottage cheese')) return categoryImages.paneer;
  if (name.includes('cheese')) return categoryImages.cheese;
  if (name.includes('egg')) return categoryImages.eggs;
  
  // Vegetables & Fruits
  if (name.includes('onion')) return categoryImages.onions;
  if (name.includes('potato')) return categoryImages.potatoes;
  if (name.includes('tomato')) return categoryImages.tomatoes;
  if (name.includes('carrot')) return categoryImages.carrots;
  if (name.includes('banana')) return categoryImages.bananas;
  if (name.includes('apple')) return categoryImages.apples;
  if (name.includes('orange')) return categoryImages.oranges;
  if (name.includes('vegetable')) return categoryImages.vegetables;
  if (name.includes('fruit')) return categoryImages.fruits;
  
  // Beverages
  if (name.includes('juice')) return categoryImages.juice;
  if (name.includes('cola') || name.includes('pepsi') || name.includes('coke')) return categoryImages.cola;
  if (name.includes('water')) return categoryImages.water;
  if (name.includes('energy')) return categoryImages['energy-drink'];
  
  // Tea & Coffee
  if (name.includes('tea')) return categoryImages.tea;
  if (name.includes('coffee')) return categoryImages.coffee;
  
  // Grains & Pulses
  if (name.includes('rice')) return categoryImages.rice;
  if (name.includes('dal') || name.includes('lentil')) return categoryImages.dal;
  if (name.includes('flour') || name.includes('atta')) return categoryImages.flour;
  
  // Spices & Oil
  if (name.includes('oil')) return categoryImages.oil;
  if (name.includes('spice') || name.includes('masala')) return categoryImages.spices;
  if (name.includes('almond')) return categoryImages.almonds;
  if (name.includes('nuts')) return categoryImages.nuts;
  
  // Snacks
  if (name.includes('chips')) return categoryImages.chips;
  if (name.includes('biscuit') || name.includes('cookie')) return categoryImages.biscuits;
  if (name.includes('snack')) return categoryImages.snacks;
  
  // Instant Food
  if (name.includes('noodles') || name.includes('maggi')) return categoryImages.noodles;
  if (name.includes('instant')) return categoryImages.instant;
  if (name.includes('frozen')) return categoryImages.frozen;
  
  // Meat & Fish
  if (name.includes('chicken')) return categoryImages.chicken;
  if (name.includes('meat') || name.includes('mutton')) return categoryImages.meat;
  if (name.includes('fish')) return categoryImages.fish;
  
  // Default fallback
  return categoryImages.default;
}

/**
 * Get a fallback image if the primary image fails to load
 * @param productName - The product name
 * @returns A fallback image URL
 */
export function getFallbackImage(productName: string): string {
  const name = productName.toLowerCase();
  
  // Simple category detection for fallback
  if (name.includes('milk') || name.includes('dairy')) {
    return '/assets/images/categories/dairy.svg';
  }
  if (name.includes('vegetable') || name.includes('fruit')) {
    return '/assets/images/categories/produce.svg';
  }
  if (name.includes('snack') || name.includes('chips')) {
    return '/assets/images/categories/snacks.svg';
  }
  
  return '/assets/images/default-product.png';
}

/**
 * Preload critical product images for better performance
 */
export function preloadProductImages(productIds: string[]): void {
  if (typeof window === 'undefined') return;
  
  productIds.forEach(id => {
    const img = new Image();
    const imageUrl = productImages[id] || categoryImages.default;
    img.src = imageUrl;
  });
}
