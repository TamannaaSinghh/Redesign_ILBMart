"use client";
import React, { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "../ProductCard/ProductCard.css";

interface Product {
  id: number;
  imageUrl: string;
  title: string;
  tags: string[];
  price: number;
  originalPrice: number;
  rating: number;
  isWishlisted: boolean;
  isAddedToCart: boolean;
}

const initialProducts: Product[] = Array.from({ length: 36 }).map((_, i) => ({
  id: i + 1,
  imageUrl: "/assets/images/default-img.png",
  title: "Surf Excel Matic Front Load Detergent Liquid Refill |...",
  tags: ["500ml", "Cleaning"],
  price: 1000,
  originalPrice: 1400,
  rating: 4,
  isWishlisted: false,
  isAddedToCart: false,
}));

const SubcategorySectionGrid: React.FC = () => {
  const [products, setProducts] = useState(initialProducts);

  const toggleWishlist = (id: number) =>
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isWishlisted: !p.isWishlisted } : p
      )
    );

  const toggleAddToCart = (id: number) =>
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isAddedToCart: !p.isAddedToCart } : p
      )
    );

  return (
    <div className="subcategory-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          toggleWishlist={toggleWishlist}
          toggleAddToCart={toggleAddToCart}
        />
      ))}
    </div>
  );
};

export default SubcategorySectionGrid;
