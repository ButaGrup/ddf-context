import React from "react";
import "../assets/css/Sidebar.css";

const Sidebar = ({ isActive, qanunText, qanunPara, setIsActive }) => {
  return (
    <div
      className={isActive ? "overlayy overlayy-container-active" : "overlayy"}
    >
      <div
        id="sidebar-id"
        className={
          isActive
            ? "sidebar-container sidebar-container-active"
            : "sidebar-container"
        }
      >
        <div className="heading-section">
          <h1 className="qanun-heading">{qanunText}</h1>
          <svg
            onClick={() => setIsActive(false)}
            className="qanun-close"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z" />
          </svg>
        </div>
        <p className="qanun-paragraf">{qanunPara}</p>
      </div>
    </div>
  );
};

export default Sidebar;
