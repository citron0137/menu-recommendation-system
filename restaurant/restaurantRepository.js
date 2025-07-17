import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import RestaurantDTO from './restaurant.dto.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class RestaurantRepository {
  constructor() {
    this.filePath = path.join(__dirname, '../data/restaurant.json');
  }

  getAllRestaurants() {
    const raw = fs.readFileSync(this.filePath, 'utf-8');
    const json = JSON.parse(raw);
    return json.restaurants.map(item => new RestaurantDTO(item));
  }

  getRestaurantById(id) {
    const restaurants = this.getAllRestaurants();
    return restaurants.find(r => r.id === id) || null;
  }

  getRestaurantByIdList(idList) {
    const restaurants = this.getAllRestaurants();
    return restaurants.filter(r => idList.includes(r.id));
  }

  saveAllRestaurants(restaurants) {
    const data = { restaurants: restaurants.map(r => ({
      id: r.id,
      name: r.name,
      category: r.category
    })) };
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  addRestaurant(restaurant) {
    const restaurants = this.getAllRestaurants();
    restaurants.push(new RestaurantDTO(restaurant));
    this.saveAllRestaurants(restaurants);
  }

  removeRestaurantById(id) {
    let restaurants = this.getAllRestaurants();
    restaurants = restaurants.filter(r => r.id !== id);
    this.saveAllRestaurants(restaurants);
  }
}

export default RestaurantRepository; 