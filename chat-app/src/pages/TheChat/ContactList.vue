<template>
  <div>
    <p class="contactLabel">Contacts</p>
    <ul>
      <li v-for="(user, i) of getUsers" :key="i">
        <div class="userInContacts">
          <p>{{ user.name }}</p>
          <p>{{ user.lastMessage }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    getUsers() {
      return this.$store.getters.getUsersList;
    },
  },
};
</script>

<style scoped>
.userInContacts {
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: hsl(0, 0%, 10%);
  margin: 1rem 0;
  border-radius: 10px;
  padding: 0.5rem;
  box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.3);
}

.userInContacts > p:first-child {
  font-size: 14px;
  margin-left: 0.3rem;
}

.userInContacts > p:last-child {
  font-size: 12px;
  color: hsl(0, 0%, 55%);
  word-wrap: break-word;
  word-break: break-all;
}

ul {
  list-style-type: none;
}

.contactLabel {
  margin: 0.7rem 0 -0.5rem 0.2rem;
  font-size: 14px;
  color: hsl(0, 0%, 55%);
}
</style>
