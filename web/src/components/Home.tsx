import React, { useState, useEffect } from "react";
import {
  getServerInfo,
  getRecommendedMenu,
  getRecommendedRestaurant,
  Menu,
  Restaurant,
} from "../services/api";
import "./Home.css";

const Home: React.FC = () => {
  const [serverInfo, setServerInfo] = useState<any>(null);
  const [recommendedMenu, setRecommendedMenu] = useState<Menu | null>(null);
  const [recommendedRestaurant, setRecommendedRestaurant] =
    useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [info, menu, restaurant] = await Promise.all([
          getServerInfo(),
          getRecommendedMenu(),
          getRecommendedRestaurant(),
        ]);

        setServerInfo(info);
        setRecommendedMenu(menu);
        setRecommendedRestaurant(restaurant);
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      setError(null);
      const [menu, restaurant] = await Promise.all([
        getRecommendedMenu(),
        getRecommendedRestaurant(),
      ]);

      setRecommendedMenu(menu);
      setRecommendedRestaurant(restaurant);
    } catch (err) {
      setError("새로운 추천을 불러오는 중 오류가 발생했습니다.");
      console.error("Error refreshing recommendations:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>추천 메뉴를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-container">
        <div className="error">
          <p>{error}</p>
          <button onClick={handleRefresh} className="refresh-button">
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h2>오늘의 점심 메뉴 추천</h2>
        <p>맛있는 점심 메뉴와 음식점을 추천해드립니다!</p>
        <button onClick={handleRefresh} className="refresh-button">
          🔄 새로운 추천 받기
        </button>
      </div>

      <div className="recommendations">
        <div className="recommendation-card menu-card">
          <div className="card-header">
            <h3>🍽️ 오늘의 추천 메뉴</h3>
          </div>
          {recommendedMenu && (
            <div className="card-content">
              <h4>{recommendedMenu.name}</h4>
              <p className="category">카테고리: {recommendedMenu.category}</p>
              {recommendedMenu.description && (
                <p className="description">{recommendedMenu.description}</p>
              )}
              {recommendedMenu.tags && recommendedMenu.tags.length > 0 && (
                <div className="tags">
                  {recommendedMenu.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="recommendation-card restaurant-card">
          <div className="card-header">
            <h3>🏪 추천 음식점</h3>
          </div>
          {recommendedRestaurant && (
            <div className="card-content">
              <h4>{recommendedRestaurant.name}</h4>
              <p className="category">
                카테고리: {recommendedRestaurant.category}
              </p>
            </div>
          )}
        </div>
      </div>

      {serverInfo && (
        <div className="server-info">
          <h3>서버 정보</h3>
          <p>버전: {serverInfo.version}</p>
          <p>
            API 문서:{" "}
            <a
              href={serverInfo.swagger}
              target="_blank"
              rel="noopener noreferrer"
            >
              Swagger UI
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
