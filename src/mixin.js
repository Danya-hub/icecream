const mixin = {
  data: {
    selectLangInd: 0,
  },
  methods: {
    byCurrLang(...text) {
      const ind = mixin.data.selectLangInd,
        maxLeng = text.length - 1;

      return text[ind > maxLeng ? maxLeng : ind];
    },
  },
};

export default mixin;
