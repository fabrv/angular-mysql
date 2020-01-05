# Angular-MySQL
## Prerequisitos
* [Docker](https://www.docker.com/)
* [NodeJS](https://nodejs.org/en/)
## Descargar
```bash
git clone https://github.com/fabrv/angular-mysql.git
cd angular-mysql
```
## Cargar ambiente
### MySQL
(Funcina en Linux y MacOS)  
Entrar en directorio y construir la imagen.
```bash
cd mysql
docker build -t test-mysql .
```
Esperar que se construya la imagen y abrirla.  
```bash
docker run  -d \
--publish 3306:3306 \
--name=mysql-service test-mysql
```
