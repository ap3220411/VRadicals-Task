
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API documentation for your Express backend',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Update with your server URL
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to your route files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
