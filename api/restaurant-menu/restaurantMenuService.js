import RestaurantMenuRepository from './restaurantMenuRepository.js';

class RestaurantMenuService {
  constructor() {
    this.repo = new RestaurantMenuRepository();
  }

  getAll() {
    return this.repo.getAllRestaurantMenus();
  }

  getById(id) {
    return this.repo.getRestaurantMenuById(id);
  }

  getByRestaurantId(restaurantId) {
    return this.repo.getRestaurantMenusByRestaurantId(restaurantId);
  }

  getByMenuId(menuId) {
    return this.repo.getRestaurantMenusByMenuId(menuId);
  }

  add(restaurantMenu) {
    this.repo.addRestaurantMenu(restaurantMenu);
  }

  // 음식점 이름과 메뉴명으로 관계 추가
  async addByNames(restaurantName, menuName) {
    try {
      const restaurantModule = await import('../restaurant/restaurantService.js');
      const menuModule = await import('../menu/menuService.js');
      
      const restaurantService = restaurantModule.default;
      const menuService = menuModule.default;
      
      // 음식점 이름으로 찾기
      let restaurants = restaurantService.getAllRestaurants({ name: restaurantName });
      let restaurant;
      
      if (restaurants.length === 0) {
        // 음식점이 없으면 자동 추가
        const allRestaurants = restaurantService.getAllRestaurants();
        const maxRestaurantId = allRestaurants.length > 0 ? Math.max(...allRestaurants.map(r => r.id)) : 0;
        const newRestaurant = {
          id: maxRestaurantId + 1,
          name: restaurantName,
          category: '기타' // 기본 카테고리
        };
        restaurantService.addRestaurant(newRestaurant);
        restaurant = newRestaurant;
      } else if (restaurants.length > 1) {
        throw new Error(`음식점 "${restaurantName}"이 여러 개 존재합니다. 정확한 이름을 입력해주세요.`);
      } else {
        restaurant = restaurants[0];
      }
      
      // 메뉴명으로 찾기
      let menus = menuService.getAllMenus({ name: menuName });
      let menu;
      
      if (menus.length === 0) {
        // 메뉴가 없으면 자동 추가
        const allMenus = menuService.getAllMenus();
        const maxMenuId = allMenus.length > 0 ? Math.max(...allMenus.map(m => m.id)) : 0;
        const newMenu = {
          id: maxMenuId + 1,
          name: menuName,
          category: '기타', // 기본 카테고리
          description: `${menuName} 메뉴`,
          tags: [menuName]
        };
        menuService.addMenu(newMenu);
        menu = newMenu;
      } else if (menus.length > 1) {
        throw new Error(`메뉴 "${menuName}"이 여러 개 존재합니다. 정확한 이름을 입력해주세요.`);
      } else {
        menu = menus[0];
      }
      
      // 기존 관계 확인
      const existingRelations = this.getAll();
      if (existingRelations.some(rm => rm.restaurantId === restaurant.id && rm.menuId === menu.id)) {
        throw new Error(`"${restaurantName}"과 "${menuName}"의 관계가 이미 존재합니다.`);
      }
      
      // ID 자동 생성
      const maxId = existingRelations.length > 0 ? Math.max(...existingRelations.map(rm => rm.id)) : 0;
      const newId = maxId + 1;
      
      const newRelation = {
        id: newId,
        restaurantId: restaurant.id,
        menuId: menu.id
      };
      
      this.add(newRelation);
      
      // 조인된 데이터 반환
      return await this.getJoinedDataById(newId);
    } catch (error) {
      throw error;
    }
  }

  removeById(id) {
    this.repo.removeRestaurantMenuById(id);
  }

  // 음식점과 메뉴 이름을 포함한 조인 데이터 반환
  async getJoinedData(restaurantMenus) {
    try {
      const restaurantModule = await import('../restaurant/restaurantService.js');
      const menuModule = await import('../menu/menuService.js');
      
      const restaurantService = restaurantModule.default;
      const menuService = menuModule.default;
      
      return restaurantMenus.map(rm => {
        const restaurant = restaurantService.getRestaurantById(rm.restaurantId);
        const menu = menuService.getMenuById(rm.menuId);
        
        return {
          ...rm,
          restaurantName: restaurant ? restaurant.name : '알 수 없음',
          menuName: menu ? menu.name : '알 수 없음'
        };
      });
    } catch (error) {
      console.error('조인 데이터 생성 중 오류:', error);
      return restaurantMenus;
    }
  }

  // 단일 관계에 대한 조인 데이터 반환
  async getJoinedDataById(id) {
    const item = this.getById(id);
    if (!item) return null;
    
    const joinedData = await this.getJoinedData([item]);
    return joinedData[0];
  }

  // 추천 데이터에 조인 정보 포함
  async getRecommendWithNames() {
    const allRelations = this.getAll();
    if (!allRelations || allRelations.length === 0) return null;
    
    const randomRelation = allRelations[Math.floor(Math.random() * allRelations.length)];
    return await this.getJoinedDataById(randomRelation.id);
  }
}

export default new RestaurantMenuService(); 