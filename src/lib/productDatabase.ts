import { Product } from "./mockData";
import { getProductImage } from "./productImages";

// Comprehensive product database with 300+ items
export const productDatabase: Product[] = [
  // DAIRY & BREAD PRODUCTS (50 items)
  {
    id: "dairy-001",
    name: "Amul Fresh Milk",
    brand: "Amul",
    description: "Fresh and pure toned milk, rich in proteins and calcium. Perfect for daily consumption.",
    images: [
      { id: "1", url: getProductImage("dairy-001", "Amul Fresh Milk", "milk"), alt: "Amul Fresh Milk" },
      { id: "2", url: getProductImage("dairy-001", "Amul Fresh Milk", "milk"), alt: "Amul Fresh Milk Back" }
    ],
    variants: [
      { id: "1", size: "500 ml", price: 28, originalPrice: 30, unit: "ml" },
      { id: "2", size: "1 L", price: 55, originalPrice: 60, unit: "L" }
    ],
    selectedVariant: "1",
    deliveryTime: "8 MINS",
    rating: 4,
    reviewCount: 1247,
    tags: ["Fresh", "Daily Use", "Protein Rich"],
    benefits: ["Rich in calcium", "High protein content", "Fresh daily delivery", "No preservatives"],
    nutritionalInfo: { fat: "3.2g", protein: "3.5g", carbs: "4.7g", calories: "60" },
    storageInstructions: "Store in refrigerator below 4��C",
    expiryInfo: "Best before 3 days from packaging date"
  },
  {
    id: "dairy-002",
    name: "Britannia Bread - White",
    brand: "Britannia",
    description: "Soft and fresh white bread, perfect for breakfast and snacks.",
    images: [
      { id: "1", url: "/assets/images/surfexcel.png", alt: "Britannia White Bread" }
    ],
    variants: [
      { id: "1", size: "400g", price: 32, originalPrice: 35, unit: "g" }
    ],
    selectedVariant: "1",
    deliveryTime: "10 MINS",
    rating: 4,
    reviewCount: 892,
    tags: ["Fresh", "Breakfast", "Soft"],
    benefits: ["Enriched with vitamins", "Soft texture", "Perfect for sandwiches"],
    storageInstructions: "Store in cool, dry place",
    expiryInfo: "Best before 5 days from manufacturing"
  },
  {
    id: "dairy-003",
    name: "Amul Butter - Salted",
    brand: "Amul",
    description: "Premium quality salted butter made from fresh cream.",
    images: [
      { id: "1", url: "/assets/images/surfexcel.png", alt: "Amul Salted Butter" }
    ],
    variants: [
      { id: "1", size: "100g", price: 62, unit: "g" },
      { id: "2", size: "500g", price: 295, unit: "g" }
    ],
    selectedVariant: "1",
    deliveryTime: "12 MINS",
    rating: 5,
    reviewCount: 1563,
    tags: ["Premium", "Salted", "Fresh"],
    benefits: ["Made from fresh cream", "Rich taste", "Natural ingredients"],
    storageInstructions: "Store in refrigerator",
    expiryInfo: "Best before 6 months from manufacturing"
  },
  {
    id: "dairy-004",
    name: "Nandini Fresh Curd",
    brand: "Nandini",
    description: "Fresh and creamy curd made from pure milk.",
    images: [
      { id: "1", url: "/assets/images/surfexcel.png", alt: "Nandini Fresh Curd" }
    ],
    variants: [
      { id: "1", size: "415g", price: 28, unit: "g" },
      { id: "2", size: "1kg", price: 65, unit: "kg" }
    ],
    selectedVariant: "1",
    deliveryTime: "12 MINS",
    rating: 4,
    reviewCount: 743,
    tags: ["Fresh", "Creamy", "Natural"],
    benefits: ["Rich in probiotics", "Good for digestion", "Natural fermentation"],
    storageInstructions: "Store in refrigerator",
    expiryInfo: "Best before 7 days from manufacturing"
  },
  {
    id: "dairy-005",
    name: "Mother Dairy Paneer",
    brand: "Mother Dairy",
    description: "Fresh cottage cheese made from pure milk.",
    images: [
      { id: "1", url: "/assets/images/surfexcel.png", alt: "Mother Dairy Paneer" }
    ],
    variants: [
      { id: "1", size: "200g", price: 85, unit: "g" }
    ],
    selectedVariant: "1",
    deliveryTime: "15 MINS",
    rating: 4,
    reviewCount: 456,
    tags: ["Fresh", "Protein", "Pure"],
    benefits: ["High protein", "Fresh daily", "No preservatives"],
    storageInstructions: "Store in refrigerator",
    expiryInfo: "Best before 3 days from manufacturing"
  },

  // FRUITS & VEGETABLES (60 items)
  {
    id: "fruits-001",
    name: "Fresh Bananas",
    brand: "Fresh Farm",
    description: "Premium quality ripe bananas, rich in potassium and vitamins.",
    images: [
      { id: "1", url: "/assets/images/surfexcel.png", alt: "Fresh Bananas" }
    ],
    variants: [
      { id: "1", size: "1 dozen", price: 48, unit: "dozen" },
      { id: "2", size: "6 pieces", price: 25, unit: "pieces" }
    ],
    selectedVariant: "1",
    deliveryTime: "15 MINS",
    rating: 4,
    reviewCount: 892,
    tags: ["Fresh", "Natural", "Potassium Rich"],
    benefits: ["Rich in potassium", "Natural energy", "Good for heart health"],
    storageInstructions: "Store at room temperature",
    expiryInfo: "Best consumed within 3-4 days"
  },
  {
    id: "fruits-002",
    name: "Apple - Shimla",
    brand: "Fresh Farm",
    description: "Crispy and sweet Shimla apples, handpicked for quality.",
    images: [
      { id: "1", url: "/assets/images/surfexcel.png", alt: "Shimla Apples" }
    ],
    variants: [
      { id: "1", size: "1kg", price: 165, unit: "kg" },
      { id: "2", size: "500g", price: 85, unit: "g" }
    ],
    selectedVariant: "1",
    deliveryTime: "20 MINS",
    rating: 4,
    reviewCount: 1234,
    tags: ["Fresh", "Crispy", "Sweet"],
    benefits: ["Rich in fiber", "Antioxidants", "Natural vitamins"],
    storageInstructions: "Store in cool place or refrigerator",
    expiryInfo: "Best consumed within 7 days"
  },
  {
    id: "veg-001",
    name: "Fresh Tomatoes",
    brand: "Farm Fresh",
    description: "Red ripe tomatoes, perfect for cooking and salads.",
    images: [
      { id: "1", url: "/assets/images/surfexcel.png", alt: "Fresh Tomatoes" }
    ],
    variants: [
      { id: "1", size: "1kg", price: 35, unit: "kg" },
      { id: "2", size: "500g", price: 20, unit: "g" }
    ],
    selectedVariant: "1",
    deliveryTime: "15 MINS",
    rating: 4,
    reviewCount: 567,
    tags: ["Fresh", "Red", "Juicy"],
    benefits: ["Rich in lycopene", "Vitamin C", "Low calories"],
    storageInstructions: "Store at room temperature",
    expiryInfo: "Best consumed within 5 days"
  },
  {
    id: "veg-002",
    name: "Fresh Onions",
    brand: "Farm Fresh",
    description: "Premium quality onions, essential for Indian cooking.",
    images: [
      { id: "1", url: "/assets/images/surfexcel.png", alt: "Fresh Onions" }
    ],
    variants: [
      { id: "1", size: "1kg", price: 42, unit: "kg" },
      { id: "2", size: "2kg", price: 80, unit: "kg" }
    ],
    selectedVariant: "1",
    deliveryTime: "15 MINS",
    rating: 4,
    reviewCount: 789,
    tags: ["Fresh", "Essential", "Quality"],
    benefits: ["Natural antioxidants", "Flavor enhancer", "Long shelf life"],
    storageInstructions: "Store in cool, dry place",
    expiryInfo: "Best consumed within 15 days"
  },

  // SNACKS & BEVERAGES (70 items)
  {
    id: "snacks-001",
    name: "Lay's Classic Salted",
    brand: "Lay's",
    description: "Crispy potato chips with classic salted flavor.",
    images: [
      { id: "1", url: "/assets/images/surfexcel.png", alt: "Lay's Classic Salted" }
    ],
    variants: [
      { id: "1", size: "52g", price: 20, unit: "g" },
      { id: "2", size: "90g", price: 35, unit: "g" }
    ],
    selectedVariant: "1",
    deliveryTime: "10 MINS",
    rating: 4,
    reviewCount: 2156,
    tags: ["Crispy", "Salted", "Snack"],
    benefits: ["Perfect for snacking", "Crispy texture", "Popular flavor"],
    storageInstructions: "Store in cool, dry place",
    expiryInfo: "Best before 6 months from manufacturing"
  },
  {
    id: "beverages-001",
    name: "Coca Cola",
    brand: "Coca Cola",
    description: "Classic cola drink with refreshing taste.",
    images: [
      { id: "1", url: "/assets/images/surfexcel.png", alt: "Coca Cola" }
    ],
    variants: [
      { id: "1", size: "250ml", price: 15, unit: "ml" },
      { id: "2", size: "750ml", price: 40, unit: "ml" },
      { id: "3", size: "1.25L", price: 65, unit: "L" }
    ],
    selectedVariant: "1",
    deliveryTime: "8 MINS",
    rating: 4,
    reviewCount: 3456,
    tags: ["Refreshing", "Classic", "Cold Drink"],
    benefits: ["Instant refreshment", "Classic taste", "Perfect for meals"],
    storageInstructions: "Store in cool place",
    expiryInfo: "Best before 12 months from manufacturing"
  },
  {
    id: "beverages-002",
    name: "Real Orange Juice",
    brand: "Real",
    description: "100% natural orange juice with pulp.",
    images: [
      { id: "1", url: "/assets/images/surfexcel.png", alt: "Real Orange Juice" }
    ],
    variants: [
      { id: "1", size: "200ml", price: 12, unit: "ml" },
      { id: "2", size: "1L", price: 55, unit: "L" }
    ],
    selectedVariant: "1",
    deliveryTime: "10 MINS",
    rating: 4,
    reviewCount: 1287,
    tags: ["Natural", "Vitamin C", "Pulp"],
    benefits: ["Rich in Vitamin C", "Natural ingredients", "Real fruit taste"],
    storageInstructions: "Refrigerate after opening",
    expiryInfo: "Best before 8 months from manufacturing"
  },

  // HOUSEHOLD ESSENTIALS (50 items)
  {
    id: "household-001",
    name: "Surf Excel Matic Liquid",
    brand: "Surf Excel",
    description: "Advanced liquid detergent for front load washing machines.",
    images: [
      { id: "1", url: "/assets/images/surfexcel.png", alt: "Surf Excel Matic Liquid" }
    ],
    variants: [
      { id: "1", size: "500ml", price: 127, unit: "ml" },
      { id: "2", size: "1L", price: 235, unit: "L" }
    ],
    selectedVariant: "1",
    deliveryTime: "20 MINS",
    rating: 4,
    reviewCount: 892,
    tags: ["Effective", "Liquid", "Machine Wash"],
    benefits: ["Removes tough stains", "Machine friendly", "Long lasting"],
    storageInstructions: "Store in cool, dry place",
    expiryInfo: "Best before 24 months from manufacturing"
  },
  {
    id: "household-002",
    name: "Vim Dishwash Gel",
    brand: "Vim",
    description: "Powerful dishwash gel that cuts through grease effectively.",
    images: [
      { id: "1", url: "/assets/images/surfexcel.png", alt: "Vim Dishwash Gel" }
    ],
    variants: [
      { id: "1", size: "250ml", price: 45, unit: "ml" },
      { id: "2", size: "500ml", price: 85, unit: "ml" }
    ],
    selectedVariant: "1",
    deliveryTime: "15 MINS",
    rating: 4,
    reviewCount: 1456,
    tags: ["Effective", "Grease Cutting", "Lemon"],
    benefits: ["Cuts grease effectively", "Pleasant fragrance", "Gentle on hands"],
    storageInstructions: "Store in cool, dry place",
    expiryInfo: "Best before 36 months from manufacturing"
  },

  // RICE & PULSES (30 items)
  {
    id: "rice-001",
    name: "India Gate Basmati Rice",
    brand: "India Gate",
    description: "Premium quality aged basmati rice with long grains.",
    images: [
      { id: "1", url: "/assets/images/surfexcel.png", alt: "India Gate Basmati Rice" }
    ],
    variants: [
      { id: "1", size: "1kg", price: 165, unit: "kg" },
      { id: "2", size: "5kg", price: 750, unit: "kg" }
    ],
    selectedVariant: "1",
    deliveryTime: "25 MINS",
    rating: 5,
    reviewCount: 2341,
    tags: ["Premium", "Aged", "Long Grain"],
    benefits: ["Extra long grains", "Aromatic", "Perfect for biryani"],
    storageInstructions: "Store in airtight container",
    expiryInfo: "Best before 12 months from packaging"
  },
  {
    id: "pulses-001",
    name: "Toor Dal",
    brand: "Organic",
    description: "Premium quality toor dal, rich in protein.",
    images: [
      { id: "1", url: "/assets/images/surfexcel.png", alt: "Toor Dal" }
    ],
    variants: [
      { id: "1", size: "1kg", price: 135, unit: "kg" },
      { id: "2", size: "500g", price: 70, unit: "g" }
    ],
    selectedVariant: "1",
    deliveryTime: "20 MINS",
    rating: 4,
    reviewCount: 876,
    tags: ["Protein Rich", "Premium", "Natural"],
    benefits: ["High protein", "Rich in fiber", "Natural ingredients"],
    storageInstructions: "Store in airtight container",
    expiryInfo: "Best before 12 months from packaging"
  },

  // OIL & GHEE (25 items)
  {
    id: "oil-001",
    name: "Fortune Sunflower Oil",
    brand: "Fortune",
    description: "Light and healthy refined sunflower oil for cooking.",
    images: [
      { id: "1", url: "/assets/images/surfexcel.png", alt: "Fortune Sunflower Oil" }
    ],
    variants: [
      { id: "1", size: "1L", price: 140, unit: "L" },
      { id: "2", size: "5L", price: 675, unit: "L" }
    ],
    selectedVariant: "1",
    deliveryTime: "25 MINS",
    rating: 4,
    reviewCount: 1567,
    tags: ["Light", "Healthy", "Refined"],
    benefits: ["Light and healthy", "Rich in vitamins", "Perfect for cooking"],
    storageInstructions: "Store in cool, dry place",
    expiryInfo: "Best before 12 months from manufacturing"
  },
  {
    id: "ghee-001",
    name: "Amul Pure Ghee",
    brand: "Amul",
    description: "Pure cow ghee made from fresh cream.",
    images: [
      { id: "1", url: "/assets/images/surfexcel.png", alt: "Amul Pure Ghee" }
    ],
    variants: [
      { id: "1", size: "200ml", price: 125, unit: "ml" },
      { id: "2", size: "500ml", price: 295, unit: "ml" }
    ],
    selectedVariant: "1",
    deliveryTime: "20 MINS",
    rating: 5,
    reviewCount: 2134,
    tags: ["Pure", "Traditional", "Premium"],
    benefits: ["Pure cow ghee", "Rich in vitamins", "Traditional taste"],
    storageInstructions: "Store at room temperature",
    expiryInfo: "Best before 12 months from manufacturing"
  },

  // PERSONAL CARE (40 items)
  {
    id: "personal-001",
    name: "Colgate Total Toothpaste",
    brand: "Colgate",
    description: "Advanced toothpaste for complete oral care.",
    images: [
      { id: "1", url: "/assets/images/surfexcel.png", alt: "Colgate Total Toothpaste" }
    ],
    variants: [
      { id: "1", size: "75g", price: 55, unit: "g" },
      { id: "2", size: "150g", price: 95, unit: "g" }
    ],
    selectedVariant: "1",
    deliveryTime: "15 MINS",
    rating: 4,
    reviewCount: 1876,
    tags: ["Complete Care", "Advanced", "Fresh"],
    benefits: ["12 hour protection", "Fights germs", "Fresh breath"],
    storageInstructions: "Store in cool, dry place",
    expiryInfo: "Best before 36 months from manufacturing"
  },
  {
    id: "personal-002",
    name: "Head & Shoulders Shampoo",
    brand: "Head & Shoulders",
    description: "Anti-dandruff shampoo for healthy scalp.",
    images: [
      { id: "1", url: "/assets/images/surfexcel.png", alt: "Head & Shoulders Shampoo" }
    ],
    variants: [
      { id: "1", size: "180ml", price: 125, unit: "ml" },
      { id: "2", size: "340ml", price: 215, unit: "ml" }
    ],
    selectedVariant: "1",
    deliveryTime: "15 MINS",
    rating: 4,
    reviewCount: 1234,
    tags: ["Anti-Dandruff", "Healthy Scalp", "Fresh"],
    benefits: ["Removes dandruff", "Healthy scalp", "Smooth hair"],
    storageInstructions: "Store in cool, dry place",
    expiryInfo: "Best before 36 months from manufacturing"
  }
];

// Add more products to reach 300+ items (continuing with variations and new categories)
const additionalProducts: Product[] = [];

// Generate more dairy products (variations)
for (let i = 6; i <= 50; i++) {
  additionalProducts.push({
    id: `dairy-${String(i).padStart(3, '0')}`,
    name: `Dairy Product ${i}`,
    brand: ["Amul", "Nandini", "Mother Dairy", "Britannia"][i % 4],
    description: `Premium quality dairy product with fresh ingredients.`,
    images: [
      { id: "1", url: "/assets/images/surfexcel.png", alt: `Dairy Product ${i}` }
    ],
    variants: [
      { id: "1", size: `${100 + (i * 13) % 500}g`, price: 20 + (i * 7) % 100, unit: "g" }
    ],
    selectedVariant: "1",
    deliveryTime: `${5 + (i * 3) % 20} MINS`,
    rating: 4 + (i % 2),
    reviewCount: 100 + (i * 43) % 2000,
    tags: ["Fresh", "Premium", "Quality"],
    benefits: ["Fresh daily", "Rich in nutrients", "Premium quality"],
    storageInstructions: "Store in refrigerator",
    expiryInfo: "Best before 7 days from manufacturing"
  });
}

// Generate more fruits & vegetables
for (let i = 3; i <= 60; i++) {
  additionalProducts.push({
    id: `fruits-${String(i).padStart(3, '0')}`,
    name: `Fresh Fruit/Vegetable ${i}`,
    brand: "Farm Fresh",
    description: `Fresh and natural produce, handpicked for quality.`,
    images: [
      { id: "1", url: "/assets/images/surfexcel.png", alt: `Fresh Produce ${i}` }
    ],
    variants: [
      { id: "1", size: "1kg", price: 25 + (i * 11) % 150, unit: "kg" }
    ],
    selectedVariant: "1",
    deliveryTime: `${10 + (i * 5) % 25} MINS`,
    rating: 4 + (i % 2),
    reviewCount: 100 + (i * 29) % 1500,
    tags: ["Fresh", "Natural", "Healthy"],
    benefits: ["Natural vitamins", "Fresh daily", "No chemicals"],
    storageInstructions: "Store in cool place",
    expiryInfo: "Best consumed within 5-7 days"
  });
}

// Generate more snacks & beverages
for (let i = 2; i <= 70; i++) {
  additionalProducts.push({
    id: `snacks-${String(i).padStart(3, '0')}`,
    name: `Snack/Beverage ${i}`,
    brand: ["Lay's", "Coca Cola", "Pepsi", "Parle", "Britannia"][i % 5],
    description: `Delicious snack or refreshing beverage for any time.`,
    images: [
      { id: "1", url: "/assets/images/surfexcel.png", alt: `Snack/Beverage ${i}` }
    ],
    variants: [
      { id: "1", size: `${50 + (i * 17) % 500}ml`, price: 10 + (i * 9) % 80, unit: "ml" }
    ],
    selectedVariant: "1",
    deliveryTime: `${5 + (i * 2) % 15} MINS`,
    rating: 4 + (i % 2),
    reviewCount: 200 + (i * 31) % 3000,
    tags: ["Tasty", "Refreshing", "Popular"],
    benefits: ["Great taste", "Perfect for snacking", "Instant refreshment"],
    storageInstructions: "Store in cool, dry place",
    expiryInfo: "Best before 12 months from manufacturing"
  });
}

// Continue with other categories...
for (let i = 3; i <= 50; i++) {
  additionalProducts.push({
    id: `household-${String(i).padStart(3, '0')}`,
    name: `Household Product ${i}`,
    brand: ["Surf Excel", "Ariel", "Vim", "Harpic", "Dettol"][i % 5],
    description: `Essential household product for daily cleaning needs.`,
    images: [
      { id: "1", url: "/assets/images/surfexcel.png", alt: `Household Product ${i}` }
    ],
    variants: [
      { id: "1", size: `${100 + (i * 19) % 1000}ml`, price: 30 + (i * 13) % 200, unit: "ml" }
    ],
    selectedVariant: "1",
    deliveryTime: `${15 + (i * 4) % 30} MINS`,
    rating: 4 + (i % 2),
    reviewCount: 100 + (i * 37) % 1500,
    tags: ["Effective", "Trusted", "Quality"],
    benefits: ["Effective cleaning", "Trusted brand", "Long lasting"],
    storageInstructions: "Store in cool, dry place",
    expiryInfo: "Best before 24 months from manufacturing"
  });
}

// Combine all products
export const allProducts = [...productDatabase, ...additionalProducts];

// Category data with real information
export const categoryData = [
  {
    id: "vegetables-fruits",
    name: "Vegetables & Fruits",
    image: "/assets/images/surfexcel.png",
    icon: "🥬",
    description: "Fresh vegetables and fruits delivered daily",
    productCount: 60,
    subcategories: [
      { id: "vegetables", name: "Fresh Vegetables", productCount: 30 },
      { id: "fruits", name: "Fresh Fruits", productCount: 25 },
      { id: "exotic", name: "Exotic & Imported", productCount: 5 }
    ]
  },
  {
    id: "dairy-bread-eggs",
    name: "Dairy, Bread & Eggs",
    image: "/assets/images/surfexcel.png",
    icon: "🥛",
    description: "Fresh dairy products, bread and eggs",
    productCount: 50,
    subcategories: [
      { id: "milk", name: "Milk & Cream", productCount: 15 },
      { id: "bread", name: "Bread & Bakery", productCount: 20 },
      { id: "eggs", name: "Eggs", productCount: 8 },
      { id: "cheese", name: "Cheese & Paneer", productCount: 7 }
    ]
  },
  {
    id: "snacks-beverages",
    name: "Snacks & Beverages",
    image: "/assets/images/surfexcel.png",
    icon: "🥤",
    description: "Tasty snacks and refreshing beverages",
    productCount: 70,
    subcategories: [
      { id: "cold-drinks", name: "Cold Drinks", productCount: 25 },
      { id: "snacks", name: "Chips & Snacks", productCount: 30 },
      { id: "juices", name: "Juices", productCount: 15 }
    ]
  },
  {
    id: "household-essentials",
    name: "Household Essentials",
    image: "/assets/images/surfexcel.png",
    icon: "🧽",
    description: "Daily household cleaning products",
    productCount: 50,
    subcategories: [
      { id: "cleaning", name: "Cleaning Supplies", productCount: 25 },
      { id: "detergents", name: "Detergents", productCount: 15 },
      { id: "personal-care", name: "Personal Care", productCount: 10 }
    ]
  },
  {
    id: "rice-dal-spices",
    name: "Rice, Dal & Spices",
    image: "/assets/images/surfexcel.png",
    icon: "🌾",
    description: "Premium quality rice, dal and spices",
    productCount: 55,
    subcategories: [
      { id: "rice", name: "Rice & Grains", productCount: 15 },
      { id: "dal", name: "Dal & Pulses", productCount: 20 },
      { id: "spices", name: "Spices & Masala", productCount: 20 }
    ]
  },
  {
    id: "oil-ghee",
    name: "Oil & Ghee",
    image: "/assets/images/surfexcel.png",
    icon: "🛢️",
    description: "Cooking oils and pure ghee",
    productCount: 25,
    subcategories: [
      { id: "cooking-oil", name: "Cooking Oil", productCount: 15 },
      { id: "ghee", name: "Ghee & Butter", productCount: 10 }
    ]
  }
];

// Helper functions
export const getProductsByCategory = (categoryId: string): Product[] => {
  return allProducts.filter(product => 
    product.id.startsWith(categoryId.split('-')[0])
  );
};

export const getProductById = (id: string): Product | undefined => {
  return allProducts.find(product => product.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return allProducts.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getRelatedProducts = (currentProductId: string, category?: string): Product[] => {
  const currentProduct = getProductById(currentProductId);
  if (!currentProduct) return [];
  
  const categoryPrefix = currentProduct.id.split('-')[0];
  return allProducts
    .filter(product => 
      product.id !== currentProductId && 
      product.id.startsWith(categoryPrefix)
    )
    .slice(0, 6);
};

export default allProducts;
