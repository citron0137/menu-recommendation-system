// 음식점-메뉴 관계 DTO 정의
class RestaurantMenuDTO {
  constructor({ id, restaurantId, menuId }) {
    this.id = id;
    this.restaurantId = restaurantId;
    this.menuId = menuId;
  }
}

export default RestaurantMenuDTO; 