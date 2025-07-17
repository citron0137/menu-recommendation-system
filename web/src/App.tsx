import React, { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import MenuManager from "./components/MenuManager";
import RestaurantManager from "./components/RestaurantManager";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "menus":
        return <MenuManager />;
      case "restaurants":
        return <RestaurantManager />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="main-content">{renderContent()}</main>
    </div>
  );
}

export default App;
