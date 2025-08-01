"use client";

import React, { useState } from "react";
import { Trash2, ChevronRight } from "lucide-react";
import "./AccountPrivacy.css";
import AccountPrivacyAndPolicy from "./AccountPrivacyAndPolicy";

const AccountPrivacy: React.FC = () => {
  const [showDelete, setShowDelete] = useState(false);

  const handleRequestDeletion = () => {
    setShowDelete(true);
  };

  return (
    <>
      {!showDelete ? (
        <div className="account-privacy-container1">
          <h1>Account Privacy & Policy</h1>
          <p className="info">
            At ILB Mart, we honour the trust of a local bazaar relationship by
            being completely transparent about your data and security. To ensure
            your groceries reach you perfectly, we collect necessary details like
            your name, address, and order history. This information is used
            exclusively to process your order, personalise your shopping
            experience, and provide you with dedicated support. Your personal data
            is never for sale. We only share essential details with our trusted
            delivery and payment partners who help us serve you. You always have
            full control to access and update your information in your account
            settings. By using our services, you consent to the practices outlined
            here and in our full privacy document. For any questions, please write
            to us at info@ilbmart.com.
          </p>

          <button className="request-btn" onClick={handleRequestDeletion}>
            <Trash2 size={14}/>
            <span>Request Account Deletion</span>
            <ChevronRight size={14}/>
          </button>
        </div>
      ) : (
        <AccountPrivacyAndPolicy onBack={() => setShowDelete(false)} />
      )}
    </>
  );
};

export default AccountPrivacy;