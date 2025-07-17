import RestaurantRepository from './restaurantRepository.js';

class RestaurantService {
  constructor() {
    this.restaurantRepo = new RestaurantRepository();
  }

  getAllRestaurants(query = {}) {
    let restaurants = this.restaurantRepo.getAllRestaurants();
    const { name, category } = query;
    if (name) {
      restaurants = restaurants.filter(r => r.name.includes(name));
    }
    if (category) {
      restaurants = restaurants.filter(r => r.category === category);
    }
    return restaurants;
  }

  getRestaurantById(id) {
    return this.restaurantRepo.getRestaurantById(id);
  }

  getRestaurantByIdList(idList) {
    return this.restaurantRepo.getRestaurantByIdList(idList);
  }

  addRestaurant(restaurant) {
    // 기존 음식점 목록 가져오기
    const existingRestaurants = this.restaurantRepo.getAllRestaurants();
    
    // 새 음식점 이름에서 띄어쓰기 제거
    const normalizedNewName = restaurant.name.replace(/\s+/g, '');
    
    // 기존 음식점들과 비교 (띄어쓰기 제거 후)
    const isDuplicate = existingRestaurants.some(existingRestaurant => {
      const normalizedExistingName = existingRestaurant.name.replace(/\s+/g, '');
      return normalizedExistingName === normalizedNewName;
    });
    
    if (isDuplicate) {
      throw new Error('이미 존재하는 음식점입니다.');
    }
    
    this.restaurantRepo.addRestaurant(restaurant);
  }

  removeRestaurantById(id) {
    this.restaurantRepo.removeRestaurantById(id);
  }

  recommendRestaurant() {
    const restaurants = this.restaurantRepo.getAllRestaurants();
    if (!restaurants || restaurants.length === 0) return null;
    // 현재는 랜덤 추천
    return restaurants[Math.floor(Math.random() * restaurants.length)];
  }
}

export default new RestaurantService(); 