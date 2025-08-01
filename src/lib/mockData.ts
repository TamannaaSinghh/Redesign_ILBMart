// Re-export everything from the comprehensive product database
export * from "./productDatabase";

// Import the main exports for backward compatibility
import {
  allProducts as products,
  getProductById as getProductByIdFromDB,
  getRelatedProducts as getRelatedProductsFromDB,
  categoryData
} from "./productDatabase";

// Import types
import { User, Order, Address } from "../components/Types/type";

// Maintain backward compatibility with existing code
export const mockProducts = products;

export const getProductById = getProductByIdFromDB;

export const getRelatedProducts = (category: string, excludeProductId: string) => {
  const relatedProducts = getRelatedProductsFromDB(excludeProductId, category);

  // Convert to the format expected by ProductCarousel
  return relatedProducts.map(product => ({
    id: product.id,
    imageUrl: product.images[0]?.url || "/assets/images/placeholder.png",
    title: product.name,
    tags: [product.deliveryTime || "", product.variants[0]?.size || ""].filter(Boolean),
    price: product.variants[0]?.price || 0,
    originalPrice: product.variants[0]?.originalPrice || product.variants[0]?.price || 0,
    rating: product.rating,
    isWishlisted: false,
    isAddedToCart: false,
  }));
};

// Export categories for backward compatibility
export const categories = categoryData;

// Mock user data
export const mockUser: User = {
  id: "u1",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  avatarUrl: "https://ui-avatars.com/api/?name=John+Doe&background=10B981&color=fff",
  createdAt: "2023-01-15T09:24:00Z"
};

// Mock addresses
export const mockAddresses: Address[] = [
  {
    id: "addr1",
    userId: "u1",
    name: "Home",
    addressLine1: "123 Main Street",
    addressLine2: "Apt 4B",
    city: "Springfield",
    state: "IL",
    postalCode: "62704",
    isDefault: true
  },
  {
    id: "addr2",
    userId: "u1",
    name: "Work",
    addressLine1: "456 Office Park",
    addressLine2: "Building C",
    city: "Springfield",
    state: "IL",
    postalCode: "62703",
    isDefault: false
  },
  {
    id: "addr3",
    userId: "u1",
    name: "Parent's House",
    addressLine1: "789 Family Lane",
    city: "Springfield",
    state: "IL",
    postalCode: "62701",
    isDefault: false
  }
];

// Mock orders
export const mockOrders: Order[] = [
  {
    id: "ord1",
    userId: "u1",
    items: [
      {
        id: "item1",
        productId: "dairy-001",
        name: "Amul Fresh Milk",
        price: 28,
        quantity: 2,
        imageUrl: "/assets/images/products/amul-milk.jpg"
      },
      {
        id: "item2",
        productId: "dairy-003",
        name: "Amul Butter - Salted",
        price: 62,
        quantity: 1,
        imageUrl: "/assets/images/products/amul-butter.jpg"
      }
    ],
    total: 118,
    status: "delivered",
    createdAt: "2023-05-12T14:30:00Z",
    deliveryAddress: mockAddresses[0],
    paymentMethod: "Credit Card"
  },
  {
    id: "ord2",
    userId: "u1",
    items: [
      {
        id: "item3",
        productId: "dairy-002",
        name: "Britannia Bread - White",
        price: 32,
        quantity: 1,
        imageUrl: "/assets/images/products/britannia-bread.jpg"
      }
    ],
    total: 32,
    status: "processing",
    createdAt: "2023-05-15T10:45:00Z",
    deliveryAddress: mockAddresses[1],
    paymentMethod: "UPI"
  }
];

// Default export for convenience
export default products;
