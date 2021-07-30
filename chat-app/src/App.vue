<template>
  <router-view></router-view>
</template>

<script>
export default {
  mounted(){
    this.$store.dispatch('tryLogin')
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-size: 16px;
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  color: white;
  background-color: hsl(47, 100%, 97%);
}
</style>
