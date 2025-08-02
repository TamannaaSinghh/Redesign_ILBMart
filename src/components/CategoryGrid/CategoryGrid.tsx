"use client";
import React, { useEffect } from "react";
import styles from "./CategoryGrid.module.css";
import { useInstantNavigation, useImagePreloader, useHoverPrefetch } from "@/lib/performanceOptimizer";

// Fresh category data with real images and proper structure
const categoryData = [
  {
    id: "vegetables-fruits",
    name: "Fruits & Vegetables",
    subtitle: "Fresh & Organic",
    itemCount: "200+ Items",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop&crop=center",
    bgColor: "#E8F5E8",
    iconColor: "#2E7D32"
  },
  {
    id: "dairy-bread-eggs",
    name: "Dairy & Eggs", 
    subtitle: "Fresh Daily",
    itemCount: "150+ Items",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop&crop=center",
    bgColor: "#E3F2FD",
    iconColor: "#1976D2"
  },
  {
    id: "snacks-beverages",
    name: "Snacks & Beverages",
    subtitle: "Quick Bites",
    itemCount: "180+ Items", 
    image: "https://images.unsplash.com/photo-1559656914-a30970c1affd?w=300&h=300&fit=crop&crop=center",
    bgColor: "#FFF3E0",
    iconColor: "#F57C00"
  },
  {
    id: "instant-foods",
    name: "Instant Foods",
    subtitle: "Ready to Cook",
    itemCount: "120+ Items",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop&crop=center",
    bgColor: "#F3E5F5",
    iconColor: "#7B1FA2"
  },
  {
    id: "personal-care",
    name: "Personal Care", 
    subtitle: "Health & Beauty",
    itemCount: "90+ Items",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop&crop=center",
    bgColor: "#FCE4EC",
    iconColor: "#C2185B"
  },
  {
    id: "baby-care",
    name: "Baby Care",
    subtitle: "Safe & Gentle", 
    itemCount: "60+ Items",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop&crop=center",
    bgColor: "#E8F5E8",
    iconColor: "#388E3C"
  },
  {
    id: "home-kitchen",
    name: "Home & Kitchen",
    subtitle: "Essentials",
    itemCount: "110+ Items",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop&crop=center", 
    bgColor: "#EFEBE9",
    iconColor: "#5D4037"
  },
  {
    id: "health-wellness",
    name: "Health & Wellness",
    subtitle: "Stay Healthy",
    itemCount: "75+ Items",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=300&fit=crop&crop=center",
    bgColor: "#E1F5FE", 
    iconColor: "#0277BD"
  }
];

const CategoryGrid: React.FC = () => {
  const { createOptimizedHandler, prefetchRoute } = useInstantNavigation();
  const hoverPrefetch = useHoverPrefetch();

  // Preload all category images for instant display
  const categoryImages = categoryData.map(cat => cat.image);
  useImagePreloader(categoryImages);

  // Prefetch critical routes on component mount
  useEffect(() => {
    // Prefetch categories page and first few category pages
    prefetchRoute('/categories');
    categoryData.slice(0, 4).forEach(category => {
      prefetchRoute(`/categories/${category.id}`);
    });
  }, [prefetchRoute]);

  const handleCategoryClick = createOptimizedHandler;
  const handleViewAllClick = createOptimizedHandler('/categories');

  return (
    <section className={styles.categorySection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Shop by Category</h2>
          <p className={styles.sectionDescription}>
            Discover fresh products across all your favorite categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className={styles.categoriesGrid}>
          {categoryData.map((category, index) => (
            <div
              key={category.id}
              className={styles.categoryCard}
              onClick={() => handleCategoryClick(category.id)}
              style={{ 
                backgroundColor: category.bgColor,
                animationDelay: `${index * 100}ms` 
              }}
            >
              <div className={styles.categoryImageContainer}>
                <img
                  src={category.image || "/assets/images/default-img.png"}
                  alt={category.name}
                  className={styles.categoryImage}
                  loading="lazy"
                />
                <div className={styles.imageOverlay} />
              </div>
              
              <div className={styles.categoryContent}>
                <h3 className={styles.categoryName}>{category.name}</h3>
                <p className={styles.categorySubtitle}>{category.subtitle}</p>
                <span className={styles.itemCount}>{category.itemCount}</span>
              </div>
              
              <div className={styles.categoryArrow}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className={styles.viewAllContainer}>
          <button 
            className={styles.viewAllButton}
            onClick={handleViewAllClick}
          >
            <span>View All Categories</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
