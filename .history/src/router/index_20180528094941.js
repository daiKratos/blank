import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// import '@/utils/iview'
// import 'iview/dist/styles/iview'
// import iView from 'iview';
// import 'iview/dist/styles/iview.css';
Vue.use(Router)
// Vue.use(iView)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
