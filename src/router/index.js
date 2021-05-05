import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import TweeterMain from '../views/TweeterMain.vue';
import Profile from '../views/Profile.vue';
import Users from '../views/Users.vue';
import ProfileEdit from '../views/ProfileEdit.vue';
import Moos from '../views/Moos.vue';

Vue.use(VueRouter);

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
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/profileedit',
    name: 'ProfileEdit',
    component: ProfileEdit
  },
  {
    path: '/moos/:userId/:mooId',
    name: 'Moos',
    component: Moos
  },
]

const router = new VueRouter({
  routes
});

export default router;
