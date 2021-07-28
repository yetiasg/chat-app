const createError = require('http-errors');
const { getDB } = require('../../helpers/db-connection');

exports.login = async (req, res) => {
  const db = await getDB();
  const collection = await db.collection('users');
  const { insertedId } = await collection.insertOne({
    name: 'Iwo Dindas',
    lastMessage: 'Jakaś tam wiadomość....',
    email: 'iwodino@gmail.com',
    password: '123456789',
  });
  res.status(200).json({ insertedId });
};
