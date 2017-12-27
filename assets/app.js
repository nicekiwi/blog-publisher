import './bootstrap'
import store from './store'
import router from './routes'
import App from './routes/App'
import { sync } from 'vuex-router-sync'

sync(store, router)

const initVue = response => {

    if(response.hasOwnProperty('data')) {
        store.commit('login', response.data)
    }
  
    new Vue({
        el: '#app',
        store,
        router,
        components: { App }
    })
  
}
  
// Check for login before rendering app
axios.post('/ping').then(initVue).catch(initVue)