<template>
  <div class="container">
    <div class="contactBox">
      <div class="user">
        <p>Mateusz Żupa</p>
        <base-button mode="logoutBtn" @click="logout">Logout</base-button>
      </div>
      <add-contact></add-contact>
      <contact-list></contact-list>
    </div>
  </div>
</template>

<script>
import ContactList from './ContactList.vue';
import AddContact from './AddContact.vue';
export default {
  components: {
    ContactList,
    AddContact,
  },
  data() {
    return {
      message: 'Contact box',
    };
  },
  methods: {
    logout(){
      this.$store.dispatch('logout')
      this.$router.replace('/auth')
    }
  }
};
</script>

<style scoped>
.container {
  left: 1px;
  min-width: calc(15rem + 1px);
  min-height: 25rem;
  max-width: 25rem;
  max-height: 55rem;
  background-color: hsl(0, 0%, 22%);
  border-radius: 10px 0 0 10px;
  margin: 2rem 0 2rem 2rem;
}

.contactBox {
  width: 100%;
  height: 100%;
  padding: 1rem 1.2rem;
}

.user {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
