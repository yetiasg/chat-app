const router = require('express').Router();
const chatController = require('../controllers/chat');
const {verifyAccessToken} = require('../helpers/jwt_helpers');

router.get('/conversations/:userId', verifyAccessToken, chatController.getConversationsList);

router.get('/messagesById/:id', verifyAccessToken, chatController.getMessagesById);



module.exports = router;
