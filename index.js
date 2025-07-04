const express = require("express")
const PORT= process.env.PORT || 8000
const app =express()
const {connectDB} =require("./config")
const notesRouter = require("./Routes/notesRoute")
const userRouter = require("./Routes/usersRoute")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const path= require("path")


/// connectivity
connectDB(process.env.mongoDb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('MongoDB Connected!')).catch((error) => console.log("Error" , error));
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

//middlewears
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//routes
app.use("/",userRouter)
app.use("/",notesRouter)

app.listen(PORT ,() =>{console.log(`Server connected on the Port ${PORT}`)})