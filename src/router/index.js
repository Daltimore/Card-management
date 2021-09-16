import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/Signup.vue')
    },
    {
      path: '/cards',
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
  ]
})


function guardMyroute(to, from, next)
{
 var isAuthenticated= false;
if(localStorage.getItem('authObject'))
  isAuthenticated = true;
 else
  isAuthenticated= false;
 if(isAuthenticated) 
 {
  next(); // allow to enter route
 } 
 else
 {
  next({ name: 'login' }); // go to '/login';
 }
}
