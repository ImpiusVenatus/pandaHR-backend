import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "This is the API documentation for our Node.js application.",
  },
  servers: [
    {
      url: "http://localhost:8000", // Replace with your server URL
      description: "Development server",
    },
  ],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Path to the API docs
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
