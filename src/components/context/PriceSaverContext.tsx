"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PriceSaverContextType {
  isPriceSaverActive: boolean;
  togglePriceSaver: () => void;
  setPriceSaverActive: (active: boolean) => void;
}

const PriceSaverContext = createContext<PriceSaverContextType | undefined>(undefined);

interface PriceSaverProviderProps {
  children: ReactNode;
}

export const PriceSaverProvider: React.FC<PriceSaverProviderProps> = ({ children }) => {
  const [isPriceSaverActive, setIsPriceSaverActive] = useState<boolean>(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('priceSaverActive');
    if (savedState !== null) {
      setIsPriceSaverActive(JSON.parse(savedState));
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('priceSaverActive', JSON.stringify(isPriceSaverActive));
  }, [isPriceSaverActive]);

  const togglePriceSaver = () => {
    setIsPriceSaverActive(prev => !prev);
  };

  const setPriceSaverActive = (active: boolean) => {
    setIsPriceSaverActive(active);
  };

  const value: PriceSaverContextType = {
    isPriceSaverActive,
    togglePriceSaver,
    setPriceSaverActive,
  };

  return (
    <PriceSaverContext.Provider value={value}>
      {children}
    </PriceSaverContext.Provider>
  );
};

export const usePriceSaver = (): PriceSaverContextType => {
  const context = useContext(PriceSaverContext);
  if (context === undefined) {
    throw new Error('usePriceSaver must be used within a PriceSaverProvider');
  }
  return context;
};
