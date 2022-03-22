import MainState from '@/router/Main.js';

import Main from '@/pages/Main.vue';
import Register from '@/pages/Register.vue';
import Login from '@/pages/Login.vue';
import Error from '@/pages/Error.vue';

export default {
  mode: 'history',
  routes: [
    ...[{
        path: '/',
        name: Main.name,
      },
      {
        path: '/:lang',
        name: `${Main.name}WithParams`,
      },
    ].map(obj => ({
      path: obj.path,
      name: obj.name,
      component: Main,
      meta: {
        state: MainState,
        visible: {
          header: true,
          aside: true,
          footer: true,
        },
      },
    })),
    {
      path: '/login/:lang',
      name: Login.name,
      component: Login,
    },
    {
      path: '/register/:lang',
      name: Register.name,
      component: Register,
    },
    {
      path: '*',
      name: Error.name,
      component: Error,
    },
  ],
};
