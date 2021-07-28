<template>
  <div class="container">
    <auth-panel></auth-panel>
  </div>
</template>

<script>
import AuthPanel from './AuthPanel.vue';
export default {
  components: {
    AuthPanel,
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
  background-color: hsl(47, 100%, 97%);
}
</style>
