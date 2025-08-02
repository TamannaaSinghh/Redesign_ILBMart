"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useInstantNavigation } from "@/lib/performanceOptimizer";
import { getEnhancedImageUrl } from "@/lib/updateProductImages";
import "./cart.css";

const CartPage: React.FC = () => {
  const router = useRouter();
  const { createOptimizedHandler } = useInstantNavigation();
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalPrice, totalItems, isLoading } = useCart();

  // Calculate totals
  const subtotal = totalPrice;
  const deliveryFee = subtotal >= 299 ? 0 : 40;
  const total = subtotal + deliveryFee;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    // Auto-delete when quantity reaches 0
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (isLoading) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading cart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-empty">
            <div className="empty-state">
              <div className="empty-icon">🛒</div>
              <h1 className="empty-title">Your Cart is Empty</h1>
              <p className="empty-description">
                Add some products to get started!
              </p>
              <button
                className="btn-primary"
                onClick={createOptimizedHandler("/")}
              >
                Start Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Header */}
        <div className="cart-header">
          <div className="header-content">
            <h1 className="cart-title">
              <span className="cart-icon">🛒</span>
              Shopping Cart
            </h1>
            <p className="cart-count">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} • {cartItems.length} {cartItems.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          <button
            className="btn-secondary"
            onClick={createOptimizedHandler("/")}
          >
            Continue Shopping
          </button>
        </div>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div 
                  className="item-image"
                  onClick={createOptimizedHandler(`/product/${item.id}`)}
                >
                  <img
                    src={getEnhancedImageUrl({
                      id: item.id,
                      title: item.name,
                      imageUrl: item.imageUrl
                    })}
                    alt={item.name}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/assets/images/default-img.png";
                    }}
                  />
                </div>

                <div className="item-details">
                  <h3 
                    className="item-name"
                    onClick={createOptimizedHandler(`/product/${item.id}`)}
                  >
                    {item.name}
                  </h3>
                  {item.unit && <p className="item-unit">{item.unit}</p>}
                  <p className="item-price">₹{item.price} each</p>
                </div>

                <div className="item-controls">
                  <div className="quantity-control">
                    <button
                      className="qty-btn minus"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="qty-display">{item.quantity}</span>
                    <button
                      className="qty-btn plus"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="item-total">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <div className="summary-card">
              <h2 className="summary-title">Order Summary</h2>
              
              <div className="summary-line">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              
              <div className="summary-line">
                <span>Delivery</span>
                <span className={deliveryFee === 0 ? 'free-delivery' : ''}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              
              {subtotal < 299 && deliveryFee > 0 && (
                <p className="delivery-note">
                  Add ₹{(299 - subtotal).toFixed(2)} more for FREE delivery
                </p>
              )}
              
              <div className="summary-divider"></div>
              
              <div className="summary-line total">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <div className="summary-actions">
                <button
                  className="btn-primary checkout-btn"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
                
                <button
                  className="btn-outline clear-btn"
                  onClick={() => {
                    if (confirm('Remove all items from cart?')) {
                      clearCart();
                    }
                  }}
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="quick-stats">
              <div className="stat">
                <span className="stat-icon">📦</span>
                <div>
                  <strong>Fast Delivery</strong>
                  <span>8-30 minutes</span>
                </div>
              </div>
              <div className="stat">
                <span className="stat-icon">✅</span>
                <div>
                  <strong>Quality Assured</strong>
                  <span>Fresh products</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
