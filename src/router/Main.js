import Vue from 'vue';

import {
  data as Lang,
} from '@/mixin.js';
import {
  state as Main,
} from '@/store/Main.js';
import {
  renameOldname,
} from '@/helper.js';

export default [{
    id: 'descr',
    title: ['О нас', 'About'],
    property: new Vue({
      render() {
        return {
          tag: 'Description',
          options: {
            props: {
              content: Main.descrText,
            },
          },
        };
      },
    }),
  },
  {
    id: 'review',
    title: ['Отзывы', 'Review'],
    property: new Vue({
      render() {
        return {
          tag: 'Slider',
          options: {
            attrs: {
              id: 'entry',
            },
            props: {
              cards: Main.review,
              space: 30,
              content: Main.review.map((card, i) => ({
                tag: 'div',
                options: {
                  class: 'review_wrapperCard',
                  style: {
                    position: 'relative',
                    background: '#fff',
                    boxShadow: '0 0 20px rgba(var(--caramel), 0.2)',
                    padding: '36px 20px',
                    borderRadius: '10px',
                    width: '100%',
                    minFixWidth: '240px',
                  },
                  attrs: {
                    id: i,
                  },
                  isGlobal: true,
                },
                components: [{
                    tag: 'div',
                    options: {
                      style: {
                        display: 'flex',
                      },
                    },
                    components: [{
                        tag: 'img',
                        options: {
                          style: renameOldname({
                            background: 'rgb(var(--gray))',
                            borderRadius: '50%',
                            size: '60px',
                          }),
                          attrs: {
                            src: card.imgSrc,
                            alt: 'person',
                          },
                        },
                      },
                      {
                        tag: 'div',
                        options: {
                          style: {
                            margin: '8px 10px',
                          },
                        },
                        components: [{
                            tag: 'h3',
                            options: {
                              style: {
                                fontSize: '14px',
                              },
                            },
                            components: [card.name],
                          },
                          {
                            tag: 'div',
                            options: {
                              style: {
                                margin: '6px 0',
                              },
                              class: 'stars',
                            },
                            components: (() => {
                              let comp = [];

                              const maxStar = 5;
                              for (let ind = 0; ind < maxStar; ind++)
                                comp.push({
                                  tag: 'i',
                                  options: {
                                    style: {
                                      color: 'rgb(var(--orange))',
                                      margin: '0 2px',
                                    },
                                    class: card.star - 1 >= ind ? 'fas fa-star' : 'far fa-star',
                                  },
                                });

                              return comp;
                            })(),
                          },
                        ],
                      },
                    ],
                  },
                  {
                    tag: 'p',
                    options: {
                      class: 'comment',
                      style: {
                        marginTop: '20px',
                      },
                    },
                    components: [card.text],
                  },
                  {
                    tag: 'div',
                    options: {
                      class: 'stars',
                    },
                    components: [{
                      tag: 'span',
                    }],
                  },
                ],
              })),
            },
          },
        };
      },
    }),
  },
  {
    id: 'ourWorks',
    title: ['Наши работы', 'Our works'],
    property: new Vue({
      data: {
        actWorkInd: 0,
        minWidth: 240,
        maxWidth: 300,
        imageSize() {
          return Math.max(this.minWidth, Math.min(window.innerWidth * 0.5, this.maxWidth));
        },
        visibleCardInd() {
          return Math.round(window.innerWidth / this.imageSize()) - 1 || 1;
        },
      },
      render() {
        return {
          tag: 'div',
          options: {
            class: 'wrapper',
          },
          components: [{
              tag: 'div',
              options: {
                attrs: {
                  id: 'panel',
                },
                class: 'scroll',
              },
              components: Main.ourWorks.map((obj, i) => ({
                tag: 'div',
                options: {
                  props: {
                    id: obj.name,
                  },
                },
                components: [{
                    tag: 'input',
                    options: {
                      attrs: {
                        type: 'radio',
                        name: 'radio',
                        id: `r${i}`,
                      },
                      class: {
                        checked: this.data().actWorkInd == i,
                      },
                    },
                  },
                  {
                    tag: 'label',
                    options: {
                      props: {
                        for: `r${i}`,
                      },
                      on: {
                        click: () => {
                          this.data().actWorkInd = i;
                        },
                      },
                    },
                    components: [obj.title[Lang.currLang]],
                  },
                ],
              })),
            },
            {
              tag: 'div',
              options: {
                attrs: {
                  id: 'images',
                },
              },
              components: Main.ourWorks[this.data().actWorkInd].content.filter((e, i) => i < this.data().visibleCardInd()).map(path => ({
                tag: 'img',
                options: {
                  style: renameOldname({
                    size: `${this.data().imageSize()}px`,
                  }),
                  attrs: {
                    src: path,
                    alt: 'work',
                  },
                },
              })),
            },
          ],
        };
      },
    }),
  },
];
