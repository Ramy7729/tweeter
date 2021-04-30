import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import TweeterMain from '../views/TweeterMain.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/tweetermain',
    name: 'TweeterMain',
    component: TweeterMain
  },

]

const router = new VueRouter({
  routes
})

export default router
