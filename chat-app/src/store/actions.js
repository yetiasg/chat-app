import router from '../router.js';
import config from '../config.js'
import socket from '../socket.js'


// helpers----------------------------------------------
const getJSON = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(response.message);
  const data = await response.json();
  return data;
};

const expirationTime = (time) => {
  return time * 1000 * 60 * 60;
}
//------------------------------------------------------

let timer;

export default{
// Auth section
  login: async (context, payload) => {
    const {email, password} = payload;
    try{
      const resData = await getJSON(`${config.BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      const {token, refreshToken, userId, name} = resData;
      let expiresIn = expirationTime(resData.expiresIn);
      const expirationDate = new Date().getTime() + expiresIn;

      const userPayload = {
        name,
        token,
        refreshToken,
        userId,
        espiresIn: expirationDate
      }

      context.commit('setUserData', userPayload);
      localStorage.setItem('name', name);
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', userId);
      localStorage.setItem('expiresIn', expirationDate);

      context.dispatch('getConversationsList');

      timer = setTimeout(function(){
        context.dispatch('refreshAuth');
      }, expiresIn);

    }catch (error){
      console.log(error.message)
    }
  },

  register: async(context, payload) => {
    const {firstName, lastName, email, password, repeatPassword} = payload;

    try{
      const resData = await getJSON(`${config.BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          repeatPassword: repeatPassword
        })
      });

      const {token, refreshToken, userId, name} = resData;
      let expiresIn = expirationTime(resData.expiresIn);
      const expirationDate = new Date().getTime() + expiresIn;

      const userPayload = {
        name,
        token,
        refreshToken,
        userId,
        expiresIn: expirationDate
      }

      context.commit('setUserData', userPayload);
      localStorage.setItem('name', name);
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', userId);
      localStorage.setItem('expiresIn', expirationDate);

      context.dispatch('getConversationsList');
      
      timer = setTimeout(function(){
        context.dispatch('refreshAuth');
      }, expiresIn);

    }catch (error){
      console.log("Can not register now")
    }
  },

  refreshAuth: async context => {
    const refToken = localStorage.getItem('refreshToken')
    if(refToken.length < 1) throw new Error('Unauthorized')

    try{
      const resData = await getJSON(`${config.BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refreshToken: refToken
        })
      });

      const {token, refreshToken, userId} = resData;
      let expiresIn = expirationTime(resData.expiresIn);
      const expirationDate = new Date().getTime() + expiresIn;
      
      const userPayload = {
        name: context.state.name,
        token,
        refreshToken,
        userId,
        expirationDate
      }
      
      context.commit('setUserData', userPayload);
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', userId);
      localStorage.setItem('expiresIn', expirationDate);

      context.dispatch('getConversationsList');

      timer = setTimeout(function(){
        context.dispatch('refreshAuth');
      }, expiresIn);

    }catch (error){
      context.dispatch('autoLogout');
    }
  },

  tryLogin: (context) =>{
    const name = localStorage.getItem('name');
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    const userId = localStorage.getItem('userId');
    let expiresIn = localStorage.getItem('expiresIn');

    expiresIn = +expiresIn - new Date().getTime();
    if(expiresIn < 0){
      return;
    }

    timer = setTimeout(function(){
      context.dispatch('refreshAuth');
    }, expiresIn);

    if(token.length > 0 && refreshToken.length > 0 && userId.length > 0 && name !== ''){
      const userPayload = {
        name,
        token,
        refreshToken,
        userId,
        expiresIn
      }
      context.commit('setUserData', userPayload);
      context.dispatch('getConversationsList');
    }else{
      context.dispatch('logout');
    }
  },

  logout: (context) => {
    context.commit('logout');
    context.commit('clearMessages');
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiresIn');
    clearTimeout(timer);
    router.replace('/auth');
  },

  autoLogout: (context) => {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },


// Chat section

  selectedConversationId(context, payload){
    socket.emit("join room", payload);
    context.commit('selectedConversationId', payload);
  },

  getConversationsList: async(context) => {
    try{
      const userId = context.state.userId;
      const token = context.state.token;


      const resData = await getJSON(`${config.BASE_URL}/conversations/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      context.commit('saveConversations', resData);
    }catch(error){
      console.log("You have no conversations");
    }
  },

  getMessagesById: async(context, payload) =>{
    try{
      const token = context.state.token;
      const id = payload; 
      const resData = await getJSON(`${config.BASE_URL}/messagesById/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      context.commit('saveMessages', resData) ;
    }catch(error){
      console.log(error);
    }
  },

  saveReceivedMessage: (context, payload) => {
    context.commit('sendMessage', payload)
  },

  sendMessage: async(context, payload) =>{
    try{
      socket.emit("message", payload);

      const token = context.state.token;
      await getJSON(`${config.BASE_URL}/saveNewMessage`, {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
      })
    }catch(error){
      console.log(error);
    }
  },

  findUser: async (context, payload) => {
    try{
      const {email} = payload
      const userId = context.state.userId;
      const token = context.state.token;

      const resData = await getJSON(`${config.BASE_URL}/addNewContact`, {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({email, userId, userName: context.state.name})
      })
      context.dispatch('getConversationsList');
      context.commit('emailExists', resData.emailExists);
    }catch(error){
      console.log(error);
    }
  },
}

