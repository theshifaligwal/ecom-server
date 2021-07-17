require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser =  require("cookie-parser");
const cors = require("cors");


// my routes 
const authRoute = require("./routers/auth");
const userRoute = require("./routers/user");
const categoryRoute = require("./routers/category");
const productRoute = require("./routers/product");

// database connection
const mongoose = require("mongoose");


mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
}).then(() => {
    console.log("DB connected")
});


// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


// My Routes
app.use("/api", authRoute);
app.use("/api" , userRoute);
app.use("/api" , categoryRoute);
app.use("/api" , productRoute);


// port
const port = process.env.PORT || 8000;


// starting server
app.listen(port, () => {
  console.log(`Server is up and running at ${port}....`);
});