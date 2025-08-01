"use client";
import { useState, useEffect } from "react";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  originalPrice?: number;
  unit?: string;
  brand?: string;
}

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("ekomart-wishlist");
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error("Error loading wishlist from localStorage:", error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save wishlist to localStorage whenever wishlist changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("ekomart-wishlist", JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isLoading]);

  const addToWishlist = (product: WishlistItem) => {
    setWishlistItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev; // Already in wishlist
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  const toggleWishlist = (product: WishlistItem) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  };

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    isInWishlist,
    isLoading,
  };
};
