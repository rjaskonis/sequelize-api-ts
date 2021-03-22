# sequelize-api-ts
API for CRUD operations built using Node.JS sequelize with typescript following Clean Architecture principles
#
## Technologies
* [Node.JS](https://nodejs.org/)
* [Sequelize](https://sequelize.org/)
* [SQLite](https://www.sqlite.org/)
* [Docker](https://www.docker.com/)
#
## Getting started using Docker & Docker compose
1. Install docker & docker-compose
2. Navigate to project folder
3. Run `npm run start:docker`
4. Now you can access the APIs endpoints running on `http://127.0.0.1:3003/` 
### Available endpoints:
* /api/products
* /api/products/:id
* /api/orders
* /api/orders/:id
# 
## Database location
To set a local SQLite database, edit `docker-compose.yml` mapping the local folder to `/app/database` (which is where it's stored in the container)
#

