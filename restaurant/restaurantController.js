import express from 'express';
import restaurantService from './restaurantService.js';

const router = express.Router();

router.get('/recommend', (req, res) => {
  try {
    const recommendedRestaurant = restaurantService.recommendRestaurant();
    res.json({
      success: true,
      data: recommendedRestaurant,
      message: '오늘의 점심 음식점을 추천합니다!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '음식점 추천 중 오류가 발생했습니다.',
      message: error.message
    });
  }
});

router.get('/', (req, res) => {
  try {
    const restaurantList = restaurantService.getAllRestaurants(req.query);
    res.json({
      success: true,
      data: restaurantList,
      count: restaurantList.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '음식점 목록 조회 중 오류가 발생했습니다.',
      message: error.message
    });
  }
});

router.post('/', (req, res) => {
  try {
    const { name, category } = req.body;
    
    // 필수 필드 검증
    if (!name || !category) {
      return res.status(400).json({
        success: false,
        error: '음식점 이름과 카테고리는 필수입니다.'
      });
    }

    // ID 자동 생성 (현재 음식점 중 가장 큰 ID + 1)
    const existingRestaurants = restaurantService.getAllRestaurants();
    const maxId = existingRestaurants.length > 0 ? Math.max(...existingRestaurants.map(restaurant => restaurant.id)) : 0
    const newId = maxId + 1;
    const newRestaurant = {
      id: newId,
      name,
      category
    };

    restaurantService.addRestaurant(newRestaurant);
    
    res.status(201).json({
      success: true,
      data: newRestaurant,
      message: '음식점이 성공적으로 추가되었습니다.'
    });
  } catch (error) {
    // 중복 음식점 에러 처리
    if (error.message === '이미 존재하는 음식점입니다.') {
      return res.status(409).json({
        success: false,
        error: '이미 존재하는 음식점입니다.',
        message: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      error: '음식점 추가 중 오류가 발생했습니다.',
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
        error: '유효하지 않은 음식점 ID입니다.'
      });
    }

    // 음식점 존재 여부 확인
    const existingRestaurant = restaurantService.getRestaurantById(id);
    if (!existingRestaurant) {
      return res.status(404).json({
        success: false,
        error: '해당 ID의 음식점을 찾을 수 없습니다.'
      });
    }

    restaurantService.removeRestaurantById(id);
    
    res.json({
      success: true,
      message: '음식점이 성공적으로 삭제되었습니다.',
      deletedRestaurant: existingRestaurant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '음식점 삭제 중 오류가 발생했습니다.',
      message: error.message
    });
  }
});

export default router; 