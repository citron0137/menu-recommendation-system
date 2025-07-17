/**
 * @swagger
 * /api/menu/recommend:
 *   get:
 *     summary: 점심 메뉴 추천
 *     description: 오늘의 점심 메뉴를 랜덤으로 추천합니다.
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: 성공적으로 메뉴를 추천했습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: 김치찌개
 *                     category:
 *                       type: string
 *                       example: 한식
 *                     description:
 *                       type: string
 *                       example: 매콤달콤한 김치찌개
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: [매운, 국물, 한식]
 *                 message:
 *                   type: string
 *                   example: 오늘의 점심 메뉴를 추천합니다!
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/menu:
 *   get:
 *     summary: 전체 메뉴 목록
 *     description: 모든 메뉴 목록을 조회하거나, 쿼리 파라미터로 검색할 수 있습니다.
 *     tags: [Menu]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: 메뉴 이름(부분 일치)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: 카테고리(정확히 일치)
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         description: 태그(정확히 일치)
 *     responses:
 *       200:
 *         description: 성공적으로 메뉴 목록을 조회했습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: 김치찌개
 *                       category:
 *                         type: string
 *                         example: 한식
 *                       description:
 *                         type: string
 *                         example: 매콤달콤한 김치찌개
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: [매운, 국물, 한식]
 *                 count:
 *                   type: integer
 *                   example: 5
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/menu:
 *   post:
 *     summary: 메뉴 추가
 *     description: 새로운 메뉴를 추가합니다.
 *     tags: [Menu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 description: 메뉴 이름
 *                 example: 김치찌개
 *               category:
 *                 type: string
 *                 description: 메뉴 카테고리
 *                 example: 한식
 *               description:
 *                 type: string
 *                 description: 메뉴 설명
 *                 example: 매콤달콤한 김치찌개
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: 메뉴 태그
 *                 example: [매운, 국물, 한식]
 *     responses:
 *       201:
 *         description: 메뉴가 성공적으로 추가되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 6
 *                     name:
 *                       type: string
 *                       example: 김치찌개
 *                     category:
 *                       type: string
 *                       example: 한식
 *                     description:
 *                       type: string
 *                       example: 매콤달콤한 김치찌개
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: [매운, 국물, 한식]
 *                 message:
 *                   type: string
 *                   example: 메뉴가 성공적으로 추가되었습니다.
 *       400:
 *         description: 필수 필드가 누락되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: 메뉴 이름과 카테고리는 필수입니다.
 *       409:
 *         description: 이미 존재하는 메뉴입니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: 이미 존재하는 메뉴입니다.
 *                 message:
 *                   type: string
 *                   example: 이미 존재하는 메뉴입니다.
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/menu/{id}:
 *   delete:
 *     summary: 메뉴 삭제
 *     description: 지정된 ID의 메뉴를 삭제합니다.
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 삭제할 메뉴의 ID
 *         example: 1
 *     responses:
 *       200:
 *         description: 메뉴가 성공적으로 삭제되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 메뉴가 성공적으로 삭제되었습니다.
 *                 deletedMenu:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: 김치찌개
 *                     category:
 *                       type: string
 *                       example: 한식
 *                     description:
 *                       type: string
 *                       example: 매콤달콤한 김치찌개
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: [매운, 국물, 한식]
 *       400:
 *         description: 유효하지 않은 메뉴 ID입니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: 유효하지 않은 메뉴 ID입니다.
 *       404:
 *         description: 해당 ID의 메뉴를 찾을 수 없습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: 해당 ID의 메뉴를 찾을 수 없습니다.
 *       500:
 *         description: 서버 오류
 */ 