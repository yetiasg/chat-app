import router from '../router.js';
import config from '../config.js'

const getJSON = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error('Not registered or nvalid data');
  const data = await response.json();
  console.log(data)
  return data

};

let timer;

export default{
// Auth section
  login: async (context, payload) => {
    const {email, password} = payload;
    try{
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      }
      const resData = await getJSON(`${config.BASE_URL}/auth/login`, options)
      console.log(resData);
      const {token, refreshToken, userId, name} = resData;
      let expiresIn = resData.expiresIn*1000
      const expirationDate = new Date().getTime() + expiresIn;

      const userPayload = {
        name,
        token,
        refreshToken,
        userId,
        espiresIn: expirationDate
      }
      context.commit('setUserData', userPayload)
      localStorage.setItem('name', name);
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', userId);
      localStorage.setItem('expiresIn', expirationDate);

      timer = setTimeout(function(){
        context.dispatch('refreshAuth');
      }, expiresIn)

    }catch (error){
      router.replace('/auth')
    }
  },

  register: async(context, payload) => {
    const {firstName, lastName, email, password, repeatPassword} = payload;
    try{
      const options ={
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
      }
      const resData = await getJSON(`${config.BASE_URL}/auth/register`, options);

      const {token, refreshToken, userId, name} = resData;
      let expiresIn = resData.expiresIn*1000
      const expirationDate = new Date().getTime() + expiresIn;

      const userPayload = {
        name,
        token,
        refreshToken,
        userId,
        expiresIn: expirationDate
      }
      context.commit('setUserData', userPayload)
      localStorage.setItem('name', name);
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', userId);
      localStorage.setItem('expiresIn', expirationDate);
      
      timer = setTimeout(function(){
        context.dispatch('refreshAuth');
      }, expiresIn)
    }catch (error){
      router.replace('/auth')
    }
  },

  refreshAuth: async context => {
    const refToken = localStorage.getItem('refreshToken')
    if(refToken.length < 1) throw new Error('Unauthorized')
    try{
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refreshToken: refToken
        })
      }
      const resData = await getJSON(`${config.BASE_URL}/auth/refresh`, options);

      const {token, refreshToken, userId} = resData;
      let expiresIn = resData.expiresIn*1000
      const expirationDate = new Date().getTime() + expiresIn;
      
      const userPayload = {
        name: context.getters.getName,
        token,
        refreshToken,
        userId,
        expirationDate
      }
      
      context.commit('setUserData', userPayload)
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', userId);
      localStorage.setItem('expiresIn', expirationDate);

      timer = setTimeout(function(){
        context.dispatch('refreshAuth');
      }, expiresIn)

    }catch (error){
      context.dispatch('autoLogout')
      throw new Error('Unauthorized')
    }
  },

  tryLogin: (context) =>{
    const name = localStorage.getItem('name')
    const token = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refreshToken')
    const userId = localStorage.getItem('userId')
    let expiresIn = localStorage.getItem('expiresIn')

    expiresIn = +expiresIn - new Date().getTime()
    if(expiresIn < 0){
      return;
    }

    timer = setTimeout(function(){
      context.dispatch('refreshAuth');
    }, expiresIn)

    if(token.length > 0 && refreshToken.length > 0 && userId.length > 0 && name !== ''){
      const userPayload = {
        name,
        token,
        refreshToken,
        userId,
        expiresIn
      }
      context.commit('setUserData', userPayload)
    }else{
      context.dispatch('logout')
      router.replace('/auth')
      throw new Error('Unauthorized')
    }
  },

  logout: (context) => {
    context.commit('logout')
    localStorage.removeItem('name')
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('expiresIn');
    clearTimeout(timer);
    router.replace('/auth')
  },

  autoLogout(context){
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },



  // Chat section
  findUser: async (context, payload) => {
    this.state.response = {
      data: await getJSON(`${config.BASE_URL}addContact`, payload),
      context
    };
  },

  selectedConversationId(context, payload){
    context.commit('selectedConversationId', payload);
  },
}

