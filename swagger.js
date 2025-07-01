const swaggerAutogen = require('swagger-autogen')();


const doc = {
  info: {
    title: 'NoteProject',
    description: 'Notes Project is Created by nodejs'
  },
  host: 'notes-backend-app-production.up.railway.app',
   schemes: ['https'],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [{
    bearerAuth: []
  }]
};

const outputFile = './swagger-output.json';
const routes = ["./Routes/usersRoute" ,"./Routes/notesRoute"];

swaggerAutogen(outputFile, routes, doc);