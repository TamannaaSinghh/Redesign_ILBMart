"use client";

import React, { useState, useEffect } from "react";
import { Trash2, Wallet, Landmark, CreditCard, Pencil } from "lucide-react";
import { useToast } from "../../ui/use-toast";
import "./Payment.css";
import {
  apiRequestGet,
  apiRequestPost,
  apiRequest,
} from "../../../lib/ApiService";
import config from "../../../config/config";

const BASE_URL = config.BASE_URL;

// Static demo data
const demoCards = [
  {
    id: "card_1",
    type: "Mastercard",
    name: "SBI Mastercard Card",
    last4: "4242",
    exp_month: "12",
    exp_year: "25",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png",
  },
];

const demoUPI = [
  {
    id: "upi_1",
    app: "Google Pay",
    upiId: "9876543210@pthdfc",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgMyqM7pv04T82nGYoR6hQKa-HsJZ8gCmbXg&s",
  },
];

const demoWallets = [
  {
    id: "wallet_1",
    name: "Amazon Pay Balance",
    logo: "/payment-icons/amazonpay.png",
    linked: false,
  },
];

const Payment = () => {
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [showCardActions, setShowCardActions] = useState(false);
  const [cards, setCards] = useState(demoCards);
  const [upiAccounts, setUpiAccounts] = useState(demoUPI);
  const [wallets, setWallets] = useState(demoWallets);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch payment methods from API
  const fetchPaymentMethods = async () => {
    setLoading(true);
    setError(null);
    try {
      // Uncomment these when API is ready
      // const cardsResponse = await apiRequestGet("/user/payment-settings");
      // const upiResponse = await apiRequestGet("/user/payment-methods");
      // const walletsResponse = await apiRequestGet("/user/payment-methods/wallets");

      // For now, use demo data
      // setCards(cardsResponse.data || demoCards);
      // setUpiAccounts(upiResponse.data || demoUPI);
      // setWallets(walletsResponse.data || demoWallets);
      setCards(demoCards);
      setUpiAccounts(demoUPI);
      setWallets(demoWallets);
    } catch (err) {
      console.error("Error fetching payment methods:", err);
      setError("Failed to load payment methods. Using demo data.");
      toast({
        title: "Error",
        description: "Failed to load payment methods. Showing demo data.",
        variant: "destructive",
      });
      // Fallback to demo data
      setCards(demoCards);
      setUpiAccounts(demoUPI);
      setWallets(demoWallets);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const handleRenameCard = async (cardId: string) => {
    try {
      // await apiRequestPost("/user/payment-methods/cards/rename", { cardId, newName: "Renamed Card" });
      // fetchPaymentMethods(); // Refresh data
      console.log("Rename Card clicked for:", cardId);
      toast({
        title: "Card Renamed",
        description: "Your card has been renamed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to rename card",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    try {
      // await apiRequestPost("/user/payment-methods/cards/delete", { cardId });
      // fetchPaymentMethods(); // Refresh data
      console.log("Delete Card clicked for:", cardId);
      toast({
        title: "Card Deleted",
        description: "Your card has been removed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete card",
        variant: "destructive",
      });
    }
  };

  const handleAddCard = () => {
    setShowAddCardForm(!showAddCardForm);
  };

  const handleToggleCardActions = () => {
    setShowCardActions(!showCardActions);
  };

  const handleRemoveUPI = async (upiId: string) => {
    try {
      // await apiRequestPost("/user/payment-methods/upi/delete", { upiId });
      // fetchPaymentMethods(); // Refresh data
      console.log("Remove UPI ID clicked for:", upiId);
      toast({
        title: "UPI Removed",
        description: "Your UPI ID has been removed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove UPI ID",
        variant: "destructive",
      });
    }
  };

  const handleAddNewUPI = () => {
    console.log("Add new UPI ID clicked");
    // Implement UPI addition logic here
  };

  const handleLinkWallet = async (walletId: string) => {
    try {
      // await apiRequestPost("/user/payment-methods/wallets/link", { walletId });
      // fetchPaymentMethods(); // Refresh data
      console.log("Link Wallet clicked for:", walletId);
      toast({
        title: "Wallet Linked",
        description: "Your wallet has been linked successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to link wallet",
        variant: "destructive",
      });
    }
  };

  const handleAddNetbanking = () => {
    console.log("Add Netbanking clicked");
    // Implement netbanking addition logic here
  };

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h2>Payment Settings</h2>
      </div>

      {loading ? (
        <div className="payment-loading">
          <div className="spinner"></div>
          <p>Loading payment methods...</p>
        </div>
      ) : error ? (
        <div className="payment-error">
          <p>{error}</p>
          <button onClick={fetchPaymentMethods}>Retry</button>
        </div>
      ) : (
        <>
          {/* Cards Section */}
          <section className="payment-section">
            <h2 className="payment-heading">Cards</h2>
            {cards.map((card) => (
              <div key={card.id} className="payment-box card-box">
                <div className="payment-card-top">
                  <div className="payment-row">
                    <img
                      src={card.logo}
                      alt={card.type}
                      className="payment-logo"
                    />
                    <span>{card.name}</span>
                  </div>

                  <span
                    className="payment-action"
                    onClick={handleToggleCardActions}
                  >
                    {showCardActions ? "▲" : "▼"}
                  </span>
                </div>

                {showCardActions && (
                  <div className="payment-card-actions">
                    <button
                      className="payment-card-btn"
                      onClick={() => handleRenameCard(card.id)}
                    >
                      <Pencil size={16} /> Rename Card
                    </button>
                    <button
                      className="payment-card-btn"
                      onClick={() => handleDeleteCard(card.id)}
                    >
                      <Trash2 size={16} /> Delete Card
                    </button>
                  </div>
                )}
              </div>
            ))}

            <div className="payment-box add-card">
              <div className="payment-row">
                <CreditCard size={30} className="add-icon" />
                <span>Add Credit or Debit cards</span>
              </div>
              <span className="payment-add-text" onClick={handleAddCard}>
                {showAddCardForm ? "CLOSE" : "ADD"}
              </span>
            </div>

            {showAddCardForm && (
              <div className="add-card-form">
                <label>Card Number</label>
                <input type="text" placeholder="XXXX XXXX XXXX XXXX" />

                <div className="expiry-cvv">
                  <div className="expiry">
                    <label>Expiry date</label>
                    <input type="text" placeholder="MM/YY" />
                  </div>
                  <div className="cvv">
                    <label>CVV</label>
                    <input type="text" placeholder="XXX" />
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* UPI Section */}
          <section className="payment-section">
            <h2 className="payment-heading">Pay by any UPI app</h2>

            {upiAccounts.map((upi) => (
              <div key={upi.id} className="payment-box">
                <div className="payment-row">
                  <img src={upi.logo} alt={upi.app} className="upi-icon" />
                  <span>{upi.app}</span>
                </div>
                <span
                  className="payment-remove"
                  onClick={() => handleRemoveUPI(upi.id)}
                >
                  REMOVE
                </span>
              </div>
            ))}

            <div className="payment-box add-card" onClick={handleAddNewUPI}>
              <div className="payment-row">
                <img
                  src="/payment-icons/upi.png"
                  alt="UPI"
                  className="upi-icon"
                />
                <span>Add new UPI ID</span>
              </div>
              <span className="payment-add-text">ADD</span>
            </div>
          </section>

          {/* Wallet Section */}
          <section className="payment-section">
            <h2 className="payment-heading">Wallets</h2>
            {wallets.map((wallet) => (
              <div key={wallet.id} className="payment-box">
                <div className="payment-row">
                  <img src={wallet.logo} alt="wallet" className="wallet-icon" />
                  <span>{wallet.name}</span>
                </div>
                <span
                  className="payment-link-text"
                  onClick={() => handleLinkWallet(wallet.id)}
                >
                  {wallet.linked ? "UNLINK" : "LINK"}
                </span>
              </div>
            ))}
          </section>

          {/* Netbanking Section */}
          <section className="payment-section">
            <h2 className="payment-heading">Netbanking</h2>
            <div className="payment-box">
              <div className="payment-row">
                <Landmark size={18} className="bank-icon" />
                <span>Netbanking</span>
              </div>
              <span className="payment-add-text" onClick={handleAddNetbanking}>
                ADD
              </span>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Payment;
