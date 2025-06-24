# todo-frontend/Dockerfile
FROM node:18

# Set thư mục làm việc
WORKDIR /app

# Copy các file cấu hình và mã nguồn
COPY . .

RUN npm install --save-dev rollup

# Cài dependencies
RUN npm install

# Build production
RUN npm run build

# Serve frontend (nếu muốn)
# Có thể dùng serve hoặc chuyển sang Nginx nếu production
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
