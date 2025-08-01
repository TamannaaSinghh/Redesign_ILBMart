"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { getProductById } from "@/lib/mockData";
import "./checkout.css";

interface CouponCode {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrder: number;
  maxDiscount?: number;
  description: string;
  isActive: boolean;
}

interface DeliveryOption {
  id: string;
  name: string;
  price: number;
  time: string;
  description: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { cartItems, totalAmount, clearCart } = useCart();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<CouponCode | null>(null);
  const [couponError, setCouponError] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState("standard");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    landmark: "",
    city: "",
    pincode: "",
    state: ""
  });

  // Available coupons
  const availableCoupons: CouponCode[] = [
    {
      code: "SAVE10",
      type: "percentage",
      value: 10,
      minOrder: 299,
      description: "10% off on orders above ₹299",
      isActive: true
    },
    {
      code: "FIRST50",
      type: "fixed",
      value: 50,
      minOrder: 200,
      description: "₹50 off on first order above ₹200",
      isActive: true
    },
    {
      code: "FLAT100",
      type: "fixed",
      value: 100,
      minOrder: 500,
      description: "₹100 off on orders above ₹500",
      isActive: true
    },
    {
      code: "MEGA20",
      type: "percentage",
      value: 20,
      minOrder: 1000,
      maxDiscount: 200,
      description: "20% off (max ₹200) on orders above ₹1000",
      isActive: true
    }
  ];

  const deliveryOptions: DeliveryOption[] = [
    {
      id: "express",
      name: "Express Delivery",
      price: 49,
      time: "10-15 mins",
      description: "Get your order super fast"
    },
    {
      id: "standard",
      name: "Standard Delivery",
      price: 25,
      time: "20-30 mins",
      description: "Regular delivery"
    },
    {
      id: "scheduled",
      name: "Scheduled Delivery",
      price: 15,
      time: "Choose time",
      description: "Deliver at your preferred time"
    }
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: "upi",
      name: "UPI",
      icon: "📱",
      description: "Pay via Google Pay, PhonePe, Paytm"
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: "💳",
      description: "Visa, Mastercard, RuPay"
    },
    {
      id: "wallet",
      name: "Wallet",
      icon: "💰",
      description: "Use your wallet balance"
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: "💵",
      description: "Pay when you receive"
    }
  ];

  // Calculate totals
  const subtotal = totalAmount;
  const selectedDeliveryOption = deliveryOptions.find(d => d.id === selectedDelivery);
  const deliveryCharges = selectedDeliveryOption?.price || 0;
  
  const applyCouponDiscount = () => {
    if (!appliedCoupon) return 0;
    
    if (appliedCoupon.type === "percentage") {
      const discount = (subtotal * appliedCoupon.value) / 100;
      return appliedCoupon.maxDiscount ? Math.min(discount, appliedCoupon.maxDiscount) : discount;
    } else {
      return appliedCoupon.value;
    }
  };
  
  const discount = applyCouponDiscount();
  const total = subtotal + deliveryCharges - discount;

  // Get cart products with details
  const cartProducts = cartItems.map(item => {
    const product = getProductById(item.productId);
    const variant = product?.variants.find(v => v.id === item.variantId);
    return {
      ...item,
      product,
      variant,
      name: product?.name || "Unknown Product",
      price: variant?.price || 0,
      size: variant?.size || "",
      image: product?.images?.[0]?.url || "/assets/images/default-img.png"
    };
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/cart");
    }
  }, [cartItems, router]);

  const applyCoupon = () => {
    setCouponError("");
    
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }

    const coupon = availableCoupons.find(
      c => c.code.toLowerCase() === couponCode.toLowerCase() && c.isActive
    );

    if (!coupon) {
      setCouponError("Invalid coupon code");
      return;
    }

    if (subtotal < coupon.minOrder) {
      setCouponError(`Minimum order amount is ₹${coupon.minOrder}`);
      return;
    }

    setAppliedCoupon(coupon);
    setCouponCode("");
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError("");
  };

  const handleInputChange = (field: string, value: string) => {
    setDeliveryInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return deliveryInfo.fullName && deliveryInfo.phone && deliveryInfo.address && deliveryInfo.pincode;
      case 2:
        return selectedDelivery;
      case 3:
        return selectedPayment;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const placeOrder = async () => {
    setIsLoading(true);
    
    try {
      // Simulate order placement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and redirect to success page
      clearCart();
      router.push("/order-success");
    } catch (error) {
      console.error("Order placement failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, title: "Delivery Details", icon: "📍" },
    { number: 2, title: "Delivery Options", icon: "🚚" },
    { number: 3, title: "Payment Method", icon: "💳" },
    { number: 4, title: "Review & Confirm", icon: "✅" }
  ];

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add items to proceed with checkout</p>
            <button 
              className="continue-shopping-btn"
              onClick={() => router.push("/")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        {/* Progress Steps */}
        <div className="checkout-progress">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`progress-step ${
                currentStep >= step.number ? "active" : ""
              } ${currentStep > step.number ? "completed" : ""}`}
            >
              <div className="step-icon">{step.icon}</div>
              <span className="step-title">{step.title}</span>
            </div>
          ))}
        </div>

        <div className="checkout-content">
          {/* Main Checkout Form */}
          <div className="checkout-form">
            {/* Step 1: Delivery Details */}
            {currentStep === 1 && (
              <div className="step-content">
                <h2 className="step-heading">Delivery Details</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      value={deliveryInfo.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      value={deliveryInfo.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  
                  <div className="form-group full-width">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={deliveryInfo.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div className="form-group full-width">
                    <label htmlFor="address">Complete Address *</label>
                    <textarea
                      id="address"
                      value={deliveryInfo.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="House No, Building, Street, Area"
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="landmark">Landmark</label>
                    <input
                      type="text"
                      id="landmark"
                      value={deliveryInfo.landmark}
                      onChange={(e) => handleInputChange("landmark", e.target.value)}
                      placeholder="Nearby landmark"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="pincode">Pincode *</label>
                    <input
                      type="text"
                      id="pincode"
                      value={deliveryInfo.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      placeholder="6-digit pincode"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      value={deliveryInfo.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="City"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      value={deliveryInfo.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      placeholder="State"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Delivery Options */}
            {currentStep === 2 && (
              <div className="step-content">
                <h2 className="step-heading">Choose Delivery Option</h2>
                <div className="delivery-options">
                  {deliveryOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`delivery-option ${
                        selectedDelivery === option.id ? "selected" : ""
                      }`}
                      onClick={() => setSelectedDelivery(option.id)}
                    >
                      <div className="option-info">
                        <h4>{option.name}</h4>
                        <p className="option-time">{option.time}</p>
                        <p className="option-description">{option.description}</p>
                      </div>
                      <div className="option-price">
                        {option.price === 0 ? "FREE" : `₹${option.price}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Payment Method */}
            {currentStep === 3 && (
              <div className="step-content">
                <h2 className="step-heading">Select Payment Method</h2>
                <div className="payment-methods">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`payment-method ${
                        selectedPayment === method.id ? "selected" : ""
                      }`}
                      onClick={() => setSelectedPayment(method.id)}
                    >
                      <div className="method-icon">{method.icon}</div>
                      <div className="method-info">
                        <h4>{method.name}</h4>
                        <p>{method.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Review & Confirm */}
            {currentStep === 4 && (
              <div className="step-content">
                <h2 className="step-heading">Review Your Order</h2>
                
                <div className="order-review">
                  <div className="review-section">
                    <h3>Delivery Details</h3>
                    <div className="review-info">
                      <p><strong>{deliveryInfo.fullName}</strong></p>
                      <p>{deliveryInfo.phone}</p>
                      <p>{deliveryInfo.address}</p>
                      <p>{deliveryInfo.city}, {deliveryInfo.state} - {deliveryInfo.pincode}</p>
                    </div>
                  </div>
                  
                  <div className="review-section">
                    <h3>Delivery Option</h3>
                    <div className="review-info">
                      <p><strong>{selectedDeliveryOption?.name}</strong></p>
                      <p>{selectedDeliveryOption?.time} • ₹{selectedDeliveryOption?.price}</p>
                    </div>
                  </div>
                  
                  <div className="review-section">
                    <h3>Payment Method</h3>
                    <div className="review-info">
                      <p><strong>{paymentMethods.find(p => p.id === selectedPayment)?.name}</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="step-navigation">
              {currentStep > 1 && (
                <button
                  className="nav-btn secondary"
                  onClick={prevStep}
                >
                  Previous
                </button>
              )}
              
              {currentStep < 4 ? (
                <button
                  className={`nav-btn primary ${!validateStep(currentStep) ? "disabled" : ""}`}
                  onClick={nextStep}
                  disabled={!validateStep(currentStep)}
                >
                  Continue
                </button>
              ) : (
                <button
                  className={`nav-btn primary place-order ${isLoading ? "loading" : ""}`}
                  onClick={placeOrder}
                  disabled={isLoading}
                >
                  {isLoading ? "Placing Order..." : `Place Order • ₹${total.toFixed(2)}`}
                </button>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <div className="summary-card">
              <h3 className="summary-title">Order Summary</h3>
              
              {/* Cart Items */}
              <div className="cart-items-summary">
                {cartProducts.map((item) => (
                  <div key={`${item.productId}-${item.variantId}`} className="cart-item-summary">
                    <img
                      src={item.image || "/assets/images/default-img.png"}
                      alt={item.name}
                      className="item-image"
                    />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-variant">{item.size}</p>
                      <div className="item-quantity-price">
                        <span>Qty: {item.quantity}</span>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className="coupon-section">
                <h4>Apply Coupon</h4>
                
                {!appliedCoupon ? (
                  <div className="coupon-input">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Enter coupon code"
                      className="coupon-field"
                    />
                    <button
                      className="apply-coupon-btn"
                      onClick={applyCoupon}
                    >
                      Apply
                    </button>
                  </div>
                ) : (
                  <div className="applied-coupon">
                    <div className="coupon-info">
                      <span className="coupon-code">{appliedCoupon.code}</span>
                      <span className="coupon-description">{appliedCoupon.description}</span>
                    </div>
                    <button
                      className="remove-coupon-btn"
                      onClick={removeCoupon}
                    >
                      ✕
                    </button>
                  </div>
                )}
                
                {couponError && (
                  <p className="coupon-error">{couponError}</p>
                )}

                {/* Available Coupons */}
                <div className="available-coupons">
                  <h5>Available Coupons</h5>
                  {availableCoupons.filter(c => c !== appliedCoupon).map((coupon) => (
                    <div
                      key={coupon.code}
                      className="coupon-suggestion"
                      onClick={() => {
                        setCouponCode(coupon.code);
                        applyCoupon();
                      }}
                    >
                      <span className="coupon-code-small">{coupon.code}</span>
                      <span className="coupon-desc-small">{coupon.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bill Details */}
              <div className="bill-details">
                <h4>Bill Details</h4>
                <div className="bill-row">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="bill-row">
                  <span>Delivery Charges</span>
                  <span>₹{deliveryCharges.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="bill-row discount">
                    <span>Coupon Discount ({appliedCoupon.code})</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="bill-row total">
                  <span>Total Amount</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
