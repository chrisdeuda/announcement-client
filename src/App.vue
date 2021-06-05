<template>
  <div id="app">
    <HelloWorld msg="Announcement List"/>
    <Announcements></Announcements>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Announcements from './components/Announcements.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Announcements
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
