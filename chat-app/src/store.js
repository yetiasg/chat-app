import { createStore } from 'vuex';

const getJSON = async (url, body) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer 123123cdd12',
      Accept: 'application/json',
    },
    body,
  });
  if (!response.ok) throw new Error();
  return await response.json();
};

const store = createStore({
  state() {
    return {
      users: [
        { name: 'Iwo Dindas', lastMessage: 'Jakaś ostatnia wiadomość...' },
        { name: 'Michał Siewiec', lastMessage: 'Jakaś ostatnia wiadomość...' },
        {
          name: 'Mirosław Wierzbicki',
          lastMessage: 'Jakaś ostatnia wiadomość...',
        },
        { name: 'Piotr Baloń', lastMessage: 'Jakaś ostatnia wiadomość...' },
      ],
      response: [],
    };
  },
  mutations: {},
  actions: {
    findUser: async (context, payload) => {
      this.state.response = {
        data: await getJSON('http://localhost:3000/addContact'),
        context,
        payload,
      };
    },
  },
  getters: {
    getUsersList: (state) => {
      return state.users;
    },
  },
});

export default store;
