const express = require("express");
require("colors");
const { listen } = require("express/lib/application");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`.bold.cyan.underline));