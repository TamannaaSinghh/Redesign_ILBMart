"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSimpleNavigation } from "@/lib/simpleNavigation";
import "./categories.css";

// Extended categories data for the View All page
const allCategories = [
  {
    id: "fruits-vegetables",
    name: "Fruits & Vegetables",
    description: "Fresh vegetables and fruits delivered daily",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=200&h=200&fit=crop&crop=center",
    icon: "🥬",
    productCount: 200,
    tags: ["fresh", "organic", "daily", "vegetables", "fruits"],
    gradient: "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)"
  },
  {
    id: "dairy-eggs",
    name: "Dairy & Eggs", 
    description: "Fresh dairy products, bread and eggs",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop&crop=center",
    icon: "🥛",
    productCount: 150,
    tags: ["dairy", "milk", "eggs", "cheese", "yogurt"],
    gradient: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)"
  },
  {
    id: "snacks-biscuits", 
    name: "Snacks & Biscuits",
    description: "Delicious snacks and biscuits",
    image: "https://images.unsplash.com/photo-1559656914-a30970c1affd?w=200&h=200&fit=crop&crop=center",
    icon: "🍪",
    productCount: 80,
    tags: ["snacks", "biscuits", "chips", "cookies", "crackers"],
    gradient: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)"
  },
  {
    id: "beverages",
    name: "Beverages", 
    description: "Refreshing drinks and beverages",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&h=200&fit=crop&crop=center",
    icon: "🥤",
    productCount: 120,
    tags: ["drinks", "juice", "soda", "water", "tea", "coffee"],
    gradient: "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)"
  },
  {
    id: "personal-care",
    name: "Personal Care",
    description: "Health and personal care items",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop&crop=center",
    icon: "🧴",
    productCount: 90,
    tags: ["soap", "shampoo", "toothpaste", "skincare", "hygiene"],
    gradient: "linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)"
  },
  {
    id: "baby-care",
    name: "Baby Care",
    description: "Baby care products and essentials",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=200&h=200&fit=crop&crop=center",
    icon: "👶",
    productCount: 60,
    tags: ["baby", "diapers", "formula", "toys", "care"],
    gradient: "linear-gradient(135deg, #1abc9c 0%, #16a085 100%)"
  },
  {
    id: "home-kitchen",
    name: "Home & Kitchen",
    description: "Kitchen appliances and home essentials",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop&crop=center",
    icon: "🏠",
    productCount: 70,
    tags: ["kitchen", "appliances", "utensils", "home", "cleaning"],
    gradient: "linear-gradient(135deg, #34495e 0%, #2c3e50 100%)"
  },
  {
    id: "pet-care",
    name: "Pet Care",
    description: "Everything for your furry friends",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=200&h=200&fit=crop&crop=center",
    icon: "🐕",
    productCount: 40,
    tags: ["pets", "food", "toys", "accessories", "care"],
    gradient: "linear-gradient(135deg, #e67e22 0%, #d35400 100%)"
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Latest electronics and gadgets",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop&crop=center",
    icon: "📱",
    productCount: 35,
    tags: ["electronics", "gadgets", "phone", "computer", "accessories"],
    gradient: "linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)"
  },
  {
    id: "health-wellness",
    name: "Health & Wellness",
    description: "Health supplements and wellness products",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=200&h=200&fit=crop&crop=center",
    icon: "💊",
    productCount: 55,
    tags: ["health", "supplements", "vitamins", "wellness", "fitness"],
    gradient: "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)"
  },
  {
    id: "frozen-foods",
    name: "Frozen Foods",
    description: "Frozen vegetables, meat and ready meals",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
    icon: "❄️",
    productCount: 45,
    tags: ["frozen", "meat", "vegetables", "ready", "meals"],
    gradient: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)"
  },
  {
    id: "beauty-cosmetics",
    name: "Beauty & Cosmetics",
    description: "Beauty products and cosmetics",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop&crop=center",
    icon: "💄",
    productCount: 65,
    tags: ["beauty", "cosmetics", "makeup", "skincare", "perfume"],
    gradient: "linear-gradient(135deg, #e91e63 0%, #c2185b 100%)"
  }
];

const CategoriesPage: React.FC = () => {
  const router = useRouter();
  const { navigate } = useSimpleNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity");

  // Filter and sort categories
  const filteredCategories = useMemo(() => {
    let filtered = allCategories;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(category => 
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query) ||
        category.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "name":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case "items-high":
        return filtered.sort((a, b) => b.productCount - a.productCount);
      case "items-low":
        return filtered.sort((a, b) => a.productCount - b.productCount);
      case "popularity":
      default:
        return filtered.sort((a, b) => b.productCount - a.productCount);
    }
  }, [searchQuery, sortBy]);

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/categories/${categoryId}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="categories-page">
      <div className="container">
        {/* Header */}
        <div className="categories-header">
          <div className="categories-title-section">
            <h1 className="categories-title">All Categories</h1>
            <p className="categories-subtitle">
              Browse through all {allCategories.length} categories and find exactly what you need
            </p>
          </div>

          {/* Search and Filters */}
          <div className="categories-controls">
            <div className="search-section">
              <div className="search-input-container">
                <span className="material-symbols-outlined search-icon">search</span>
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search-input"
                />
                {searchQuery && (
                  <button 
                    className="clear-search"
                    onClick={() => setSearchQuery("")}
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                )}
              </div>
            </div>

            <div className="sort-section">
              <label htmlFor="sort-select" className="sort-label">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="popularity">Popularity</option>
                <option value="name">Name A-Z</option>
                <option value="items-high">Most Items</option>
                <option value="items-low">Least Items</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="categories-results-info">
          <p>
            Showing {filteredCategories.length} of {allCategories.length} categories
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="categories-grid">
          {filteredCategories.map((category, index) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => handleCategoryClick(category.id)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="category-card-image">
                <img
                  src={category.image || "/assets/images/default-img.png"}
                  alt={category.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/assets/images/default-img.png";
                  }}
                />
                <div className="category-card-overlay" style={{ background: category.gradient }}>
                  <span className="category-card-icon">{category.icon}</span>
                </div>
              </div>

              <div className="category-card-content">
                <h3 className="category-card-name">{category.name}</h3>
                <p className="category-card-description">{category.description}</p>
                <div className="category-card-stats">
                  <span className="category-card-count">
                    {category.productCount}+ items
                  </span>
                  <span className="category-card-arrow">
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">
              <span className="material-symbols-outlined">search_off</span>
            </div>
            <h3>No categories found</h3>
            <p>Try searching with different keywords or clear your search to see all categories.</p>
            <button 
              className="clear-search-btn"
              onClick={() => setSearchQuery("")}
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Back to Home */}
        <div className="categories-footer">
          <button
            className="back-home-btn"
            onClick={() => navigate("/")}
          >
            <span className="material-symbols-outlined">home</span>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
