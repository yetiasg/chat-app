export default{
  // Auth section
  setUserData(state, payload){
    state.token = payload.token
    state.refreshToken = payload.refreshToken
    state.userId = payload.userId
    state.isAuth = true
  },

  logout(state){
    state.token = null
    state.refreshToken = null
    state.userId = null
    state.isAuth = false
  },

  // Chat section
  selectedConversationId(state, payload){
    state.selectedConversationId = payload;
  },
}