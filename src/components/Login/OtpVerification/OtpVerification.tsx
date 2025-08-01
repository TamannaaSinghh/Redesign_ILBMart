"use client";

import React, { useState, useEffect, useRef } from "react";
import "./OtpVerification.css";
import SuccessModal from "../SuccessModal/SuccessModal";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { verifyOtpLogin } from "@/lib/api";

interface OtpVerificationProps {
  onClose: () => void;
  mobile: string;
  onSuccess: () => void;
  onBackToLogin: () => void;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({
  onClose,
  mobile,
  onSuccess,
  onBackToLogin,
}) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [shakeError, setShakeError] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleOtpChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Clear error when typing
      if (errorMessage) {
        setErrorMessage("");
        setShakeError(false);
      }

      // Auto-focus next input
      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullOtp = otp.join("");

    if (fullOtp.length !== 4) {
      showError("Please enter a complete 4-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await verifyOtpLogin(mobile, fullOtp);
      if (response.success && response.token) {
        localStorage.setItem("apiToken", response.token);
        localStorage.setItem("user", JSON.stringify(response.data));
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          onClose();
          onSuccess();
        }, 2000);
      } else {
        showError(response.message || "Invalid OTP. Please try again.");
      }
    } catch (err: any) {
      showError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const showError = (message: string) => {
    setErrorMessage(message);
    setShakeError(true);
    setTimeout(() => setShakeError(false), 500);
  };

  const handleResendOtp = () => {
    setOtp(["", "", "", ""]);
    setTimeLeft(30);
    setCanResend(false);
    setErrorMessage("");
    inputRefs.current[0]?.focus();
    console.log("Resending OTP...");
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <div className="modal-overlay">
      <div className="otp-modal-wrapper">
        {errorMessage && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            {errorMessage}{" "}
            <span className="error-icon">
              <i className="fas fa-times"></i>
            </span>
          </div>
        )}
        <div className={`otp-modal ${shakeError ? "shake" : ""}`}>
          <div className="verification-title">
            <button className="back-button" onClick={onBackToLogin}>
              <i className="fas fa-angle-left"></i>
            </button>
            <h2 className="verification">OTP Verification</h2>
            {/* <button className="close-button" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button> */}
          </div>

          <p className="otp-message">
            We have sent a verification code to <br />
          </p>
          <span className="otp-phone">+91 {mobile}</span>

          {/* {errorMessage && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              {errorMessage}
            </div>
          )} */}

          <form onSubmit={handleSubmit}>
            <div className="otp-input-container">
              <div className="otp-fields">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      if (el) inputRefs.current[index] = el;
                    }}
                    id={`otp-${index}`}
                    type="tel"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    maxLength={1}
                    required
                    className={`otp-input ${errorMessage ? "error" : ""}`}
                    autoFocus={index === 0}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className={`verify-button ${
                !isOtpComplete || loading ? "disabled" : ""
              }`}
              disabled={!isOtpComplete || loading}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Verifying...
                </>
              ) : (
                "Verify"
              )}
            </button>

            <div className="resend-container">
              {canResend ? (
                <p>
                  Didn't receive OTP?
                  <button
                    type="button"
                    className="resend-button"
                    onClick={handleResendOtp}
                  >
                    Resend OTP
                  </button>
                </p>
              ) : (
                <p className="timer-text">Resend OTP in {timeLeft}s</p>
              )}
            </div>
          </form>

          {showSuccessModal && (
            <SuccessModal
              onClose={() => {
                setShowSuccessModal(false);
                onClose();
                onSuccess();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
