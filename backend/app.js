const express = require('express');
const cookie_parser = require('cookie-parser');
const errorMiddleware = require('./middleware/error');
const app = express();
app.use(express.json());
app.use(cookie_parser())
const product = require('./routes/productRoute');
const user = require('./routes/userRoute')
const order = require('./routes/orderRoute');
app.use("/api/v1",user)
app.use("/api/v1",product)
app.use("/api/v1",order);
app.use(errorMiddleware) 
module.exports = app;
