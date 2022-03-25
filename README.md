# food-order-backend

### Stack
* node-js (with express)
* mariadb

------------
### Running the project on a host machine
First install the needed dependencies:
```
npm install express
npm install -D @types/express
npm install -D nodemon
```
Then use nodemon to run project (it will reload the application when the files change)
```
npm run serve
```

------------
### Running the project in a docker container
```
docker-compose up -d
```
You can change the docker container port in docker-compose.yml (the default is set to 4444)