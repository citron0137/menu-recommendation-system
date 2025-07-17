import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import menuController from './menu/menuController.js';
import restaurantController from './restaurant/restaurantController.js';
import restaurantMenuController from './restaurant-menu/restaurantMenuController.js';
import menuService from './menu/menuService.js';
import restaurantService from './restaurant/restaurantService.js';
import restaurantMenuService from './restaurant-menu/restaurantMenuService.js';

const app = express();
const PORT = process.env.PORT || 3000; // 미들웨어 설정
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '점심 메뉴 추천 API',
      version: '1.0.0',
      description: '점심 메뉴를 추천해주는 RESTful API 서버입니다.',
    },
  },
  apis: ['./menu/*.js', './menu/menu.swagger.js', './restaurant/*.js', './restaurant/restaurant.swagger.js', './restaurant-menu/*.js', './restaurant-menu/restaurantMenu.swagger.js'],
};

const specs = swaggerJsdoc(swaggerOptions);
//console.log('Swagger specs:', JSON.stringify(specs, null, 2));

app.use(cors()); // CORS 설정
app.use(morgan('combined')); // 로깅
app.use(express.json()); // JSON 파싱

// Swagger UI 엔드포인트
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// 기본 라우트
app.get('/', async (req, res) => {
  try {
    // 메뉴 추천 서비스에서 추천 메뉴 가져오기
    const recommendedMenu = menuService.recommendMenu();
    const restaurantMenus = restaurantMenuService.getByMenuId(recommendedMenu.id);
    const restaurant = restaurantService.getRestaurantByIdList(restaurantMenus.map(r => r.restaurantId));

    const response = {
      message: '점심 메뉴 추천 API 서버입니다!',
      version: '1.0.0',
      swagger: `/api-docs`,
      todayRecommend: { menu: recommendedMenu, restaurants: restaurant},
    };
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(response, null, 2));
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '서버 정보 조회 중 오류가 발생했습니다.',
      message: error.message
    });
  }
});

// 메뉴 관련 라우트 연결
app.use('/api/menu', menuController);
app.use('/api/restaurant', restaurantController);
app.use('/api/restaurant-menu', restaurantMenuController);

// 404 에러 핸들링
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: '요청한 엔드포인트를 찾을 수 없습니다.'
  });
});

// 전역 에러 핸들링
app.use((error, req, res, next) => {
  console.error('서버 에러:', error);
  res.status(500).json({
    success: false,
    error: '서버 내부 오류가 발생했습니다.',
    message: error.message
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 점심 메뉴 추천 API 서버가 포트 ${PORT}에서 실행 중입니다!`);
  console.log(`📖 API 문서: http://localhost:${PORT}/api-docs`);
});
