const getJSON = async (url, body) => {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error();
  return await response.json();
};

export default{
// Auth section
  login: async (_, payload) => {
    const data = await getJSON('http://localhost:3000/auth/login', payload);
    console.log(data)
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

