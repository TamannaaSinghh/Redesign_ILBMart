import React, { useState, useEffect } from "react";
import { useToast } from "../../ui/use-toast";
import "./Transactions.css";
import {
  apiRequestGet,
  apiRequestPost,
  apiRequest,
} from "../../../lib/ApiService";
import config from "../../../config/config";

const BASE_URL = config.BASE_URL;

// Static demo data structure
interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: "credit" | "debit";
  description: string;
  status: "completed" | "pending" | "failed";
}

const demoTransactions: Transaction[] = [
  {
    id: "txn_1",
    date: "2023-05-15",
    amount: 125.99,
    type: "debit",
    description: "Grocery purchase at SuperMart",
    status: "completed",
  },
  {
    id: "txn_2",
    date: "2023-05-14",
    amount: 49.99,
    type: "debit",
    description: "Monthly subscription",
    status: "completed",
  },
  {
    id: "txn_3",
    date: "2023-05-10",
    amount: 200.0,
    type: "credit",
    description: "Salary deposit",
    status: "completed",
  },
];

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch transactions from API
  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      // Uncomment when API is ready
      // const response = await apiRequestGet("/user/transactions");
      // setTransactions(response.data || demoTransactions);

      // For now, use demo data
      setTransactions(demoTransactions);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to load transactions. Using demo data.");
      toast({
        title: "Error",
        description: "Failed to load transactions. Showing demo data.",
        variant: "destructive",
      });
      // Fallback to demo data
      setTransactions(demoTransactions);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="transaction-root">
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Loading transactions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="transaction-root">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={fetchTransactions}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Temporary under construction view
  // Remove this when the actual transaction UI is ready
  return (
    <div className="transaction-root">
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
        {transactions.map((txn) => (
          <div key={txn.id}>
            {txn.date} - {txn.description}: ${txn.amount}
          </div>
        ))}
      </div>
    </div>
  );

  /* 
  // Actual transaction UI (to be implemented when design is ready)
  return (
    <div className="transaction-root">
      <h1>Transaction History</h1>
      <div className="transaction-list">
        {transactions.map(transaction => (
          <div key={transaction.id} className="transaction-card">
            <div className="transaction-header">
              <span className="transaction-date">{transaction.date}</span>
              <span className={`transaction-amount ${transaction.type}`}>
                {transaction.type === 'debit' ? '-' : '+'}${transaction.amount.toFixed(2)}
              </span>
            </div>
            <div className="transaction-description">{transaction.description}</div>
            <div className={`transaction-status ${transaction.status}`}>
              {transaction.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  */
};

export default Transactions;
