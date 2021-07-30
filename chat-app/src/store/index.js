import { createStore } from 'vuex';
import actions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js'


const store = createStore({
  state() {
    return {
      name: null,
      token: null,
      refreshToken: null,
      userId: '',
      expiresIn: null,
      isAuth: false,
      selectedConversationId: '',
      didAutoLogout: false,
      
      conversations: [],
      currentMessages: []
    };
  },
  mutations,
  actions, 
  getters
});


export default store;
