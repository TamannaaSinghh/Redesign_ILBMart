// Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faMicrophone,
  faSearch,
  faUser,
  faHeart,
  faShoppingCart,
  faBolt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "@/components/context/LocationContext";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import LoginModal from "@/components/Login/LoginModal/LoginModal";
import ThemeToggle from "@/components/ui/ThemeToggle";
import ToggleSlider from "@/components/ui/ToggleSlider";
import { usePriceSaver } from "@/components/context/PriceSaverContext";
import "./Header.css";
import MobileHeader from "./MobileHeader";

const Header: React.FC = () => {
  const { location, setShowPopup } = useLocation();
  const router = useRouter();
  const { totalItems: cartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const wishlistCount = wishlistItems.length;

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [placeholderIndex, setPlaceholderIndex] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const [userImage, setUserImage] = useState<string | null>(null);

  const products: string[] = [
    '"amul milk"',
    '"brown bread"',
    '"eggs"',
    '"butter"',
    '"fruit juice"',
    '"vegetables"',
    '"rice"',
    '"oil"',
  ];

  // Initialize component state from localStorage
  useEffect(() => {
    const token = localStorage.getItem("apiToken");
    setIsLoggedIn(!!token);
    if (token) {
      const userImage = localStorage.getItem("userImage");
      setUserImage(userImage || "");
      const user = localStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        setIsLoggedIn(true);
        setUserImage(userData.image || "");
      }
    }


  }, []);



  // Listen for storage changes (like login/logout in other tabs)
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("apiToken");
      setIsLoggedIn(!!token);
    };

    checkToken();
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  // Rotate search placeholder text
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % products.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  // Login modal handlers
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const handleLoginSuccess = () => {
    const image = localStorage.getItem("userImage");
    setUserImage(image);
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      setUserImage(userData.image || "");
    }
    closeLoginModal();
  };

  const handleAccountClick = () => {
    isLoggedIn ? router.push("/dashboard") : openLoginModal();
  };

  const handleLogout = (): void => {
    localStorage.removeItem("apiToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userImage");
    setIsLoggedIn(false);
    setUserImage(null);
    router.push("/");
  };

  // Use PriceSaver context
  const { isPriceSaverActive, togglePriceSaver } = usePriceSaver();

  return (
    <header>
      <div className="ilb-header">
        {/* Logo */}
        <Link href="/" className="header-logo">
          <Image
            src="/assets/images/ILB Mart Web.png"
            alt="ILB Mart Logo"
            className="logo-img"
            width={120}
            height={45}
            quality={100}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/icon.svg";
            }}
          />
        </Link>

        {/* Price Saver Toggle */}
        <div className={`price-saver-wrapper ${isPriceSaverActive ? 'active' : ''}`}>
          <ToggleSlider
            isActive={isPriceSaverActive}
            onToggle={togglePriceSaver}
            label="Price Saver"
            size="md"
            showIcon={true}
          />
        </div>

        {/* Location Picker */}
        <div className="location-picker" onClick={() => setShowPopup(true)}>
          <span className="delivery-time">
            Delivery in <span>{location?.deliveryTime || "15 minutes"}</span>
          </span>
          <span className="location-address">
            {location?.address
              ? location.address.length > 30
                ? `${location.address.slice(0, 22)}...`
                : location.address
              : "Select Location"}
            <FontAwesomeIcon icon={faChevronDown} className="arrow-down" />
          </span>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="search-bar">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <span className="search-label">Search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            aria-label="Search products"
          />
          {!searchQuery && (
            <div className="placeholder-container">
              <span className="static-text">Search for</span>
              <span className="dynamic-product">
                {products[placeholderIndex]}
              </span>
            </div>
          )}
          <button type="button" className="voice-search-btn">
            {/* <FontAwesomeIcon icon={faMicrophone} className="mic-icon" /> */}
          </button>
        </form>

        {/* Navigation */}
        <nav className="header-nav">
          {/* Theme Toggle */}
          <div className="nav-item theme">
            <ThemeToggle size="sm" showLabel={false} />
          </div>

          {/* Wishlist Button */}
          <Link href="/wishlist" className="nav-item wishlist">
            <div className="icon-wrapper">
              <FontAwesomeIcon
                icon={faHeart}
                className="nav-icon heart-icon"
              />
              {wishlistCount > 0 && (
                <span className="wishlist-badge">{wishlistCount}</span>
              )}
            </div>
            <span>Wishlist</span>
          </Link>

          {/* Cart Button */}
          <Link href="/cart" className="nav-item cart">
            <div className="icon-wrapper">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="nav-icon cart-icon"
              />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </div>
            <span>Cart</span>
          </Link>

          {/* Profile Button - shows different states based on login status */}
          {isLoggedIn ? (
            <button className="nav-item profile" onClick={handleAccountClick}>
              {userImage ? (
                <Image
                  className="profile-icon"
                  alt="Profile"
                  src={userImage}
                  width={40}
                  height={40}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faUser}
                  className="nav-icon profile-icon"
                />
              )}
              <span>Profile</span>
            </button>
          ) : (
            <button className="nav-item profile" onClick={openLoginModal}>
              <FontAwesomeIcon
                icon={faUser}
                className="nav-icon login-icon"
              />
              <span>Login</span>
            </button>
          )}
        </nav>

        {/* Login Modal */}
        {isLoginModalOpen && (
          <LoginModal
            onClose={closeLoginModal}
            onSuccess={handleLoginSuccess}
          />
        )}
      </div>
      <header className="mobile-only">
        <MobileHeader />
      </header>
    </header>
  );
};

export default Header;
