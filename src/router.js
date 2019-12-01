import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import MyList from './components/MyList'
import { store } from './store/store'
// import Login from './components/Login'
// import SignUp from './components/SignUp'
Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/my_list',
      name: 'list',
      component: MyList,
      meta: {
        requiresAuth: true
      }
    },
    /* {
      path: '/login',
      component: Login
    },
    {
      path: '/signup',
      component: SignUp
    }, */
    {
      path: '*',
      redirect: { name: 'home' }
    }

  ]/* ,
  beforeEach(async (to, from, next) => {
    // make sure we always have job openings
    if (this.$store.state.jobOpenings.length === 0) {
      await store.dispatch('loadJobOpenings')
    } else {
      next()
    }
  }) */
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.getUser) {
      next()
      return
    }
    next('')
  } else {
    next()
  }
})

export default router
