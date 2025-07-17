# Node.js 18 Alpine 이미지 사용 (가벼운 버전)
FROM node:18-alpine

# pnpm 설치
RUN npm install -g pnpm

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 pnpm-lock.yaml 복사
COPY package.json pnpm-lock.yaml* ./

# 의존성 설치
RUN pnpm install --prod

# 애플리케이션 소스 코드 복사
COPY . .

# 포트 3000 노출
EXPOSE 3000

# 환경 변수 설정
ENV NODE_ENV=production
ENV PORT=3000

# 애플리케이션 실행
CMD ["pnpm", "start"] 