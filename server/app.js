const express = require('express');
const app = express();
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const cartRouter = require('./routes/cartRoutes')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
app.use(morgan('dev'));

app.use(cors());
app.use(bodyParser.json());
app.use('/user',userRouter);
app.use('/product',productRouter)
app.use('/cart',cartRouter)
module.exports = app;