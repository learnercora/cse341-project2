const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE341 Project2 API',
    description: 'CSE341 Project2 API',
  },
  host: 'cse341-project2-fi1e.onrender.com', //'localhost:8080',
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./server.js');
// });