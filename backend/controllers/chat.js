const createError = require('http-errors');
const { getDB } = require('../helpers/db-connection');
const { ObjectId } = require('mongodb');


exports.getConversationsList = async(req, res, next) =>{
  const {userId} = req.params;
  try{
    const db = await getDB();
    const usersCol = await db.collection('users');
    const [result] = await usersCol.find({"_id": new ObjectId(userId)}, {projection: {"conversations": 1 }}).toArray();
    if(!result) throw createError.NotFound("You have no conversations");
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
    // if(!result) throw createError.InternalServerError();
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
    if(!result) throw createError.NotFound("You do not have any conversations");
    res.status(200)
  }catch(error){
    next(error)
  }
}

exports.addNewContact = async (req, res, next) => {
  const {email, userId, userName} = req.body; //yetiasg //iwoId  //Iwo Dindas
  
  try{
    // Find if email exists in DB
    const db = await getDB();
    const usersCol = await db.collection('users');
    const {_id, firstName, lastName} = await usersCol.findOne({email: email}, {projection: {_id: 1, firstName: 1, lastName: 1}}); 
    if(!_id) throw createError.BadRequest();  


    // Check if the user is trying to add himself and check if users have existing conversation
    if(_id.toString() === userId.toString()) throw createError.BadRequest(); 
    const {conversations} = await usersCol.findOne({_id: new ObjectId(userId)}, {projection: {conversations: 1}}) 
    conversations.forEach(conv => {
      if(conv.user.userId.toString() === _id.toString()) throw createError.BadRequest();      
    });


    // Store new user data do create new conversation
    const userToAdd = {
      userId: _id, 
      userName: `${firstName} ${lastName}` 
    }


    // Create new convercation and fetch new ID
    const conversationsCol = await db.collection('conversations');
    const {insertedId} = await conversationsCol.insertOne({_id: new ObjectId(), lastMessage: '', messages: [], owners: [new ObjectId(userId), userToAdd.userId]});  
    if(!insertedId) throw createError.InternalServerError(); 


    //Add conversation ID to first user
    const result = await usersCol.updateOne(
      {_id: new ObjectId(userId)},
      {$push: {
        conversations: {
          id: new ObjectId(insertedId),
          user: { userId: userToAdd.userId, userName: userToAdd.userName },
          lastMessage: ''}}
        }
      );
    if(!result) throw createError.InternalServerError();


    // //Add conversation ID to second user
    const result1 = await usersCol.updateOne(
      {_id: userToAdd.userId},
      {$push: {
        conversations: {
          id: new ObjectId(insertedId),
          user: {userId: new ObjectId(userId), userName},
          lastMessage: ''}}
        }
      );
    if(!result1) throw createError.InternalServerError();


    res.status(200).json({emailExists: true});
  }catch (error){
    next(error);
  }finally{
    res.status(200).json({emailExists: false});
  }
}