import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';

import store from '@/store/index.js';
import router from '@/router/index.js';
import components from '@/components/UI/index.js';
import mixin from '@/mixin.js';

import App from '@/App.vue';

Vue.config.productionTip = false;

[Vuex, Router].forEach(lib => Vue.use(lib));
components.forEach(el => Vue.component(el.name, el));

new Vue({
  el: '#app',
  router: new Router(router),
  store: new Vuex.Store(store),
  render: h => h(App),
  mixins: [mixin],
});
