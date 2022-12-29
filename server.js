const express = require("express");
const envFile = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const request = require("request");
const http  = require("http")
const cors = require('cors');

const connectDB = require('./server/database/connection')

envFile.config({path:"config.env"});

const app = express();
const PORT = process.env.PORT || 8080;

//mongoDB connection~
connectDB();

// to log request
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

//parse request to body-parser
app.use(bodyParser.urlencoded({extended:true}))

//set view
app.set("view engine","ejs");

//load router file
app.use('/',require('./server/routes/router'))


app.listen(PORT,()=>{console.log('Server runnning on http://localhost:'+PORT)});
