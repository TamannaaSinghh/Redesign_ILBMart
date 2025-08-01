// DashboardLayout.tsx

"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Truck,
  History,
  MapPin,
  CreditCardIcon,
  WalletMinimal,
  Banknote,
  Gift,
  ShieldHalf,
  LogOut,
  Menu,
  CircleUser,
  CircleUserRound,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { useAuth } from "../context/AuthContext";
import ManageAccount from "@/components/Sidebar/dashboard/ManageAccount";
import Addresses from "@/components/Sidebar/dashboard/Addresses";
import Orders from "@/components/Sidebar/dashboard/Orders";
import TrackOrder from "@/components/Sidebar/dashboard/TrackOrder";
import { getUserProfile } from "@/lib/api";
import Wallet from "@/components/Sidebar/dashboard/Wallet";
import Transactions from "@/components/Sidebar/dashboard/Transactions";
import OffersRewards from "@/components/Sidebar/dashboard/OffersRewards";
import AccountPrivacy from "@/components/Sidebar/dashboard/AccountPrivacy";
import Payment from "@/components/Sidebar/dashboard/Payment";
import "./DashboardLayout.css";

interface SidebarItem {
  name: string;
  icon: React.ElementType;
  component: React.ComponentType;
}

const sidebarItems: SidebarItem[] = [
  { name: "Dashboard", icon: CircleUserRound, component: ManageAccount },
  { name: "Track Your Order", icon: Truck, component: TrackOrder },
  { name: "Order History", icon: History, component: Orders },
  { name: "Saved Addresses", icon: MapPin, component: Addresses },
  { name: "Payment Settings", icon: CreditCardIcon, component: Payment },
  { name: "Wallet", icon: WalletMinimal, component: Wallet },
  { name: "Transactions", icon: Banknote, component: Transactions },
  { name: "Your Offers & Rewards", icon: Gift, component: OffersRewards },
  { name: "Account Privacy", icon: ShieldHalf, component: AccountPrivacy },
];

interface DashboardLayoutProps {
  defaultComponent?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  defaultComponent = "Track Your Order",
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userProfileData, setUserProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeComponent, setActiveComponent] = useState<React.ComponentType>(
    () => {
      const found = sidebarItems.find((item) => item.name === defaultComponent);
      return found ? found.component : ManageAccount;
    }
  );
  const [title, setTitle] = useState<string>(defaultComponent);
  const { user, logout } = useAuth();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const fetchUserData = useCallback(async (token: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserProfile(token);
      setUserProfileData(response.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token);
    } else {
      setError("No authentication token found");
      setLoading(false);
    }
  }, [fetchUserData]);

  const handleItemClick = (item: SidebarItem) => {
    setActiveComponent(() => item.component);
    setTitle(item.name);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="dashboardlayout-root">
      {sidebarOpen && (
        <div className="dashboardlayout-overlay" onClick={toggleSidebar} />
      )}

      <aside
        className={cn(
          "dashboardlayout-sidebar",
          sidebarOpen
            ? "dashboardlayout-sidebar-open"
            : "dashboardlayout-sidebar-closed"
        )}
      >
        {/* Sidebar Profile Section */}

        <div className="dashboardlayout-profile">
          <div className="dashboardlayout-profile-img">
            {userProfileData?.profilePicture ? (
              <img
                src={userProfileData.profilePicture}
                alt="User"
                className="dashboardlayout-profile-avatar"
              />
            ) : (
              <div className="dashboardlayout-profile-placeholder">
                <CircleUserRound size={100} color="#9CA3AF" />
              </div>
            )}
          </div>
          <h3 className="dashboardlayout-profile-name">
            {userProfileData?.name || "User Name"}
          </h3>
          <p className="dashboardlayout-profile-mobile">
            {userProfileData?.mobile || "+91 (555) 123-4567"}
          </p>
          <p className="dashboardlayout-profile-email">
            {userProfileData?.email || "johnsmith@ilbmart.com"}
          </p>
        </div>

        {/* Sidebar Navigation */}
        <nav className="dashboardlayout-nav">
          {sidebarItems.map((item) => (
            <div
              key={item.name}
              className={cn(
                "dashboardlayout-nav-item",
                activeComponent === item.component
                  ? "dashboardlayout-nav-item-active"
                  : "dashboardlayout-nav-item-inactive"
              )}
            >
              <button
                onClick={() => handleItemClick(item)}
                className="dashboardlayout-nav-btn"
              >
                <item.icon
                  className={cn(
                    "dashboardlayout-nav-icon",
                    activeComponent === item.component
                      ? "dashboardlayout-nav-icon-active"
                      : "dashboardlayout-nav-icon-inactive"
                  )}
                />
                <span className="dashboardlayout-nav-label">{item.name}</span>
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              logout();
              localStorage.clear(); // Clear all localStorage items
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
            className="dashboardlayout-signout-btn"
          >
            <LogOut className="dashboardlayout-signout-icon" />
            <span className="dashboardlayout-signout-label">Sign Out</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="dashboardlayout-content">
        {/* Mobile Header */}
        <div className="dashboardlayout-mobile-header">
          <button
            onClick={toggleSidebar}
            className="dashboardlayout-menu-btn"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          <div></div>
        </div>

        <main className="dashboardlayout-main">
          {activeComponent === ManageAccount ? (
            <ManageAccount userProfile={userProfileData} />
          ) : (
            React.createElement(activeComponent)
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
