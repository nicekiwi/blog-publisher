import VueRouter from 'vue-router';
import store from '../store';

let routes = [
  {
    path: '/',
    component: {
      template: '<router-view></router-view>'
    },
    children: [
      {
        path: '',
        component: require('./Dashboard.vue')
      },
      {
        path: 'posts',
        component: require('./posts/All.vue')
      },
      {
        path: 'posts/:id',
        component: require('./posts/Update.vue')
      },
      {
        path: 'posts/create',
        component: require('./posts/Update.vue')
      }
    ]
  },
  {
    path: '/login',
    component: require('./Login.vue'),
    beforeEnter: (to, from, next) => {
      if(store.state.auth.isLoggedIn) next('/')
      else next()
    }
  },
  {
    path: '/logout',
    beforeEnter: (to, from, next) => {
      let action = () => { 
        store.commit('logout'); next('/login') 
        
        Event.$emit('notification', {
          type: 'is-success',
          content: 'Logout Successful.'
        })
      }
      axios.post('/logout').then(action).catch(action)
    }
  },
  { 
    path: '/unauthorized', 
    component: require('./Unauthorized.vue') 
  },
  { 
    path: '*', 
    component: require('./NotFound.vue') 
  }
]

const router = new VueRouter({
  routes, linkActiveClass: 'is-active', mode: 'history'
})

// Enforce authorization and redirect to previous path
router.beforeEach((to, from, next) => {
  if(to.path !== '/login' && !store.state.auth.isLoggedIn)
    next('/login?path=' + to.fullPath)
  else
    next()
})

export default router