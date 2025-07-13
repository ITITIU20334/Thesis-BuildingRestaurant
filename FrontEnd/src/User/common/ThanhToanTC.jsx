import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ThanhToanTC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 3000); // Chuyển về trang chủ sau 3 giây

    return () => clearTimeout(timeout); // Cleanup nếu người dùng rời trang
  }, [navigate]);

  return (
    <div className="thanh-toan-container">
      <div className="thanh-toan-card">
        <div className="success-icon">✅</div>
        <h2>Payment successful!</h2>
        <p>Thank You For Trusting Restaurant Services</p>
      </div>
    </div>
  );
};

export default ThanhToanTC;
