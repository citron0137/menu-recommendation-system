# 점심 메뉴 추천 웹 애플리케이션

점심 메뉴 추천 API를 활용하는 React 웹 애플리케이션입니다.

## 🚀 기능

### 홈 화면

- 오늘의 추천 메뉴와 음식점 표시
- 새로운 추천 받기 기능
- 서버 정보 및 API 문서 링크

### 메뉴 관리

- 메뉴 목록 조회
- 새 메뉴 추가 (이름, 카테고리, 설명, 태그)
- 메뉴 삭제
- 카테고리별 분류

### 음식점 관리

- 음식점 목록 조회
- 새 음식점 추가 (이름, 카테고리)
- 음식점 삭제
- 카테고리별 분류

## 🛠️ 기술 스택

- **Frontend**: React 18, TypeScript
- **HTTP Client**: Axios
- **Styling**: CSS3 (모던 그라디언트 및 애니메이션)
- **Backend API**: Express.js (별도 서버)

## 📦 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 API 서버 주소를 설정하세요:

```bash
# .env 파일 생성
touch .env
```

`.env` 파일 내용:

```env
# API 서버 설정
REACT_APP_API_URL=http://localhost:3000

# 개발 환경 설정
REACT_APP_ENV=development
```

**참고**:

- `REACT_APP_` 접두사가 붙은 환경 변수만 React 애플리케이션에서 접근할 수 있습니다.
- 환경 변수를 변경한 후에는 개발 서버를 재시작해야 합니다.

### 3. 개발 서버 실행

```bash
npm start
```

웹 애플리케이션이 `http://localhost:3000`에서 실행됩니다.

### 4. 빌드

```bash
npm run build
```

## 🔧 API 서버 설정

이 웹 애플리케이션은 별도의 API 서버가 필요합니다. API 서버가 `http://localhost:3000`에서 실행되고 있어야 합니다.

API 서버 실행 방법:

```bash
cd ../api
npm install
npm start
```

**다른 포트에서 API 서버를 실행하는 경우**:
`.env` 파일에서 `REACT_APP_API_URL`을 수정하세요:

```env
REACT_APP_API_URL=http://localhost:8080
```

## 📱 반응형 디자인

- 데스크톱, 태블릿, 모바일 환경 지원
- 그리드 레이아웃으로 최적화된 카드 디자인
- 터치 친화적인 인터페이스

## 🎨 UI/UX 특징

- 모던한 그라디언트 디자인
- 부드러운 애니메이션과 전환 효과
- 직관적인 네비게이션
- 로딩 상태 및 에러 처리
- 카드 기반 레이아웃

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── Header.tsx          # 헤더 및 네비게이션
│   ├── Header.css
│   ├── Home.tsx           # 홈 화면
│   ├── Home.css
│   ├── MenuManager.tsx    # 메뉴 관리
│   ├── MenuManager.css
│   ├── RestaurantManager.tsx  # 음식점 관리
│   └── RestaurantManager.css
├── services/
│   └── api.ts             # API 통신 서비스
├── App.tsx                # 메인 앱 컴포넌트
├── App.css
└── index.tsx
```

## 🔌 API 엔드포인트

웹 애플리케이션에서 사용하는 주요 API 엔드포인트:

- `GET /` - 서버 정보 및 오늘의 추천
- `GET /api/menu/recommend` - 추천 메뉴
- `GET /api/menu` - 메뉴 목록
- `POST /api/menu` - 메뉴 추가
- `DELETE /api/menu/:id` - 메뉴 삭제
- `GET /api/restaurant/recommend` - 추천 음식점
- `GET /api/restaurant` - 음식점 목록
- `POST /api/restaurant` - 음식점 추가
- `DELETE /api/restaurant/:id` - 음식점 삭제

## 🚀 배포

### 정적 파일 배포

```bash
npm run build
```

생성된 `build` 폴더를 웹 서버에 배포할 수 있습니다.

### 환경 변수 설정

배포 환경에서는 `.env.production` 파일을 생성하여 프로덕션 API 서버 URL을 설정하세요:

```env
REACT_APP_API_URL=https://your-api-server.com
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

문제가 발생하거나 질문이 있으시면 이슈를 생성해 주세요.
