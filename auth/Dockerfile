# specify base image
FROM node:alpine
# set the working directory to /app in the container. All following commands will be issued relative to this directory 
WORKDIR /app
# copy over only package.json file
COPY package.json .
RUN npm install
# copy over all of our remaining source code
COPY . .
# set the command to run when the container starts up
CMD ["npm", "start"]