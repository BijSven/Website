#? Strapi Dockerfile

FROM node:18

WORKDIR /usr/src/app

RUN npm install -g create-strapi-app
RUN npx create-strapi-app@latest strapi --quickstart --no-run

WORKDIR /usr/src/app/strapi

RUN npm install
RUN npm run build

EXPOSE 1337

CMD ["npm", "start"]