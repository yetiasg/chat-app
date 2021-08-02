export default{
  // Auth section
  getUserId(state){
    if(!state.userId || !state.token || !state.refreshToken) return state.userId
    else return state.userId
  },
  getToken(state){
      if(!state.userId || !state.token || !state.refreshToken) return null
      else return state.token
  },
  isAuthenticated(state){
      return state.isAuth
  },
  getName(state){
    return state.name
  },

  getTokenExpiration(state){
    return state.expiresIn
  },

  // Chat section
  getUsersList: (state) => {
    return state.conversations;
  },

  getSelectedConversationId(state){
    return state.selectedConversationId;
  },

  getConversationById(state){
    const convId = state.selectedConversationId;
    return state.conversations.filter(conv => conv.conversationId === convId.toString());
  },

  getCurrentMessages(state){
    return state.currentMessages;
  },

  emailExists(state){
    return state.emailExists;
  }
}