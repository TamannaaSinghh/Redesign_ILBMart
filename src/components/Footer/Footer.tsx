"use client";

import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../public/assets/images/ILBMart.png";
import PlayStore from "../../../public/assets/images/google-play-store.png";
import AppStore from "../../../public/assets/images/apple-app-store.png";
import "./Footer.css";
import {
  faFacebookF,
  faTwitter,
  faYoutube,
  faWhatsapp,
  faInstagram
} from '@fortawesome/free-brands-svg-icons'

interface Category {
  id: number;
  name: string;
  slug: string;
}

const Footer: React.FC = () => {
  const fetchCategories = (): Category[] => {
    return [
      { id: 1, name: "Groceries", slug: "/" },
      { id: 2, name: "Electronics", slug: "/" },
      { id: 3, name: "Fashion", slug: "/" },
      { id: 4, name: "Home & Kitchen", slug: "/" },
      { id: 5, name: "Beauty", slug: "/" },
      { id: 6, name: "Toys & Games", slug: "/" },
      { id: 7, name: "Sports", slug: "/" },
    ];
  };

  const categories = fetchCategories();

  return (
    <footer className="footer-container">
      <div className="footer-wrapper">
        {/* Section 1: Company Info */}
        <div className="footer-section company-info">
          <div className="footer-logo">
            <img src={logo.src} alt="ILB Mart" />
          </div>
          <p className="company-description">
            Your one-stop shop for all daily needs. Quality products at
            affordable prices with fast delivery.
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <FontAwesomeIcon icon={faPhone} className="contact-icon" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
              <span>support@ilbmart.com</span>
            </div>
            <div className="contact-item-address">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="contact-icon-address"
              />
              <div className="address">
                <span>
                  123, Main Street, MP Nagar, Bhopal, Madhya Pradesh, 000000
                </span>
              </div>
            </div>
          </div>

          <div className="social-area-wrapper">
            <div className="social-icons">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="https://youtube.com"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a
                href="https://whatsapp.com"
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
        </div>

        {/* Section 2: Useful Links */}
        <div className="footer-section useful-links">
          <h3 className="section-title">Useful Links</h3>
          <ul className="footer-links">
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
            <li>
              <Link href="/contact-us">Contact</Link>
            </li>
            <li>
              <Link href="/career">Careers</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms-condition">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="/faq">FAQs</Link>
            </li>
          </ul>
        </div>

        {/* Section 3: Categories */}
        <div className="footer-section categories">
          <div className="section-header">
            <h3 className="section-title">
              Categories
              <span>
                <Link href="/categories" className="see-all-link">
                  See all
                </Link>
              </span>
            </h3>
          </div>
          <ul className="footer-links">
            {categories.map((category) => (
              <li key={category.id}>
                <Link href={category.slug}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 4: Mobile Apps */}
        <div className="footer-section mobile-apps">
          <h3 className="section-title">Download Our App</h3>
          <p className="app-description">
            Shop on the go with our mobile application. Available on both
            platforms.
          </p>
          <div className="app-buttons">
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={PlayStore.src}
                alt="Get on Google Play"
                className="app-download-btn"
              />
            </a>
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={AppStore.src}
                alt="Download on the App Store"
                className="app-download-btn"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
