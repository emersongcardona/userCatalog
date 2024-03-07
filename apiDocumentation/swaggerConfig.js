const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "API User Catalog",
      version: "1.0.0",
      description:
        `Api to handler a CRUD for table Users, with JWT Authentication. \n
         Test Master user is generated first time run server \n
         email: testapi@gmail.com        password: TestApi1! \n
         login using testapi user to get a json web token, then insert the token in authorize bottom
        `
    },
    components: {
      securitySchemes: {
        Authorization: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          value: "Bearer <JWT token here>",
        },
      },
    },
    tags: [
      {
        name: "users",
        description: "Endpoints related to users",
      },
      {
        name: "login",
        description: "Endpoints related to authentication / log in",
      },
    ],
  },
  apis: ["./v1/routes/users.js", "./routes/auth.js"]
};

const specs = swaggerJsdoc(options);

module.exports = specs;
