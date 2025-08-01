"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { getProductById } from "@/lib/productDatabase";
import { useCart } from "@/hooks/useCart";
import "./cart.css";

const CartPage: React.FC = () => {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalPrice, isLoading } = useCart();

  // Calculate totals
  const subtotal = totalPrice;
  const deliveryFee = subtotal >= 299 ? 0 : 40;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    // TODO: Implement checkout functionality
    alert("Checkout functionality will be implemented soon!");
  };

  const continueShopping = () => {
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="cart-page">
        <div className="container">
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
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-content">
              <span className="material-symbols-outlined empty-cart-icon">
                shopping_cart
              </span>
              <h1 className="empty-cart-title">Your Cart is Empty</h1>
              <p className="empty-cart-description">
                Looks like you haven't added any items to your cart yet.
                Start shopping to fill it up!
              </p>
              <button
                className="btn btn-primary continue-shopping-btn"
                onClick={continueShopping}
              >
                <span className="material-symbols-outlined">storefront</span>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        {/* Cart Header */}
        <div className="cart-header">
          <h1 className="cart-title">
            <span className="material-symbols-outlined">shopping_cart</span>
            Shopping Cart ({cartItems.length} items)
          </h1>
          <button
            className="btn btn-outline clear-cart-btn"
            onClick={clearCart}
          >
            <span className="material-symbols-outlined">delete_sweep</span>
            Clear Cart
          </button>
        </div>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            <div className="cart-items-header">
              <h2>Items in your cart</h2>
            </div>

            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img
                      src={item.imageUrl || "/assets/images/default-img.png"}
                      alt={item.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/assets/images/default-img.png";
                      }}
                    />
                  </div>

                  <div className="cart-item-details">
                    <div className="cart-item-info">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <p className="cart-item-variant">{item.unit}</p>
                    </div>

                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <span className="material-symbols-outlined">remove</span>
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <span className="material-symbols-outlined">add</span>
                        </button>
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove from cart"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-pricing">
                    <div className="item-price">
                      <span className="current-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <div className="summary-card">
              <h2 className="summary-title">Order Summary</h2>

              <div className="summary-details">
                <div className="summary-item">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="summary-item">
                  <span>Delivery Fee</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <>
                        <span className="free-delivery">FREE</span>
                        <span className="delivery-threshold">Orders above ₹299</span>
                      </>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                {subtotal < 299 && (
                  <div className="delivery-message">
                    Add ₹{(299 - subtotal).toFixed(2)} more for FREE delivery
                  </div>
                )}

                <div className="summary-divider"></div>

                <div className="summary-item total">
                  <span>Total Amount</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="summary-actions">
                <button
                  className="btn btn-primary checkout-btn"
                  onClick={handleCheckout}
                >
                  <span className="material-symbols-outlined">shopping_bag</span>
                  Proceed to Checkout
                </button>

                <button
                  className="btn btn-outline continue-btn"
                  onClick={continueShopping}
                >
                  <span className="material-symbols-outlined">storefront</span>
                  Continue Shopping
                </button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="delivery-info-card">
              <h3>Delivery Information</h3>
              <div className="delivery-features">
                <div className="delivery-feature">
                  <span className="material-symbols-outlined">local_shipping</span>
                  <div>
                    <strong>Fast Delivery</strong>
                    <span>Get your items delivered in 8-30 minutes</span>
                  </div>
                </div>
                <div className="delivery-feature">
                  <span className="material-symbols-outlined">verified</span>
                  <div>
                    <strong>Quality Assured</strong>
                    <span>Fresh and quality products guaranteed</span>
                  </div>
                </div>
                <div className="delivery-feature">
                  <span className="material-symbols-outlined">support_agent</span>
                  <div>
                    <strong>24/7 Support</strong>
                    <span>Customer support available anytime</span>
                  </div>
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
