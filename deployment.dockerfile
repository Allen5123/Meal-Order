FROM node:20-alpine AS build
WORKDIR /app
COPY ./frontend2/package.json ./frontend2/
RUN cd ./frontend2 && npm install && cd ..
COPY ./frontend2 ./frontend2
RUN --mount=type=secret,id=env export $(cat /run/secrets/env | xargs) && cd ./frontend2/ && rm -rf ./build; npm run build

FROM  node:20-alpine AS final
ENV TZ="Asia/Taipei"
WORKDIR /app
RUN apk add --no-cache bash
COPY ./backend/package.json .
RUN npm install
COPY ./backend/ .
RUN rm -rf ./public
RUN mkdir ./public
COPY --from=build /app/frontend2/build/ ./public
EXPOSE 8081
CMD ["npm", "start"]