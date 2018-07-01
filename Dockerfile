FROM node:alpine  
WORKDIR /app
COPY . .
#COPY package.json .
#COPY ./app.js .
#COPY ./public ./public
#COPY ./routes ./routes
RUN npm install 
EXPOSE 3000 
ENTRYPOINT ["npm", "start"]
