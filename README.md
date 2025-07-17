# 점심 메뉴 추천 시스템

점심 메뉴 추천 API와 React 웹 애플리케이션으로 구성된 완전한 시스템입니다.

## 🚀 빠른 시작

### Docker Compose로 실행 (권장)

```bash
# 전체 시스템 실행
docker-compose up --build

# 백그라운드에서 실행
docker-compose up -d --build
```

**접속 정보:**

- 웹 애플리케이션: http://localhost
- API 서버: http://localhost:3000
- API 문서: http://localhost:3000/api-docs

### 개별 실행

```bash
# API 서버 실행
cd api && npm install && npm start

# 웹 애플리케이션 실행 (새 터미널에서)
cd web && npm install && npm start
```

## 📁 프로젝트 구조

```
jummechu/
├── api/                    # Express.js API 서버
│   ├── menu/              # 메뉴 관련 API
│   ├── restaurant/        # 음식점 관련 API
│   ├── restaurant-menu/   # 음식점-메뉴 연결 API
│   ├── data/              # 데이터 파일들
│   ├── server.js          # 메인 서버 파일
│   └── Dockerfile         # API Docker 이미지
├── web/                   # React 웹 애플리케이션
│   ├── src/
│   │   ├── components/    # React 컴포넌트들
│   │   ├── services/      # API 통신 서비스
│   │   └── App.tsx        # 메인 앱 컴포넌트
│   ├── Dockerfile         # 웹 Docker 이미지
│   └── nginx.conf         # Nginx 설정
├── docker-compose.yml     # Docker Compose 설정
├── docker-compose.dev.yml # 개발 환경 설정
└── DOCKER.md             # Docker 사용 가이드
```

## 🛠️ 기술 스택

### Backend (API)

- **Runtime**: Node.js 18
- **Framework**: Express.js
- **Package Manager**: pnpm
- **Documentation**: Swagger UI
- **Container**: Docker

### Frontend (Web)

- **Framework**: React 18 + TypeScript
- **HTTP Client**: Axios
- **Styling**: CSS3 (모던 그라디언트)
- **Container**: Docker + Nginx

### Infrastructure

- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx
- **Networking**: Docker Networks

## 🚀 기능

### API 서버

- 메뉴 추천 API
- 음식점 추천 API
- 메뉴/음식점 CRUD API
- Swagger API 문서
- 헬스체크 엔드포인트

### 웹 애플리케이션

- 오늘의 추천 메뉴/음식점 표시
- 메뉴 관리 (추가/삭제/조회)
- 음식점 관리 (추가/삭제/조회)
- 반응형 디자인
- 실시간 데이터 업데이트

## 🔧 환경 설정

### 환경 변수

프로젝트 루트에 `.env` 파일을 생성하세요:

```env
# API 서버 설정
REACT_APP_API_URL=http://localhost:3000

# 환경 설정
REACT_APP_ENV=development
```

### 포트 설정

- **API 서버**: 3000
- **웹 애플리케이션**: 80 (Docker), 3000 (개발)

## 📋 Docker 명령어

### 프로덕션 환경

```bash
# 전체 시스템 실행
docker-compose up --build

# 백그라운드 실행
docker-compose up -d --build

# 서비스 중지
docker-compose down

# 로그 확인
docker-compose logs -f
```

### 개발 환경

```bash
# 개발 모드로 실행
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

# 특정 서비스만 재빌드
docker-compose build api
docker-compose build web
```

### 유지보수

```bash
# 컨테이너 상태 확인
docker-compose ps

# 리소스 사용량 확인
docker stats

# 이미지 정리
docker system prune -f
```

## 🔌 API 엔드포인트

### 기본 엔드포인트

- `GET /` - 서버 정보 및 오늘의 추천
- `GET /api-docs` - Swagger API 문서

### 메뉴 관련

- `GET /api/menu/recommend` - 추천 메뉴
- `GET /api/menu` - 메뉴 목록
- `POST /api/menu` - 메뉴 추가
- `DELETE /api/menu/:id` - 메뉴 삭제

### 음식점 관련

- `GET /api/restaurant/recommend` - 추천 음식점
- `GET /api/restaurant` - 음식점 목록
- `POST /api/restaurant` - 음식점 추가
- `DELETE /api/restaurant/:id` - 음식점 삭제

## 🚀 배포

### Docker 배포

```bash
# 프로덕션 빌드
docker-compose up -d --build

# 스케일링
docker-compose up --scale api=3 -d
```

### 수동 배포

```bash
# API 서버 배포
cd api && npm install && npm start

# 웹 애플리케이션 빌드
cd web && npm install && npm run build
```

## 🐛 문제 해결

### 포트 충돌

```bash
# 사용 중인 포트 확인
lsof -i :3000
lsof -i :80

# Docker 컨테이너 정리
docker-compose down
docker system prune -f
```

### 빌드 오류

```bash
# 캐시 삭제 후 재빌드
docker-compose build --no-cache

# 특정 서비스만 재빌드
docker-compose build --no-cache web
```

### 네트워크 문제

```bash
# 네트워크 확인
docker network ls
docker network inspect mechu_mechu-network
```

## 📊 모니터링

### 헬스체크

- API 서버: 30초마다 `/` 엔드포인트 확인
- 웹 서버: 30초마다 `/` 엔드포인트 확인

### 로그 모니터링

```bash
# 실시간 로그
docker-compose logs -f

# 특정 서비스 로그
docker-compose logs -f api
docker-compose logs -f web
```

## 🤝 기여

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 ISC 라이선스 하에 배포됩니다.

## 📞 지원

- **문서**: [DOCKER.md](./DOCKER.md) - Docker 사용 가이드
- **API 문서**: http://localhost:3000/api-docs
- **이슈**: GitHub Issues에서 문제를 보고하세요
