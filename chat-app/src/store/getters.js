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


  // Chat section
  getConversationById(state){
    const convId = state.selectedConversationId;
    return state.conversations.filter(conv => conv.conversationId === convId.toString());
  }
}
