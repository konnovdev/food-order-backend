# food-order-backend - a node.js server for a food ordering software

### Tech Stack
* express 
* graphql
* supertest
* mariadb

------------

### Pre setup
1) Create a **.env** file and set the DB credentials and tappaysdk token (see **.env_example** as a reference)
2) Fill DB with data (see sample data in **db/data/queries**)
If you're running docker it's done like this:
* `docker exec -it containerId /bin/bash` (**containerId** can be obtained from `docker ps` after you ran your project with `docker-compose up`, you need the **containerId** of maria db!)
* `cd var/lib/mysql/queries`
* `mysql -h localhost -u someuser -p < createTable.sql`
* `mysql -h localhost -u someuser -p < insertItem.sql`
* `mysql -h localhost -u someuser -p < insertOrder.sql`
* `mysql -h localhost -u someuser -p < orderItemInfo.sql`
* `mysql -h localhost -u someuser -p < orderItem.sql`
* `mysql -h localhost -u someuser -p < comment.sql`
* `mysql -h localhost -u someuser -p < itemComment.sql`

Also make sure your database is running with utf8mb4 encoding, otherwise Chinese will not render, an SQL command to check the encoding is:
```show variables like 'char%'; show variables like 'collation%';```
The encoding for the docker container of the database is set up in **db/Dockerfile** file
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