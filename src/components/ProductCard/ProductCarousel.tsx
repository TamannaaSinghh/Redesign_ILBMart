"use client";
import React from "react";
import ProductCard from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";

// Product type should match ProductCard's props
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

interface ProductCarouselProps {
  products: Product[];
  toggleWishlist: (id: string) => void;
  toggleAddToCart: (id: string) => void;
  title?: string;
}

const CARDS_PER_PAGE = 6;

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  toggleWishlist,
  toggleAddToCart,
  title,
}) => {
  return (
    <section style={{ margin: "1rem 0" }}>
      {title && <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "0.5rem" }}>{title}</h2>}
      <div style={{ position: "relative" }}>
        <Carousel opts={{ align: "start", slidesToScroll: CARDS_PER_PAGE }}>
          <CarouselPrevious />
          <CarouselContent className="product-carousel-content">
            {products.map((product) => (
              <CarouselItem key={product.id} className="product-carousel-item">
                <ProductCard
                  product={product}
                  toggleWishlist={toggleWishlist}
                  toggleAddToCart={toggleAddToCart}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductCarousel; 