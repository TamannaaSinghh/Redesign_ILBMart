"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductGrid from "@/components/ProductCard/ProductGrid";
import { ProductCardData } from "@/components/ProductCard/ProductCard";
import { allProducts, searchProducts, categoryData } from "@/lib/productDatabase";
import "./search.css";

interface FilterState {
  category: string;
  priceRange: [number, number];
  rating: number;
  sortBy: string;
  inStock: boolean;
}

const SearchPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(query);
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    priceRange: [0, 1000],
    rating: 0,
    sortBy: "relevance",
    inStock: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(new Set());
  const [cartItems, setCartItems] = useState<Set<string>>(new Set());

  // Convert products to ProductCardData format
  const convertToProductCardData = (products: typeof allProducts): ProductCardData[] => {
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
  };

  // Get search results
  const searchResults = useMemo(() => {
    if (searchQuery.trim()) {
      return searchProducts(searchQuery);
    }
    return allProducts;
  }, [searchQuery]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let results = convertToProductCardData(searchResults);

    // Category filter
    if (filters.category) {
      results = results.filter(product =>
        product.id.startsWith(filters.category.split('-')[0])
      );
    }

    // Price range filter
    results = results.filter(product =>
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Rating filter
    if (filters.rating > 0) {
      results = results.filter(product => product.rating >= filters.rating);
    }

    // In stock filter
    if (filters.inStock) {
      results = results.filter(product => !product.outOfStock);
    }

    // Sort results
    switch (filters.sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // For now, use id as a proxy for newness
        results.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case "name":
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return results;
  }, [searchResults, filters, wishlistedItems, cartItems]);

  useEffect(() => {
    setSearchQuery(query);
    
    // Load wishlist and cart from localStorage
    const savedWishlist = localStorage.getItem("wishlist");
    const savedCart = localStorage.getItem("cart");
    
    if (savedWishlist) {
      setWishlistedItems(new Set(JSON.parse(savedWishlist).map((item: any) => item.productId || item.id)));
    }
    
    if (savedCart) {
      setCartItems(new Set(JSON.parse(savedCart).map((item: any) => item.productId || item.id)));
    }
  }, [query]);

  const handleSearch = (newQuery: string) => {
    setSearchQuery(newQuery);
    const params = new URLSearchParams();
    if (newQuery.trim()) {
      params.set("q", newQuery);
    }
    router.push(`/search?${params.toString()}`);
  };

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      priceRange: [0, 1000],
      rating: 0,
      sortBy: "relevance",
      inStock: false,
    });
  };

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

  return (
    <div className="search-page">
      <div className="container">
        {/* Search Header */}
        <div className="search-header">
          <div className="search-input-container">
            <div className="search-input-wrapper">
              <span className="material-symbols-outlined search-icon">search</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch(searchQuery)}
              />
              {searchQuery && (
                <button
                  className="clear-search-button"
                  onClick={() => handleSearch("")}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              )}
            </div>
            <button
              className="search-button"
              onClick={() => handleSearch(searchQuery)}
            >
              Search
            </button>
          </div>

          {/* Filter Toggle (Mobile) */}
          <button
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span className="material-symbols-outlined">tune</span>
            Filters
          </button>
        </div>

        {/* Results Info */}
        <div className="results-info">
          <h1 className="results-title">
            {searchQuery ? `Search results for "${searchQuery}"` : "All Products"}
          </h1>
          <p className="results-count">
            {filteredProducts.length} products found
          </p>
        </div>

        <div className="search-content">
          {/* Filters Sidebar */}
          <aside className={`filters-sidebar ${showFilters ? "filters-sidebar--open" : ""}`}>
            <div className="filters-header">
              <h3>Filters</h3>
              <button
                className="clear-filters-button"
                onClick={clearFilters}
              >
                Clear All
              </button>
            </div>

            <div className="filter-sections">
              {/* Sort By */}
              <div className="filter-section">
                <h4>Sort By</h4>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  className="filter-select"
                >
                  <option value="relevance">Relevance</option>
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              {/* Categories */}
              <div className="filter-section">
                <h4>Category</h4>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Categories</option>
                  {categoryData.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="filter-section">
                <h4>Price Range</h4>
                <div className="price-range-container">
                  <div className="price-inputs">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange[0]}
                      onChange={(e) =>
                        handleFilterChange("priceRange", [
                          Number(e.target.value),
                          filters.priceRange[1],
                        ])
                      }
                      className="price-input"
                    />
                    <span>to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        handleFilterChange("priceRange", [
                          filters.priceRange[0],
                          Number(e.target.value),
                        ])
                      }
                      className="price-input"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      handleFilterChange("priceRange", [
                        filters.priceRange[0],
                        Number(e.target.value),
                      ])
                    }
                    className="price-slider"
                  />
                </div>
              </div>

              {/* Rating */}
              <div className="filter-section">
                <h4>Minimum Rating</h4>
                <div className="rating-filters">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="rating-filter">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={filters.rating === rating}
                        onChange={(e) =>
                          handleFilterChange("rating", Number(e.target.value))
                        }
                      />
                      <div className="rating-display">
                        <span className="stars">
                          {"★".repeat(rating)}{"☆".repeat(5 - rating)}
                        </span>
                        <span>& Up</span>
                      </div>
                    </label>
                  ))}
                  <label className="rating-filter">
                    <input
                      type="radio"
                      name="rating"
                      value={0}
                      checked={filters.rating === 0}
                      onChange={(e) =>
                        handleFilterChange("rating", Number(e.target.value))
                      }
                    />
                    <span>All Ratings</span>
                  </label>
                </div>
              </div>

              {/* Availability */}
              <div className="filter-section">
                <h4>Availability</h4>
                <label className="checkbox-filter">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange("inStock", e.target.checked)}
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="products-section">
            <ProductGrid
              products={filteredProducts}
              onWishlistToggle={handleWishlistToggle}
              onAddToCart={handleAddToCart}
              loading={loading}
              emptyMessage={
                searchQuery
                  ? `No products found for "${searchQuery}". Try adjusting your search or filters.`
                  : "No products available at the moment."
              }
            />
          </main>
        </div>

        {/* Popular Searches */}
        {!searchQuery && (
          <section className="popular-searches">
            <h2>Popular Searches</h2>
            <div className="popular-search-tags">
              {["milk", "bread", "eggs", "rice", "oil", "vegetables", "fruits", "snacks"].map((tag) => (
                <button
                  key={tag}
                  className="search-tag"
                  onClick={() => handleSearch(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
