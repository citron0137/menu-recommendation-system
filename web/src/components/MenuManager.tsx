import React, { useState, useEffect } from "react";
import { getAllMenus, addMenu, deleteMenu, Menu } from "../services/api";
import "./MenuManager.css";

const MenuManager: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMenu, setNewMenu] = useState({
    name: "",
    category: "",
    description: "",
    tags: "",
  });

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const menuList = await getAllMenus();
      setMenus(menuList);
    } catch (err) {
      setError("메뉴 목록을 불러오는 중 오류가 발생했습니다.");
      console.error("Error fetching menus:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMenu = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMenu.name || !newMenu.category) {
      alert("메뉴 이름과 카테고리는 필수입니다.");
      return;
    }

    try {
      const tags = newMenu.tags
        ? newMenu.tags.split(",").map((tag) => tag.trim())
        : [];
      await addMenu({
        name: newMenu.name,
        category: newMenu.category,
        description: newMenu.description,
        tags,
      });

      setNewMenu({ name: "", category: "", description: "", tags: "" });
      setShowAddForm(false);
      fetchMenus();
    } catch (err) {
      alert("메뉴 추가 중 오류가 발생했습니다.");
      console.error("Error adding menu:", err);
    }
  };

  const handleDeleteMenu = async (id: number) => {
    if (!window.confirm("정말로 이 메뉴를 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deleteMenu(id);
      fetchMenus();
    } catch (err) {
      alert("메뉴 삭제 중 오류가 발생했습니다.");
      console.error("Error deleting menu:", err);
    }
  };

  if (loading) {
    return (
      <div className="menu-manager-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>메뉴 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-manager-container">
      <div className="header-section">
        <h2>🍽️ 메뉴 관리</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="add-button"
        >
          {showAddForm ? "취소" : "+ 새 메뉴 추가"}
        </button>
      </div>

      {error && (
        <div className="error">
          <p>{error}</p>
          <button onClick={fetchMenus} className="retry-button">
            다시 시도
          </button>
        </div>
      )}

      {showAddForm && (
        <div className="add-form">
          <h3>새 메뉴 추가</h3>
          <form onSubmit={handleAddMenu}>
            <div className="form-group">
              <label>메뉴 이름 *</label>
              <input
                type="text"
                value={newMenu.name}
                onChange={(e) =>
                  setNewMenu({ ...newMenu, name: e.target.value })
                }
                placeholder="예: 김치찌개"
                required
              />
            </div>

            <div className="form-group">
              <label>카테고리 *</label>
              <select
                value={newMenu.category}
                onChange={(e) =>
                  setNewMenu({ ...newMenu, category: e.target.value })
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

            <div className="form-group">
              <label>설명</label>
              <textarea
                value={newMenu.description}
                onChange={(e) =>
                  setNewMenu({ ...newMenu, description: e.target.value })
                }
                placeholder="메뉴에 대한 설명을 입력하세요"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>태그</label>
              <input
                type="text"
                value={newMenu.tags}
                onChange={(e) =>
                  setNewMenu({ ...newMenu, tags: e.target.value })
                }
                placeholder="예: 매운맛, 건강식, 인기메뉴 (쉼표로 구분)"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">
                메뉴 추가
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

      <div className="menu-list">
        <h3>메뉴 목록 ({menus.length}개)</h3>
        {menus.length === 0 ? (
          <div className="empty-state">
            <p>등록된 메뉴가 없습니다.</p>
            <button onClick={() => setShowAddForm(true)} className="add-button">
              첫 번째 메뉴 추가하기
            </button>
          </div>
        ) : (
          <div className="menu-grid">
            {menus.map((menu) => (
              <div key={menu.id} className="menu-card">
                <div className="menu-header">
                  <h4>{menu.name}</h4>
                  <span className="category-badge">{menu.category}</span>
                </div>
                {menu.description && (
                  <p className="description">{menu.description}</p>
                )}
                {menu.tags && menu.tags.length > 0 && (
                  <div className="tags">
                    {menu.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="menu-actions">
                  <button
                    onClick={() => handleDeleteMenu(menu.id)}
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

export default MenuManager;
