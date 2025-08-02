"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faSearch,
  faHeart,
  faShoppingCart,
  faBolt,
  faBars,
  faTimes,
  faHome,
  faList,
  faUser,
  faSignInAlt,
  faSignOutAlt,
  faCog
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "@/components/context/LocationContext";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import LoginModal from "@/components/Login/LoginModal/LoginModal";
import ThemeToggle from "@/components/ui/ThemeToggle";
import "./Header.css";

const MobileHeader: React.FC = () => {
  const { location, setShowPopup } = useLocation();
  const router = useRouter();
  const { totalItems: cartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const wishlistCount = wishlistItems.length;

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [placeholderIndex, setPlaceholderIndex] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isPriceSaverActive, setIsPriceSaverActive] = useState<boolean>(false);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const products: string[] = [
    '"amul milk"',
    '"brown bread"',
    '"eggs"',
    '"butter"',
    '"fruit juice"',
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

    // Initialize Price Saver state
    const priceSaverPref = localStorage.getItem("priceSaverActive");
    setIsPriceSaverActive(priceSaverPref === "true");
  }, []);

  // Listen for storage changes
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
    setIsMenuOpen(false);
  };

  const handleLogout = (): void => {
    localStorage.removeItem("apiToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userImage");
    setIsLoggedIn(false);
    setUserImage(null);
    setIsMenuOpen(false);
    router.push("/");
  };

  const togglePriceSaver = (): void => {
    const newState = !isPriceSaverActive;
    setIsPriceSaverActive(newState);
    localStorage.setItem("priceSaverActive", String(newState));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateAndCloseMenu = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="mobile-header-wrapper">
        {/* First Row - Logo, Menu, Wishlist, Profile */}
        <div className="mobile-header-row mobile-header-top">
          <div className="mobile-header-left">
            <button
              className="mobile-menu-toggle"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon 
                icon={isMenuOpen ? faTimes : faBars} 
                className="menu-icon"
              />
            </button>

            <Link href="/" className="mobile-logo">
              <Image
                src="/assets/images/logo.svg"
                alt="ILB Mart Logo"
                className="logo-img"
                width={120}
                height={40}
                quality={100}
              />
            </Link>
          </div>

          <div className="mobile-header-right">
            <Link href="/wishlist" className="mobile-nav-item wishlist">
              <div className="mobile-icon-wrapper">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="mobile-nav-icon heart-icon"
                />
                {wishlistCount > 0 && (
                  <span className="mobile-badge">{wishlistCount}</span>
                )}
              </div>
            </Link>

            <Link href="/cart" className="mobile-nav-item cart">
              <div className="mobile-icon-wrapper">
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="mobile-nav-icon cart-icon"
                />
                {cartCount > 0 && (
                  <span className="mobile-badge">{cartCount}</span>
                )}
              </div>
            </Link>

            {isLoggedIn ? (
              <button className="mobile-nav-item profile" onClick={handleAccountClick}>
                {userImage ? (
                  <Image
                    className="mobile-profile-icon"
                    alt="Profile"
                    src={userImage}
                    width={32}
                    height={32}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faUser}
                    className="mobile-nav-icon profile-icon"
                  />
                )}
              </button>
            ) : (
              <button className="mobile-nav-item profile" onClick={openLoginModal}>
                <FontAwesomeIcon
                  icon={faSignInAlt}
                  className="mobile-nav-icon login-icon"
                />
              </button>
            )}
          </div>
        </div>

        {/* Second Row - Location and Price Saver */}
        <div className="mobile-header-row mobile-header-middle">
          <div className="mobile-location-picker" onClick={() => setShowPopup(true)}>
            <span className="mobile-delivery-time">
              Delivery in <span>{location?.deliveryTime || "15 minutes"}</span>
            </span>
            <span className="mobile-location-address">
              {location?.address
                ? location.address.length > 25
                  ? `${location.address.slice(0, 20)}...`
                  : location.address
                : "Select Location"}
              <FontAwesomeIcon icon={faChevronDown} className="mobile-arrow-down" />
            </span>
          </div>

          <button
            className={`mobile-price-saver ${isPriceSaverActive ? "active" : ""}`}
            onClick={togglePriceSaver}
            aria-label={
              isPriceSaverActive ? "Turn off Price Saver" : "Turn on Price Saver"
            }
          >
            <FontAwesomeIcon
              icon={faBolt}
              className={`mobile-flash-icon ${isPriceSaverActive ? "flash-active" : ""}`}
            />
            <span>Price Saver</span>
          </button>
        </div>

        {/* Third Row - Search Bar */}
        <div className="mobile-header-row mobile-header-bottom">
          <form onSubmit={handleSearch} className="mobile-search-bar">
            <FontAwesomeIcon icon={faSearch} className="mobile-search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mobile-search-input"
              placeholder="Search for products..."
              aria-label="Search products"
            />
            {!searchQuery && (
              <div className="mobile-placeholder-container">
                <span className="mobile-static-text">Search for</span>
                <span className="mobile-dynamic-product">
                  {products[placeholderIndex]}
                </span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <h3>Menu</h3>
              <button
                className="mobile-menu-close"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="mobile-menu-items">
              <button
                className="mobile-menu-item"
                onClick={() => navigateAndCloseMenu("/")}
              >
                <FontAwesomeIcon icon={faHome} className="mobile-menu-item-icon" />
                <span>Home</span>
              </button>

              <button
                className="mobile-menu-item"
                onClick={() => navigateAndCloseMenu("/categories")}
              >
                <FontAwesomeIcon icon={faList} className="mobile-menu-item-icon" />
                <span>Categories</span>
              </button>

              <button
                className="mobile-menu-item"
                onClick={() => navigateAndCloseMenu("/search")}
              >
                <FontAwesomeIcon icon={faSearch} className="mobile-menu-item-icon" />
                <span>Search</span>
              </button>

              <button
                className="mobile-menu-item"
                onClick={() => navigateAndCloseMenu("/wishlist")}
              >
                <FontAwesomeIcon icon={faHeart} className="mobile-menu-item-icon" />
                <span>Wishlist ({wishlistCount})</span>
              </button>

              <button
                className="mobile-menu-item"
                onClick={() => navigateAndCloseMenu("/cart")}
              >
                <FontAwesomeIcon icon={faShoppingCart} className="mobile-menu-item-icon" />
                <span>Cart ({cartCount})</span>
              </button>

              {isLoggedIn ? (
                <>
                  <button
                    className="mobile-menu-item"
                    onClick={handleAccountClick}
                  >
                    <FontAwesomeIcon icon={faUser} className="mobile-menu-item-icon" />
                    <span>My Account</span>
                  </button>
                  <button
                    className="mobile-menu-item"
                    onClick={() => navigateAndCloseMenu("/dashboard")}
                  >
                    <FontAwesomeIcon icon={faCog} className="mobile-menu-item-icon" />
                    <span>Dashboard</span>
                  </button>
                  <button
                    className="mobile-menu-item logout"
                    onClick={handleLogout}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mobile-menu-item-icon" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <button
                  className="mobile-menu-item"
                  onClick={() => {
                    openLoginModal();
                    setIsMenuOpen(false);
                  }}
                >
                  <FontAwesomeIcon icon={faSignInAlt} className="mobile-menu-item-icon" />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <LoginModal
          onClose={closeLoginModal}
          onSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

export default MobileHeader;
