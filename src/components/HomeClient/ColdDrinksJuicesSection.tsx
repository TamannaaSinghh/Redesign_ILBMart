import React from "react";
import ProductSection from "./ProductSection";

interface Product {
  id: string;
  imageUrl: string;
  title: string;
  tags: string[];
  price: number;
  originalPrice: number;
  rating: number;
  isWishlisted: boolean;
  isAddedToCart: boolean;
}

interface SectionProps {
  products: Product[];
  toggleWishlist: (id: string) => void;
  toggleAddToCart: (id: string) => void;
}

const ColdDrinksJuicesSection: React.FC<SectionProps> = ({ products, toggleWishlist, toggleAddToCart }) => (
  <ProductSection
    title="Cold Drinks & Juices"
    products={products}
    toggleWishlist={toggleWishlist}
    toggleAddToCart={toggleAddToCart}
  />
);

export default ColdDrinksJuicesSection; 