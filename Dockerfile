# First specify the base image
FROM node:18

# Then create directiory to hold app code inside the image
# will be the working directory
WORKDIR /usr/src/app

# install app dependencies using npm
COPY package*.json ./
RUN npm install

# copy actual application code to container
COPY . .

# Expose port 3001
EXPOSE 3001

CMD [ "node", "index.js" ]
