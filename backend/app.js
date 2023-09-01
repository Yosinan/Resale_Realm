require('express-async-errors');
const express = require("express");
// const cookieparser = require("cookie-parser");
const start = require('./database');
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const statusRouter = require("./routes/status");
const errorHandler = require('./middlewares/errorHandler').default;
const cors = require("cors");
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const app = express();

// start database connection
start();


app.use(express.static("static"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Sanitize user-supplied data against NoSQL injection attacks
app.use(xss());
// Clean user-supplied data to prevent cross-site scripting (XSS) attacks
app.use(mongoSanitize());

// Routes
app.use('/', userRouter);
app.use('/', productRouter);
app.use('/', statusRouter);

// Error handler
// app.use(errorHandler);

module.exports = app;
