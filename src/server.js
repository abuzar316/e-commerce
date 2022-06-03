const database = require("./database/connection");
const express = require("express");
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session')

// import routes
const masterRoute = require('./routes/masterRoute');
const logeddin = require('./middleware/logeddin');

// cell database connection
database();

// env file config
dotenv.config();

// run express
const app = express();
const port = process.env.PORT || 4000;

// set template engine
app.set('view engine', 'ejs');

// set template engine path
app.set('views', path.join(__dirname, 'views'));
const static_path = path.join(__dirname, './public');

// use middleware
app.use(session({
    secret: 'secret'
}));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(static_path));
app.use(logeddin);

// use master Route
app.use(masterRoute);

app.listen(port, () => console.log(`Server is Running on Port ${port}`));