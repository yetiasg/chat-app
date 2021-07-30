import router from '../router.js';
const getJSON = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error();
  return await response.json();
};

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
      const resData = await getJSON('http://localhost:3000/auth/login', options)

      const {token, refreshToken, userId} = resData;
      const userPayload = {
        token: token,
        refreshToken: refreshToken,
        userId: userId
      }
      context.commit('setUserData', userPayload)
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', userId);
    }catch (error){
      console.log(error)
    }
  },

  async register(context, payload){
    const {firstName, lastName, email, password, passwordRepeat} = payload;
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
          repeatPassword: passwordRepeat
        })
      }
      const resData = await getJSON('http://localhost:3000/auth/register', options);

      const {token, refreshToken, userId} = resData;
      const userPayload = {
        token: token,
        refreshToken: refreshToken,
        userId: userId
      }
      context.commit('setUserData', userPayload)
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('userId', userId)
    }catch (error){
      console.log(error.message)
    }
  },

  async refreshAuth(context){
    const refreshToken = localStorage.getItem('refreshToken')
    if(refreshToken.length < 1) throw new Error('Unauthorized')
    try{
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refToken: refreshToken
        })
      }
      const resData = await getJSON('http://localhost:3000/auth/refresh', options);

      const {token, refreshToken, userId} = resData;
      const userPayload = {
        token: token,
        refreshToken: refreshToken,
        userId: userId
      }
        
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('userId', userId)
      context.commit('setUserData', userPayload)
    }catch (error){
      if(error.status === 401){
        context.dispatch('logout')
        router.replace('/auth')
      }
    }
  },
  tryLogin(context){
    const token = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refreshToken')
    const userId = localStorage.getItem('userId')
    if(token.length > 0 && refreshToken.length > 0 && userId.length > 0){
      const userPayload = {
        token,
        refreshToken,
        userId
      }
      context.commit('setUserData', userPayload)
    }else{
      context.dispatch('logout')
      router.replace('/auth')
      throw new Error('Unauthorized')
    }
  },
  logout(context){
    context.commit('logout')
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userId')
  },



  // Chat section
  findUser: async (context, payload) => {
    this.state.response = {
      data: await getJSON('http://localhost:3000/addContact', payload),
      context
    };
  },

  selectedConversationId(context, payload){
    context.commit('selectedConversationId', payload);
  },
}

