import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      message: 'Hola from vuex store',
    };
  },
  mutations: {},
  actions: {},
  getters: {},
});

export default store;
