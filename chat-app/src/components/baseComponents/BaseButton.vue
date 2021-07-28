<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: '/',
    },
  },
};
</script>

<style scoped>
button {
  font-size: 1rem;
  letter-spacing: 1px;
  cursor: pointer;
  color: white;
  padding: 0.9rem 1.4rem;
}

.filledBtn {
  background-color: hsl(0, 0%, 28%);
  border: 2px solid hsl(0, 0%, 28%);
  border-radius: 20px;
  margin: 10px;
  min-width: 7.5rem;
  width: 100%;
  transition: 0.1s;
}

.filledBtn:hover {
  background-color: hsl(0, 0%, 23%);
  border: 2px solid hsl(0, 0%, 23%);
}

.borderBtn {
  border: 2px solid hsl(0, 0%, 28%);
  background-color: transparent;
  border-radius: 20px;
  margin: 10px;
  box-sizing: border-box;
  min-width: 7.5rem;
  width: 100%;
  transition: 0.1s;
  color: hsl(0, 0%, 69%);
}

.borderBtn:hover {
  border: 2px solid hsl(0, 0%, 28%);
  background-color: hsl(0, 0%, 28%);
}

.logoutBtn {
  border: none;
  background-color: transparent;
  color: red;
  border-radius: 10px;
  padding: 1rem 0.5rem;
}
.logoutBtn:hover {
  background-color: rgb(117, 93, 93);
}

.addToContactBtn {
  background-color: transparent;
  border: 2px solid hsl(0, 0%, 28%);
  border-radius: 20px;
  margin: 0 0 0 1rem;
  transition: 0.1s;
}
.addToContactBtn:hover {
  background-color: hsl(0, 0%, 28%);
}

.submitMessage {
  background-color: hsl(256, 67%, 54%);
  border: 2px solid hsl(256, 67%, 54%);
  color: white;
  border-radius: 20px;
  margin: 0 1rem 0 0;
  transition: 0.1s;
  padding: 0.6rem;
}

.submitMessage:hover {
  border-color: hsl(256, 100%, 64%);
  background-color: hsl(256, 100%, 64%);
}
</style>
