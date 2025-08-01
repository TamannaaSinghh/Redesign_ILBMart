"use client";
import React, { useState } from "react";
import { ProductImage } from "./types";
import "./ImageCarousel.css";

interface ImageCarouselProps {
  images: ProductImage[];
  productName: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, productName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  const currentImage = images[currentImageIndex];

  if (!images || images.length === 0) {
    return (
      <div className="image-carousel">
        <div className="main-image-container">
          <div className="placeholder-image">
            <span className="material-symbols-outlined">image</span>
            <span>No image available</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="image-carousel">
      {/* Main Image */}
      <div className="main-image-container">
        <div className={`main-image-wrapper ${isZoomed ? "zoomed" : ""}`}>
          <img
            src={currentImage.url || "/assets/images/default-img.png"}
            alt={currentImage.alt || productName}
            className="main-image"
            onClick={handleImageClick}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/assets/images/default-img.png";
            }}
          />
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                className="nav-button prev-button"
                onClick={handlePrevious}
                aria-label="Previous image"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button
                className="nav-button next-button"
                onClick={handleNext}
                aria-label="Next image"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </>
          )}

          {/* Zoom Icon */}
          <button
            className="zoom-button"
            onClick={handleImageClick}
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          >
            <span className="material-symbols-outlined">
              {isZoomed ? "zoom_out" : "zoom_in"}
            </span>
          </button>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="image-counter">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="thumbnails-container">
          <div className="thumbnails-wrapper">
            {images.map((image, index) => (
              <button
                key={image.id}
                className={`thumbnail ${index === currentImageIndex ? "active" : ""}`}
                onClick={() => handleThumbnailClick(index)}
                aria-label={`View image ${index + 1}`}
              >
                <img
                  src={image.url || "/assets/images/default-img.png"}
                  alt={image.alt || `${productName} - Image ${index + 1}`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/assets/images/default-img.png";
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Zoom Overlay */}
      {isZoomed && (
        <div className="zoom-overlay" onClick={() => setIsZoomed(false)}>
          <div className="zoom-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-zoom-button"
              onClick={() => setIsZoomed(false)}
              aria-label="Close zoom"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <img
              src={currentImage.url || "/assets/images/default-img.png"}
              alt={currentImage.alt || productName}
              className="zoomed-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
