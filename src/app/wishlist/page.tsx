"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { useInstantNavigation } from "@/lib/performanceOptimizer";
import { getEnhancedImageUrl } from "@/lib/updateProductImages";
import "./wishlist.css";

const WishlistPage: React.FC = () => {
  const router = useRouter();
  const { createOptimizedHandler } = useInstantNavigation();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState("recently-added");

  // Use wishlist and cart hooks
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  // Sort wishlist items
  const sortedWishlistItems = useMemo(() => {
    const items = [...wishlistItems];
    switch (sortBy) {
      case "price-low":
        return items.sort((a, b) => a.price - b.price);
      case "price-high":
        return items.sort((a, b) => b.price - a.price);
      case "name":
        return items.sort((a, b) => a.name.localeCompare(b.name));
      case "recently-added":
      default:
        return items;
    }
  }, [wishlistItems, sortBy]);

  const handleRemoveFromWishlist = (id: string) => {
    removeFromWishlist(id);
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleAddToCart = (id: string) => {
    const item = wishlistItems.find(item => item.id === id);
    if (item) {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
        unit: item.unit
      });
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.size === wishlistItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(wishlistItems.map(item => item.id)));
    }
  };

  const handleAddSelectedToCart = () => {
    selectedItems.forEach(id => {
      const item = wishlistItems.find(item => item.id === id);
      if (item) {
        addToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          imageUrl: item.imageUrl,
          unit: item.unit
        });
      }
    });
    setSelectedItems(new Set());
  };

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-container">
          <div className="wishlist-empty">
            <div className="empty-state">
              <div className="empty-icon">♡</div>
              <h1 className="empty-title">Your Wishlist is Empty</h1>
              <p className="empty-description">
                Save items you love to your wishlist and shop them later.
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
    <div className="wishlist-page">
      <div className="wishlist-container">
        {/* Header */}
        <div className="wishlist-header">
          <div className="header-content">
            <h1 className="wishlist-title">
              <span className="heart-icon">♡</span>
              My Wishlist
            </h1>
            <p className="wishlist-count">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          <div className="header-actions">
            <button
              className="btn-secondary"
              onClick={createOptimizedHandler("/")}
            >
              Continue Shopping
            </button>
            {selectedItems.size > 0 && (
              <button
                className="btn-primary"
                onClick={handleAddSelectedToCart}
              >
                Add to Cart ({selectedItems.size})
              </button>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="wishlist-controls">
          <div className="controls-left">
            <label className="select-all">
              <input
                type="checkbox"
                checked={selectedItems.size === wishlistItems.length && wishlistItems.length > 0}
                onChange={handleSelectAll}
              />
              <span>Select All</span>
            </label>
            {selectedItems.size > 0 && (
              <span className="selected-count">
                {selectedItems.size} selected
              </span>
            )}
          </div>
          
          <div className="controls-right">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="recently-added">Recently Added</option>
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="wishlist-grid">
          {sortedWishlistItems.map((item) => (
            <div key={item.id} className="wishlist-card">
              <div className="card-checkbox">
                <input
                  type="checkbox"
                  checked={selectedItems.has(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                />
              </div>
              
              <div 
                className="card-content"
                onClick={createOptimizedHandler(`/product/${item.id}`)}
              >
                <div className="card-image">
                  <img
                    src={getEnhancedImageUrl({
                      id: item.id,
                      title: item.name,
                      imageUrl: item.imageUrl,
                      brand: item.brand
                    })}
                    alt={item.name}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/assets/images/default-img.png";
                    }}
                  />
                </div>
                
                <div className="card-info">
                  <h3 className="card-title">{item.name}</h3>
                  {item.brand && <p className="card-brand">{item.brand}</p>}
                  <div className="card-price">
                    <span className="current-price">₹{item.price}</span>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <span className="original-price">₹{item.originalPrice}</span>
                    )}
                    {item.unit && <span className="unit">/{item.unit}</span>}
                  </div>
                </div>
              </div>

              <div className="card-actions">
                <button
                  className="action-btn add-to-cart"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(item.id);
                  }}
                  disabled={isInCart(item.id)}
                >
                  {isInCart(item.id) ? '✓' : '+'}
                </button>
                <button
                  className="action-btn remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFromWishlist(item.id);
                  }}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        {wishlistItems.length > 0 && (
          <div className="wishlist-summary">
            <div className="summary-content">
              <div className="summary-stats">
                <span className="stat">
                  <strong>{wishlistItems.length}</strong> items
                </span>
                <span className="stat">
                  Total: <strong>₹{totalValue.toFixed(2)}</strong>
                </span>
              </div>
              <div className="summary-actions">
                <button
                  className="btn-outline"
                  onClick={() => {
                    if (confirm('Remove all items from wishlist?')) {
                      clearWishlist();
                    }
                  }}
                >
                  Clear All
                </button>
                <button
                  className="btn-primary"
                  onClick={() => {
                    wishlistItems.forEach(item => handleAddToCart(item.id));
                  }}
                >
                  Add All to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
