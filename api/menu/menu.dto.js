// 메뉴 DTO 정의
class MenuDTO {
  constructor({ id, name, category, description, tags }) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.description = description;
    this.tags = tags;
  }
}

export default MenuDTO; 