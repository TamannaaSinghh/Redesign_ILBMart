"use client";

import React, { useState } from "react";
import "./LoginModal.css";
import OtpVerification from "../OtpVerification/OtpVerification";
import Image from "next/image";
import logo from "../../../../public/assets/images/final_logo.png";
import { sendLoginOtp } from "@/lib/api";
import ReactDOM from "react-dom";

interface LoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onSuccess }) => {
  const [mobile, setMobile] = useState<string>("");
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const isValidPhone = /^[0-9]{10}$/.test(mobile);
    if (!isValidPhone) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      setLoading(true);
      const response = await sendLoginOtp({ mobile });

      if (response.success) {
        setShowOtpModal(true);
      } else {
        setError(response.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = /^[0-9]{10}$/.test(mobile);

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="login-modal-wrapper">
        {error && (
          <p className="error-text">
            <i className="fas fa-exclamation-circle"></i>
            {error}
            <button className="close-error" onClick={() => setError(null)}>
              ×
            </button>
          </p>
        )}
        <div className="login-modal">
          <button className="close-button" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
          <div className="logo-container">
            <Image src={logo} alt="App Logo" className="logo-image" />
            <p className="slogan">Shop from your Local Bazaar</p>
          </div>
          <h2 className="login-signup">Log in or Sign up</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <div className={`phone-input-wrapper ${error ? "invalid" : ""}`}>
                <div className="country-code">+91</div>
                <input
                  type="tel"
                  id="mobile"
                  value={mobile}
                  placeholder="Enter Phone Number"
                  onChange={(e) => setMobile(e.target.value)}
                  pattern="[0-9]{10}"
                  maxLength={10}
                  required
                  className="phone-input"
                />
              </div>
            </div>
            <button
              type="submit"
              className={`continue-button ${!isFormValid || loading ? "disabled" : ""}`}
              disabled={!isFormValid || loading}
            >
              {loading ? "Sending OTP..." : "Continue"}
            </button>
            <p className="legal-text">
              By clicking on "Continue", you agree to our{" "}
              <a href="/terms">Terms of Service</a> &{" "}
              <a href="/privacy">Privacy Policy</a>
            </p>
          </form>
          {showOtpModal && (
            <OtpVerification
              onClose={() => {
                setShowOtpModal(false);
                onClose();
              }}
              mobile={mobile}
              onSuccess={onSuccess}
              onBackToLogin={() => setShowOtpModal(false)}
            />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LoginModal;