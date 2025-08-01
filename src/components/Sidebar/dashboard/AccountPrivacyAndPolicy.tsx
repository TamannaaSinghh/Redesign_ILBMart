"use client";

import React, { useState } from "react";
import "./AccountPrivacyAndPolicy.css";
import { ChevronLeft } from "lucide-react";

interface AccountPrivacyAndPolicyProps {
  onBack: () => void;
}

const AccountPrivacyAndPolicy: React.FC<AccountPrivacyAndPolicyProps> = ({ onBack }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const reasons = [
    "I don’t want to use ILB Mart anymore",
    "I’m using a different account",
    "I’m worried about my privacy",
    "You are sending me too many emails/notifications",
    "This app is not working properly",
    "Other",
  ];

  const handleReasonChange = (reason: string) => {
    setSelectedReason(reason);
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    alert(`Reason: ${selectedReason}\nFeedback: ${feedback}`);
    setShowConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <div className="account-deletion-container">
        <div className="left">
          <h2>Account Privacy</h2>
          <h3>Delete my account</h3>
          <p>Why would you like to delete your account?</p>
          <form>
            {reasons.map((reason) => (
              <label key={reason} className="reason-option">
                <input
                  type="radio"
                  name="reason"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={() => handleReasonChange(reason)}
                />
                {reason}
              </label>
            ))}
          </form>
        </div>

        <div className="right">
          <h4>
            Do you have any feedback for us? We would love to hear from you! (optional)
          </h4>
          <textarea
            placeholder="Please share your feedback (Optional)"
            value={feedback}
            onChange={handleFeedbackChange}
          ></textarea>

          <button
            className="confirm-btn"
            disabled={!selectedReason}
            onClick={handleDelete}
          >
            Confirm Account Deletion
          </button>

          <p className="note">
            Note*: All data associated with this account will be deleted in accordance with our privacy policy. You will not be able to retrieve this information once deleted.
          </p>
        </div>

        {showConfirm && (
  <div className="account-deletion-dialog">
    <div className="dialog-header">
      <h3>Confirm Delete</h3>
      <button className="close-btn" onClick={handleCancelDelete}>×</button>
    </div>
    <p>Do you want to delete your account?</p>
    <div className="dialog-actions">
      <button className="cancel-btn" onClick={handleCancelDelete}>
        Cancel
      </button>
      <button className="confirm-btn red" onClick={handleConfirmDelete}>
        Confirm
      </button>
    </div>
  </div>
)}

      </div>

      <button className="global-back-button" onClick={onBack}>
        <ChevronLeft size={18} />
        <span>Back</span>
      </button>
    </>
  );
};

export default AccountPrivacyAndPolicy;
