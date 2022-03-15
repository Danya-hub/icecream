import MainState from '@/router/Main.js';

import Main from '@/pages/Main.vue';
import Reg from '@/pages/Reg.vue';
import Login from '@/pages/Login.vue';
import Error from '@/pages/Error.vue';

export default {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: Main.name,
      component: Main,
      meta: {
        state: MainState,
        visible: {
          header: true,
          footer: true,
        },
      },
    },
    {
      path: '/login',
      name: Login.name,
      component: Login,
    },
    {
      path: '/reg',
      name: Reg.name,
      component: Reg,
    },
    {
      path: '*',
      name: Error.name,
      component: Error,
      meta: {
        visible: {
          header: true,
        },
      },
    },
  ],
};
