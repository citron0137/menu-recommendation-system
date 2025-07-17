import express from 'express';
import restaurantMenuService from './restaurantMenuService.js';
import RestaurantMenuResponseDTO from './restaurantMenuResponse.dto.js';

const router = express.Router();

// 음식점-메뉴 관계 기반 추천
router.get('/recommend', async (req, res) => {
  try {
    const recommendedRelation = await restaurantMenuService.getRecommendWithNames();
    if (!recommendedRelation) {
      return res.json(RestaurantMenuResponseDTO.empty());
    }
    
    res.json(RestaurantMenuResponseDTO.success(
      recommendedRelation,
      '오늘의 음식점-메뉴를 추천합니다!'
    ));
  } catch (error) {
    res.status(500).json(RestaurantMenuResponseDTO.error(
      '음식점-메뉴 추천 중 오류가 발생했습니다.',
      error.message
    ));
  }
});

// 전체 관계 목록 조회
router.get('/', async (req, res) => {
  try {
    const list = restaurantMenuService.getAll();
    const joinedList = await restaurantMenuService.getJoinedData(list);
    res.json(RestaurantMenuResponseDTO.success(joinedList, '', joinedList.length));
  } catch (error) {
    res.status(500).json(RestaurantMenuResponseDTO.error(
      '관계 목록 조회 중 오류',
      error.message
    ));
  }
});

// 단일 관계 조회
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const item = await restaurantMenuService.getJoinedDataById(id);
    if (!item) {
      return res.status(404).json(RestaurantMenuResponseDTO.error('해당 ID의 관계를 찾을 수 없습니다.'));
    }
    res.json(RestaurantMenuResponseDTO.success(item));
  } catch (error) {
    res.status(500).json(RestaurantMenuResponseDTO.error(
      '관계 조회 중 오류',
      error.message
    ));
  }
});

// 음식점ID로 메뉴 목록 조회
router.get('/restaurant/:restaurantId', async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId);
    const list = restaurantMenuService.getByRestaurantId(restaurantId);
    const joinedList = await restaurantMenuService.getJoinedData(list);
    res.json(RestaurantMenuResponseDTO.success(joinedList, '', joinedList.length));
  } catch (error) {
    res.status(500).json(RestaurantMenuResponseDTO.error(
      '음식점별 메뉴 조회 중 오류',
      error.message
    ));
  }
});

// 메뉴ID로 음식점 목록 조회
router.get('/menu/:menuId', async (req, res) => {
  try {
    const menuId = parseInt(req.params.menuId);
    const list = restaurantMenuService.getByMenuId(menuId);
    const joinedList = await restaurantMenuService.getJoinedData(list);
    res.json(RestaurantMenuResponseDTO.success(joinedList, '', joinedList.length));
  } catch (error) {
    res.status(500).json(RestaurantMenuResponseDTO.error(
      '메뉴별 음식점 조회 중 오류',
      error.message
    ));
  }
});

// 관계 추가
router.post('/', (req, res) => {
  try {
    const { restaurantId, menuId } = req.body;
    if (!restaurantId || !menuId) {
      return res.status(400).json(RestaurantMenuResponseDTO.error('restaurantId, menuId는 필수입니다.'));
    }
    // ID 자동 생성
    const all = restaurantMenuService.getAll();
    const maxId = all.length > 0 ? Math.max(...all.map(rm => rm.id)) : 0;
    const newId = maxId + 1;
    // 중복 관계 방지
    if (all.some(rm => rm.restaurantId === restaurantId && rm.menuId === menuId)) {
      return res.status(409).json(RestaurantMenuResponseDTO.error('이미 등록된 관계입니다.'));
    }
    const newItem = { id: newId, restaurantId, menuId };
    restaurantMenuService.add(newItem);
    res.status(201).json(RestaurantMenuResponseDTO.success(
      newItem,
      '관계가 성공적으로 추가되었습니다.'
    ));
  } catch (error) {
    res.status(500).json(RestaurantMenuResponseDTO.error(
      '관계 추가 중 오류',
      error.message
    ));
  }
});

// 음식점 이름과 메뉴명으로 관계 추가
router.post('/by-names', async (req, res) => {
  try {
    const { restaurantName, menuName } = req.body;
    if (!restaurantName || !menuName) {
      return res.status(400).json(RestaurantMenuResponseDTO.error('restaurantName, menuName은 필수입니다.'));
    }
    
    const newRelation = await restaurantMenuService.addByNames(restaurantName, menuName);
    res.status(201).json(RestaurantMenuResponseDTO.success(
      newRelation,
      '관계가 성공적으로 추가되었습니다.'
    ));
  } catch (error) {
    // 에러 메시지에 따라 적절한 상태 코드 설정
    let statusCode = 500;
    if (error.message.includes('이미 존재합니다')) {
      statusCode = 409;
    } else if (error.message.includes('여러 개 존재합니다')) {
      statusCode = 400;
    }
    
    res.status(statusCode).json(RestaurantMenuResponseDTO.error(
      '관계 추가 중 오류',
      error.message
    ));
  }
});

// 관계 삭제
router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const item = restaurantMenuService.getById(id);
    if (!item) {
      return res.status(404).json(RestaurantMenuResponseDTO.error('해당 ID의 관계를 찾을 수 없습니다.'));
    }
    restaurantMenuService.removeById(id);
    res.json(RestaurantMenuResponseDTO.deleteSuccess(
      '관계가 성공적으로 삭제되었습니다.',
      item
    ));
  } catch (error) {
    res.status(500).json(RestaurantMenuResponseDTO.error(
      '관계 삭제 중 오류',
      error.message
    ));
  }
});

export default router; 