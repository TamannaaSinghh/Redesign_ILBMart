import React, { useState, useEffect } from "react";
import { useToast } from "../../ui/use-toast";
import "./OffersRewards.css";
import {
  apiRequestGet,
  apiRequestPost,
  apiRequest,
} from "../../../lib/ApiService";
import config from "../../../config/config";

const BASE_URL = config.BASE_URL;

// Static demo data structure
interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  code: string;
  category: "food" | "grocery" | "shopping" | "all";
  isActive: boolean;
}

interface Reward {
  id: string;
  points: number;
  title: string;
  description: string;
  expiryDate: string;
  isRedeemable: boolean;
}

const demoOffersRewards: { offers: Offer[]; rewards: Reward[] } = {
  offers: [
    {
      id: "offer_1",
      title: "Summer Sale",
      description: "20% off on all grocery items",
      discount: "20% OFF",
      validUntil: "2023-08-31",
      code: "SUMMER20",
      category: "grocery",
      isActive: true,
    },
    {
      id: "offer_2",
      title: "First Order",
      description: "Get ₹100 off on your first order",
      discount: "₹100 OFF",
      validUntil: "2023-12-31",
      code: "WELCOME100",
      category: "all",
      isActive: true,
    },
  ],
  rewards: [
    {
      id: "reward_1",
      points: 500,
      title: "Loyalty Bonus",
      description: "Redeem for ₹50 cashback",
      expiryDate: "2023-12-31",
      isRedeemable: true,
    },
    {
      id: "reward_2",
      points: 1000,
      title: "Premium Member",
      description: "Free delivery for a month",
      expiryDate: "2023-10-31",
      isRedeemable: false,
    },
  ],
};

const OffersRewards = () => {
  const [data, setData] = useState<{
    offers: Offer[];
    rewards: Reward[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch offers and rewards from API
  const fetchOffersRewards = async () => {
    setLoading(true);
    setError(null);
    try {
      // Uncomment when API is ready
      // const response = await apiRequestGet("/user/offers-rewards");
      // setData(response.data || demoOffersRewards);

      // For now, use demo data
      setData(demoOffersRewards);
    } catch (err) {
      console.error("Error fetching offers & rewards:", err);
      setError("Failed to load offers & rewards. Using demo data.");
      toast({
        title: "Error",
        description: "Failed to load offers & rewards. Showing demo data.",
        variant: "destructive",
      });
      // Fallback to demo data
      setData(demoOffersRewards);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffersRewards();
  }, []);

  if (loading) {
    return (
      <div className="offer-root">
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Loading offers & rewards...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="offer-root">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={fetchOffersRewards}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Temporary under construction view
  // Remove this when the actual UI is ready
  return (
    <div className="offer-root">
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
        {data && (
          <>
            <h3>Offers</h3>
            <ul>
              {data.offers.map((offer) => (
                <li key={offer.id}>
                  <strong>{offer.title}</strong>: {offer.description} (Code:{" "}
                  {offer.code})
                </li>
              ))}
            </ul>

            <h3>Rewards</h3>
            <ul>
              {data.rewards.map((reward) => (
                <li key={reward.id}>
                  <strong>{reward.title}</strong>: {reward.description} (
                  {reward.points} pts)
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );

  /* 
  // Actual UI (to be implemented when design is ready)
  return (
    <div className="offer-root">
      <div className="offers-rewards-header">
        <h1>Offers & Rewards</h1>
        <p>Save more with these exclusive offers</p>
      </div>

      <div className="offers-section">
        <h2>Available Offers</h2>
        <div className="offers-grid">
          {data?.offers.map(offer => (
            <div key={offer.id} className="offer-card">
              <div className="offer-badge">{offer.discount}</div>
              <h3 className="offer-title">{offer.title}</h3>
              <p className="offer-description">{offer.description}</p>
              <div className="offer-meta">
                <span className="offer-code">Use code: {offer.code}</span>
                <span className="offer-validity">Valid until: {offer.validUntil}</span>
              </div>
              <button className="offer-apply-button">Apply Offer</button>
            </div>
          ))}
        </div>
      </div>

      <div className="rewards-section">
        <h2>Your Rewards</h2>
        <div className="rewards-list">
          {data?.rewards.map(reward => (
            <div key={reward.id} className="reward-card">
              <div className="reward-points">{reward.points} pts</div>
              <div className="reward-content">
                <h3 className="reward-title">{reward.title}</h3>
                <p className="reward-description">{reward.description}</p>
                <div className="reward-expiry">Expires: {reward.expiryDate}</div>
              </div>
              <button 
                className={`reward-redeem-button ${reward.isRedeemable ? '' : 'disabled'}`}
                disabled={!reward.isRedeemable}
              >
                {reward.isRedeemable ? 'Redeem Now' : 'Coming Soon'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  */
};

export default OffersRewards;
