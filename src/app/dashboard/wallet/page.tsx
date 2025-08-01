"use client";
import React, { useState } from "react";
import ModernDashboard from "@/components/Sidebar/ModernDashboard";
import "./wallet.css";

const WalletPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  
  const [wallet] = useState({
    balance: 480.50,
    totalAdded: 2450,
    totalSpent: 1969.50,
    pendingRefunds: 125.00
  });

  const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

  const transactions = [
    {
      id: "TXN001",
      type: "credit",
      amount: 500,
      description: "Wallet Recharge via UPI",
      date: "2024-02-01T10:30:00",
      status: "completed",
      paymentMethod: "UPI",
      icon: "💰"
    },
    {
      id: "TXN002", 
      type: "debit",
      amount: 245.50,
      description: "Order Payment #ORD-1234",
      date: "2024-02-01T14:15:00",
      status: "completed",
      paymentMethod: "Wallet",
      icon: "🛒"
    },
    {
      id: "TXN003",
      type: "credit",
      amount: 50,
      description: "Cashback from Order #ORD-1234",
      date: "2024-02-01T14:20:00", 
      status: "completed",
      paymentMethod: "Cashback",
      icon: "🎁"
    },
    {
      id: "TXN004",
      type: "debit",
      amount: 180.75,
      description: "Order Payment #ORD-1235",
      date: "2024-01-31T11:45:00",
      status: "completed",
      paymentMethod: "Wallet",
      icon: "🛒"
    },
    {
      id: "TXN005",
      type: "credit",
      amount: 125,
      description: "Refund for Order #ORD-1230",
      date: "2024-01-30T16:20:00",
      status: "pending",
      paymentMethod: "Refund",
      icon: "↩️"
    },
    {
      id: "TXN006",
      type: "credit",
      amount: 1000,
      description: "Wallet Recharge via Credit Card",
      date: "2024-01-29T09:15:00",
      status: "completed",
      paymentMethod: "Credit Card",
      icon: "💳"
    },
    {
      id: "TXN007",
      type: "debit",
      amount: 320.25,
      description: "Order Payment #ORD-1231",
      date: "2024-01-28T13:30:00",
      status: "completed",
      paymentMethod: "Wallet",
      icon: "🛒"
    },
    {
      id: "TXN008",
      type: "credit",
      amount: 25,
      description: "Referral Bonus - Friend Signup",
      date: "2024-01-27T10:10:00",
      status: "completed",
      paymentMethod: "Bonus",
      icon: "👥"
    }
  ];

  const paymentMethods = [
    {
      id: "upi",
      name: "UPI",
      icon: "📱",
      color: "#667eea",
      popular: true
    },
    {
      id: "card",
      name: "Credit/Debit Card", 
      icon: "💳",
      color: "#47b05a",
      popular: false
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: "🏦",
      color: "#2563eb",
      popular: false
    },
    {
      id: "wallet",
      name: "Other Wallets",
      icon: "💰",
      color: "#dc2626",
      popular: false
    }
  ];

  const handleAddMoney = () => {
    if (addAmount && parseFloat(addAmount) > 0) {
      // Handle add money logic here
      console.log(`Adding ₹${addAmount} to wallet`);
      setShowAddMoney(false);
      setAddAmount("");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-IN', { 
        day: '2-digit', 
        month: 'short' 
      }),
      time: date.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'failed': return '#ef4444';
      default: return '#64748b';
    }
  };

  return (
    <ModernDashboard activeSection="wallet">
      <div className="wallet-page">
        <div className="page-header">
          <h1 className="page-title">My Wallet</h1>
          <p className="page-subtitle">Manage your money and track transactions</p>
        </div>

        {/* Wallet Overview */}
        <div className="wallet-overview">
          <div className="balance-card">
            <div className="balance-header">
              <div className="balance-icon">💳</div>
              <div className="balance-info">
                <span className="balance-label">Available Balance</span>
                <span className="balance-amount">₹{wallet.balance.toFixed(2)}</span>
              </div>
            </div>
            <button 
              className="add-money-btn"
              onClick={() => setShowAddMoney(true)}
            >
              <span>+</span>
              Add Money
            </button>
          </div>

          <div className="wallet-stats">
            <div className="stat-item">
              <div className="stat-icon">📈</div>
              <div className="stat-content">
                <span className="stat-value">₹{wallet.totalAdded.toFixed(2)}</span>
                <span className="stat-label">Total Added</span>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">📉</div>
              <div className="stat-content">
                <span className="stat-value">₹{wallet.totalSpent.toFixed(2)}</span>
                <span className="stat-label">Total Spent</span>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">⏳</div>
              <div className="stat-content">
                <span className="stat-value">₹{wallet.pendingRefunds.toFixed(2)}</span>
                <span className="stat-label">Pending Refunds</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              <span className="tab-icon">📊</span>
              Overview
            </button>
            <button
              className={`tab ${activeTab === "transactions" ? "active" : ""}`}
              onClick={() => setActiveTab("transactions")}
            >
              <span className="tab-icon">📋</span>
              All Transactions
            </button>
            <button
              className={`tab ${activeTab === "add-money" ? "active" : ""}`}
              onClick={() => setActiveTab("add-money")}
            >
              <span className="tab-icon">💰</span>
              Add Money
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "overview" && (
            <div className="overview-content">
              <div className="recent-transactions">
                <h3 className="section-title">Recent Transactions</h3>
                <div className="transactions-list">
                  {transactions.slice(0, 5).map((transaction) => {
                    const { date, time } = formatDate(transaction.date);
                    return (
                      <div key={transaction.id} className="transaction-item">
                        <div className="transaction-icon">{transaction.icon}</div>
                        <div className="transaction-content">
                          <h4 className="transaction-title">{transaction.description}</h4>
                          <div className="transaction-meta">
                            <span className="transaction-date">{date} • {time}</span>
                            <span 
                              className="transaction-status"
                              style={{ color: getStatusColor(transaction.status) }}
                            >
                              {transaction.status}
                            </span>
                          </div>
                        </div>
                        <div className={`transaction-amount ${transaction.type}`}>
                          {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button 
                  className="view-all-btn"
                  onClick={() => setActiveTab("transactions")}
                >
                  View All Transactions
                </button>
              </div>

              <div className="quick-actions">
                <h3 className="section-title">Quick Actions</h3>
                <div className="actions-grid">
                  <button className="action-card">
                    <div className="action-icon">💰</div>
                    <span>Add Money</span>
                  </button>
                  <button className="action-card">
                    <div className="action-icon">🎁</div>
                    <span>Cashback Offers</span>
                  </button>
                  <button className="action-card">
                    <div className="action-icon">📊</div>
                    <span>Expense Report</span>
                  </button>
                  <button className="action-card">
                    <div className="action-icon">⚙️</div>
                    <span>Wallet Settings</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "transactions" && (
            <div className="transactions-content">
              <div className="transactions-header">
                <h3 className="section-title">All Transactions</h3>
                <div className="transactions-filters">
                  <select className="filter-select">
                    <option value="all">All Types</option>
                    <option value="credit">Money Added</option>
                    <option value="debit">Money Spent</option>
                  </select>
                  <select className="filter-select">
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>
              
              <div className="transactions-list full">
                {transactions.map((transaction) => {
                  const { date, time } = formatDate(transaction.date);
                  return (
                    <div key={transaction.id} className="transaction-item detailed">
                      <div className="transaction-icon">{transaction.icon}</div>
                      <div className="transaction-content">
                        <h4 className="transaction-title">{transaction.description}</h4>
                        <div className="transaction-meta">
                          <span className="transaction-id">ID: {transaction.id}</span>
                          <span className="transaction-method">{transaction.paymentMethod}</span>
                          <span className="transaction-date">{date} • {time}</span>
                        </div>
                      </div>
                      <div className="transaction-details">
                        <div className={`transaction-amount ${transaction.type}`}>
                          {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                        </div>
                        <span 
                          className="transaction-status"
                          style={{ color: getStatusColor(transaction.status) }}
                        >
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "add-money" && (
            <div className="add-money-content">
              <div className="add-money-form">
                <h3 className="section-title">Add Money to Wallet</h3>
                
                <div className="amount-section">
                  <label className="amount-label">Enter Amount</label>
                  <div className="amount-input-container">
                    <span className="currency-symbol">₹</span>
                    <input
                      type="number"
                      className="amount-input"
                      placeholder="0"
                      value={addAmount}
                      onChange={(e) => setAddAmount(e.target.value)}
                      min="1"
                      max="50000"
                    />
                  </div>
                  
                  <div className="quick-amounts">
                    {quickAmounts.map((amount) => (
                      <button
                        key={amount}
                        className={`quick-amount-btn ${addAmount === amount.toString() ? 'active' : ''}`}
                        onClick={() => setAddAmount(amount.toString())}
                      >
                        ₹{amount}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="payment-methods">
                  <h4 className="payment-title">Choose Payment Method</h4>
                  <div className="payment-grid">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="payment-method">
                        <div 
                          className="payment-icon"
                          style={{ backgroundColor: method.color }}
                        >
                          {method.icon}
                        </div>
                        <span className="payment-name">{method.name}</span>
                        {method.popular && <span className="popular-badge">Popular</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  className="proceed-btn"
                  onClick={handleAddMoney}
                  disabled={!addAmount || parseFloat(addAmount) <= 0}
                >
                  Proceed to Pay ₹{addAmount || '0'}
                </button>
              </div>

              <div className="add-money-benefits">
                <h4 className="benefits-title">Why Add Money to Wallet?</h4>
                <div className="benefits-list">
                  <div className="benefit-item">
                    <div className="benefit-icon">⚡</div>
                    <div className="benefit-content">
                      <h5>Faster Checkout</h5>
                      <p>Skip payment steps with one-click ordering</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">🎁</div>
                    <div className="benefit-content">
                      <h5>Exclusive Offers</h5>
                      <p>Get cashback and special discounts</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">🔒</div>
                    <div className="benefit-content">
                      <h5>Secure Payments</h5>
                      <p>Safe and encrypted transactions</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">💰</div>
                    <div className="benefit-content">
                      <h5>Easy Refunds</h5>
                      <p>Instant refunds directly to wallet</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Add Money Modal */}
        {showAddMoney && (
          <div className="modal-overlay" onClick={() => setShowAddMoney(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Add Money to Wallet</h3>
                <button 
                  className="modal-close"
                  onClick={() => setShowAddMoney(false)}
                >
                  ✕
                </button>
              </div>
              <div className="modal-body">
                <div className="amount-input-container">
                  <span className="currency-symbol">₹</span>
                  <input
                    type="number"
                    className="amount-input"
                    placeholder="Enter amount"
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                    min="1"
                    max="50000"
                  />
                </div>
                <div className="quick-amounts">
                  {quickAmounts.slice(0, 4).map((amount) => (
                    <button
                      key={amount}
                      className={`quick-amount-btn ${addAmount === amount.toString() ? 'active' : ''}`}
                      onClick={() => setAddAmount(amount.toString())}
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  className="proceed-btn"
                  onClick={handleAddMoney}
                  disabled={!addAmount || parseFloat(addAmount) <= 0}
                >
                  Add ₹{addAmount || '0'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ModernDashboard>
  );
};

export default WalletPage;
