ARG NODE_VERSION

FROM node:${NODE_VERSION}

RUN npm i -g pnpm@8.11.0 @nestjs/cli pkg

WORKDIR /app

# 如果 package.json 更動以下重 build
COPY package.json ./

# COPY . ./

RUN pnpm install

RUN pnpm config set store-dir /root/.local/share/pnpm/store/v3 --global
# 如果 package.json 未更動, 只有改 code 以下重 build 避免重裝pnpm install
COPY . ./

CMD ["pnpm", "start:debug"]