"use client";
import React, { useMemo } from "react";
import ProductGrid from "@/components/ProductCard/ProductGrid";
import { ProductCardData } from "@/components/ProductCard/ProductCard";
import { mockProducts } from "@/lib/mockData";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { getProductImage } from "@/lib/imageUrls";
import { usePriceSaver } from "@/components/context/PriceSaverContext";
import "./HomeClient.module.css";

const HomeClient: React.FC = () => {
  // Use PriceSaver context to filter products
  const { isPriceSaverActive } = usePriceSaver();

  // Convert mock products to ProductCardData format
  const allProducts: ProductCardData[] = useMemo(() => {
    return mockProducts.map(product => {
      // Find the selected variant or fallback to first variant
      const selectedVariant = product.variants.find(v => v.id === product.selectedVariant) || product.variants[0];

      return {
        id: product.id,
        imageUrl: getProductImage(product.id, 0),
        title: product.name,
        brand: product.brand,
        tags: [product.deliveryTime || "FAST", selectedVariant?.size || "FRESH"].filter(Boolean),
        price: selectedVariant?.price || 0,
        originalPrice: selectedVariant?.originalPrice,
        rating: product.rating,
        deliveryTime: product.deliveryTime,
        isWishlisted: false,
        isAddedToCart: false,
        unit: selectedVariant?.unit,
        outOfStock: false,
        discount: selectedVariant?.originalPrice && selectedVariant.originalPrice > (selectedVariant?.price || 0)
          ? Math.round(((selectedVariant.originalPrice - (selectedVariant?.price || 0)) / selectedVariant.originalPrice) * 100)
          : 0,
      };
    });
  }, []);

  // Helper function to filter products based on price saver state
  const filterProductsByPriceSaver = (products: ProductCardData[]) => {
    if (!isPriceSaverActive) {
      return products;
    }
    // Only show products with discounts when price saver is active
    return products.filter(product => product.discount && product.discount > 0);
  };

  // Filter products by category using actual database categories
  const dairyProducts = useMemo(() => {
    const categoryProducts = allProducts.filter(product => product.id.startsWith('dairy-')).map(product => ({
      ...product,
      tags: ["DAIRY", ...product.tags.slice(1)],
    }));
    return filterProductsByPriceSaver(categoryProducts);
  }, [allProducts, isPriceSaverActive]);

  const snacksProducts = useMemo(() => {
    const categoryProducts = allProducts.filter(product => product.id.startsWith('snacks-')).map(product => ({
      ...product,
      tags: ["SNACKS", ...product.tags.slice(1)],
    }));
    return filterProductsByPriceSaver(categoryProducts);
  }, [allProducts, isPriceSaverActive]);

  const drinksProducts = useMemo(() => {
    const categoryProducts = allProducts.filter(product => product.id.startsWith('beverages-')).map(product => ({
      ...product,
      tags: ["DRINKS", ...product.tags.slice(1)],
    }));
    return filterProductsByPriceSaver(categoryProducts);
  }, [allProducts, isPriceSaverActive]);

  const vegetablesProducts = useMemo(() => {
    const categoryProducts = allProducts.filter(product => product.id.startsWith('fruits-')).map(product => ({
      ...product,
      tags: ["FRESH", ...product.tags.slice(1)],
    }));
    return filterProductsByPriceSaver(categoryProducts);
  }, [allProducts, isPriceSaverActive]);

  // Use cart and wishlist hooks
  const { addToCart, isInCart, isLoading: cartLoading } = useCart();
  const { toggleWishlist, isInWishlist, isLoading: wishlistLoading } = useWishlist();

  const handleWishlistToggle = (id: string) => {
    const product = allProducts.find(p => p.id === id);

    if (product) {
      toggleWishlist({
        id: product.id,
        name: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
        originalPrice: product.originalPrice,
        unit: product.unit,
        brand: product.brand
      });
    }
  };

  const handleAddToCart = (id: string) => {
    const product = allProducts.find(p => p.id === id);

    if (product) {
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
        unit: product.unit
      });
    }
  };

  // Update products with current wishlist and cart state
  const updateProductsWithState = (products: ProductCardData[]) => {
    // During hydration or loading, always return false to avoid mismatch
    if (cartLoading || wishlistLoading) {
      return products.map(product => ({
        ...product,
        isWishlisted: false,
        isAddedToCart: false,
      }));
    }

    return products.map(product => ({
      ...product,
      isWishlisted: isInWishlist(product.id),
      isAddedToCart: isInCart(product.id),
    }));
  };

  return (
    <div className={`home-client ${isPriceSaverActive ? 'price-saver-mode' : ''}`}>
      {/* Price Saver Mode Banner */}
      {isPriceSaverActive && (
        <div className="price-saver-banner">
          <div className="container">
            <div className="banner-content">
              <span className="banner-icon">⚡</span>
              <div className="banner-text">
                <h3>Price Saver Mode Active</h3>
                <p>Showing only products with special offers and discounts</p>
              </div>
              <div className="banner-stats">
                <span className="stats-text">Save up to 50% off</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Dairy, Bread & Eggs Section */}
      <section className="product-section dairy-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-icon">🥛</span>
              Dairy, Bread & Eggs
            </h2>
            <p className="section-subtitle">Fresh daily essentials delivered to your door</p>
            <a href="/categories/dairy" className="view-all-link">
              View All
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
          <ProductGrid
            products={updateProductsWithState(dairyProducts).slice(0, 12)}
            onWishlistToggle={handleWishlistToggle}
            onAddToCart={handleAddToCart}
            variant="default"
            className="home-products-grid"
          />
        </div>
      </section>

      {/* Snacks & Munchies Section */}
      <section className="product-section snacks-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-icon">🍿</span>
              Snacks & Munchies
            </h2>
            <p className="section-subtitle">Satisfy your cravings with our wide selection</p>
            <a href="/categories/snacks" className="view-all-link">
              View All
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
          <ProductGrid
            products={updateProductsWithState(snacksProducts).slice(0, 12)}
            onWishlistToggle={handleWishlistToggle}
            onAddToCart={handleAddToCart}
            variant="default"
            className="home-products-grid"
          />
        </div>
      </section>

      {/* Cold Drinks & Juices Section */}
      <section className="product-section drinks-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-icon">🥤</span>
              Cold Drinks & Juices
            </h2>
            <p className="section-subtitle">Refreshing beverages for every moment</p>
            <a href="/categories/drinks" className="view-all-link">
              View All
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
          <ProductGrid
            products={updateProductsWithState(drinksProducts).slice(0, 12)}
            onWishlistToggle={handleWishlistToggle}
            onAddToCart={handleAddToCart}
            variant="default"
            className="home-products-grid"
          />
        </div>
      </section>

      {/* Vegetables & Fruits Section */}
      <section className="product-section vegetables-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-icon">🥬</span>
              Vegetables & Fruits
            </h2>
            <p className="section-subtitle">Farm-fresh produce delivered daily</p>
            <a href="/categories/vegetables" className="view-all-link">
              View All
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
          <ProductGrid
            products={updateProductsWithState(vegetablesProducts).slice(0, 12)}
            onWishlistToggle={handleWishlistToggle}
            onAddToCart={handleAddToCart}
            variant="default"
            className="home-products-grid"
          />
        </div>
      </section>
    </div>
  );
};

export default HomeClient;
