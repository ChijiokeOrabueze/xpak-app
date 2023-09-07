FROM node:18.12.1-slim
WORKDIR /app
COPY package.json /app/
COPY yarn.lock /app/
RUN yarn install --include=dev
COPY . /app/
EXPOSE 5173
CMD ["yarn", "dev"]