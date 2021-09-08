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
      component: () => import('@/layouts/BlankLayout.vue'),
      children: [
        {
          path: '',
          name: 'cards',
          component: () => import('@/views/Cards.vue')
        }
      ]
    }
  ]
})

//Route Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = JSON.parse(localStorage.getItem('authObject'));
  if (!isAuthenticated) next({ name: 'login' })
  else next()
})