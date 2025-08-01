"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./ModernDashboard.css";

interface ModernDashboardProps {
  activeSection?: string;
  children?: React.ReactNode;
}

const ModernDashboard: React.FC<ModernDashboardProps> = ({ 
  activeSection = "dashboard", 
  children 
}) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user] = useState({
    name: "Abhishek Singh",
    email: "abhishek@example.com",
    avatar: "/profileIcon.png",
    memberSince: "2023",
    points: 1250,
    wallet: 480.50
  });

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "🏠",
      path: "/dashboard",
      badge: null
    },
    {
      id: "orders",
      label: "My Orders",
      icon: "📦",
      path: "/dashboard/orders",
      badge: "3"
    },
    {
      id: "track-order",
      label: "Track Order",
      icon: "🚚",
      path: "/dashboard/track-order",
      badge: null
    },
    {
      id: "wallet",
      label: "My Wallet",
      icon: "💳",
      path: "/dashboard/wallet",
      badge: "New"
    },
    {
      id: "offers",
      label: "Offers & Rewards",
      icon: "🎁",
      path: "/dashboard/offers",
      badge: "5"
    },
    {
      id: "addresses",
      label: "Addresses",
      icon: "📍",
      path: "/dashboard/addresses",
      badge: null
    },
    {
      id: "payment",
      label: "Payment Methods",
      icon: "💳",
      path: "/dashboard/payment",
      badge: null
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: "📊",
      path: "/dashboard/transactions",
      badge: null
    },
    {
      id: "account",
      label: "Account Settings",
      icon: "⚙️",
      path: "/dashboard/account",
      badge: null
    },
    {
      id: "privacy",
      label: "Privacy & Policy",
      icon: "🔒",
      path: "/dashboard/privacy",
      badge: null
    }
  ];

  const quickStats = [
    {
      label: "Total Orders",
      value: "24",
      change: "+12%",
      trend: "up",
      color: "#47b05a"
    },
    {
      label: "Wallet Balance",
      value: `₹${user.wallet}`,
      change: "+5.2%", 
      trend: "up",
      color: "#2563eb"
    },
    {
      label: "Reward Points",
      value: user.points.toString(),
      change: "+150",
      trend: "up", 
      color: "#dc2626"
    },
    {
      label: "Saved Addresses",
      value: "3",
      change: "Same",
      trend: "neutral",
      color: "#7c3aed"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "order",
      title: "Order Delivered",
      description: "Your order #ORD-1234 has been delivered",
      time: "2 hours ago",
      icon: "✅"
    },
    {
      id: 2,
      type: "wallet",
      title: "Wallet Recharged",
      description: "₹500 added to your wallet",
      time: "1 day ago",
      icon: "💰"
    },
    {
      id: 3,
      type: "offer",
      title: "New Offer Available",
      description: "Get 20% off on dairy products",
      time: "2 days ago",
      icon: "🎉"
    }
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="modern-dashboard">
      {/* Mobile Header */}
      <div className="mobile-header">
        <button 
          className="sidebar-toggle"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1 className="mobile-title">Dashboard</h1>
        <div className="mobile-avatar">
          <img src={user.avatar} alt={user.name} />
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="user-profile">
            <div className="user-avatar">
              <img src={user.avatar} alt={user.name} />
              <div className="online-indicator"></div>
            </div>
            <div className="user-info">
              <h3 className="user-name">{user.name}</h3>
              <p className="user-email">{user.email}</p>
              <span className="member-badge">Member since {user.memberSince}</span>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleNavigation(item.path)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {item.badge && (
                <span className={`nav-badge ${item.badge === 'New' ? 'badge-new' : ''}`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="wallet-quick-info">
            <div className="wallet-balance">
              <span className="balance-label">Wallet Balance</span>
              <span className="balance-amount">₹{user.wallet}</span>
            </div>
            <button className="add-money-btn">+ Add Money</button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {!children ? (
          <div className="dashboard-content">
            {/* Welcome Section */}
            <div className="welcome-section">
              <div className="welcome-text">
                <h1>Welcome back, {user.name.split(' ')[0]}! 👋</h1>
                <p>Here's what's happening with your account today.</p>
              </div>
              <div className="quick-actions">
                <button 
                  className="quick-action-btn primary"
                  onClick={() => handleNavigation('/dashboard/orders')}
                >
                  <span>📦</span>
                  View Orders
                </button>
                <button 
                  className="quick-action-btn secondary"
                  onClick={() => handleNavigation('/dashboard/wallet')}
                >
                  <span>💳</span>
                  Add Money
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="stats-grid">
              {quickStats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-header">
                    <span className="stat-label">{stat.label}</span>
                    <div 
                      className={`stat-trend ${stat.trend}`}
                      style={{ color: stat.color }}
                    >
                      {stat.trend === 'up' ? '📈' : stat.trend === 'down' ? '📉' : '➖'}
                    </div>
                  </div>
                  <div className="stat-value" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="stat-change">
                    <span className={`change-${stat.trend}`}>
                      {stat.change}
                    </span>
                    <span className="change-period">vs last month</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="activity-section">
              <h2 className="section-title">Recent Activity</h2>
              <div className="activity-list">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">{activity.icon}</div>
                    <div className="activity-content">
                      <h4 className="activity-title">{activity.title}</h4>
                      <p className="activity-description">{activity.description}</p>
                    </div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="quick-links-section">
              <h2 className="section-title">Quick Links</h2>
              <div className="quick-links-grid">
                <button 
                  className="quick-link-card"
                  onClick={() => handleNavigation('/dashboard/offers')}
                >
                  <div className="quick-link-icon">🎁</div>
                  <h3>Offers & Rewards</h3>
                  <p>Claim your rewards</p>
                </button>
                <button 
                  className="quick-link-card"
                  onClick={() => handleNavigation('/dashboard/track-order')}
                >
                  <div className="quick-link-icon">🚚</div>
                  <h3>Track Orders</h3>
                  <p>Monitor deliveries</p>
                </button>
                <button 
                  className="quick-link-card"
                  onClick={() => handleNavigation('/dashboard/addresses')}
                >
                  <div className="quick-link-icon">📍</div>
                  <h3>Manage Addresses</h3>
                  <p>Update locations</p>
                </button>
                <button 
                  className="quick-link-card"
                  onClick={() => handleNavigation('/dashboard/account')}
                >
                  <div className="quick-link-icon">⚙️</div>
                  <h3>Account Settings</h3>
                  <p>Manage preferences</p>
                </button>
              </div>
            </div>
          </div>
        ) : (
          children
        )}
      </main>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ModernDashboard;
