// Real product image URLs from Unsplash for different categories
export const productImages = {
  // Dairy products
  dairy: [
    "https://images.unsplash.com/photo-1559561853-08451507cbe7?w=300&h=300&fit=crop&crop=center", // Milk bottle
    "https://images.unsplash.com/photo-1551909114-c8f9db5e0c82?w=300&h=300&fit=crop&crop=center", // Bread
    "https://images.unsplash.com/photo-1569288052389-dac9b01dd653?w=300&h=300&fit=crop&crop=center", // Butter
    "https://images.unsplash.com/photo-1625938145720-ee80b0f7364a?w=300&h=300&fit=crop&crop=center", // Yogurt
    "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300&h=300&fit=crop&crop=center", // Cheese
    "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=300&h=300&fit=crop&crop=center", // Eggs
  ],
  
  // Fruits and vegetables
  fruits: [
    "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop&crop=center", // Apple
    "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop&crop=center", // Banana
    "https://images.unsplash.com/photo-1453487021974-da5342d89907?w=300&h=300&fit=crop&crop=center", // Orange
    "https://images.unsplash.com/photo-1553279091-83ba3686c627?w=300&h=300&fit=crop&crop=center", // Vegetables
    "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=300&h=300&fit=crop&crop=center", // Mixed vegetables
    "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=300&h=300&fit=crop&crop=center", // Carrots
    "https://images.unsplash.com/photo-1448375240586-882707db888b?w=300&h=300&fit=crop&crop=center", // Leafy greens
    "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=300&h=300&fit=crop&crop=center", // Tomatoes
  ],
  
  // Snacks and biscuits
  snacks: [
    "https://images.unsplash.com/photo-1559656914-a30970c1affd?w=300&h=300&fit=crop&crop=center", // Cookies
    "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=300&h=300&fit=crop&crop=center", // Chips
    "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=300&h=300&fit=crop&crop=center", // Crackers
    "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=300&h=300&fit=crop&crop=center", // Nuts
    "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=300&h=300&fit=crop&crop=center", // Granola bar
  ],
  
  // Beverages
  beverages: [
    "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=300&fit=crop&crop=center", // Juice
    "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=300&fit=crop&crop=center", // Water bottle
    "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=300&h=300&fit=crop&crop=center", // Tea
    "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=300&h=300&fit=crop&crop=center", // Coffee
    "https://images.unsplash.com/photo-1556909114-4bb80463c35b?w=300&h=300&fit=crop&crop=center", // Soda
  ],
  
  // Household items
  household: [
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop&crop=center", // Soap
    "https://images.unsplash.com/photo-1580679433481-7b6abffbf6c5?w=300&h=300&fit=crop&crop=center", // Shampoo
    "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop&crop=center", // Toothpaste
    "https://images.unsplash.com/photo-1520637836862-4d197d17c43a?w=300&h=300&fit=crop&crop=center", // Detergent
  ],
  
  // Default fallback images
  default: [
    "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=300&h=300&fit=crop&crop=center", // Generic grocery
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop&crop=center", // Shopping basket
    "https://images.unsplash.com/photo-1496412705862-e0fed267ab22?w=300&h=300&fit=crop&crop=center", // Fresh produce
  ]
};

// Function to get appropriate image for a product based on its category
export const getProductImage = (productId: string, index: number = 0): string => {
  // Determine category from product ID
  if (productId.startsWith('dairy-')) {
    return productImages.dairy[index % productImages.dairy.length];
  } else if (productId.startsWith('fruits-')) {
    return productImages.fruits[index % productImages.fruits.length];
  } else if (productId.startsWith('snacks-')) {
    return productImages.snacks[index % productImages.snacks.length];
  } else if (productId.startsWith('beverages-')) {
    return productImages.beverages[index % productImages.beverages.length];
  } else if (productId.includes('household') || productId.includes('soap') || productId.includes('detergent')) {
    return productImages.household[index % productImages.household.length];
  } else {
    return productImages.default[index % productImages.default.length];
  }
};

// Default fallback image
export const defaultProductImage = "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=300&h=300&fit=crop&crop=center";
