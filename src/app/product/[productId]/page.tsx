"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProductById } from "@/lib/mockData";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useSimpleNavigation } from "@/lib/simpleNavigation";
import { getProductImage } from "@/lib/imageUrls";
import "./product-detail.css";

interface ProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const product = getProductById(resolvedParams.productId);
  
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { navigate } = useSimpleNavigation();
  
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (!product) return;
    
    // Find the selected variant based on product's selectedVariant
    const variantIndex = product.variants.findIndex(v => v.id === product.selectedVariant);
    if (variantIndex !== -1) {
      setSelectedVariant(variantIndex);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="product-not-found">
        <div className="container">
          <div className="not-found-content">
            <div className="not-found-icon">
              <span className="material-symbols-outlined">search_off</span>
            </div>
            <h1>Product Not Found</h1>
            <p>The product you're looking for doesn't exist or has been removed.</p>
            <button
              className="back-btn"
              onClick={() => navigate("/")}
            >
              <span className="material-symbols-outlined">home</span>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentVariant = product.variants[selectedVariant];
  const isInWishlistState = isInWishlist(product.id);
  const isInCartState = isInCart(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: currentVariant.price,
        imageUrl: getProductImage(product.id, 0),
        unit: currentVariant.unit
      });
    }
  };

  const handleWishlistToggle = () => {
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: currentVariant.price,
      imageUrl: getProductImage(product.id, 0),
      originalPrice: currentVariant.originalPrice,
      unit: currentVariant.unit,
      brand: product.brand
    });
  };

  const productImages = [
    getProductImage(product.id, 0),
    getProductImage(product.id, 1),
    getProductImage(product.id, 2)
  ];

  const discount = currentVariant.originalPrice && currentVariant.originalPrice > currentVariant.price
    ? Math.round(((currentVariant.originalPrice - currentVariant.price) / currentVariant.originalPrice) * 100)
    : 0;

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <button onClick={optimizeClick(() => navigateInstant("/"))}>
            Home
          </button>
          <span className="breadcrumb-separator">/</span>
          <button onClick={optimizeClick(() => navigateInstant("/categories"))}>
            Categories
          </button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        {/* Product Content */}
        <div className="product-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img
                src={productImages[selectedImage] || "/assets/images/default-img.png"}
                alt={product.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/images/default-img.png";
                }}
              />
              {discount > 0 && (
                <div className="discount-badge">
                  <span className="material-symbols-outlined">local_offer</span>
                  {discount}% OFF
                </div>
              )}
            </div>
            <div className="image-thumbnails">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image || "/assets/images/default-img.png"} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              <button
                className={`wishlist-btn ${isInWishlistState ? 'active' : ''}`}
                onClick={handleWishlistToggle}
              >
                <span className="material-symbols-outlined">
                  {isInWishlistState ? 'favorite' : 'favorite_border'}
                </span>
              </button>
            </div>

            {product.brand && (
              <div className="product-brand">
                <span>Brand: </span>
                <strong>{product.brand}</strong>
              </div>
            )}

            <div className="product-rating">
              <div className="stars">
                {"★".repeat(product.rating)}
                {"☆".repeat(5 - product.rating)}
              </div>
              <span className="rating-text">
                ({product.rating}/5) • {product.reviewCount} reviews
              </span>
            </div>

            <div className="product-pricing">
              <div className="price-section">
                <span className="current-price">₹{currentVariant.price}</span>
                {currentVariant.originalPrice && currentVariant.originalPrice > currentVariant.price && (
                  <span className="original-price">₹{currentVariant.originalPrice}</span>
                )}
                <span className="unit">/{currentVariant.unit}</span>
              </div>
              {discount > 0 && (
                <div className="savings">
                  You save ₹{(currentVariant.originalPrice || 0) - currentVariant.price}
                </div>
              )}
            </div>

            {/* Delivery Info */}
            {product.deliveryTime && (
              <div className="delivery-info">
                <span className="material-symbols-outlined">schedule</span>
                <span>Delivery in {product.deliveryTime}</span>
              </div>
            )}

            {/* Variant Selection */}
            {product.variants.length > 1 && (
              <div className="variant-selection">
                <h3>Size Options:</h3>
                <div className="variant-options">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.id}
                      className={`variant-option ${selectedVariant === index ? 'active' : ''}`}
                      onClick={() => setSelectedVariant(index)}
                    >
                      <span className="variant-size">{variant.size}</span>
                      <span className="variant-price">₹{variant.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selection */}
            <div className="quantity-section">
              <h3>Quantity:</h3>
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="quantity-display">{quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="product-actions">
              <button 
                className={`add-to-cart-btn ${isInCartState ? 'added' : ''}`}
                onClick={handleAddToCart}
                disabled={isInCartState}
              >
                <span className="material-symbols-outlined">
                  {isInCartState ? 'check' : 'add_shopping_cart'}
                </span>
                <span>
                  {isInCartState ? 'Added to Cart' : 'Add to Cart'}
                </span>
              </button>
              
              <button className="buy-now-btn">
                <span className="material-symbols-outlined">flash_on</span>
                <span>Buy Now</span>
              </button>
            </div>

            {/* Product Tags */}
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
        </div>

        {/* Product Details Tabs */}
        <div className="product-details-tabs">
          <div className="tab-navigation">
            <button
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`tab-btn ${activeTab === 'nutrition' ? 'active' : ''}`}
              onClick={() => setActiveTab('nutrition')}
            >
              Nutrition
            </button>
            <button
              className={`tab-btn ${activeTab === 'benefits' ? 'active' : ''}`}
              onClick={() => setActiveTab('benefits')}
            >
              Benefits
            </button>
            <button
              className={`tab-btn ${activeTab === 'storage' ? 'active' : ''}`}
              onClick={() => setActiveTab('storage')}
            >
              Storage
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-panel">
                <h3>About this product</h3>
                <p>{product.description}</p>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="tab-panel">
                <h3>Nutritional Information</h3>
                {product.nutritionalInfo ? (
                  <div className="nutrition-grid">
                    <div className="nutrition-item">
                      <span>Calories</span>
                      <span>{product.nutritionalInfo.calories}</span>
                    </div>
                    <div className="nutrition-item">
                      <span>Fat</span>
                      <span>{product.nutritionalInfo.fat}</span>
                    </div>
                    <div className="nutrition-item">
                      <span>Protein</span>
                      <span>{product.nutritionalInfo.protein}</span>
                    </div>
                    <div className="nutrition-item">
                      <span>Carbs</span>
                      <span>{product.nutritionalInfo.carbs}</span>
                    </div>
                  </div>
                ) : (
                  <p>Nutritional information not available for this product.</p>
                )}
              </div>
            )}

            {activeTab === 'benefits' && (
              <div className="tab-panel">
                <h3>Health Benefits</h3>
                {product.benefits && product.benefits.length > 0 ? (
                  <ul className="benefits-list">
                    {product.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No specific benefits information available.</p>
                )}
              </div>
            )}

            {activeTab === 'storage' && (
              <div className="tab-panel">
                <h3>Storage Instructions</h3>
                <p>{product.storageInstructions || "Store in a cool, dry place away from direct sunlight."}</p>
                {product.expiryInfo && (
                  <div className="expiry-info">
                    <h4>Expiry Information</h4>
                    <p>{product.expiryInfo}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
