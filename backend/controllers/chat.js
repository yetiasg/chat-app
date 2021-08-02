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
//   }
// ]

exports.getConversationsList = async(req, res, next) =>{
  const {userId} = req.params;
  try{
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
  }catch(error){
    next(error);
  }
}

exports.getMessagesById = async(req, res, next) =>{
  const {id} = req.params;
  try{
    const db = await getDB();
    const conversationsCol = await db.collection('conversations');
    const [result] = await conversationsCol.find({"_id": new ObjectId(id)}).toArray();
    res.status(200).json(result.messages)
  }catch(error){
    next(error);
  }
}

exports.saveNewMessage = async(req, res, next) =>{
  const {message, date, userId, conversationId} = req.body;
  const payload = {message, userId, date};
  try{
    const db = await getDB();
    const conversationsCol = await db.collection('conversations');
    const result = await conversationsCol.updateOne({_id: new ObjectId(conversationId)}, {$push: {messages: payload}});
    if(!result) throw createError.InternalServerError();
    res.status(200)
  }catch(error){
    next(error)
  }
}

exports.addNewContact = async (req, res, next) => {
  const {email, userId, userName} = req.body;
  
  try{
    // Find if email exists in DB
    const db = await getDB();
    const usersCol = await db.collection('users');
    const {_id, firstName, lastName} = await usersCol.findOne({email: email}, {projection: {_id: 1, firstName: 1, lastName: 1}})
    if(!_id) res.status(200).json({emailExists: false});

    // Store new user data do create new conversation
    const userToAdd = {
      userId: _id,
      userName: `${firstName} ${lastName}`
    }

    // Create new convercation and fetch new ID
    const conversationsCol = await db.collection('conversations');
    const convsResult = await conversationsCol.insertOne({_id: new ObjectId(), lastMessage: '', messages: [], owners: [new ObjectId(userId), userToAdd.userId]});
    const newConversationId = convsResult.insertedId

    //Add conversation ID to firs user
    const result = await usersCol.updateOne({_id: new ObjectId(userId)}, {$push: {conversations: {id: new ObjectId(newConversationId), user: {userId: userToAdd.userId, userName: userToAdd.userName}, lastMessage: ''}}});
    if(!result) throw createError.InternalServerError();

    // //Add conversation ID to second user
    const result1 = await usersCol.updateOne({_id: userToAdd.userId}, {$push: {conversations: {id: new ObjectId(newConversationId), user: {userId: new ObjectId(userId), userName}, lastMessage: ''}}});
    if(!result1) throw createError.InternalServerError();

    

    res.status(200).json({emailExists: true});
  }catch (error){
    next(error);
  }
}