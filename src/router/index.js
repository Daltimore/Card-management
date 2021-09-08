import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

export const router = new VueRouter({
  routes: [
    {
      path: '/',
      beforeEnter : guardMyroute,
      component: () => import('@/layouts/BlankLayout.vue'),
      children: [
        {
          path: '',
          name: 'cards',
          component: () => import('@/views/Cards.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/Signup.vue')
    },
  ]
})

//Route Guard
function guardMyroute(to, from, next)
{
 var isAuthenticated= false;
//this is just an example. You will have to find a better or 
// centralised way to handle you localstorage data handling 
const authenticateUser = localStorage.getItem('authObject')
if(authenticateUser)
  isAuthenticated = true;
 else
  isAuthenticated= false;
 if(isAuthenticated) next(); // allow to enter route
 else next('/login'); // go to '/login';
}