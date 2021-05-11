// Collaborated with Liz for this project.
import Vue from 'vue';
import VueRouter from 'vue-router';
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
    // Using a dynamic segment in the path (:id) to pass in params.
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
    // Using a dynamic segment in the path (:userId and :mooId) to pass in params.
    path: '/moos/:userId/:mooId',
    name: 'Moos',
    component: Moos
  },
]

const router = new VueRouter({
  routes
});

export default router;
