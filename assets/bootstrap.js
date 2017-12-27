import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueRouter from 'vue-router'
import VueCrumbs from 'vue-crumbs'


window.Vue = Vue
window.Event = new Vue()

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueCrumbs)

window.axios = axios
window.axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest'
}