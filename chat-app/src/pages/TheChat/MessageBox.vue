<template>
  <div class="container">
    <div class="messageBox">
      <div class="contactName">
        <p>Iwo Dindas</p>
      </div>
      <div class="messageInput">
        <input
          type="text"
          name="message"
          v-model="message"
          placeholder="Type some message"
        />
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
      message: '',
    };
  },
  methods: {
    submitMessage() {
      console.log(this.message);
      this.message = '';
    },
  },
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

.messageInput input {
  flex-grow: 1;
  margin: 0.5rem 1.6rem;
  border: none;
  border-radius: 10px;
  height: 2.5rem;
  background-color: #474747;
  padding: 0 0 0 0.5rem;
  color: white;
  outline: none;
}
</style>
