import statics from '@/store/statics.js';

import scroll from '@/store/scroll.js';
import connection from '@/store/connection.js';
import auth from '@/store/auth.js';

import Main from '@/store/Main.js';
import Sign from '@/store/Sign.js';

export default {
  modules: {
    Main,
    Sign,
    statics,
    scroll,
    connection,
    auth,
  },
};
