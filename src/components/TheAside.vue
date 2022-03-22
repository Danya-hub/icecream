<template>
  <div id="aside"
    :style="[$root.widthPage >= media.mobile ? {transitionDuration: durationSroll + 's', transform: `translateY(${Math.abs(getTop($root.$el))}px)`} : fixed]">
    <transition name="animMenu">
      <button id="open" v-show="$root.widthPage >= media.mobile && !isHideElem() || $root.widthPage < media.mobile"
        :style="{...renameOldname({ size: sizeMenu + 'px' })}" @click="$emit('open', true)" ref="menu">
        <img :src="require('@/assets/svg/bars.svg')" alt="open">
      </button>
    </transition>
    <aside :style="[$root.widthPage >= media.mobile ? {transitionDuration: durationSroll + 's', transitionProperty: 'width'} : {}]" ref="aside"
      v-show="$root.widthPage >= media.mobile">
      <div id="switch">
        <button ref="button" v-for="ind in countSect" :key="ind" @click="switchActBut(ind)">{{ ind }}</button>
      </div>
    </aside>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapMutations,
  } from 'vuex';

  import {
    setActionForScrolling,
    renameOldname,
  } from '@/helper.js';

  let oldInd = 0;

  export default {
    name: 'Aside',
    data() {
      return {
        countSect: 0,
        sizeMenu: 36,
        fixed: {
          position: 'fixed',
          right: 0,
          top: 0,
        },
      };
    },
    mounted() {
      this.countSect = Math.round(document.body.offsetHeight / window.innerHeight);

      this.$nextTick(() => {
        this.setSize();

        setActionForScrolling({
            innerTimeout: () => this.setActiveElem(this.activeInd),
          },
          this.durationSroll * 1000,
        );
      });
    },
    computed: {
      ...mapGetters([
        'scrollByAxisY',
        'durationSroll',
        'isScrollUp',
        'media',
      ]),
      activeInd: {
        get() {
          return Math.round(Math.abs(this.scrollByAxisY + this.getTop(this.$root.$el)) / window.innerHeight);
        },
      },
      aside() {
        return this.$refs.aside;
      },
    },
    methods: {
      ...mapMutations({
        mutableScroll: 'scrollByAxisY',
        setBScroll: 'isScrollUp',
      }),
      isHideElem() {
        return Math.round(this.scrollByAxisY + this.getTop(this.$root.$el)) >= 0;
      },
      getTop(elem) {
        return Math.round(elem.getBoundingClientRect().top);
      },
      setActiveElem(actInd) {
        let buttons = this.$refs.button;

        buttons.forEach(e => e.classList.remove('active'));
        buttons[actInd].classList.add('active');

        this.setSize();
      },
      switchActBut(ind) {
        let currInd = ind - 1;
        this.setBScroll(currInd < oldInd);

        this.mutableScroll(-((window.innerHeight * currInd) + this.getTop(this.$root.$el)));
        this.setActiveElem(currInd);

        oldInd = currInd;
      },
      setSize() {
        this.aside.style.width =
          `${this.isHideElem() ? 0 : this.sizeMenu + (parseInt(window.getComputedStyle(this.$refs.menu, null).marginLeft, 10) * 2)}px`;
      },
      renameOldname,
    },
    watch: {
      scrollByAxisY() {
        this.setActiveElem(this.activeInd);
      },
    },
  };
</script>

<style>
  #open {
    position: absolute;
    right: 0;
    top: 0;
    margin: var(--gap-top) var(--gap-left);
    z-index: 1;
  }
</style>

<style scoped>
  #aside {
    --gap-left: 16px;
    --gap-top: 22px;

    position: relative;
    z-index: 999;
  }

  .animMenu-enter-active,
  .animMenu-leave-active {
    transition: .2s opacity;
  }

  .animMenu-enter-active {
    transition-delay: 1s;
  }

  .animMenu-enter,
  .animMenu-leave-to {
    opacity: 0;
  }

  aside {
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(var(--white));
    box-shadow: 0 0 20px rgba(var(--black), 0.1);
    height: 100%;
    overflow-x: hidden;
  }

  #switch {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
    height: 60%;
  }

  #switch button {
    --backg: var(--white);
    --size: 24px;
    --scale: 0.7;

    background: rgba(var(--backg));
    transition: 0.2s all;
    transform: scale(var(--scale));
    box-shadow: inset 0 0 0 2px rgb(var(--black));
    border-radius: 50%;
    width: calc(var(--size) + var(--step-0));
    height: calc(var(--size) + var(--step-0));
    color: rgb(var(--color));
  }

  #switch button:hover,
  #switch button.active {
    --backg: var(--black);
    --color: var(--white);
    --scale: 1;
    text-shadow: 0 0 10px rgb(var(--white));
  }

  #switch::before {
    content: '';
    position: absolute;
    background: rgba(var(--black), 0.5);
    width: 1px;
    height: 100%;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }
</style>
