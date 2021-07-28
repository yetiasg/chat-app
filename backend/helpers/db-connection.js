const { MongoClient, ObjectId } = require('mongodb');
const createError = require('http-errors');

let _db;

const initDB = async (callback) => {
  if (_db) callback(null, _db);
  const client = new MongoClient(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    _db = client.db('chatDB');
    callback(null, _db);
  } catch (error) {
    callback(error);
  }
};

const getDB = () => {
  if (!_db) createError.InternalServerError('Db not connected');
  return _db;
};

module.exports = {
  initDB,
  getDB,
};
