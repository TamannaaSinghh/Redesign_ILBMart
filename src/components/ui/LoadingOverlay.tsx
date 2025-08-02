"use client";

import React from 'react';
import './LoadingOverlay.css';

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  type?: 'spinner' | 'pulse' | 'minimal';
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isVisible, 
  message = 'Loading...', 
  type = 'minimal' 
}) => {
  if (!isVisible) return null;

  const renderLoader = () => {
    switch (type) {
      case 'spinner':
        return (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        );
      case 'pulse':
        return (
          <div className="loading-pulse">
            <div className="pulse-dot"></div>
            <div className="pulse-dot"></div>
            <div className="pulse-dot"></div>
          </div>
        );
      case 'minimal':
      default:
        return (
          <div className="loading-minimal">
            <div className="minimal-bar"></div>
          </div>
        );
    }
  };

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        {renderLoader()}
        {message && <p className="loading-message">{message}</p>}
      </div>
    </div>
  );
};

export default LoadingOverlay;
