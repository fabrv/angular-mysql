cd mysql
docker build -t test-mysql .
docker run  -d --publish 3306:3306 --name=mysql-service test-mysql
cd ../nodejs
docker docker build -t test-nodejs .
docker run  -d --publish 4000:4000 -e MYSQL_USER='root' -e MYSQL_PASSWORD='password' -e MYSQL_DATABASE='test' -e MYSQL_HOST='172.17.0.2' --link mysql-service:db --name=test-nodejs-microservice test-nodejs
