export const state = {
  lang: ['ru', 'en'],
  telNum: ['+380 xxx-xx-xx', '+380 xxx-xx-xx'],
  socNetwork: [{
    name: 'facebook',
    url: '',
  }, {
    name: 'instagram',
    url: '',
  }, {
    name: 'twitter',
    url: '',
  }],
  mutableSelectors: [{
      oldName: ['size', 'fixSize'],
      newName: ['width', 'height'],
    },
    {
      oldName: ['minFixWidth'],
      newName: ['minWidth'],
    },
  ],
  links: [{
      name: 'company',
      title: ['Компания', 'Company'],
      content: [{
          name: 'about',
          title: ['О компании', 'About company'],
          component: null,
        },
        {
          name: 'ourTeam',
          title: ['Наша команда', 'Our team'],
          component: null,
        },
        {
          name: 'partners',
          title: ['Партнеры', 'Partners'],
          component: null,
        },
        {
          name: 'review',
          title: ['Отзывы', 'Review'],
          component: null,
        },
        {
          name: 'jobs',
          title: ['Вакансии', 'Jobs'],
          component: null,
        },
        {
          name: 'question-answer',
          title: ['Вопрос-ответ', 'Question-answer'],
          component: null,
        },
      ],
    },
    {
      name: 'help',
      title: ['Помощь', 'Help'],
      content: [{
        name: 'shipping-payment',
        title: ['Доставка и оплата', 'Shipping-payment'],
        component: null,
      }],
    },
    {
      name: 'services',
      title: ['Сервисы', 'Services'],
      content: [{
          name: 'bonus-account',
          title: ['Бонусный счет', 'Bonus account'],
          component: null,
        },
        {
          name: 'premium',
          title: ['Premium'],
          component: null,
        },
        {
          name: 'gift-certificates',
          title: ['Подарочные сертификаты', 'Gift certificates'],
          component: null,
        },
      ],
    },
  ],
};

export const getters = {
  mutableSelectors(obj) {
    return obj.mutableSelectors;
  },
  links(obj) {
    return obj.links;
  },
  telNum(obj) {
    return obj.telNum;
  },
  socNetwork(obj) {
    return obj.socNetwork;
  },
  lang(obj) {
    return obj.lang;
  },
};

export default {
  state,
  getters,
};
