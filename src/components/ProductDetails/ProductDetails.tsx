"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ImageCarousel from "./ImageCarousel";
import ProductInfo from "./ProductInfo";
import RelatedProducts from "./RelatedProducts";
import { Product } from "./types";
import "./ProductDetails.css";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const [selectedVariant, setSelectedVariant] = useState(product.selectedVariant);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const currentVariant = product.variants.find(v => v.id === selectedVariant) || product.variants[0];

  const handleVariantChange = (variantId: string) => {
    setSelectedVariant(variantId);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    // TODO: Implement actual wishlist functionality
  };

  const handleAddToCart = () => {
    setIsAddedToCart(!isAddedToCart);
    // TODO: Implement actual cart functionality
  };

  const handleBuyNow = () => {
    // TODO: Implement buy now functionality
    console.log("Buy now:", { productId: product.id, variantId: selectedVariant, quantity });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return (
          <div className="product-details-content">
            <div className="details-grid">
              <div className="detail-section">
                <h3>Product Information</h3>
                <div className="detail-item">
                  <strong>Brand:</strong>
                  <span>{product.brand}</span>
                </div>
                <div className="detail-item">
                  <strong>Description:</strong>
                  <span>{product.description}</span>
                </div>
                <div className="detail-item">
                  <strong>Delivery Time:</strong>
                  <span>{product.deliveryTime}</span>
                </div>
                {product.storageInstructions && (
                  <div className="detail-item">
                    <strong>Storage Instructions:</strong>
                    <span>{product.storageInstructions}</span>
                  </div>
                )}
                {product.expiryInfo && (
                  <div className="detail-item">
                    <strong>Expiry Information:</strong>
                    <span>{product.expiryInfo}</span>
                  </div>
                )}
              </div>

              {product.nutritionalInfo && (
                <div className="detail-section">
                  <h3>Nutritional Information</h3>
                  <div className="nutrition-grid">
                    <div className="nutrition-item">
                      <strong>Fat:</strong>
                      <span>{product.nutritionalInfo.fat}</span>
                    </div>
                    <div className="nutrition-item">
                      <strong>Protein:</strong>
                      <span>{product.nutritionalInfo.protein}</span>
                    </div>
                    <div className="nutrition-item">
                      <strong>Carbohydrates:</strong>
                      <span>{product.nutritionalInfo.carbs}</span>
                    </div>
                    <div className="nutrition-item">
                      <strong>Calories:</strong>
                      <span>{product.nutritionalInfo.calories}</span>
                    </div>
                  </div>
                </div>
              )}

              {product.ingredients && product.ingredients.length > 0 && (
                <div className="detail-section">
                  <h3>Ingredients</h3>
                  <ul className="ingredients-list">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              )}

              {product.benefits && product.benefits.length > 0 && (
                <div className="detail-section">
                  <h3>Benefits</h3>
                  <ul className="benefits-list">
                    {product.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );

      case "reviews":
        return (
          <div className="reviews-content">
            <div className="reviews-summary">
              <div className="rating-overview">
                <div className="overall-rating">
                  <span className="rating-number">{product.rating}</span>
                  <div className="rating-stars">
                    {"★".repeat(product.rating)}{"☆".repeat(5 - product.rating)}
                  </div>
                  <span className="review-count">({product.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            <div className="reviews-list">
              {/* Mock reviews */}
              <div className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">A</div>
                    <div className="reviewer-details">
                      <strong>Anjali K.</strong>
                      <span className="review-date">2 days ago</span>
                    </div>
                  </div>
                  <div className="review-rating">
                    {"★".repeat(4)}{"☆".repeat(1)}
                  </div>
                </div>
                <p className="review-text">
                  Great quality product! The {product.name} exceeded my expectations. 
                  Fast delivery and good packaging. Will definitely buy again.
                </p>
                <div className="review-actions">
                  <button className="helpful-button">
                    <span className="material-symbols-outlined">thumb_up</span>
                    Helpful (12)
                  </button>
                </div>
              </div>

              <div className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">R</div>
                    <div className="reviewer-details">
                      <strong>Ravi M.</strong>
                      <span className="review-date">1 week ago</span>
                    </div>
                  </div>
                  <div className="review-rating">
                    {"★".repeat(5)}
                  </div>
                </div>
                <p className="review-text">
                  Excellent product from {product.brand}. Value for money and quick delivery. 
                  Highly recommended to others.
                </p>
                <div className="review-actions">
                  <button className="helpful-button">
                    <span className="material-symbols-outlined">thumb_up</span>
                    Helpful (8)
                  </button>
                </div>
              </div>
            </div>

            <div className="write-review">
              <h3>Write a Review</h3>
              <button className="btn btn-primary">
                <span className="material-symbols-outlined">edit</span>
                Write Review
              </button>
            </div>
          </div>
        );

      case "shipping":
        return (
          <div className="shipping-content">
            <div className="shipping-info">
              <div className="shipping-section">
                <h3>Delivery Information</h3>
                <div className="delivery-item">
                  <span className="material-symbols-outlined">local_shipping</span>
                  <div>
                    <strong>Estimated Delivery:</strong>
                    <span>{product.deliveryTime}</span>
                  </div>
                </div>
                <div className="delivery-item">
                  <span className="material-symbols-outlined">payments</span>
                  <div>
                    <strong>Free Delivery:</strong>
                    <span>On orders above ₹299</span>
                  </div>
                </div>
              </div>

              <div className="shipping-section">
                <h3>Return Policy</h3>
                <div className="policy-item">
                  <span className="material-symbols-outlined">assignment_return</span>
                  <div>
                    <strong>7-day Return:</strong>
                    <span>Easy returns if product is unopened</span>
                  </div>
                </div>
                <div className="policy-item">
                  <span className="material-symbols-outlined">verified</span>
                  <div>
                    <strong>Quality Guarantee:</strong>
                    <span>100% authentic products</span>
                  </div>
                </div>
              </div>

              <div className="shipping-section">
                <h3>Payment Options</h3>
                <div className="payment-methods">
                  <div className="payment-method">Credit/Debit Cards</div>
                  <div className="payment-method">UPI</div>
                  <div className="payment-method">Net Banking</div>
                  <div className="payment-method">Wallets</div>
                  <div className="payment-method">Cash on Delivery</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="product-details-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <button onClick={() => router.push("/")} className="breadcrumb-link">
            Home
          </button>
          <span className="breadcrumb-separator">
            <span className="material-symbols-outlined">chevron_right</span>
          </span>
          <button onClick={() => router.push("/categories")} className="breadcrumb-link">
            Categories
          </button>
          <span className="breadcrumb-separator">
            <span className="material-symbols-outlined">chevron_right</span>
          </span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        {/* Product Main Section */}
        <div className="product-main">
          <div className="product-images">
            <ImageCarousel images={product.images} productName={product.name} />
          </div>

          <div className="product-info">
            <ProductInfo
              product={product}
              selectedVariant={selectedVariant}
              quantity={quantity}
              isWishlisted={isWishlisted}
              isAddedToCart={isAddedToCart}
              onVariantChange={handleVariantChange}
              onQuantityChange={handleQuantityChange}
              onWishlistToggle={handleWishlistToggle}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="product-tabs">
          <div className="tabs-header">
            <button
              className={`tab-button ${activeTab === "details" ? "active" : ""}`}
              onClick={() => setActiveTab("details")}
            >
              Product Details
            </button>
            <button
              className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews & Ratings
            </button>
            <button
              className={`tab-button ${activeTab === "shipping" ? "active" : ""}`}
              onClick={() => setActiveTab("shipping")}
            >
              Shipping & Returns
            </button>
          </div>
          <div className="tab-content">
            {renderTabContent()}
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts currentProductId={product.id} />
      </div>
    </div>
  );
};

export default ProductDetails;
