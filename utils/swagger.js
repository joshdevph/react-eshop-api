const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Eshop API',
    description: ''
  },
  host: 'localhost:4004'
};

const outputFile = './swagger-output.json';
const routes = ['./server.js'];


swaggerAutogen(outputFile, routes, doc);
