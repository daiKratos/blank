<template lang='pug'> 
  #app
    HeaderView
    router-view
</template>

<script>
import HeaderView from '@/components/header'
export default {
  name: 'App',
  components:{HeaderView}
}
</script>

<style lang='scss'>
html,body{
  height: 100%;
  
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #eee;
}
</style>
