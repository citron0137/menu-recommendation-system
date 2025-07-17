/**
 * @swagger
 * tags:
 *   - name: RestaurantMenu
 *     description: 음식점-메뉴 관계 관리
 */

/**
 * @swagger
 * /api/restaurant-menu/recommend:
 *   get:
 *     summary: 음식점-메뉴 관계 추천
 *     description: 등록된 음식점-메뉴 관계 중 하나를 랜덤으로 추천합니다.
 *     tags: [RestaurantMenu]
 *     responses:
 *       200:
 *         description: 음식점-메뉴 관계 추천
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/RestaurantMenu'
 *                 message:
 *                   type: string
 *                   example: 오늘의 음식점-메뉴를 추천합니다!
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/restaurant-menu:
 *   get:
 *     summary: 전체 음식점-메뉴 관계 목록 조회
 *     tags: [RestaurantMenu]
 *     responses:
 *       200:
 *         description: 전체 관계 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RestaurantMenu'
 *                 count:
 *                   type: integer
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/restaurant-menu/{id}:
 *   get:
 *     summary: ID로 단일 관계 조회
 *     tags: [RestaurantMenu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 관계 ID
 *     responses:
 *       200:
 *         description: 단일 관계 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/RestaurantMenu'
 *       404:
 *         description: 해당 ID의 관계를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/restaurant-menu/restaurant/{restaurantId}:
 *   get:
 *     summary: 음식점ID로 메뉴 목록 조회
 *     tags: [RestaurantMenu]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 음식점 ID
 *     responses:
 *       200:
 *         description: 해당 음식점의 메뉴 관계 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RestaurantMenu'
 *                 count:
 *                   type: integer
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/restaurant-menu/menu/{menuId}:
 *   get:
 *     summary: 메뉴ID로 음식점 목록 조회
 *     tags: [RestaurantMenu]
 *     parameters:
 *       - in: path
 *         name: menuId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 메뉴 ID
 *     responses:
 *       200:
 *         description: 해당 메뉴의 음식점 관계 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RestaurantMenu'
 *                 count:
 *                   type: integer
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/restaurant-menu:
 *   post:
 *     summary: 음식점-메뉴 관계 추가
 *     tags: [RestaurantMenu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - restaurantId
 *               - menuId
 *             properties:
 *               restaurantId:
 *                 type: integer
 *                 example: 1
 *               menuId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: 관계 추가 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/RestaurantMenu'
 *                 message:
 *                   type: string
 *       400:
 *         description: 필수 필드 누락
 *       409:
 *         description: 이미 등록된 관계
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/restaurant-menu/by-names:
 *   post:
 *     summary: 음식점 이름과 메뉴명으로 관계 추가
 *     description: 음식점 이름과 메뉴명을 사용하여 관계를 추가합니다. 음식점이나 메뉴가 존재하지 않으면 자동으로 생성합니다.
 *     tags: [RestaurantMenu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - restaurantName
 *               - menuName
 *             properties:
 *               restaurantName:
 *                 type: string
 *                 description: 음식점 이름 (없으면 자동 생성)
 *                 example: 맛있는 김치찌개
 *               menuName:
 *                 type: string
 *                 description: 메뉴명 (없으면 자동 생성)
 *                 example: 김치찌개
 *     responses:
 *       201:
 *         description: 관계 추가 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/RestaurantMenu'
 *                 message:
 *                   type: string
 *       400:
 *         description: 필수 필드 누락 또는 여러 개 존재
 *       409:
 *         description: 이미 등록된 관계
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/restaurant-menu/{id}:
 *   delete:
 *     summary: 음식점-메뉴 관계 삭제
 *     tags: [RestaurantMenu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 관계 ID
 *     responses:
 *       200:
 *         description: 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 deleted:
 *                   $ref: '#/components/schemas/RestaurantMenu'
 *       404:
 *         description: 해당 ID의 관계를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RestaurantMenu:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         restaurantId:
 *           type: integer
 *           example: 1
 *         menuId:
 *           type: integer
 *           example: 2
 *         restaurantName:
 *           type: string
 *           example: 맛있는 김치찌개
 *         menuName:
 *           type: string
 *           example: 김치찌개
 */ 