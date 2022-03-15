export default {
  state: {
    telephone: [{
        country: 'uk',
        placeholder: '(00) 000-00-00',
        code: '380',
      },
      {
        country: 'ru',
        placeholder: '(000) 000-00-00',
        code: '7',
      },
      {
        country: 'be',
        placeholder: '(000) 00-00-00',
        code: '375',
      },
    ],
    lang: ['ru', 'en'],
  },
  getters: {
    telephone(state) {
      return state.telephone;
    },
  },
};
