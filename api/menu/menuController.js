import express from 'express';
import menuService from './menuService.js';

const router = express.Router();

router.get('/recommend', (req, res) => {
  try {
    const recommendedMenu = menuService.recommendMenu();
    res.json({
      success: true,
      data: recommendedMenu,
      message: '오늘의 점심 메뉴를 추천합니다!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '메뉴 추천 중 오류가 발생했습니다.',
      message: error.message
    });
  }
});

router.get('/', (req, res) => {
  try {
    const menuList = menuService.getAllMenus(req.query);
    res.json({
      success: true,
      data: menuList,
      count: menuList.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '메뉴목록 조회 중 오류가 발생했습니다.',
      message: error.message
    });
  }
});

router.post('/', (req, res) => {
  try {
    const { name, category, description, tags } = req.body;
    
    // 필수 필드 검증
    if (!name || !category) {
      return res.status(400).json({
        success: false,
        error: '메뉴 이름과 카테고리는 필수입니다.'
      });
    }

    // ID 자동 생성 (현재 메뉴 중 가장 큰 ID + 1)
    const existingMenus = menuService.getAllMenus();
    const maxId = existingMenus.length > 0 ? Math.max(...existingMenus.map(menu => menu.id)) : 0
    const newId = maxId + 1;
    const newMenu = {
      id: newId,
      name,
      category,
      description: description || '',
      tags: tags || []
    };

    menuService.addMenu(newMenu);
    
    res.status(201).json({
      success: true,
      data: newMenu,
      message: '메뉴가 성공적으로 추가되었습니다.'
    });
  } catch (error) {
    // 중복 메뉴 에러 처리
    if (error.message === '이미 존재하는 메뉴입니다.') {
      return res.status(409).json({
        success: false,
        error: '이미 존재하는 메뉴입니다.',
        message: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      error: '메뉴 추가 중 오류가 발생했습니다.',
      message: error.message
    });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: '유효하지 않은 메뉴 ID입니다.'
      });
    }

    // 메뉴 존재 여부 확인
    const existingMenu = menuService.getMenuById(id);
    if (!existingMenu) {
      return res.status(404).json({
        success: false,
        error: '해당 ID의 메뉴를 찾을 수 없습니다.'
      });
    }

    menuService.removeMenuById(id);
    
    res.json({
      success: true,
      message: '메뉴가 성공적으로 삭제되었습니다.',
      deletedMenu: existingMenu
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '메뉴 삭제 중 오류가 발생했습니다.',
      message: error.message
    });
  }
});

export default router; 