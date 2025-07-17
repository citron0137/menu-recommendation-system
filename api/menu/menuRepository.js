import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import MenuDTO from './menu.dto.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class MenuRepository {
  constructor() {
    this.filePath = path.join(__dirname, '../data/menu.json');
  }

  // Read 메서드
  getAllMenus() {
    const raw = fs.readFileSync(this.filePath, 'utf-8');
    const json = JSON.parse(raw);
    return json.menus.map(item => new MenuDTO(item));
  }

  getMenuById(id) {
    const menus = this.getAllMenus();
    return menus.find(menu => menu.id === id) || null;
  }

  // Write 메서드
  saveAllMenus(menus) {
    // menus: MenuDTO[]
    const data = { menus: menus.map(menu => ({
      id: menu.id,
      name: menu.name,
      category: menu.category,
      description: menu.description,
      tags: menu.tags
    })) };
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  addMenu(menu) {
    const menus = this.getAllMenus();
    menus.push(new MenuDTO(menu));
    this.saveAllMenus(menus);
  }

  removeMenuById(id) {
    let menus = this.getAllMenus();
    menus = menus.filter(menu => menu.id !== id);
    this.saveAllMenus(menus);
  }
}

export default MenuRepository; 