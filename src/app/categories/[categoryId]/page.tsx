"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getProductsByCategory, categoryData } from "@/lib/productDatabase";
import ProductGrid from "@/components/ProductCard/ProductGrid";
import { ProductCardData } from "@/components/ProductCard/ProductCard";
import "./category.css";

interface CategoryPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ params }) => {
  const resolvedParams = React.use(params);
  const router = useRouter();
  
  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(new Set());
  const [cartItems, setCartItems] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState("relevance");
  const [filterBy, setFilterBy] = useState("all");
  const [loading, setLoading] = useState(true);

  // Find the current category
  const currentCategory = categoryData.find(cat => cat.id === resolvedParams.categoryId);

  // Get products for this category
  const categoryProducts = useMemo(() => {
    const products = getProductsByCategory(resolvedParams.categoryId);
    return products.map(product => ({
      id: product.id,
      imageUrl: product.images[0]?.url || "/assets/images/placeholder.png",
      title: product.name,
      brand: product.brand,
      tags: [product.deliveryTime || "", product.variants[0]?.size || ""].filter(Boolean),
      price: product.variants[0]?.price || 0,
      originalPrice: product.variants[0]?.originalPrice,
      rating: product.rating,
      deliveryTime: product.deliveryTime,
      isWishlisted: wishlistedItems.has(product.id),
      isAddedToCart: cartItems.has(product.id),
      unit: product.variants[0]?.unit,
      outOfStock: product.id.length % 7 === 0, // Deterministically make some items out of stock
    }));
  }, [resolvedParams.categoryId, wishlistedItems, cartItems]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...categoryProducts];

    // Apply filters
    if (filterBy === "in-stock") {
      filtered = filtered.filter(product => !product.outOfStock);
    } else if (filterBy === "on-sale") {
      filtered = filtered.filter(product => product.originalPrice && product.originalPrice > product.price);
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  }, [categoryProducts, sortBy, filterBy]);

  useEffect(() => {
    // Load wishlist and cart from localStorage
    const savedWishlist = localStorage.getItem("wishlist");
    const savedCart = localStorage.getItem("cart");
    
    if (savedWishlist) {
      setWishlistedItems(new Set(JSON.parse(savedWishlist).map((item: any) => item.productId || item.id)));
    }
    
    if (savedCart) {
      setCartItems(new Set(JSON.parse(savedCart).map((item: any) => item.productId || item.id)));
    }
    
    setLoading(false);
  }, []);

  const handleWishlistToggle = (id: string) => {
    const newWishlist = new Set(wishlistedItems);
    if (newWishlist.has(id)) {
      newWishlist.delete(id);
    } else {
      newWishlist.add(id);
    }
    setWishlistedItems(newWishlist);
    
    // Save to localStorage
    const wishlistArray = Array.from(newWishlist).map(productId => ({ productId }));
    localStorage.setItem("wishlist", JSON.stringify(wishlistArray));
    window.dispatchEvent(new Event("storage"));
  };

  const handleAddToCart = (id: string) => {
    const newCart = new Set(cartItems);
    if (newCart.has(id)) {
      newCart.delete(id);
    } else {
      newCart.add(id);
    }
    setCartItems(newCart);
    
    // Save to localStorage
    const cartArray = Array.from(newCart).map(productId => ({ 
      productId, 
      quantity: 1, 
      variantId: "1" 
    }));
    localStorage.setItem("cart", JSON.stringify(cartArray));
    window.dispatchEvent(new Event("storage"));
  };

  const handleSubcategoryClick = (subcategoryId: string) => {
    router.push(`/categories/${resolvedParams.categoryId}/${subcategoryId}`);
  };

  if (!currentCategory) {
    return (
      <div className="category-page">
        <div className="container">
          <div className="category-not-found">
            <h1>Category Not Found</h1>
            <p>The category you're looking for doesn't exist.</p>
            <button
              className="btn btn-primary"
              onClick={() => router.push("/categories")}
            >
              Back to Categories
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="category-page">
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
          <span className="breadcrumb-current">{currentCategory.name}</span>
        </nav>

        {/* Category Header */}
        <div className="category-header">
          <div className="category-hero">
            <div className="category-hero-image">
              <img
                src={currentCategory.image || "/assets/images/default-img.png"}
                alt={currentCategory.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/images/default-img.png";
                }}
              />
              <div className="category-hero-overlay">
                <span className="category-hero-icon">{currentCategory.icon}</span>
              </div>
            </div>
            
            <div className="category-hero-content">
              <h1 className="category-title">{currentCategory.name}</h1>
              <p className="category-description">{currentCategory.description}</p>
              <div className="category-stats">
                <div className="stat-item">
                  <span className="stat-number">{filteredAndSortedProducts.length}</span>
                  <span className="stat-label">Products Available</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{currentCategory.subcategories?.length || 0}</span>
                  <span className="stat-label">Subcategories</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subcategories */}
        {currentCategory.subcategories && currentCategory.subcategories.length > 0 && (
          <div className="subcategories-section">
            <h2 className="subcategories-title">Shop by Type</h2>
            <div className="subcategories-list">
              {currentCategory.subcategories.map((subcategory) => (
                <button
                  key={subcategory.id}
                  className="subcategory-pill"
                  onClick={() => handleSubcategoryClick(subcategory.id)}
                >
                  <span className="subcategory-name">{subcategory.name}</span>
                  <span className="subcategory-count">({subcategory.productCount})</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filters and Sorting */}
        <div className="products-controls">
          <div className="filters-section">
            <h3>Filter by:</h3>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filterBy === "all" ? "active" : ""}`}
                onClick={() => setFilterBy("all")}
              >
                All Products
              </button>
              <button
                className={`filter-btn ${filterBy === "in-stock" ? "active" : ""}`}
                onClick={() => setFilterBy("in-stock")}
              >
                In Stock
              </button>
              <button
                className={`filter-btn ${filterBy === "on-sale" ? "active" : ""}`}
                onClick={() => setFilterBy("on-sale")}
              >
                On Sale
              </button>
            </div>
          </div>

          <div className="sort-section">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="relevance">Relevance</option>
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-section">
          <ProductGrid
            products={filteredAndSortedProducts}
            onWishlistToggle={handleWishlistToggle}
            onAddToCart={handleAddToCart}
            loading={loading}
            emptyMessage={`No products found in ${currentCategory.name}. Try adjusting your filters.`}
            className="category-products-grid"
          />
        </div>

        {/* Back to Categories */}
        <div className="category-footer">
          <button
            className="btn btn-outline back-btn"
            onClick={() => router.push("/categories")}
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back to All Categories
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
