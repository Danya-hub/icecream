<script>
  import Question from '@/components/UI/ClientQuestion.vue';
  import {
    mapGetters,
  } from 'vuex';

  export default {
    name: 'Main',
    components: {
      Question,
    },
    props: {
      currComponents: {
        type: Array,
        required: true,
      },
    },
    render(createElement) {
      return createElement('div', {}, [
        createElement('Slider', {
          attrs: {
            id: 'entry',
          },
          props: {
            tag: 'section',
            cards: this.entry,
            fixRow: 1,
            content: this.entry.map(card => ({
              tag: 'div',
              options: {
                class: 'entry_wrapperCard',
                style: {
                  position: 'relative',
                },
                isGlobal: true,
              },
              components: [{
                tag: 'h2',
                options: {
                  class: 'title center',
                },
                components: [card.text],
              }, {
                tag: 'video',
                options: {
                  attrs: {
                    autoplay: 'autoplay',
                    muted: 'muted',
                    loop: 'loop',
                  },
                  class: 'card',
                },
                components: [{
                  tag: 'source',
                  options: {
                    attrs: {
                      src: card.backg,
                      type: 'video/mp4',
                    },
                  },
                }],
              }],
            })),
          },
        }),
        ...this.currComponents,
        createElement('Question'),
      ]);
    },
    computed: {
      ...mapGetters([
        'descrText',
        'review',
        'entry',
        'ourWorks',
      ]),
    },
  };
</script>

<style>
  #descr .title {
    background: rgb(var(--white));
    padding-left: 5%;
    padding-right: 5%;
    position: absolute;
    top: 0;
    z-index: 1;
  }

  #entry .title {
    position: absolute;
    font-family: 'Raleway', sans-serif;
    font-weight: 600;
    color: rgb(var(--milk));
    transform: translate(-50%, -50%);
    text-shadow:
      1px -1px 0 rgb(var(--blackCoffee)),
      2px -2px 0 rgb(var(--blackCoffee));
    text-align: center;
    font-size: 4vh;
    width: 60%;
    left: 50%;
    top: 50%;
    line-height: 5vh;
    letter-spacing: 2px;
    z-index: 1;
  }

  #review .cards {
    height: fit-content;
  }

  #review .title {
    position: absolute;
  }

  #ourWorks #images {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
  }

  #ourWorks #images img {
    box-shadow: 0 0 20px rgba(var(--black), 0.05);
    margin: 10px 2%;
    object-fit: cover;
    border-radius: 10px;
    overflow: hidden;
  }

  #ourWorks #panel {
    display: flex;
    justify-content: center;
    margin: 20px 3%;
    overflow-x: scroll;
  }

  #ourWorks #panel label {
    --opacity: 0.4;
    --color: rgba(var(--black), var(--opacity));

    transition: .4s all;
    font-weight: 600;
    box-shadow: inset 0 -2px 0 rgba(var(--blackCoffee), var(--opacity));
    padding: calc(var(--step-0) - 0.3rem) calc(var(--step-0));
    color: var(--color);
    cursor: pointer;
  }

  #ourWorks #panel input[type="radio"] {
    display: none;
  }

  #ourWorks #panel :is(input.checked+label, label:hover) {
    --opacity: 1;
  }

  #ourWorks .whiteButton {
    margin: 20px auto 0;
  }
</style>
