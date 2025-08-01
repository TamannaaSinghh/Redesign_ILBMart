"use client";
import React, { useState } from "react";
import ModernDashboard from "@/components/Sidebar/ModernDashboard";
import "./offers.css";

const OffersRewardsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("offers");
  const [user] = useState({
    points: 1250,
    level: "Gold",
    nextLevelPoints: 500,
    totalSavings: 2450
  });

  const offers = [
    {
      id: 1,
      title: "20% Off on Dairy Products",
      description: "Get 20% discount on all dairy items including milk, cheese, and yogurt",
      discount: "20%",
      code: "DAIRY20",
      validUntil: "2024-02-15",
      minOrder: 299,
      maxDiscount: 100,
      category: "Dairy",
      bgColor: "#E3F2FD",
      iconColor: "#1976D2",
      isActive: true
    },
    {
      id: 2,
      title: "Free Delivery on Orders Above ₹499",
      description: "No delivery charges on orders worth ₹499 or more",
      discount: "Free",
      code: "FREEDEL499",
      validUntil: "2024-02-20",
      minOrder: 499,
      maxDiscount: 50,
      category: "Delivery",
      bgColor: "#E8F5E8",
      iconColor: "#2E7D32",
      isActive: true
    },
    {
      id: 3,
      title: "Buy 2 Get 1 Free - Snacks",
      description: "Purchase any 2 snack items and get 1 absolutely free",
      discount: "B2G1",
      code: "SNACK3FOR2",
      validUntil: "2024-02-12",
      minOrder: 150,
      maxDiscount: 200,
      category: "Snacks",
      bgColor: "#FFF3E0",
      iconColor: "#F57C00",
      isActive: true
    },
    {
      id: 4,
      title: "₹50 Cashback on First Order",
      description: "New users get ₹50 cashback on their first order",
      discount: "₹50",
      code: "FIRST50",
      validUntil: "2024-03-01",
      minOrder: 200,
      maxDiscount: 50,
      category: "Cashback",
      bgColor: "#F3E5F5",
      iconColor: "#7B1FA2",
      isActive: false
    },
    {
      id: 5,
      title: "Weekend Special - 15% Off",
      description: "Extra 15% off on weekend orders (Saturday & Sunday)",
      discount: "15%",
      code: "WEEKEND15",
      validUntil: "2024-02-18",
      minOrder: 250,
      maxDiscount: 75,
      category: "Weekend",
      bgColor: "#FCE4EC",
      iconColor: "#C2185B",
      isActive: true
    }
  ];

  const rewards = [
    {
      id: 1,
      title: "Welcome Bonus",
      points: 100,
      description: "Signup bonus for new members",
      date: "2024-01-15",
      type: "earned",
      icon: "🎉"
    },
    {
      id: 2,
      title: "Order Completion",
      points: 25,
      description: "Points for completing order #ORD-1234",
      date: "2024-01-20",
      type: "earned",
      icon: "📦"
    },
    {
      id: 3,
      title: "Referral Bonus",
      points: 150,
      description: "Referred friend John Smith",
      date: "2024-01-25",
      type: "earned",
      icon: "👥"
    },
    {
      id: 4,
      title: "Redeemed Voucher",
      points: -200,
      description: "₹20 discount voucher redeemed",
      date: "2024-01-28",
      type: "redeemed",
      icon: "🎫"
    },
    {
      id: 5,
      title: "Review Bonus",
      points: 50,
      description: "Product review reward",
      date: "2024-02-01",
      type: "earned",
      icon: "⭐"
    }
  ];

  const redeemableRewards = [
    {
      id: 1,
      title: "₹10 Discount Voucher",
      points: 100,
      description: "Get ₹10 off on your next order",
      icon: "💰",
      color: "#47b05a"
    },
    {
      id: 2,
      title: "₹25 Discount Voucher",
      points: 250,
      description: "Get ₹25 off on orders above ₹200",
      icon: "💸",
      color: "#2563eb"
    },
    {
      id: 3,
      title: "Free Delivery Voucher",
      points: 150,
      description: "Free delivery on any order",
      icon: "🚚",
      color: "#dc2626"
    },
    {
      id: 4,
      title: "₹50 Discount Voucher",
      points: 500,
      description: "Get ₹50 off on orders above ₹500",
      icon: "🎁",
      color: "#7c3aed"
    }
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // You can add a toast notification here
  };

  const handleRedeemReward = (rewardId: number, points: number) => {
    if (user.points >= points) {
      // Handle reward redemption logic
      console.log(`Redeeming reward ${rewardId} for ${points} points`);
    }
  };

  const progressPercentage = ((user.points % 1000) / 1000) * 100;

  return (
    <ModernDashboard activeSection="offers">
      <div className="offers-rewards-page">
        <div className="page-header">
          <h1 className="page-title">Offers & Rewards</h1>
          <p className="page-subtitle">Save more with exclusive offers and earn rewards</p>
        </div>

        {/* Rewards Summary */}
        <div className="rewards-summary">
          <div className="points-card">
            <div className="points-info">
              <div className="points-badge">
                <span className="points-icon">⭐</span>
                <span className="points-level">{user.level} Member</span>
              </div>
              <div className="points-count">
                <span className="points-number">{user.points}</span>
                <span className="points-label">Points</span>
              </div>
            </div>
            <div className="level-progress">
              <div className="progress-info">
                <span>Progress to Platinum</span>
                <span>{user.nextLevelPoints} points to go</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="savings-card">
            <div className="savings-icon">💰</div>
            <div className="savings-info">
              <span className="savings-amount">₹{user.totalSavings}</span>
              <span className="savings-label">Total Savings</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === "offers" ? "active" : ""}`}
              onClick={() => setActiveTab("offers")}
            >
              <span className="tab-icon">🏷️</span>
              Available Offers
            </button>
            <button
              className={`tab ${activeTab === "rewards" ? "active" : ""}`}
              onClick={() => setActiveTab("rewards")}
            >
              <span className="tab-icon">🎁</span>
              Redeem Points
            </button>
            <button
              className={`tab ${activeTab === "history" ? "active" : ""}`}
              onClick={() => setActiveTab("history")}
            >
              <span className="tab-icon">📊</span>
              Points History
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "offers" && (
            <div className="offers-grid">
              {offers.map((offer) => (
                <div key={offer.id} className={`offer-card ${!offer.isActive ? 'expired' : ''}`}>
                  <div className="offer-header" style={{ backgroundColor: offer.bgColor }}>
                    <div className="offer-discount" style={{ color: offer.iconColor }}>
                      {offer.discount}
                    </div>
                    <div className="offer-category">{offer.category}</div>
                  </div>
                  
                  <div className="offer-content">
                    <h3 className="offer-title">{offer.title}</h3>
                    <p className="offer-description">{offer.description}</p>
                    
                    <div className="offer-details">
                      <div className="offer-terms">
                        <span>Min. Order: ₹{offer.minOrder}</span>
                        <span>Max. Discount: ₹{offer.maxDiscount}</span>
                        <span>Valid until: {new Date(offer.validUntil).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="offer-code-section">
                      <div className="promo-code">
                        <span className="code-label">Code:</span>
                        <span className="code-value">{offer.code}</span>
                      </div>
                      <button
                        className="copy-code-btn"
                        onClick={() => handleCopyCode(offer.code)}
                        disabled={!offer.isActive}
                      >
                        {offer.isActive ? "Copy" : "Expired"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "rewards" && (
            <div className="rewards-grid">
              {redeemableRewards.map((reward) => (
                <div key={reward.id} className="reward-card">
                  <div className="reward-icon" style={{ backgroundColor: reward.color }}>
                    {reward.icon}
                  </div>
                  <div className="reward-content">
                    <h3 className="reward-title">{reward.title}</h3>
                    <p className="reward-description">{reward.description}</p>
                    <div className="reward-points">
                      <span className="points-required">{reward.points} points</span>
                    </div>
                  </div>
                  <button
                    className={`redeem-btn ${user.points >= reward.points ? '' : 'disabled'}`}
                    onClick={() => handleRedeemReward(reward.id, reward.points)}
                    disabled={user.points < reward.points}
                  >
                    {user.points >= reward.points ? 'Redeem' : 'Not Enough Points'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "history" && (
            <div className="history-section">
              <div className="history-header">
                <h3>Points History</h3>
                <div className="history-stats">
                  <span>Total Earned: {rewards.filter(r => r.type === 'earned').reduce((sum, r) => sum + r.points, 0)} points</span>
                  <span>Total Redeemed: {Math.abs(rewards.filter(r => r.type === 'redeemed').reduce((sum, r) => sum + r.points, 0))} points</span>
                </div>
              </div>
              
              <div className="history-list">
                {rewards.map((reward) => (
                  <div key={reward.id} className={`history-item ${reward.type}`}>
                    <div className="history-icon">{reward.icon}</div>
                    <div className="history-content">
                      <h4 className="history-title">{reward.title}</h4>
                      <p className="history-description">{reward.description}</p>
                      <span className="history-date">{new Date(reward.date).toLocaleDateString()}</span>
                    </div>
                    <div className={`history-points ${reward.type}`}>
                      {reward.type === 'earned' ? '+' : ''}{reward.points}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ModernDashboard>
  );
};

export default OffersRewardsPage;
