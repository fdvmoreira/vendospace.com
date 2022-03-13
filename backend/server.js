const express = require("express");
require("colors");
const { listen } = require("express/lib/application");
const req = require("express/lib/request");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

// database connection
//require('./config/db')();

// parse the incoming request and respost to json format
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// use custom error handler 'errorHandler' middleware
app.use(require('./middlewares/errorHandler'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`.bold.cyan.underline));