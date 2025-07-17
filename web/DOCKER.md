# Docker 사용법

## 환경별 Docker Compose 파일

### 1. 프로덕션 환경 (docker-compose.yml)

```bash
# 애플리케이션 시작
docker-compose up

# 백그라운드에서 실행
docker-compose up -d

# 애플리케이션 중지
docker-compose down
```

### 2. 개발 환경 (docker-compose.dev.yml)

```bash
# 개발 서버 시작 (핫 리로드 지원)
docker-compose -f docker-compose.dev.yml up

# 백그라운드에서 실행
docker-compose -f docker-compose.dev.yml up -d

# 개발 서버 중지
docker-compose -f docker-compose.dev.yml down
```

### 3. 테스트 환경 (docker-compose.test.yml)

```bash
# 테스트 실행
docker-compose -f docker-compose.test.yml up

# 테스트 실행 후 컨테이너 제거
docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

## 개별 Docker 명령어

### 1. Docker 이미지 빌드

```bash
# 프로덕션 이미지
docker build -t web-app .

# 개발 이미지
docker build -f Dockerfile.dev -t web-app-dev .
```

### 2. Docker 컨테이너 실행

```bash
# 프로덕션 컨테이너
docker run -p 3000:80 web-app

# 개발 컨테이너
docker run -p 3000:3000 -v $(pwd)/src:/app/src web-app-dev
```

## 접속 방법

- **프로덕션**: `http://localhost:3000`
- **개발**: `http://localhost:3000` (핫 리로드 지원)

## 환경별 특징

### 프로덕션 환경

- nginx를 사용한 정적 파일 서빙
- 최적화된 빌드
- 헬스체크 포함

### 개발 환경

- 핫 리로드 지원
- 소스 코드 볼륨 마운트
- 개발 의존성 포함

### 테스트 환경

- 테스트 실행 및 커버리지 생성
- 테스트 결과를 호스트에 마운트

## 환경 변수

필요한 환경 변수가 있다면 `.env` 파일을 생성하거나 각 `docker-compose.yml` 파일의 `environment` 섹션에 추가하세요.

## 유용한 명령어

```bash
# 로그 확인
docker-compose logs -f

# 컨테이너 내부 접속
docker-compose exec web sh

# 이미지 및 컨테이너 정리
docker system prune -a
```
