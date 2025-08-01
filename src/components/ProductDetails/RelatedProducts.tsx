"use client";
import React, { useMemo, useState } from "react";
import ProductGrid from "@/components/ProductCard/ProductGrid";
import { ProductCardData } from "@/components/ProductCard/ProductCard";
import { getRelatedProducts } from "@/lib/mockData";

interface RelatedProductsProps {
  currentProductId: string;
  category?: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ 
  currentProductId, 
  category = "general" 
}) => {
  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(new Set());
  const [cartItems, setCartItems] = useState<Set<string>>(new Set());

  // Get related products and convert to ProductCardData format
  const relatedProducts: ProductCardData[] = useMemo(() => {
    const products = getRelatedProducts(category, currentProductId);
    return products.map(product => ({
      ...product,
      isWishlisted: wishlistedItems.has(product.id),
      isAddedToCart: cartItems.has(product.id),
    }));
  }, [category, currentProductId, wishlistedItems, cartItems]);

  const handleWishlistToggle = (id: string) => {
    setWishlistedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleAddToCart = (id: string) => {
    setCartItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="related-products">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="material-symbols-outlined">recommend</span>
            You might also like
          </h2>
          <p className="section-subtitle">
            Similar products that other customers have enjoyed
          </p>
        </div>
        
        <ProductGrid
          products={relatedProducts}
          onWishlistToggle={handleWishlistToggle}
          onAddToCart={handleAddToCart}
          variant="compact"
          className="related-products-grid"
        />
      </div>
    </section>
  );
};

export default RelatedProducts;
