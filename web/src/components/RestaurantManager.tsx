import React, { useState, useEffect } from "react";
import {
  getAllRestaurants,
  addRestaurant,
  deleteRestaurant,
  Restaurant,
} from "../services/api";
import "./RestaurantManager.css";

const RestaurantManager: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    category: "",
  });

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const restaurantList = await getAllRestaurants();
      setRestaurants(restaurantList);
    } catch (err) {
      setError("음식점 목록을 불러오는 중 오류가 발생했습니다.");
      console.error("Error fetching restaurants:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRestaurant = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newRestaurant.name || !newRestaurant.category) {
      alert("음식점 이름과 카테고리는 필수입니다.");
      return;
    }

    try {
      await addRestaurant({
        name: newRestaurant.name,
        category: newRestaurant.category,
      });

      setNewRestaurant({ name: "", category: "" });
      setShowAddForm(false);
      fetchRestaurants();
    } catch (err) {
      alert("음식점 추가 중 오류가 발생했습니다.");
      console.error("Error adding restaurant:", err);
    }
  };

  const handleDeleteRestaurant = async (id: number) => {
    if (!window.confirm("정말로 이 음식점을 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deleteRestaurant(id);
      fetchRestaurants();
    } catch (err) {
      alert("음식점 삭제 중 오류가 발생했습니다.");
      console.error("Error deleting restaurant:", err);
    }
  };

  if (loading) {
    return (
      <div className="restaurant-manager-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>음식점 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="restaurant-manager-container">
      <div className="header-section">
        <h2>🏪 음식점 관리</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="add-button"
        >
          {showAddForm ? "취소" : "+ 새 음식점 추가"}
        </button>
      </div>

      {error && (
        <div className="error">
          <p>{error}</p>
          <button onClick={fetchRestaurants} className="retry-button">
            다시 시도
          </button>
        </div>
      )}

      {showAddForm && (
        <div className="add-form">
          <h3>새 음식점 추가</h3>
          <form onSubmit={handleAddRestaurant}>
            <div className="form-group">
              <label>음식점 이름 *</label>
              <input
                type="text"
                value={newRestaurant.name}
                onChange={(e) =>
                  setNewRestaurant({ ...newRestaurant, name: e.target.value })
                }
                placeholder="예: 맛있는 김치찌개집"
                required
              />
            </div>

            <div className="form-group">
              <label>카테고리 *</label>
              <select
                value={newRestaurant.category}
                onChange={(e) =>
                  setNewRestaurant({
                    ...newRestaurant,
                    category: e.target.value,
                  })
                }
                required
              >
                <option value="">카테고리 선택</option>
                <option value="한식">한식</option>
                <option value="중식">중식</option>
                <option value="일식">일식</option>
                <option value="양식">양식</option>
                <option value="분식">분식</option>
                <option value="카페">카페</option>
                <option value="기타">기타</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">
                음식점 추가
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="cancel-button"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="restaurant-list">
        <h3>음식점 목록 ({restaurants.length}개)</h3>
        {restaurants.length === 0 ? (
          <div className="empty-state">
            <p>등록된 음식점이 없습니다.</p>
            <button onClick={() => setShowAddForm(true)} className="add-button">
              첫 번째 음식점 추가하기
            </button>
          </div>
        ) : (
          <div className="restaurant-grid">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="restaurant-card">
                <div className="restaurant-header">
                  <h4>{restaurant.name}</h4>
                  <span className="category-badge">{restaurant.category}</span>
                </div>
                <div className="restaurant-actions">
                  <button
                    onClick={() => handleDeleteRestaurant(restaurant.id)}
                    className="delete-button"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantManager;
