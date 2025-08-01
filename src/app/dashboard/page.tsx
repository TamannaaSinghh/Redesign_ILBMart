"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/Sidebar/DashboardLayout";
import LoginModal from "@/components/Login/LoginModal/LoginModal";

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("apiToken");
    if (token) {
      setIsLoggedIn(true);
    }
    setCheckedAuth(true);
  }, []);

  if (!checkedAuth) return <p>Loading...</p>;

  return isLoggedIn ? (
    <DashboardLayout defaultComponent="Manage Account" />
  ) : (
    <LoginModal
      onSuccess={() => setIsLoggedIn(true)}
      onClose={() => setIsLoggedIn(false)}
    />
  );
}
