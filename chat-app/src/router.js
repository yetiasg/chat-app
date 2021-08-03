import { createRouter, createWebHistory } from 'vue-router';
import store from './store'

import TheChat from './pages/TheChat';
import TheAuth from './pages/TheAuth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'rootRoute',
      component: TheChat,
      meta: { requireAuth: true },
    },
    {
      path: '/auth',
      name: 'authRoute',
      component: TheAuth,
      meta: { requireUnAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const routeAuthCheck = !!token;

  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (routeAuthCheck) {
      store.commit('isAuthenticated', true);
      next()
    }else next('/auth');
  }
  if (to.matched.some((record) => record.meta.requireUnAuth)) {
    if (routeAuthCheck) next('/');
    else next();
  }
});

export default router;
