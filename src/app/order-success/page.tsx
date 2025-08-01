"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./order-success.css";

const OrderSuccessPage: React.FC = () => {
  const router = useRouter();
  const [orderDetails] = useState({
    orderId: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    amount: 1245.50,
    estimatedDelivery: "20-30 mins",
    deliveryAddress: "123 Main Street, Bangalore, Karnataka - 560001",
    paymentMethod: "UPI"
  });

  const [confetti, setConfetti] = useState(true);

  useEffect(() => {
    // Hide confetti after animation
    const timer = setTimeout(() => {
      setConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="order-success-page">
      {confetti && <div className="confetti-container">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="confetti" style={{ 
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            backgroundColor: ['#47b05a', '#fbbf24', '#ef4444', '#3b82f6', '#8b5cf6'][Math.floor(Math.random() * 5)]
          }} />
        ))}
      </div>}

      <div className="container">
        <div className="success-content">
          {/* Success Animation */}
          <div className="success-animation">
            <div className="success-circle">
              <div className="success-checkmark">
                <svg viewBox="0 0 52 52" className="checkmark">
                  <circle cx="26" cy="26" r="25" fill="none" className="checkmark-circle"/>
                  <path fill="none" d="m14.1 27.2 7.1 7.2 16.7-16.8" className="checkmark-check"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="success-message">
            <h1 className="success-title">Order Placed Successfully! 🎉</h1>
            <p className="success-subtitle">
              Thank you for your order. We're preparing your items for delivery.
            </p>
          </div>

          {/* Order Details */}
          <div className="order-details-card">
            <h2 className="details-title">Order Details</h2>
            
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Order ID</span>
                <span className="detail-value order-id">{orderDetails.orderId}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Total Amount</span>
                <span className="detail-value amount">₹{orderDetails.amount.toFixed(2)}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Estimated Delivery</span>
                <span className="detail-value delivery-time">{orderDetails.estimatedDelivery}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Payment Method</span>
                <span className="detail-value">{orderDetails.paymentMethod}</span>
              </div>
              
              <div className="detail-item full-width">
                <span className="detail-label">Delivery Address</span>
                <span className="detail-value">{orderDetails.deliveryAddress}</span>
              </div>
            </div>
          </div>

          {/* Delivery Status */}
          <div className="delivery-status-card">
            <h3 className="status-title">Delivery Status</h3>
            <div className="status-timeline">
              <div className="status-step active">
                <div className="status-icon">📋</div>
                <div className="status-info">
                  <h4>Order Confirmed</h4>
                  <p>Your order has been received</p>
                </div>
              </div>
              
              <div className="status-step active">
                <div className="status-icon">👨‍🍳</div>
                <div className="status-info">
                  <h4>Preparing Order</h4>
                  <p>We're getting your items ready</p>
                </div>
              </div>
              
              <div className="status-step">
                <div className="status-icon">🚚</div>
                <div className="status-info">
                  <h4>Out for Delivery</h4>
                  <p>Your order is on the way</p>
                </div>
              </div>
              
              <div className="status-step">
                <div className="status-icon">📦</div>
                <div className="status-info">
                  <h4>Delivered</h4>
                  <p>Order delivered successfully</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <Link href={`/dashboard/track-order?orderId=${orderDetails.orderId}`} className="action-btn primary">
              <span className="btn-icon">🚚</span>
              Track Your Order
            </Link>
            
            <Link href="/dashboard/orders" className="action-btn secondary">
              <span className="btn-icon">📋</span>
              View All Orders
            </Link>
            
            <Link href="/" className="action-btn tertiary">
              <span className="btn-icon">🏠</span>
              Continue Shopping
            </Link>
          </div>

          {/* Additional Info */}
          <div className="additional-info">
            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">💰</div>
                <h4>Cashback Earned</h4>
                <p>You earned ₹25 cashback on this order</p>
              </div>
              
              <div className="info-card">
                <div className="info-icon">⭐</div>
                <h4>Rate Your Experience</h4>
                <p>Help us improve by rating your experience</p>
              </div>
              
              <div className="info-card">
                <div className="info-icon">📞</div>
                <h4>Need Help?</h4>
                <p>Contact support for any assistance</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="contact-section">
            <h3>Need Help with Your Order?</h3>
            <p>Our customer support team is here to help you 24/7</p>
            <div className="contact-options">
              <a href="tel:+918800123456" className="contact-option">
                <span className="contact-icon">📞</span>
                Call Us: +91 88001 23456
              </a>
              <a href="mailto:support@ilbmart.com" className="contact-option">
                <span className="contact-icon">✉️</span>
                Email: support@ilbmart.com
              </a>
              <a href="/help" className="contact-option">
                <span className="contact-icon">❓</span>
                Help Center
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
