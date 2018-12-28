# define from what image we want to build from
FROM node:10

# create a directory to hold the application code inside the image, 
# this will be the working directory for your application
WORKDIR /Users/hannah/Programs/Codesmith/Fellowship/Climber/

# Install app dependencies
# Rather than copying the entire working directory, we are only copying the package.json file. 
# This allows us to take advantage of cached Docker layers
COPY package*.json ./

RUN npm install

# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# Your app binds to port 8080 so you'll use the EXPOSE instruction to have it mapped 
# by the docker daemon:
EXPOSE 8080

# define the command to run your app using CMD which defines your runtime
CMD [ "npm", "start" ]