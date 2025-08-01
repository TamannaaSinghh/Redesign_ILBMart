import React, { useState, useEffect } from "react";
import { useToast } from "../../ui/use-toast";
import "./Wallet.css";
import {
  apiRequestGet,
  apiRequestPost,
  apiRequest,
} from "../../../lib/ApiService";
import config from "../../../config/config";

const BASE_URL = config.BASE_URL;

// Static demo data structure
interface WalletData {
  balance: number;
  currency: string;
  transactions: {
    id: string;
    amount: number;
    type: "credit" | "debit";
    description: string;
    date: string;
    status: "completed" | "pending" | "failed";
  }[];
}

const demoWalletData: WalletData = {
  balance: 1250.75,
  currency: "USD",
  transactions: [
    {
      id: "txn_1",
      amount: 50.0,
      type: "credit",
      description: "Wallet top-up",
      date: "2023-06-15",
      status: "completed",
    },
    {
      id: "txn_2",
      amount: 25.99,
      type: "debit",
      description: "Grocery purchase",
      date: "2023-06-14",
      status: "completed",
    },
    {
      id: "txn_3",
      amount: 10.0,
      type: "credit",
      description: "Cashback reward",
      date: "2023-06-10",
      status: "completed",
    },
  ],
};

const Wallet = () => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch wallet data from API
  const fetchWalletData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Uncomment when API is ready
      // const response = await apiRequestGet("/user/wallet");
      // setWalletData(response.data || demoWalletData);

      // For now, use demo data
      setWalletData(demoWalletData);
    } catch (err) {
      console.error("Error fetching wallet data:", err);
      setError("Failed to load wallet data. Using demo data.");
      toast({
        title: "Error",
        description: "Failed to load wallet data. Showing demo data.",
        variant: "destructive",
      });
      // Fallback to demo data
      setWalletData(demoWalletData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  if (loading) {
    return (
      <div className="wallet-root">
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Loading wallet data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="wallet-root">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={fetchWalletData}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Temporary under construction view
  // Remove this when the actual wallet UI is ready
  return (
    <div className="wallet-root">
      <div className="image">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/under-construction-illustration-download-in-svg-png-gif-file-formats--logo-developing-website-development-webpage-ui-ux-miscellaneous-pack-people-illustrations-4465645.png"
          alt="Under construction"
        />
      </div>
      <div className="msg">Page is Under Construction</div>
      <div className="small-msg">Waiting for Figma Design...</div>

      {/* Hidden demo data (for testing API connection) */}
      <div style={{ display: "none" }}>
        {walletData && (
          <>
            <p>
              Wallet Balance: {walletData.balance} {walletData.currency}
            </p>
            <ul>
              {walletData.transactions.map((txn) => (
                <li key={txn.id}>
                  {txn.date} - {txn.description}: {txn.amount}{" "}
                  {walletData.currency}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );

  /* 
  // Actual wallet UI (to be implemented when design is ready)
  return (
    <div className="wallet-root">
      <div className="wallet-header">
        <h1>My Wallet</h1>
        {walletData && (
          <div className="wallet-balance">
            <span className="balance-amount">
              {walletData.balance.toFixed(2)}
            </span>
            <span className="balance-currency">
              {walletData.currency}
            </span>
          </div>
        )}
      </div>

      <div className="wallet-actions">
        <button className="wallet-button add-money">
          Add Money
        </button>
        <button className="wallet-button send-money">
          Send Money
        </button>
      </div>

      <div className="transaction-history">
        <h2>Transaction History</h2>
        {walletData?.transactions.map(transaction => (
          <div key={transaction.id} className="transaction-item">
            <div className="transaction-info">
              <div className="transaction-description">
                {transaction.description}
              </div>
              <div className="transaction-date">
                {transaction.date}
              </div>
            </div>
            <div className={`transaction-amount ${transaction.type}`}>
              {transaction.type === 'debit' ? '-' : '+'}
              {transaction.amount.toFixed(2)} {walletData.currency}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  */
};

export default Wallet;
