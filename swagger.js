const swaggerAutogen = require('swagger-autogen')();


const doc = {
  info: {
    title: 'NoteProject',
    description: 'Notes Project is Created by nodejs'
  },
  host: 'localhost:8000'
};

const outputFile = './swagger-output.json';
const routes = ["./Routes/usersRoute" ,"./Routes/notesRoute"];

swaggerAutogen(outputFile, routes, doc);