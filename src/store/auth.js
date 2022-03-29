export default {
  // namespaced: true,
  state: {
    dataAPI: JSON.parse(localStorage.getItem('auth')) || [],
    currClient: null,
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
      return new Promise(() => commit('currClient', state.dataAPI.find(obj => data.login == obj.name || data.login == obj.email)));
    },
    onSignout({
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
  },
};
