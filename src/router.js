import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import MyList from './components/MyList'
// import Login from './components/Login'
// import SignUp from './components/SignUp'
Vue.use(Router)

export default new Router({
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
      name: 'myList',
      component: MyList
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
