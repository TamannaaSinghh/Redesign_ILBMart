import React, { FC, useEffect } from "react";
import "./SuccessModal.css";

interface SuccessModalProps {
  onClose: () => void;
}

const SuccessModal: FC<SuccessModalProps> = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="success-modal-overlay">
      <div className="success-modal">
        <div className="success-modal-container">
          <div className="success-circle">
            <div className="success-inner-circle">
              <span className="checkmark">✔</span>
            </div>
          </div>

          <div className="success-modal-content">
            <h2>Successfully Logged In</h2>
            <p>Welcome to your Online Local Bazaar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
