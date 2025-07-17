import React from "react";
import "./Header.css";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">🍽️ 점심 메뉴 추천</h1>
        <nav className="nav">
          <button
            className={`nav-button ${activeTab === "home" ? "active" : ""}`}
            onClick={() => onTabChange("home")}
          >
            홈
          </button>
          <button
            className={`nav-button ${activeTab === "menus" ? "active" : ""}`}
            onClick={() => onTabChange("menus")}
          >
            메뉴 관리
          </button>
          <button
            className={`nav-button ${
              activeTab === "restaurants" ? "active" : ""
            }`}
            onClick={() => onTabChange("restaurants")}
          >
            음식점 관리
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
