const express = require("express");
const app = express();
const cors = require("cors");
const db= require('./config/db')
const userRouter = require('./routers/userRouter')
const adminRouter = require('./routers/adminRouter')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

//read env file
dotenv.config()



app.use(express.json()); // parse anything that comes into json
app.use(cookieParser());

//connect to react 
app.use(cors({
  origin:["http://localhost:3000"]
}));

db.dbConnect(process.env.MONGODB_URL);

app.use('/',userRouter)
app.use('/admin',adminRouter)







app.listen(1337, () => {
  console.log("server is running @ 1337");
});
