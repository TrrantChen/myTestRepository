<template>
  <div id="app">
    <img width="50" height="50" src="./assets/logo.png">
    <img width="50" height="50" src="/static/large.jpg" alt="ooooooooooooo">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
