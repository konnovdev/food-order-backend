# food-order-backend

### Stack
* node-js (with express)
* mariadb (soon will be added)

------------
### Running the project on a host machine
First install the needed dependencies:
```
npm ci
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
You can change the docker container port in **docker-compose.yml**, if you want it to be on port **80**, in the ports section write - `"80:80"`