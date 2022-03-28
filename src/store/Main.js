export const state = {
  entry: [{
      backg: require('@/assets/video/pexels-rodnae-productions-6412512_K0W3Ps1W.mp4'),
      text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, expedita.',
    },
    {
      backg: require('@/assets/video/pexels-taryn-elliott-5363185_9WRtlfMO.mp4'),
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eum exercitationem nulla.',
    },
    {
      backg: require('@/assets/video/video-of-scooping-icecream_cxhBZzlk.mp4'),
      text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit delectus a repellat est iure? Veritatis.',
    },
  ],
  descrText: [{
      imgSrc: require('@/assets/svg/icecream.svg'),
      text: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa consequatur animi quod quisquam debitis sed ea repellendus labore tenetur 
          eveniet consequuntur repellat, ipsa rem assumenda, saepe esse non! Nam ad placeat quaerat eos quas itaque consectetur exercitationem omnis 
          vitae et maiores debitis excepturi fugit reiciendis in eligendi soluta id qui, voluptatibus delectus dolore. Dolorum voluptate nulla dolor
          numquam minima porro illo sapiente, nemo sed voluptatum placeat optio sit voluptatem dolore.`,
    },
    {
      imgSrc: require('@/assets/svg/seller.svg'),
      text: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae voluptate 
          ipsam rem repudiandae currora, minima modi quo qui velit omnis. Commodi placeat 
          reprehenderit quidem curroribus corporis expedita, vero maxime, eum laudantium 
          natus veniam molestias distinctio possimus rerum obcaecati eius nemo qui, cumque 
          ipsum doloribus ipsam at veritatis! Molestiae, laudantium veritatis error 
          consequuntur placeat, iusto, ab consequatur exercitationem eum hic explicabo.`,
    },
  ],
  review: [{
      imgSrc: '',
      name: 'Kim Cardenas',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia doloribus error recusandae dignissimos, magnam eveniet quas.',
      star: 5,
    },
    {
      imgSrc: '',
      name: 'Jordan Kumar',
      text: 'Lorem ipsum dolor sit elit. Mollitia quos sequi praesentium cupiditate doloribus error recusandae dignissimos, magnam eveniet quas.',
      star: 3,
    },
    {
      imgSrc: '',
      name: 'Kourtney Easton',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia magnam eveniet quas.',
      star: 2,
    },
    {
      imgSrc: '',
      name: 'Conah Cherry',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia error recusandae dignissimos, magnam eveniet quas.',
      star: 5,
    },
    {
      imgSrc: '',
      name: 'Verity Haley',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quos sequi praesentium cupiditate doloribus error recusandae dignissimos.',
      star: 4,
    },
  ],
  ourWorks: [{
      name: 'cups',
      title: ['Стаканчики', 'Cups'],
      content: [
        require('@/assets/image/cup1.jpg'),
        require('@/assets/image/cup2.jpg'),
      ],
    },
    {
      name: 'sets',
      title: ['Наборы', 'Sets'],
      content: [],
    },
    {
      name: 'cakes',
      title: ['Торты', 'Cakes'],
      content: [
        require('@/assets/image/cake1.jpg'),
      ],
    },
    {
      name: 'ice',
      title: ['Лед', 'Ice'],
      content: [
        require('@/assets/image/ice1.jpg'),
      ],
    },
  ],
};

export const getters = {
  entry(obj) {
    return obj.entry;
  },
  descrText(obj) {
    return obj.descrText;
  },
  review(obj) {
    return obj.review;
  },
  ourWorks(obj) {
    return obj.ourWorks;
  },
};

export default {
  // namespaced: true,
  state,
  getters,
};
