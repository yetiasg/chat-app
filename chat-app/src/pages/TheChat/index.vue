<template>
  <div class="container">
    <contact-box></contact-box>
    <message-box></message-box>
  </div>
</template>

<script>
import ContactBox from './ContactBox.vue';
import MessageBox from './MessageBox.vue';
export default {
  components: {
    ContactBox,
    MessageBox,
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
