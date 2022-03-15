export default {
  state: {
    scrollByAxisY: 0,
    durationSroll: 0.6,
    isScrollUp: true,
    pauseScroll: false,
  },
  mutations: {
    scrollByAxisY(state, value) {
      state.scrollByAxisY = value;
    },
    durationSroll(state, value) {
      state.durationSroll = value;
    },
    isScrollUp(state, value) {
      state.isScrollUp = value;
    },
    pauseScroll(state, value) {
      state.pauseScroll = value;
    },
  },
  getters: {
    scrollByAxisY(state) {
      return state.scrollByAxisY;
    },
    durationSroll(state) {
      return state.durationSroll;
    },
    isScrollUp(state) {
      return state.isScrollUp;
    },
    pauseScroll(state) {
      return state.pauseScroll;
    },
  },
};
