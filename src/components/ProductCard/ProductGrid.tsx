"use client";
import React from "react";
import ProductCard, { ProductCardData } from "./ProductCard";
import "./ProductCard.css";

interface ProductGridProps {
  products: ProductCardData[];
  onWishlistToggle?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  showWishlist?: boolean;
  showAddToCart?: boolean;
  variant?: "default" | "compact" | "detailed";
  className?: string;
  loading?: boolean;
  emptyMessage?: string;
  loadingCount?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onWishlistToggle,
  onAddToCart,
  showWishlist = true,
  showAddToCart = true,
  variant = "default",
  className = "",
  loading = false,
  emptyMessage = "No products found",
  loadingCount = 12,
}) => {
  // Create loading skeleton products
  const loadingProducts = Array.from({ length: loadingCount }, (_, index) => ({
    id: `loading-${index}`,
    imageUrl: "",
    title: "Loading...",
    tags: [],
    price: 0,
    rating: 0,
  }));

  const displayProducts = loading ? loadingProducts : products;

  if (!loading && products.length === 0) {
    return (
      <div className="products-grid-empty">
        <div className="empty-state">
          <span className="material-symbols-outlined empty-icon">
            shopping_cart
          </span>
          <h3 className="empty-title">No Products Found</h3>
          <p className="empty-description">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`products-grid ${className}`.trim()}>
      {displayProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onWishlistToggle={onWishlistToggle}
          onAddToCart={onAddToCart}
          showWishlist={showWishlist}
          showAddToCart={showAddToCart}
          variant={variant}
          className={loading ? "product-card--loading" : ""}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
