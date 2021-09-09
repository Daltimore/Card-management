import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

export const router = new VueRouter({
  routes: [
    {
      path: '/',
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
router.beforeEach((to, from, next) => {
  const isAuthenticated = JSON.parse(localStorage.getItem('authObject'));
  if ( to.name !== 'login' && !isAuthenticated) next({ name: 'login' })
  else next()
}) 