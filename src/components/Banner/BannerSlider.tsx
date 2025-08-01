"use client";
import { useEffect, useState } from "react";
import { BannerItem } from "@/components/Types/Banner";
import { fetchBannerData } from "@/lib/api";
import "./BannerSlider.css";

export default function BannerSlider() {
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBannerData().then((data) => {
      setBanners(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (banners.length > 0) {
      const timer = setInterval(() => {
        setCurrent((prev) => (prev + 1) % banners.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [banners]);

  // Always render the container to avoid hydration mismatch
  if (isLoading || banners.length === 0) {
    return (
      <div className="bannerslider-root">
        <div className="bannerslider-slide bannerslider-slide-active">
          <div className="bannerslider-bg" style={{ backgroundColor: '#47b05a' }}>
            <div className="bannerslider-content">
              <div className="bannerslider-text">
                <h1>Welcome to ILB MART</h1>
                <p>Your Local Bazaar is now Online</p>
                <button className="bannerslider-btn">Shop Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bannerslider-root">
      {banners.map((item, index) => (
        <div
          key={item.id}
          className={`bannerslider-slide ${
            index === current
              ? "bannerslider-slide-active"
              : "bannerslider-slide-inactive"
          }`}
        >
          <a href={item.link}>
            <div
              className="bannerslider-bg"
              style={{ backgroundImage: `url(${item.imageUrl})` }}
            >
              <div className="bannerslider-content">
                <h2 className="bannerslider-title">{item.title}</h2>
                <p className="bannerslider-desc">{item.description}</p>
                <button className="bannerslider-btn">Shop Now</button>
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}
