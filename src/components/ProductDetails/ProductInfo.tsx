"use client";
import React from "react";
import { Product } from "./types";

interface ProductInfoProps {
  product: Product;
  selectedVariant: string;
  quantity: number;
  isWishlisted: boolean;
  isAddedToCart: boolean;
  onVariantChange: (variantId: string) => void;
  onQuantityChange: (quantity: number) => void;
  onWishlistToggle: () => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  selectedVariant,
  quantity,
  isWishlisted,
  isAddedToCart,
  onVariantChange,
  onQuantityChange,
  onWishlistToggle,
  onAddToCart,
  onBuyNow,
}) => {
  const currentVariant = product.variants.find(v => v.id === selectedVariant) || product.variants[0];
  const totalPrice = currentVariant.price * quantity;
  const originalTotal = currentVariant.originalPrice ? currentVariant.originalPrice * quantity : totalPrice;
  const savings = originalTotal - totalPrice;
  const discountPercentage = currentVariant.originalPrice 
    ? Math.round(((currentVariant.originalPrice - currentVariant.price) / currentVariant.originalPrice) * 100)
    : 0;

  return (
    <div className="product-info-container">
      {/* Product Title and Brand */}
      <div className="product-header">
        <div className="product-brand">{product.brand}</div>
        <h1 className="product-title">{product.name}</h1>
        
        {/* Rating and Reviews */}
        <div className="product-rating">
          <div className="rating-stars">
            {"★".repeat(product.rating)}{"☆".repeat(5 - product.rating)}
          </div>
          <span className="rating-number">({product.rating})</span>
          <span className="review-count">{product.reviewCount} reviews</span>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="product-tags">
            {product.tags.map((tag, index) => (
              <span key={index} className="product-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Price Section */}
      <div className="price-section">
        <div className="current-price">
          ₹{currentVariant.price}
          <span className="price-unit">/{currentVariant.unit}</span>
        </div>
        {currentVariant.originalPrice && currentVariant.originalPrice !== currentVariant.price && (
          <>
            <div className="original-price">₹{currentVariant.originalPrice}</div>
            <div className="discount-badge">{discountPercentage}% OFF</div>
          </>
        )}
        {savings > 0 && (
          <div className="savings-text">
            You save ₹{savings.toFixed(2)}
          </div>
        )}
      </div>

      {/* Delivery Info */}
      <div className="delivery-info">
        <div className="delivery-item">
          <span className="material-symbols-outlined">schedule</span>
          <span>Delivery in {product.deliveryTime}</span>
        </div>
        <div className="delivery-item">
          <span className="material-symbols-outlined">local_shipping</span>
          <span>Free delivery on orders above ₹299</span>
        </div>
      </div>

      {/* Variant Selection */}
      {product.variants.length > 1 && (
        <div className="variants-section">
          <h3 className="section-title">Size/Pack</h3>
          <div className="variants-grid">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                className={`variant-button ${selectedVariant === variant.id ? "selected" : ""}`}
                onClick={() => onVariantChange(variant.id)}
              >
                <div className="variant-size">{variant.size}</div>
                <div className="variant-price">₹{variant.price}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="quantity-section">
        <h3 className="section-title">Quantity</h3>
        <div className="quantity-selector">
          <button
            className="quantity-button"
            onClick={() => onQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
          >
            <span className="material-symbols-outlined">remove</span>
          </button>
          <span className="quantity-display">{quantity}</span>
          <button
            className="quantity-button"
            onClick={() => onQuantityChange(quantity + 1)}
          >
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
        {quantity > 1 && (
          <div className="total-price">
            Total: ₹{totalPrice.toFixed(2)}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button
          className="wishlist-button"
          onClick={onWishlistToggle}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <span className="material-symbols-outlined">
            {isWishlisted ? "favorite" : "favorite_border"}
          </span>
        </button>

        <button
          className={`add-to-cart-button ${isAddedToCart ? "added" : ""}`}
          onClick={onAddToCart}
        >
          {isAddedToCart ? (
            <>
              <span className="material-symbols-outlined">check</span>
              Added to Cart
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">add_shopping_cart</span>
              Add to Cart
            </>
          )}
        </button>

        <button className="buy-now-button" onClick={onBuyNow}>
          <span className="material-symbols-outlined">flash_on</span>
          Buy Now
        </button>
      </div>

      {/* Product Features */}
      <div className="product-features">
        <div className="feature-item">
          <span className="material-symbols-outlined">verified</span>
          <span>100% Authentic</span>
        </div>
        <div className="feature-item">
          <span className="material-symbols-outlined">assignment_return</span>
          <span>7-day Return Policy</span>
        </div>
        <div className="feature-item">
          <span className="material-symbols-outlined">support_agent</span>
          <span>24/7 Customer Support</span>
        </div>
      </div>

      {/* Share Options */}
      <div className="share-section">
        <h4>Share this product</h4>
        <div className="share-buttons">
          <button className="share-button" title="Share on WhatsApp">
            <span className="material-symbols-outlined">share</span>
          </button>
          <button className="share-button" title="Copy Link">
            <span className="material-symbols-outlined">link</span>
          </button>
          <button className="share-button" title="Share via Email">
            <span className="material-symbols-outlined">email</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
