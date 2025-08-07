import React from "react";
import "../style/loading.css"; // Tạo file CSS riêng cho component

const Loading = () => {
  return (
    <div className="loading-overlay" aria-live="polite" aria-busy="true">
      <div className="loading-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="loading-text">Đang tải...</p>
    </div>
  );
};

export default Loading;
