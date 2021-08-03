const createError = require('http-errors');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const config = require('./config');
const helmet = require('helmet');
const {createServer} = require('http');

const { initDB } = require('./helpers/db-connection');
const authRoutes = require('./router/auth');
const chatRoutes = require('./router/chat');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


const server = createServer(app);
const io = require('socket.io')(server, { cors:{ origin: "*" }});


io.on("connection", socket =>{

  socket.on("join room", selectedConvId => {
    socket.join(selectedConvId);
    io.to(selectedConvId).emit("selected conversation", selectedConvId);
  });

  socket.on("message", content => {
    console.log(content)
    io.to(content.conversationId).emit("message", content);
  });
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
    server.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`);
    });
  } else {
    console.log(`Connection failed. err: ${err}`);
  }
});