const swaggerAutogen = require('swagger-autogen')();


const doc = {
  info: {
    title: 'NoteProject Created with Nodejs and MongoDB-atlas',
    description: 'Notes Project is Created by nodejs and MongoDB-atlas'
  },
  host: 'notes-backend-app-production.up.railway.app',
   schemes: ['https'],
 
};

const outputFile = './swagger-output.json';
const routes = ["./Routes/usersRoute" ,"./Routes/notesRoute"];

swaggerAutogen(outputFile, routes, doc);