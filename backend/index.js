const express = require('express');
const http = require('http');
const createError = require('http-errors');
const socketio = require('socket.io');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const httpServer = http.createServer(app);

const io = socketio(httpServer, {});

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Chat app' });
});

httpServer.listen(process.env.PORT | 3000, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});
