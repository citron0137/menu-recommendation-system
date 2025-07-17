# Docker Compose 사용 가이드

점심 메뉴 추천 API와 웹 애플리케이션을 Docker Compose로 실행하는 방법입니다.

## 🚀 빠른 시작

### 1. 전체 애플리케이션 실행

```bash
# 모든 서비스 빌드 및 실행
docker-compose up --build

# 백그라운드에서 실행
docker-compose up -d --build
```

### 2. 접속 정보

- **웹 애플리케이션**: http://localhost
- **API 서버**: http://localhost:3000
- **API 문서**: http://localhost:3000/api-docs

## 🛠️ 서비스 구성

### API 서버 (mechu-api)

- **포트**: 3000
- **이미지**: Node.js 18 Alpine + pnpm
- **데이터 볼륨**: `./api/data` (메뉴 및 음식점 데이터)
- **헬스체크**: 30초마다 `/` 엔드포인트 확인

### 웹 애플리케이션 (mechu-web)

- **포트**: 80
- **이미지**: Nginx + React 빌드 결과
- **API 연결**: 내부 네트워크를 통해 API 서버 연결
- **헬스체크**: 30초마다 `/` 엔드포인트 확인

## 📋 Docker Compose 명령어

### 기본 명령어

```bash
# 서비스 시작
docker-compose up

# 백그라운드에서 시작
docker-compose up -d

# 서비스 중지
docker-compose down

# 서비스 재시작
docker-compose restart

# 로그 확인
docker-compose logs

# 특정 서비스 로그 확인
docker-compose logs api
docker-compose logs web
```

### 빌드 관련 명령어

```bash
# 이미지 재빌드
docker-compose build

# 특정 서비스만 재빌드
docker-compose build api
docker-compose build web

# 캐시 없이 재빌드
docker-compose build --no-cache
```

### 상태 확인

```bash
# 서비스 상태 확인
docker-compose ps

# 헬스체크 상태 확인
docker-compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"
```

## 🔧 환경 설정

### 포트 변경

`docker-compose.yml`에서 포트 매핑을 수정하세요:

```yaml
services:
  api:
    ports:
      - "8080:3000" # 외부 포트를 8080으로 변경

  web:
    ports:
      - "8081:80" # 외부 포트를 8081로 변경
```

### 환경 변수 추가

```yaml
services:
  api:
    environment:
      - NODE_ENV=production
      - PORT=3000
      - CUSTOM_VAR=value

  web:
    environment:
      - REACT_APP_API_URL=http://api:3000
      - REACT_APP_ENV=production
```

## 🐛 문제 해결

### 포트 충돌

```bash
# 사용 중인 포트 확인
lsof -i :3000
lsof -i :80

# 기존 컨테이너 정리
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

# 네트워크 재생성
docker-compose down
docker network prune
docker-compose up
```

### 데이터 볼륨 문제

```bash
# 볼륨 확인
docker volume ls

# 볼륨 삭제 (주의: 데이터 손실)
docker-compose down -v
```

## 📊 모니터링

### 리소스 사용량 확인

```bash
# 컨테이너 리소스 사용량
docker stats

# 특정 컨테이너만 확인
docker stats mechu-api mechu-web
```

### 로그 모니터링

```bash
# 실시간 로그 확인
docker-compose logs -f

# 특정 서비스 로그만 확인
docker-compose logs -f api
docker-compose logs -f web
```

## 🚀 프로덕션 배포

### 프로덕션용 설정

```bash
# 프로덕션 환경 변수 설정
export NODE_ENV=production
export REACT_APP_API_URL=https://your-api-domain.com

# 프로덕션 빌드
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### 스케일링

```bash
# API 서버 스케일링 (예: 3개 인스턴스)
docker-compose up --scale api=3 -d
```

## 🔒 보안 고려사항

1. **환경 변수**: 민감한 정보는 `.env` 파일에 저장
2. **네트워크**: 내부 네트워크 사용으로 외부 접근 제한
3. **볼륨**: 필요한 데이터만 볼륨으로 마운트
4. **헬스체크**: 서비스 상태 모니터링

## 📝 추가 설정

### 개발 환경용 설정

```bash
# 개발용 Docker Compose 오버라이드
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

### 테스트 환경용 설정

```bash
# 테스트용 Docker Compose 오버라이드
docker-compose -f docker-compose.yml -f docker-compose.test.yml up
```
