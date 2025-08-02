"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useInstantNavigation } from "@/lib/navigationOptimizer";
import { getProductImage, getFallbackImage } from "@/lib/productImages";

export interface ProductCardData {
  id: string;
  imageUrl: string;
  title: string;
  brand?: string;
  tags: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  deliveryTime?: string;
  isWishlisted?: boolean;
  isAddedToCart?: boolean;
  discount?: number;
  unit?: string;
  outOfStock?: boolean;
}

interface ProductCardProps {
  product: ProductCardData;
  onWishlistToggle?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  showWishlist?: boolean;
  showAddToCart?: boolean;
  variant?: "default" | "compact" | "detailed";
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onWishlistToggle,
  onAddToCart,
  showWishlist = true,
  showAddToCart = true,
  variant = "default",
  className = "",
}) => {
  const router = useRouter();
  const { navigateInstant, optimizeClick } = useInstantNavigation();
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(() => {
    // Prefer product's imageUrl, fallback to enhanced image system
    return product.imageUrl && product.imageUrl !== "/assets/images/default-img.png"
      ? product.imageUrl
      : getProductImage(product.id, product.title, product.brand);
  });

  const handleCardClick = optimizeClick(() => {
    navigateInstant(`/product/${product.id}`);
  });

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    // Instant visual feedback
    const button = e.currentTarget as HTMLElement;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = 'scale(1)';
    }, 150);

    // Trigger animation
    button.classList.add('wishlist-clicked');
    setTimeout(() => button.classList.remove('wishlist-clicked'), 600);

    onWishlistToggle?.(product.id);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!product.outOfStock) {
      // Instant visual feedback
      const button = e.currentTarget as HTMLElement;
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 150);

      // Trigger animation
      button.classList.add('cart-clicked');
      setTimeout(() => button.classList.remove('cart-clicked'), 600);

      onAddToCart?.(product.id);
    }
  };

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      // Try fallback image first
      const fallback = getFallbackImage(product.title);
      setImageSrc(fallback);
    } else {
      // If fallback also fails, use default
      setImageSrc("/assets/images/default-img.png");
    }
  };

  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discount || 0;

  const cardClasses = `
    product-card 
    ${variant === "compact" ? "product-card--compact" : ""}
    ${variant === "detailed" ? "product-card--detailed" : ""}
    ${product.outOfStock ? "product-card--out-of-stock" : ""}
    ${className}
  `.trim();

  return (
    <div className={cardClasses} onClick={handleCardClick}>
      {/* Wishlist Button */}
      {showWishlist && (
        <button
          className={`wishlist-button ${product.isWishlisted ? "wishlist-button--active" : ""}`}
          onClick={handleWishlistClick}
          aria-label={product.isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <span className="material-symbols-outlined">
            {product.isWishlisted ? "favorite" : "favorite_border"}
          </span>
        </button>
      )}

      {/* Discount Badge */}
      {discount > 0 && (
        <div className="discount-badge">
          <span className="material-symbols-outlined">local_offer</span>
          {discount}% OFF
        </div>
      )}

      {/* Price Saver Badge */}
      {discount >= 20 && (
        <div className="price-saver-badge">
          <span className="material-symbols-outlined">bolt</span>
          PRICE SAVER
        </div>
      )}

      {/* Product Image */}
      <div className="product-image">
        <div className="image-container">
          <img
            src={product.imageUrl || "/assets/images/default-img.png"}
            alt={product.title}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/assets/images/default-img.png";
            }}
          />
          {product.outOfStock && (
            <div className="out-of-stock-overlay">
              <span>Out of Stock</span>
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="product-info">
        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="product-tags">
            {product.tags.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="product-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Brand */}
        {product.brand && variant === "detailed" && (
          <div className="product-brand">{product.brand}</div>
        )}

        {/* Title */}
        <h3 className="product-title">{product.title}</h3>

        {/* Delivery Time */}
        {product.deliveryTime && (
          <div className="delivery-time">
            <span className="material-symbols-outlined">schedule</span>
            {product.deliveryTime}
          </div>
        )}

        {/* Rating */}
        <div className="product-rating">
          <div className="stars">
            {"★".repeat(product.rating)}
            {"☆".repeat(5 - product.rating)}
          </div>
          <span className="rating-text">({product.rating})</span>
        </div>

        {/* Price and Actions */}
        <div className="product-footer">
          <div className="price-section">
            <span className="current-price">
              ₹{product.price}
              {product.unit && <span className="unit">/{product.unit}</span>}
            </span>
            {product.originalPrice && product.originalPrice !== product.price && (
              <span className="original-price">₹{product.originalPrice}</span>
            )}
          </div>

          {/* Add to Cart Button */}
          {showAddToCart && (
            <button
              className={`add-to-cart-button ${product.isAddedToCart ? "add-to-cart-button--added" : ""} ${product.outOfStock ? "add-to-cart-button--disabled" : ""}`}
              onClick={handleAddToCartClick}
              disabled={product.outOfStock}
              aria-label={product.isAddedToCart ? "Added to cart" : "Add to cart"}
            >
              {product.outOfStock ? (
                <>
                  <span>Out of Stock</span>
                </>
              ) : product.isAddedToCart ? (
                <>
                  <span>Added</span>
                  <span className="material-symbols-outlined">check</span>
                </>
              ) : (
                <>
                  <span>Add</span>
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
