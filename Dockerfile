FROM node:18

WORKDIR /app

ENV NODE_OPTIONS=--openssl-legacy-provider
ENV BASE_API_URL=https://dacnpmbe8.azurewebsites.net
ENV API_Key=AIzaSyCsTsN2T8xfPUzV7-6RQNEHHcfxp2YdD6M
ENV GENERATE_SOURCEMAP=false

COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 19006
EXPOSE 8081

CMD npx expo start --dev-client --web 
