export default{

  getUserId(state){
    return state.userId;
  },

  getUsersList: (state) => {
    return state.conversations;
  },

  getSelectedConversationId(state){
    return state.selectedConversationId;
  },

  getConversationById(state){
    const convId = state.selectedConversationId;
    return state.conversations.filter(conv => conv.conversationId.toString() === convId.toString());

  }
}