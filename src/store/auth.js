export default {
  state: {
    dataAPI: JSON.parse(localStorage.getItem('auth')) || [],
    currClient: JSON.parse(localStorage.getItem('client')) || null,
  },
  mutations: {
    dataAPI(state, val) {
      state.dataAPI.push(val);
    },
    currClient(state, val) {
      state.currClient = val;
    },
  },
  actions: {
    onSignin({
      state,
      commit,
    }, data) {
      return new Promise(() => {
        commit('currClient', state.dataAPI.find(obj => data.login == obj.name || data.login == obj.email));
        localStorage.setItem('client', JSON.stringify(state.currClient));
      });
    },
    onSignup({
      state,
      commit,
    }, data) {
      return new Promise(() => {
        commit('dataAPI', data);
        localStorage.setItem('auth', JSON.stringify(state.dataAPI));
      });
    },
  },
  getters: {
    dataAPI(state) {
      return state.dataAPI;
    },
    currClient(state) {
      return state.currClient;
    },
  },
};
