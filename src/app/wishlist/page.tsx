"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import ProductGrid from "@/components/ProductCard/ProductGrid";
import { ProductCardData } from "@/components/ProductCard/ProductCard";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import "./wishlist.css";

const WishlistPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState("recently-added");

  // Use wishlist and cart hooks
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  // Convert wishlist items to ProductCardData format
  const wishlistProducts: ProductCardData[] = wishlistItems.map(item => ({
    id: item.id,
    imageUrl: item.imageUrl,
    title: item.name,
    brand: item.brand || "",
    tags: [item.unit || ""].filter(Boolean),
    price: item.price,
    originalPrice: item.originalPrice,
    rating: 4, // Default rating
    isWishlisted: true,
    isAddedToCart: isInCart(item.id),
    unit: item.unit,
    outOfStock: false,
  }));

  // Sort wishlist items
  const sortedWishlistItems = useMemo(() => {
    const items = [...wishlistProducts];
    switch (sortBy) {
      case "price-low":
        return items.sort((a, b) => a.price - b.price);
      case "price-high":
        return items.sort((a, b) => b.price - a.price);
      case "name":
        return items.sort((a, b) => a.title.localeCompare(b.title));
      case "recently-added":
      default:
        return items; // Keep original order for recently added
    }
  }, [wishlistProducts, sortBy]);

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

  const handleRemoveSelected = () => {
    selectedItems.forEach(id => removeFromWishlist(id));
    setSelectedItems(new Set());
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

  const handleContinueShopping = () => {
    router.push("/");
  };

  const handleShareWishlist = () => {
    // TODO: Implement share functionality
    navigator.clipboard.writeText(window.location.href);
    alert("Wishlist link copied to clipboard!");
  };

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);
  const availableItems = wishlistItems; // All items are available since WishlistItem doesn't have outOfStock

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="container">
          <div className="wishlist-empty">
            <div className="empty-state">
              <span className="material-symbols-outlined empty-icon">
                favorite_border
              </span>
              <h1 className="empty-title">Your Wishlist is Empty</h1>
              <p className="empty-description">
                Discover products you love and add them to your wishlist to save for later.
              </p>
              <button
                className="btn btn-primary continue-shopping-button"
                onClick={handleContinueShopping}
              >
                <span className="material-symbols-outlined">shopping_cart</span>
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
      <div className="container">
        {/* Wishlist Header */}
        <div className="wishlist-header">
          <div className="wishlist-title-section">
            <h1 className="wishlist-title">
              <span className="material-symbols-outlined">favorite</span>
              My Wishlist
            </h1>
            <p className="wishlist-subtitle">
              {wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""} • 
              Total Value: ₹{totalValue.toFixed(2)}
            </p>
          </div>

          <div className="wishlist-actions">
            <button
              className="btn btn-outline share-button"
              onClick={handleShareWishlist}
            >
              <span className="material-symbols-outlined">share</span>
              Share
            </button>
            <button
              className="btn btn-primary continue-shopping-button"
              onClick={handleContinueShopping}
            >
              <span className="material-symbols-outlined">add_shopping_cart</span>
              Continue Shopping
            </button>
          </div>
        </div>

        {/* Wishlist Controls */}
        <div className="wishlist-controls">
          <div className="selection-controls">
            <label className="select-all-checkbox">
              <input
                type="checkbox"
                checked={selectedItems.size === wishlistItems.length && wishlistItems.length > 0}
                onChange={handleSelectAll}
              />
              <span>
                Select All ({selectedItems.size} of {wishlistItems.length})
              </span>
            </label>

            {selectedItems.size > 0 && (
              <div className="bulk-actions">
                <button
                  className="btn btn-secondary"
                  onClick={handleAddSelectedToCart}
                  disabled={selectedItems.size === 0}
                >
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                  Add to Cart ({selectedItems.size})
                </button>
                <button
                  className="btn btn-outline remove-button"
                  onClick={handleRemoveSelected}
                >
                  <span className="material-symbols-outlined">delete</span>
                  Remove ({selectedItems.size})
                </button>
              </div>
            )}
          </div>

          <div className="sort-controls">
            <label htmlFor="sort-select" className="sort-label">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="recently-added">Recently Added</option>
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>



        {/* Wishlist Items */}
        <div className="wishlist-content">
          <div className="wishlist-items">
            {sortedWishlistItems.map((item) => (
              <div key={item.id} className="wishlist-item">
                <div className="item-selection">
                  <input
                    type="checkbox"
                    checked={selectedItems.has(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    className="item-checkbox"
                  />
                </div>
                
                <div className="item-card">
                  <ProductGrid
                    products={[item]}
                    onWishlistToggle={handleRemoveFromWishlist}
                    onAddToCart={handleAddToCart}
                    showWishlist={true}
                    showAddToCart={true}
                    variant="detailed"
                  />
                </div>

                <div className="item-actions">
                  <button
                    className="action-button remove-button"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    title="Remove from wishlist"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Wishlist Summary */}
          <div className="wishlist-summary">
            <div className="summary-card">
              <h3 className="summary-title">Wishlist Summary</h3>
              
              <div className="summary-stats">
                <div className="stat-item">
                  <span className="stat-label">Total Items:</span>
                  <span className="stat-value">{wishlistItems.length}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Available:</span>
                  <span className="stat-value">{availableItems.length}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Total Value:</span>
                  <span className="stat-value">₹{totalValue.toFixed(2)}</span>
                </div>
              </div>

              <div className="summary-actions">
                <button
                  className="btn btn-primary full-width"
                  onClick={() => handleAddSelectedToCart()}
                  disabled={availableItems.length === 0}
                >
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                  Add All Available to Cart
                </button>
                
                <button
                  className="btn btn-outline full-width"
                  onClick={handleContinueShopping}
                >
                  <span className="material-symbols-outlined">storefront</span>
                  Continue Shopping
                </button>
              </div>
            </div>

            {/* Quick Categories */}
            <div className="quick-categories">
              <h4>Quick Shop</h4>
              <div className="category-links">
                <button
                  className="category-link"
                  onClick={() => router.push("/categories")}
                >
                  <span className="material-symbols-outlined">category</span>
                  All Categories
                </button>
                <button
                  className="category-link"
                  onClick={() => router.push("/search?q=offers")}
                >
                  <span className="material-symbols-outlined">local_offer</span>
                  Special Offers
                </button>
                <button
                  className="category-link"
                  onClick={() => router.push("/search?q=new")}
                >
                  <span className="material-symbols-outlined">new_releases</span>
                  New Arrivals
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
