<template>
  <div id="aside">
    <transition name="animMenu">
      <button v-show="widthWindow >= 510 && !isHideElem() || widthWindow < 510" id="open" @click="$emit('open', true)">
        <img :src="require('@/assets/svg/bars.svg')" alt="open">
      </button>
    </transition>
    <aside ref="aside" v-show="widthWindow >= 510">
      <div id="switch" ref="switch">
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
  } from '@/helper.js';

  let oldInd = 0;

  export default {
    name: 'Aside',
    data() {
      return {
        countSect: 0,
      };
    },
    mounted() {
      this.countSect = Math.round(document.body.offsetHeight / this.heightWindow);

      this.elem = this.$refs.aside;
      //! --------------------
      this.widthAside = this.elem.offsetWidth + (parseInt(window.getComputedStyle(this.$refs.switch, null).paddingLeft,
          10) *
        2);
      //! --------------------

      this.elem.style.cssText += `
        transition-duration: ${this.durationSroll}s;
        transition-property: width;
      `;

      this.setSize();
      this.$nextTick(() => {
        this.$el.style.cssText = `
          transform: translateY(${Math.abs(this.getTop(this.$root.$el))}px);
          transition-duration: ${this.durationSroll}s;
        `;

        this.buttons = this.$refs.button;
        setActionForScrolling({
            innerTimeout: () => this.setActiveElem(this.activeInd),
          },
          this.durationSroll * 1000,
        );
      });
    },
    computed: {
      ...mapGetters(['scrollByAxisY', 'durationSroll', 'isScrollUp']),
      widthWindow() {
        return window.innerWidth;
      },
      heightWindow() {
        return window.innerHeight;
      },
      activeInd: {
        get() {
          return Math.round(Math.abs(this.scrollByAxisY + this.getTop(this.$root.$el)) / this.heightWindow);
        },
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
        this.buttons.forEach(e => e.classList.remove('active'));
        this.buttons[actInd].classList.add('active');

        this.setSize();
      },
      switchActBut(ind) {
        let currInd = ind - 1;
        this.setBScroll(currInd < oldInd);

        this.mutableScroll(-((this.heightWindow * currInd) + this.getTop(this.$root.$el)));
        this.setActiveElem(currInd);

        oldInd = currInd;
      },
      setSize() {
        this.elem.style.width = `${this.isHideElem() ? 0 : this.widthAside}px`;
      },
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
    position: relative;
    padding: 0 var(--gap-left);
  }

  #switch button {
    --backg: var(--white);
    --size: 24px;

    background: rgba(var(--backg));
    transition: 0.2s all;
    transform: scale(0.7);
    box-shadow: inset 0 0 0 2px rgb(var(--black));
    border-radius: 50%;
    width: calc(var(--size) + var(--step-0));
    height: calc(var(--size) + var(--step-0));
    margin: 20px 0;
    color: rgb(var(--color));
  }

  #switch button:hover,
  #switch button.active {
    transform: scale(1);

    text-shadow: 0 0 10px rgb(var(--white));
    --backg: var(--black);
    --color: var(--white);
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
