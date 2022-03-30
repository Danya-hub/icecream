import MainState from '@/router/Main.js';

import Main from '@/pages/Main.vue';
import Signup from '@/pages/Signup.vue';
import Signin from '@/pages/Signin.vue';
import Cabinet from '@/pages/Cabinet.vue';
import Error from '@/pages/Error.vue';

export default {
  mode: 'history',
  routes: [{
      path: '/',
      name: Main.name,
      component: Main,
      meta: {
        state: MainState,
        isAbsHead: true,
        visible: {
          header: true,
          aside: true,
          footer: true,
        },
      },
    },
    {
      path: '/signin/:lang',
      name: Signin.name,
      component: Signin,
    },
    {
      path: '/signup/:lang',
      name: Signup.name,
      component: Signup,
    },
    {
      path: '/cabinet/:lang',
      name: Cabinet.name,
      component: Cabinet,
      meta: {
        visible: {
          header: true,
          aside: true,
        },
      },
    },
    {
      path: '*',
      name: Error.name,
      component: Error,
    },
  ],
  beforeEach() {
    location.reload();
  },
};
