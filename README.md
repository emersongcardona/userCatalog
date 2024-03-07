# User Catalog API

This repository contains the backend API for a User Catalog application.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following software installed on your machine:

- Node.js (>=12.x)
- npm (>=6.x)
- Prisma CLI
- posgresql 

### Installing

1. Install dependencies:
   * run in terminal the command:   npm install

2. Create a database using prosgres to connect  with the app
   * database name: userCatalog_development
   * username: postgres
   * password: 2076
   * port: 5432
   ** or update  .env file with your own credentials

3. Database Migration
    * Before running the server, you need to perform database migration.
    * run in terminal the command:

4. Run server
    * run in terminal the command:  nodemon start or npm start

5. API Documentation
    * test manually and  access the API documentation at: http://localhost:3000/api-docs/ 


6. Run tests
    * run automated test 
    * run in terminal the command: npx jest
  
## Built With

- Node.js - JavaScript runtime
- Express - Web framework for Node.js
- Prisma - Database ORM
- posgresql - Relational database management system
- Jest - Testing framework
- Swagger UI Express - API documentation tool