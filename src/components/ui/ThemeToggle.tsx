"use client";

import React from 'react';
import { useTheme } from '@/components/context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '', 
  showLabel = true, 
  size = 'md' 
}) => {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  const handleThemeChange = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleTheme();
  };

  const getIcon = () => {
    if (resolvedTheme === 'dark') {
      return '🌙'; // Moon icon for dark mode
    }
    return '☀️'; // Sun icon for light mode
  };

  const getLabel = () => {
    if (theme === 'system') {
      return `Auto (${resolvedTheme})`;
    }
    return resolvedTheme === 'dark' ? 'Dark' : 'Light';
  };

  const sizeClasses = {
    sm: 'theme-toggle--sm',
    md: 'theme-toggle--md', 
    lg: 'theme-toggle--lg'
  };

  return (
    <button
      onClick={handleThemeChange}
      className={`theme-toggle ${sizeClasses[size]} ${className}`}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Current theme: ${getLabel()}`}
    >
      <span className="theme-toggle-icon" role="img" aria-hidden="true">
        {getIcon()}
      </span>
      {showLabel && (
        <span className="theme-toggle-label">
          {resolvedTheme === 'dark' ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
