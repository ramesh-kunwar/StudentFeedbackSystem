import React from "react";
import loadingIcon from "../../assets/loading-icon.gif";
import "./LoadingIcon.scss"
const LoadingIcon = () => {
  return (
    <div className="loading-icon">
      <img src={loadingIcon} alt="" />
    </div>
  );
};

export default LoadingIcon;
