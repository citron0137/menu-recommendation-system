import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import RestaurantMenuDTO from './restaurantMenu.dto.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class RestaurantMenuRepository {
  constructor() {
    this.filePath = path.join(__dirname, '../data/restaurantMenu.json');
  }

  getAllRestaurantMenus() {
    const raw = fs.readFileSync(this.filePath, 'utf-8');
    const json = JSON.parse(raw);
    return json.restaurantMenus.map(item => new RestaurantMenuDTO(item));
  }

  getRestaurantMenuById(id) {
    const restaurantMenus = this.getAllRestaurantMenus();
    return restaurantMenus.find(rm => rm.id === id) || null;
  }

  getRestaurantMenusByRestaurantId(restaurantId) {
    const restaurantMenus = this.getAllRestaurantMenus();
    return restaurantMenus.filter(rm => rm.restaurantId === restaurantId);
  }

  getRestaurantMenusByMenuId(menuId) {
    const restaurantMenus = this.getAllRestaurantMenus();
    return restaurantMenus.filter(rm => rm.menuId === menuId);
  }

  saveAllRestaurantMenus(restaurantMenus) {
    const data = { restaurantMenus: restaurantMenus.map(rm => ({
      id: rm.id,
      restaurantId: rm.restaurantId,
      menuId: rm.menuId
    })) };
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  addRestaurantMenu(restaurantMenu) {
    const restaurantMenus = this.getAllRestaurantMenus();
    restaurantMenus.push(new RestaurantMenuDTO(restaurantMenu));
    this.saveAllRestaurantMenus(restaurantMenus);
  }

  removeRestaurantMenuById(id) {
    let restaurantMenus = this.getAllRestaurantMenus();
    restaurantMenus = restaurantMenus.filter(rm => rm.id !== id);
    this.saveAllRestaurantMenus(restaurantMenus);
  }
}

export default RestaurantMenuRepository; 