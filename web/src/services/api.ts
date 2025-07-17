import axios from "axios";

// 환경 변수에서 API 서버 주소 가져오기 (기본값: localhost:3000)
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

// 개발 환경에서 API URL 로깅
if (process.env.NODE_ENV === "development") {
  console.log("🌐 API 서버 URL:", API_BASE_URL);
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Menu {
  id: number;
  name: string;
  category: string;
  description: string;
  tags: string[];
}

export interface Restaurant {
  id: number;
  name: string;
  category: string;
}

export interface RestaurantMenu {
  id: number;
  restaurantId: number;
  menuId: number;
  price: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
}

export interface ServerInfo {
  message: string;
  version: string;
  swagger: string;
  todayRecommend: {
    menu: Menu;
    restaurants: Restaurant[];
  };
}

// 서버 정보 조회
export const getServerInfo = async (): Promise<ServerInfo> => {
  const response = await api.get<ServerInfo>("/");
  return response.data;
};

// 메뉴 관련 API
export const getRecommendedMenu = async (): Promise<Menu> => {
  const response = await api.get<ApiResponse<Menu>>("/api/menu/recommend");
  return response.data.data;
};

export const getAllMenus = async (): Promise<Menu[]> => {
  const response = await api.get<ApiResponse<Menu[]>>("/api/menu");
  return response.data.data;
};

export const addMenu = async (menu: Omit<Menu, "id">): Promise<Menu> => {
  const response = await api.post<ApiResponse<Menu>>("/api/menu", menu);
  return response.data.data;
};

export const deleteMenu = async (id: number): Promise<void> => {
  await api.delete(`/api/menu/${id}`);
};

// 음식점 관련 API
export const getRecommendedRestaurant = async (): Promise<Restaurant> => {
  const response = await api.get<ApiResponse<Restaurant>>(
    "/api/restaurant/recommend"
  );
  return response.data.data;
};

export const getAllRestaurants = async (): Promise<Restaurant[]> => {
  const response = await api.get<ApiResponse<Restaurant[]>>("/api/restaurant");
  return response.data.data;
};

export const addRestaurant = async (
  restaurant: Omit<Restaurant, "id">
): Promise<Restaurant> => {
  const response = await api.post<ApiResponse<Restaurant>>(
    "/api/restaurant",
    restaurant
  );
  return response.data.data;
};

export const deleteRestaurant = async (id: number): Promise<void> => {
  await api.delete(`/api/restaurant/${id}`);
};

export default api;
