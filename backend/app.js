const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const authRouter = require('./router/auth/auth');
const { initDB } = require('./helpers/db-connection');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/auth', authRouter);

initDB((err) => {
  if (!err) {
    app.listen(process.env.PORT | 3000, () => {
      console.log(`Listening on port: ${process.env.PORT}`);
    });
  }
});
