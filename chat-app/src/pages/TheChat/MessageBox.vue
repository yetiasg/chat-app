<template>
  <div class="container">
    <div class="messageBox">
      <div class="contactName">
        <p>{{getConversationData.userName}}</p>
      </div>
      <div class="output">
        <ul>
          <li v-for="msg of getMessages" :key="msg.date" :class="msg.userId === getUserId ? 'right' : 'left'">
            <p>{{msg.message}}</p>
          </li>
        </ul>
      </div>
      <div class="messageInput">
        <form @submit.prevent>
          <input
          type="text"
          name="message"
          v-model="message"
          placeholder="Type some message"/>
        </form>
        <base-button mode="submitMessage" @click="submitMessage"
          >Send</base-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: ''
    };
  },

  methods: {
    submitMessage() {
      console.log(this.message);
      this.message = '';
    },
    fetchConversationData(){
      this.messages = this.getConversationData()
    }
  },

  computed:{
    getConversationData(){
      return this.$store.getters.getConversationById.length > 0 ? this.$store.getters.getConversationById[0] : '';
    },

    getUserId(){
      return this.$store.getters.getUserId;
    },
    getMessages(){
      return this.$store.getters.getCurrentMessages
    }
  }

};
</script>

<style scoped>
.container {
  min-width: 30rem;
  min-height: 40rem;
  max-width: 60rem;
  max-height: 55rem;
  background-color: hsl(0, 0%, 10%);
  border-radius: 0 10px 10px 0;
}

.messageBox {
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.contactName {
  width: 100%;
  height: 3.5rem;
  background-color: hsl(0, 0%, 10%);
  color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0 10px 0 0;
}

.contactName p {
  margin: 1rem 1.3rem;
  font-size: 18px;
}

.messageInput {
  width: 100%;
  height: 4rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

form{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.messageInput input {
  flex-grow: 1;
  margin: 1.5rem 1.6rem;
  border: none;
  border-radius: 10px;
  height: 2.5rem;
  background-color: #474747;
  padding: 0 0 0 0.8rem;
  color: white;
  outline: none;
  font-size: 14px;
}

.output{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 1rem;
}

ul{
  box-sizing: border-box;
  width:100%;
  display: flex;
  flex-direction: column;
}

li{
  list-style-type: none;
  margin: 0.15rem;
  display: flex;
  align-items: center;
}

li.left{
  justify-content: flex-start;
}

li.left p{
  background-color: rebeccapurple;
}

li.right{
  justify-content: flex-end;
}

li.right p{
  /* border: 1px solid rebeccapurple; */
  background-color:hsl(0, 0%, 22%)
}

li p{
  padding:0.7rem 1rem;
  border-radius: 15px;
  word-wrap: break-word;
  word-break: break-all;
  font-size: 12px;
  max-width: 15rem;
}
</style>
