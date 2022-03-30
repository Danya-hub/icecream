export default {
  state: {
    images: [
      require('@/assets/video/pexels-rodnae-productions-6412512_K0W3Ps1W.mp4'),
      require('@/assets/video/pexels-taryn-elliott-5363185_9WRtlfMO.mp4'),
      require('@/assets/video/video-of-scooping-icecream_cxhBZzlk.mp4'),
    ],
  },
  getters: {
    images(state) {
      return state.images;
    },
  },
};
