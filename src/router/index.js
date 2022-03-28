import MainState from '@/router/Main.js';

import Main from '@/pages/Main.vue';
import Signout from '@/pages/Signout.vue';
import Signin from '@/pages/Signin.vue';
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
          aside: true,
          footer: true,
        },
      },
    },
    {
      path: '/signin/:leng',
      name: Signin.name,
      component: Signin,
    },
    {
      path: '/signout/:leng',
      name: Signout.name,
      component: Signout,
    },
    {
      path: '*',
      name: Error.name,
      component: Error,
    },
  ],
};
