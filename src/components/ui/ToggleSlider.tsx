"use client";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import './ToggleSlider.css';

interface ToggleSliderProps {
  isActive: boolean;
  onToggle: () => void;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  disabled?: boolean;
}

const ToggleSlider: React.FC<ToggleSliderProps> = ({
  isActive,
  onToggle,
  label = 'Price Saver',
  size = 'md',
  showIcon = true,
  disabled = false
}) => {
  return (
    <div className={`toggle-slider-container ${size} ${disabled ? 'disabled' : ''}`}>
      {showIcon && (
        <FontAwesomeIcon
          icon={faBolt}
          className={`toggle-icon ${isActive ? 'active' : ''}`}
        />
      )}
      
      <div className="toggle-wrapper">
        <button
          className={`toggle-slider ${isActive ? 'active' : ''}`}
          onClick={onToggle}
          disabled={disabled}
          aria-label={`${isActive ? 'Disable' : 'Enable'} ${label}`}
          role="switch"
          aria-checked={isActive}
        >
          <div className="toggle-track">
            <div className="toggle-thumb"></div>
          </div>
        </button>
        
        <span className="toggle-label">{label}</span>
      </div>
    </div>
  );
};

export default ToggleSlider;
