import React from "react";
import ProductCarousel from "@/components/ProductCard/ProductCarousel";
import styles from "./HomeClient.module.css";
import Link from "next/link";

interface Product {
  id: string;
  imageUrl: string;
  title: string;
  tags: string[];
  price: number;
  originalPrice: number;
  rating: number;
  isWishlisted: boolean;
  isAddedToCart: boolean;
}

interface ProductSectionProps {
  title: string;
  products: Product[];
  toggleWishlist: (id: string) => void;
  toggleAddToCart: (id: string) => void;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  products,
  toggleWishlist,
  toggleAddToCart,
}) => (
  <section className={styles.section}>
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <Link href="/categories/vegetables/cid/1/10" className={styles.seeAllButton}>
        See All
      </Link>
    </div>
    <div className={styles.carouselWrapper}>
      <ProductCarousel
        products={products}
        toggleWishlist={toggleWishlist}
        toggleAddToCart={toggleAddToCart}
      />
    </div>
  </section>
);

export default ProductSection; 