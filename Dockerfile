FROM node:20-alpine

WORKDIR /app

# 先にpackage.jsonの差分を確認し、変化がない場合はnpm installをスキップ（効率化）
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]