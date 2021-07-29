import { createStore } from 'vuex';
import actions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js'


const store = createStore({
  state() {
    return {
      token: null,
      refreshToken: null,
      userId: '',
      isAuth: false,
      selectedConversationId: '',
      
      conversations: [
        {conversationId: '11', userName: 'Iwo Dindas', userId: 'a223423234', lastMessage: 'Jakaś ostatnia wiadomość...', messages: [
          {message: 'eloeloelo1', userId: 'a223423234', date: '1'},
          {message: 'no siema1', userId: '610311c5c9d6074b2884c0be', date: '2'},
          {message: 'co tam1 ', userId: 'a223423234', date: '3'},
          {message: 'a git1', userId: '610311c5c9d6074b2884c0be', date: '4'},
          ]
        },
        {conversationId: '23', userName: 'Michał Siwiec', userId: 'a323423234', lastMessage: 'Jakaś ostatnia wiadomość...', messages: [
          {message: 'eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2eloeloelo2', userId: 'a323423234', date: '1'},
          {message: 'no siema2', userId: '610311c5c9d6074b2884c0be', date: '2'},
          {message: 'no siema2', userId: '610311c5c9d6074b2884c0be', date: '2'},
          {message: 'no siema2', userId: '610311c5c9d6074b2884c0be', date: '2'},

          {message: 'co tam2 ', userId: 'a323423234', date: '3'},
          {message: 'a git2', userId: '610311c5c9d6074b2884c0be', date: '4'},
          ]
        },
        {conversationId: '83', userName: 'Mirosław Wierzbicki', userId: 'a123423234', lastMessage: 'Jakaś ostatnia wiadomość...', messages: [
          {message: 'eloeloelo3', userId: 'a123423234', date: '1'},
          {message: 'no siema3', userId: '610311c5c9d6074b2884c0be', date: '2'},
          {message: 'co tam3 ', userId: 'a123423234', date: '3'},
          {message: 'a git3', userId: '610311c5c9d6074b2884c0be', date: '4'},
          ]
        },
        {conversationId: '4', userName: 'Piotr Baloń', userId: 'a423423234', lastMessage: 'Jakaś ostatnia wiadomość...', messages: [
          {message: 'eloeloelo4', userId: 'a423423234', date: '1'},
          {message: 'no siema4', userId: '610311c5c9d6074b2884c0be', date: '2'},
          {message: 'co tam4 ', userId: 'a423423234', date: '3'},
          {message: 'a git4', userId: '610311c5c9d6074b2884c0be', date: '4'},
          ]
        }

      ]
    };
  },
  mutations,
  actions, 
  getters
});


export default store;
