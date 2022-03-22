export const data = {
  currLang: 0,
  widthPage: window.innerWidth,
};

export default {
  data,
  mounted() {
    window.addEventListener('resize', () => {
      this.widthPage = window.innerWidth;
    });
  },
};
