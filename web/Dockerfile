# Build stage
FROM node:18-alpine as build

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci

# 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# Build argument for API URL
ARG REACT_APP_API_URL=http://localhost:3000

# Set environment variable for build
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Production stage
FROM nginx:alpine

# nginx 설정 파일 복사 (필요시 커스터마이징 가능)
COPY --from=build /app/build /usr/share/nginx/html

# nginx 설정 파일 (기본 설정 사용)
# 필요시 별도의 nginx.conf 파일을 생성하여 복사할 수 있습니다

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 포트 80 노출
EXPOSE 80

# nginx 시작
CMD ["nginx", "-g", "daemon off;"] 