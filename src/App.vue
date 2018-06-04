<template lang='pug'> 
  #app
    HeaderView
    router-view
    FooterView
</template>

<script>
import HeaderView from '@/components/header'
import FooterView from '@/components/footer'
export default {
  name: 'App',
  components: { HeaderView, FooterView }
}
</script>

<style lang='scss'>
html,
body {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #eee;
  height: 100%;
}
</style>
