import Vue from 'vue'
import VueRouter from 'vue-router'

import { routes } from './router'

import iView from 'iview';
import 'iview/dist/styles/iview'

Vue.use(VueRouter)
Vue.use(iView)

const RouterConfig = {
  routes,
  mode: 'history'
}

export const router = new VueRouter(RouterConfig)
