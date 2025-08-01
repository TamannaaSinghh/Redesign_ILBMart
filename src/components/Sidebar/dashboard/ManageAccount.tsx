"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../ui/button";
import {
  ShoppingBag,
  SquarePen,
  Camera,
  Trash2,
  X,
  UserCircle,
  CircleUserRound,
} from "lucide-react";
import "./ManageAccount.css";

import { getUserProfile, updateUserProfile } from "@/lib/api"; //  Use new API functions

interface FormData {
  name: string;
  mobile: string;
  email: string;
}
interface ManageAccountProps {
  userProfile?: any;
}

const ManageAccount: React.FC<ManageAccountProps> = ({ userProfile }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    mobile: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userProfileData, setUserProfileData] = useState<FormData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("apiToken") || "";
        const response = await getUserProfile(token); //  Fetch user profile using API
        const data = response?.data;

        setUserProfileData(data);
        setFormData({
          name: data?.name || "User Name",
          mobile: data?.mobile || "+91 9876543210",
          email: data?.email || "user@example.com",
        });

        if (data?.profilePicture) {
          setProfileImage(data.profilePicture);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (userProfileData) {
      setFormData({
        name: userProfileData.name || "User Name",
        email: userProfileData.email || "user@example.com",
        mobile: userProfileData.mobile || "+91 9876543210",
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("apiToken") || "";
      await updateUserProfile(token, {
        ...formData,
        profilePicture: profileImage,
      }); //  Update profile using API
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="manageaccount-root">
      <h2 className="manageaccount-title">Dashboard</h2>
      <div className="manageaccount-main">
        <div className="manageaccount-userinfo">
          {!isEditing && (
            <SquarePen
              onClick={handleEditClick}
              color="gray"
              size={14}
              className="manageaccount-editicon"
            />
          )}

          <div className="manageaccount-userinfo-content">
            <div className="manageaccount-userinfo-row">
              <div className="manageaccount-avatar-container">
                <div className="manageaccount-avatar">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-sm"
                    />
                  ) : (
                    <div className="manageaccount-avatar-placeholder">
                      <CircleUserRound size={100} color="#9CA3AF" />
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="manageaccount-avatar-actions">
                    <button
                      onClick={triggerFileInput}
                      className="manageaccount-avatar-action-btn"
                    >
                      <Camera size={20} />
                    </button>
                    <button
                      onClick={handleRemoveImage}
                      className="manageaccount-trash-action-btn"
                    >
                      <Trash2 size={20} />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                  </div>
                )}
              </div>

              <div className="manageaccount-userinfo-grid">
                <div>
                  <p className="manageaccount-label">Name</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="manageaccount-input"
                    />
                  ) : (
                    <div className="manageaccount-value">{formData.name}</div>
                  )}
                </div>
                <div>
                  <p className="manageaccount-label">Mobile Number</p>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="manageaccount-input"
                      disabled
                    />
                  ) : (
                    <div className="manageaccount-value">{formData.mobile}</div>
                  )}
                </div>
                <div>
                  <p className="manageaccount-label">Email ID</p>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="manageaccount-input"
                    />
                  ) : (
                    <div className="manageaccount-value">{formData.email}</div>
                  )}
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="manageaccount-actions">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="manageaccount-action-btn"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdate}
                  className="manageaccount-action-btn"
                  id="update"
                >
                  Update
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* My Orders Card */}
        <div className="manageaccount-orders">
          <div className="manageaccount-orders-header">
            <div className="manageaccount-orders-title">My Orders</div>
            <span className="manageaccount-orders-seeall">See All</span>
          </div>
          <div className="manageaccount-orders-content">
            <div className="manageaccount-orders-empty">
              <div className="manageaccount-orders-empty-row">
                <ShoppingBag className="manageaccount-orders-empty-icon" />
                <div>
                  <p className="manageaccount-orders-empty-title">
                    No Orders yet
                  </p>
                  <p className="manageaccount-orders-empty-desc">
                    Start Shopping to see your orders here
                  </p>
                </div>
              </div>
              <Button className="manageaccount-orders-empty-btn">
                Start Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;
