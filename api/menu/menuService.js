import MenuRepository from './menuRepository.js';

class MenuService {
  constructor() {
    this.menuRepo = new MenuRepository();
  }

  getAllMenus(query = {}) {
    let menus = this.menuRepo.getAllMenus();
    const { name, category, tag } = query;
    if (name) {
      menus = menus.filter(menu => menu.name.includes(name));
    }
    if (category) {
      menus = menus.filter(menu => menu.category === category);
    }
    if (tag) {
      menus = menus.filter(menu => menu.tags && menu.tags.includes(tag));
    }
    return menus;
  }

  getMenuById(id) {
    return this.menuRepo.getMenuById(id);
  }

  addMenu(menu) {
    // 기존 메뉴 목록 가져오기
    const existingMenus = this.menuRepo.getAllMenus();
    
    // 새 메뉴 이름에서 띄어쓰기 제거
    const normalizedNewName = menu.name.replace(/\s+/g, '');
    
    // 기존 메뉴들과 비교 (띄어쓰기 제거 후)
    const isDuplicate = existingMenus.some(existingMenu => {
      const normalizedExistingName = existingMenu.name.replace(/\s+/g, '');
      return normalizedExistingName === normalizedNewName;
    });
    
    if (isDuplicate) {
      throw new Error('이미 존재하는 메뉴입니다.');
    }
    
    this.menuRepo.addMenu(menu);
  }

  removeMenuById(id) {
    this.menuRepo.removeMenuById(id);
  }

  recommendMenu() {
    const menus = this.menuRepo.getAllMenus();
    if (!menus || menus.length === 0) return null;
    // 현재는 랜덤 추천
    return menus[Math.floor(Math.random() * menus.length)];
  }
}

export default new MenuService(); 