# Angular-MySQL
## Prerequisitos
* [Docker](https://www.docker.com/)
* [NodeJS](https://nodejs.org/en/)
* [Angular](https://angular.io/cli)
## Descargar
```bash
git clone https://github.com/fabrv/angular-mysql.git
cd angular-mysql
```
## Cargar ambiente y levantar servicios
El shell script `buildnstart-images.sh` levanta los servicios, el script solo funciona en Linux y MacOS. Para ejectuar el script:
```bash
chmod +x buildnstart-images.sh
./buildnstart-images.sh
```

A continuación está una descripción paso a paso más detallada de como levantar los servicios.
### MySQL
**Para en Linux y MacOS**  
Entrar en directorio y construir la imagen.
```bash
cd mysql
docker build -t test-mysql .
```
Levantar imagen.  
```bash
docker run  -d \
--publish 3306:3306 \
--name=mysql-service test-mysql
```

**Para Windows**  
Por cuestiones de permisos la imagen de MySQL no funciona en Windows. La mejor alternativa es levantar una nueva base de datos [MySQL](https://dev.mysql.com/doc/mysql-getting-started/en/) con nombre `test` y contraseña `password` y cargar el *schema* `mysql/test-dump.sql`
### NodeJS
(Funciona en Windows, Linux y MacOS)
```bash
cd ../nodejs
docker build -t test-nodejs .
```
Entrar en directorio y construir la imagen.
```bash
docker run  -d \
--publish 4000:4000 \
-e MYSQL_USER='root' \
-e MYSQL_PASSWORD='password' \
-e MYSQL_DATABASE='test' \
-e MYSQL_HOST='172.17.0.2' \
--link mysql-service:db \
--name=test-nodejs-microservice test-nodejs
```

**Para Windows es necesario quitar la linea `--link mysql-service:db`**  

## Abrir
Verificar que los dos contenedores estén arriba.
```bash
docker ps
```

Con los dos contenedores arriba, el servicio es accesible desde `http://localhost:4000/`

## Creditos
- Código - Fabrizzio Rivera, [fabrv](https://github.com/fabrv)
- Dockerización - [varunon9](https://github.com/varunon9), [varunon9/getting-started-docker-mysql-nodejs](https://github.com/varunon9/getting-started-docker-mysql-nodejs)
