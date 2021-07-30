const createError = require('http-errors');
const { getDB } = require('../helpers/db-connection');
const { ObjectId } = require('mongodb');
const config = require('../config');

// const conversations = [
//   {conversationId: '11', userName: 'Iwo Dindas', userId: 'a223423234', lastMessage: 'Jakaś ostatnia wiadomość...', messages: [
//     {message: 'eloeloelo1', userId: 'a223423234', date: '1'},
//     {message: 'no siema1', userId: '6103bc1a28043334704f455b', date: '2'},
//     {message: 'co tam1 ', userId: 'a223423234', date: '3'},
//     {message: 'a git1', userId: '6103bc1a28043334704f455b', date: '4'},
//     ]
//   },
//   {conversationId: '23', userName: 'Michał Siwiec', userId: 'a323423234', lastMessage: 'Jakaś ostatnia wiadomość...', messages: [
//     {message: 'eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2', userId: 'a323423234', date: '1'},
//     {message: 'no siema2', userId: '6103bc1a28043334704f455b', date: '2'},
//     {message: 'no siema2', userId: '6103bd3628043334704f455c', date: '2'},
//     {message: 'no siema2', userId: '6103bc1a28043334704f455b', date: '2'},

//     {message: 'co tam2 ', userId: 'a323423234', date: '3'},
//     {message: 'a git2', userId: '6103bc1a28043334704f455b', date: '4'},
//     ]
//   },
//   {conversationId: '83', userName: 'Mirosław Wierzbicki', userId: 'a123423234', lastMessage: 'Jakaś ostatnia wiadomość...', messages: [
//     {message: 'eloeloelo3', userId: 'a123423234', date: '1'},
//     {message: 'no siema3', userId: '6103bd3628043334704f455c', date: '2'},
//     {message: 'co tam3 ', userId: 'a123423234', date: '3'},
//     {message: 'a git3', userId: '6103bd3628043334704f455c', date: '4'},
//     ]
//   },
//   {conversationId: '4', userName: 'Piotr Baloń', userId: 'a423423234', lastMessage: 'Jakaś ostatnia wiadomość...', messages: [
//     {message: 'eloeloelo4', userId: 'a423423234', date: '1'},
//     {message: 'no siema4', userId: '6103bc1a28043334704f455b', date: '2'},
//     {message: 'co tam4 ', userId: 'a423423234', date: '3'},
//     {message: 'a git8', userId: '6103bc1a28043334704f455b', date: '4'},
//     ]
//   }
// ]

exports.getConversationsList = async(req, res, next) =>{
  const {userId} = req.params;
  const db = await getDB();
  const usersCol = await db.collection('users');
  const [result] = await usersCol.find({"_id": new ObjectId(userId)}, {projection: {"conversations": 1 }}).toArray();
  const conversations = result.conversations;
  const conversationsList = conversations.map(conv =>{
    return {
      conversationId: conv.id,
      userName: conv.user.userName,
      userId: conv.user.userIs,
      lastMessage: conv.lastMessage
    };
  })
  res.status(200).json(conversationsList);
}

exports.getMessagesById = async(req, res, next) =>{
  const {id} = req.params;
  const db = await getDB();
  const conversationsCol = await db.collection('conversations');
  const [result] = await conversationsCol.find({"_id": new ObjectId(id)}).toArray();
  res.status(200).json(result.messages)
}
