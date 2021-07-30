const createError = require('http-errors');
const morgan = require('morgan');
const express = require('express');
const config = require('./config');

const { initDB } = require('./helpers/db-connection');
const authRoutes = require('./router/auth');
const chatRoutes = require('./router/chat');

// const helmet = require('helmet');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
// app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use('/auth', authRoutes);
app.use(chatRoutes);

app.use(async (req, res, next) => {
  res.status(404).json('This route does not exist');
  next(createError.NotFound('This route does not exist'));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

initDB((err) => {
  const PORT = config.PORT || 3001;
  if (!err) {
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`);
    });
  } else {
    console.log(`Connection failed. err: ${err}`);
  }
});
