# 환경 변수 설정 가이드

## 빠른 설정

1. 프로젝트 루트에 `.env` 파일을 생성하세요:

```bash
cp env.example .env
```

2. `.env` 파일을 편집하여 API 서버 주소를 설정하세요:

```env
REACT_APP_API_URL=http://localhost:3000
```

## 환경별 설정

### 개발 환경

```env
REACT_APP_API_URL=http://localhost:3000
REACT_APP_ENV=development
```

### 프로덕션 환경

```env
REACT_APP_API_URL=https://your-api-server.com
REACT_APP_ENV=production
```

### 테스트 환경

```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_ENV=test
```

## 주의사항

- `REACT_APP_` 접두사가 붙은 환경 변수만 React 애플리케이션에서 접근할 수 있습니다.
- 환경 변수를 변경한 후에는 개발 서버를 재시작해야 합니다.
- `.env` 파일은 Git에 커밋되지 않습니다 (보안상의 이유로).
- 팀원들과 공유할 때는 `env.example` 파일을 사용하세요.

## 문제 해결

### 환경 변수가 적용되지 않는 경우

1. 개발 서버를 재시작하세요: `npm start`
2. 브라우저 캐시를 지우세요
3. `.env` 파일이 프로젝트 루트에 있는지 확인하세요

### API 서버 연결 오류

1. API 서버가 실행 중인지 확인하세요
2. `REACT_APP_API_URL`이 올바른 주소인지 확인하세요
3. 브라우저 개발자 도구의 콘솔에서 API URL을 확인하세요
