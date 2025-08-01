// const BASE_URL = "https://api.ilbmart.com/api/v1";
// const BASE_URL = "http://localhost:3005/api/v1";
// import axios from "axios";
import { BannerItem } from "components/Types/Banner";


import axios from "axios";
import config from "../config/config";

const BASE_URL = config.BASE_URL;

interface ApiResponse {
  success: boolean;
  message?: string;
  token?: string;
  data?: any;
}

/**
 * Sends a login OTP to the specified mobile number.
 * @param name - The name of the user.
 * @param mobile - The mobile number to send the OTP to.
 */
export const sendLoginOtp = async ({ mobile }: { mobile: string }): Promise<{ success: boolean; message?: string }> => {
  try {
    const res = await fetch(`${BASE_URL}/public/send-login-otp`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile }),
    });

    const result = await res.json();

    if (!res.ok || !result.status) {
      const errorMessage = result?.data?.message || 'Failed to send OTP';
      // alert(`Error: ${errorMessage}`); // Show alert for error
      throw new Error(errorMessage);
    }

    return { success: true, message: result.data?.message };
  } catch (error: any) {
    // alert(`Error: ${error.message}`); // Show alert for error
    throw error;
  }
};



export const fetchBannerData = async (): Promise<BannerItem[]> => {
  try {
    // Replace with actual API call
    return [
      {
        id: 1,
        title: "Fresh Fruits Delivered",
        description: "Get your favorite fruits at your doorstep.",
        imageUrl: "/assets/images/banner1.jpg",
        link: "/",
      },
      {
        id: 2,
        title: "Vegetables On Sale",
        description: "Flat 20% off on all veggies!",
        imageUrl: "/assets/images/banner2.jpg",
        link: "/",
      },
    ];
  } catch (error: any) {
    const errorMessage = error.message || 'Failed to fetch banner data';
    // alert(`Error: ${errorMessage}`); // Show alert for error
    throw error;
  }
};

export const verifyOtpLogin = async (mobile: string, otp: string): Promise<ApiResponse> => {

  try {
    const res = await fetch(`${BASE_URL}/public/verify-otp-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile, otp }),
    });

    const result = await res.json();

    if (result.status === true && result.code === 200 && result.data?.apiToken) {
      return {
        success: true,
        token: result.data.apiToken,
        data: result.data,
      };
    } else {
      const errorMessage = result.data?.message || "Incorrect Otp.Please try again.";
      // alert(`Error: ${errorMessage}`); // Show alert for error
      return {
        success: false,
        message: errorMessage,
      };
    }
  } catch (error: any) {
    const errorMessage = error.message || "Something went wrong during OTP verification.";
    // alert(`Error: ${errorMessage}`); // Show alert for error
    return {
      success: false,
      message: errorMessage,
    };
  }
}

export const getUserProfile = async (token: string, payload?: any) => {
  try {
    const response = await fetch(`${BASE_URL}/user/profile`, {
      method: 'GET',
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || 'Failed to fetch profile';
      // alert(`Error: ${errorMessage}`); // Show alert for error
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error: any) {
    // alert(`Error: ${error.message}`); // Show alert for error
    throw error;
  }
};

export const updateUserProfile = async (token: string, payload: any) => {
  try {
    const res = await axios.patch(`${BASE_URL}/user/profile`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to update profile';
    // alert(`Error: ${errorMessage}`); // Show alert for error
    throw error;
  }
};

export const changePassword = async (token: string, payload: any) => {
  try {
    const res = await axios.patch(`${BASE_URL}/user/chnagepassword`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to change password';
    // alert(`Error: ${errorMessage}`); // Show alert for error
    throw error;
  }
};

export const logoutUser = async (token: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/user/logout`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to logout';
    // alert(`Error: ${errorMessage}`); // Show alert for error
    throw error;
  }
};