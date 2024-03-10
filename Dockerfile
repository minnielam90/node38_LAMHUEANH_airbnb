# B1: build môi trường nodejs trong docker
# FROM --platform=linux/amd64 node:20.11.0 as build-stage
FROM node:20 as build-stage

# B2: tạo folder BE
WORKDIR /app

# B3: copy file package.json và package-lock.json vào image
COPY package*.json ./

# B3.1: copy folder prisma vào folder prisma trong image
COPY prisma ./prisma/

# B3.2: copy source code vào trong image
COPY . .

# B4: run npm install
RUN yarn install

# B5: expose port cho bên ngoài connect tới
EXPOSE 3000

# B6: start server trong image
CMD ["yarn", "start:dev"]


# câu lệnh chạy

# build docker image
# docker build -t node38_airbnb .

# build docker container
# docker run -d -p 3001:3000 --name node38_airbnb node38_airbnb
