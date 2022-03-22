<script>
  import {
    mapGetters,
  } from 'vuex';

  import {
    renameOldname,
    setStyleForElem,
    replaceObjToRenderFunc,
  } from '@/helper.js';

  export default {
    name: 'Slider',
    data() {
      return {
        position: 0,
      };
    },
    render(createElement) {
      return createElement(this.tag, {
          class: 'slider',
          ref: 'slider',
        },
        [
          createElement('div', {
            class: 'wrapperSlider',
          }, [
            createElement('button', {
              attrs: {
                id: 'arrow-left',
                disabled: this.position == 0,
              },
              class: 'arrow',
              on: {
                click: () => {
                  this.position += (this.position < 0 ? this.widthCard : 0);
                },
              },
            }, [
              createElement('img', {
                attrs: {
                  src: require('@/assets/svg/arrow-left.svg'),
                  alt: 'left',
                },
              }),
            ]),
            createElement('div', {
                class: 'cards',
                ref: 'cards',
              },
              replaceObjToRenderFunc(createElement, (() => {
                const vm = this;

                let _ = this.setActionForFindProp((obj) => {
                  if (!obj.options.isGlobal) return;
                  setStyleForElem(obj.options.class, this.compileObjToStr(renameOldname({
                    minWidth: `${this.toPercent((this.widthCard / vm.defualtRow) - (vm.space * 2), this.widthCard)}vw`,
                    margin: `0 ${this.toPercent(vm.space, window.innerWidth)}%`,
                    ...obj.options.style,
                  })).replace(/[A-Z]/g, findSymb => `-${findSymb.toLowerCase()}`));
                });

                return _(this.content);
              })()),
            ),
            createElement('button', {
              attrs: {
                id: 'arrow-right',
                disabled: this.position == -this.widthCard * (this.cards.length - this.defualtRow),
              },
              class: 'arrow',
              on: (() => {
                const lastItem = (-this.widthCard * (this.cards.length - this.defualtRow));

                return {
                  click: () => {
                    this.position -= (this.position > lastItem ? this.widthCard : lastItem);
                  },
                };
              })(),
            }, [
              createElement('img', {
                attrs: {
                  src: require('@/assets/svg/arrow-right.svg'),
                  alt: 'right',
                },
              }),
            ]),
          ]),
        ]);
    },
    props: {
      cards: {
        type: Array,
        required: true,
      },
      fixRow: {
        type: Number,
        default: 0,
      },
      space: {
        type: Number,
        default: 0,
      },
      content: {
        type: Array,
        required: true,
      },
      tag: {
        type: String,
        default: 'div',
      },
    },
    computed: {
      ...mapGetters(['mutableSelectors']),
      widthCard() {
        let width = 0;

        if (!this.fixRow) {
          this.setActionForFindProp((obj) => {
            if (!Object.keys(obj.options.style).some(key => this.mutableSelectors.map(_obj => _obj.oldName).flat().includes(key))) return;
            const style = obj.options.style;

            for (const key in style)
              if (Object.hasOwnProperty.call(style, key))
                // eslint-disable-next-line no-loop-func
                this.mutableSelectors.forEach((mutObj) => {
                  mutObj.oldName.forEach((mutKey) => {
                    if (mutKey == key)
                      width = parseInt(style[mutKey], 10);
                  });
                });
          })(this.content);

          return width + (this.space * 2);
        }

        return innerWidth;
      },
      defualtRow() {
        if (!this.fixRow)
          return Math.floor(window.innerWidth / this.widthCard);

        return this.fixRow;
      },
    },
    methods: {
      toPercent(currNum, parNum) {
        return (currNum * 100) / parNum || 0;
      },
      isObject(value) {
        return typeof value == 'object' && !value.length;
      },
      setActionForFindProp(action) {
        return (iteration) => {
          iteration.forEach((obj) => {
            if (!this.isObject(obj)) return;

            for (const key in obj)
              if (Object.prototype.hasOwnProperty.call(obj, key) && this.isObject(obj))
                action(obj);
          });

          return iteration;
        };
      },
      compileObjToStr(obj) {
        let content = '';
        for (const key in obj)
          if (Object.prototype.hasOwnProperty.call(obj, key))
            content += `${key}: ${obj[key]}; `;

        return content;
      },
    },
    watch: {
      position() {
        this.$refs.cards.style.transform =
          `translateX(${this.position}px)`;
      },
    },
  };
</script>

<style scoped>
  .slider {
    height: 100vh;
    overflow: hidden;
    user-select: none;
  }

  .wrapperSlider {
    display: flex;
    align-items: center;
    position: relative;
    width: inherit;
    height: inherit;
    overflow: hidden;
  }

  .cards {
    display: flex;
    transition: 0.4s transform ease-out;
    width: 100%;
    height: 100%;
  }

  .card {
    height: 100%;
    width: 100%;
    pointer-events: none;
    user-select: none;
  }

  .arrow {
    --arrowSlidDuration: 0.2s;

    position: absolute;
    transition: var(--arrowSlidDuration) opacity, var(--arrowSlidDuration) transform;
    height: 100%;
    opacity: 0.6;
    top: 0;
    z-index: 2;
  }

  .arrow:hover {
    opacity: 1;
    transform: scale(1.1);
  }

  .arrow:disabled:hover {
    opacity: 0.6;
    transform: unset;
    cursor: auto;
  }

  .arrow img {
    width: 40px;
    height: fit-content;
  }

  #arrow-left {
    left: 0;
  }

  #arrow-right {
    right: 0;
  }

  .wrapperCard {
    position: relative;
  }
</style>
