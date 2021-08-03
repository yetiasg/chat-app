<template>
  <div>
    <p>Add new contact</p>
    <p class="notExists" v-if="!emailExists">Can not add yourself or email does not exist in database</p>
    <form @submit.prevent>
      <input
        type="email"
        name="addContact"
        placeholder="type an email"
        v-model.trim="email"
      />
      <base-button mode="addToContactBtn" @click="findUser">Add</base-button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
    };
  },
  methods: {
    findUser() {
      if (!this.email.includes('@') || this.email === '') return;
      this.$store.dispatch('findUser', { email: this.email });
      this.email = '';
    },
  },
  computed: {
    emailExists(){
      return this.$store.state.emailExists;
    }
  }
};
</script>

<style scoped>
div {
  width: 100%;
  margin: 1rem 0 2rem 0;
}

form {
  display: flex;
  justify-content: center;
  align-items: center;
}

form input {
  width: 100%;
  height: 2.4rem;
  background-color: hsl(0, 0%, 10%);
  color: white;
  border: none;
  border-radius: 10px;
  padding-left: 0.5rem;
  outline: none;
  font-size: 14px;
}

div > p {
  margin: 0.7rem 0 0.5rem 0.2rem;
  font-size: 14px;
  color: hsl(0, 0%, 55%);
}

.notExists{
  color: rgb(240, 48, 48);
  font-size: 12px;
}
</style>
