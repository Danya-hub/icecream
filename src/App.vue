<template>
  <With-Aside>
    <template v-slot:main>
      <div class="wrapper" ref="wrapper">
        <Header v-if="isVisible('header')" :currLinks="currRoute"
          @clickLink="(i) => mutableScroll(renderComponent[i].child.y)">
        </Header>
        <main>
          <router-view :currComponents="renderComponent"></router-view>
        </main>
        <Footer v-if="isVisible('footer')"></Footer>
      </div>
    </template>
    <template v-slot:aside>
      <Aside @open="(bool) => setPauseScroll(isOpenMenu = bool)"></Aside>
      <Popup @close="(bool) => setPauseScroll(isOpenMenu = bool)" id="menu" v-show="pauseScroll">
        <template v-slot:content>
          <div class="panel">
            <a href="" class="logo">
              <img :src="require('@/assets/svg/logo.svg')" alt="logo" title="logo">
            </a>
            <Lang :strictClose="!isOpenMenu"></Lang>
          </div>
          <div class="navigation scroll">
            <nav :id="parent.name" v-for="(parent, i) in links" :key="i">
              <ul>
                <li :id="child.name" v-for="(child, i) in parent.content" :key="i">
                  <a href="">{{ $root.byCurrLang(...child.title) }}</a>
                </li>
              </ul>
            </nav>
          </div>
        </template>
      </Popup>
    </template>
  </With-Aside>
</template>

<script>
  import Header from '@/components/TheHeader.vue';
  import Footer from '@/components/TheFooter.vue';
  import Aside from '@/components/TheAside.vue';
  import WithAside from '@/layouts/WithAside.vue';
  import {
    mapGetters,
    mapMutations,
  } from 'vuex';

  import {
    setActionForScrolling,
    replaceObjToRenderFunc,
  } from '@/helper.js';

  export default {
    name: 'App',
    components: {
      Header,
      Footer,
      Aside,
      WithAside,
    },
    computed: {
      ...mapGetters([
        'scrollByAxisY',
        'durationSroll',
        'isScrollUp',
        'pauseScroll',
        'links',
      ]),
      currRoute() {
        return this.$router.currentRoute.meta;
      },
      renderComponent() {
        let arr = [];

        if (this.currRoute.state)
          arr = this.replaceObjToRenderFunc(this.$createElement, this.currRoute.state.map(obj => ({
            tag: 'Section',
            options: {
              attrs: {
                id: obj.id,
              },
            },
            components: [{
                tag: 'h2',
                options: {
                  class: 'title center',
                },
                components: [this.$root.byCurrLang(...obj.title)],
              },
              obj.property.$options.render(),
            ],
          })));

        return arr;
      },
    },
    data() {
      return {
        heightPage: 0,
        isOpenMenu: false,
      };
    },
    methods: {
      ...mapMutations({
        mutableScroll: 'scrollByAxisY',
        setBScroll: 'isScrollUp',
        setPauseScroll: 'pauseScroll',
      }),
      setScrollByAxisY(isScrollUp) {
        return isScrollUp ?
          (this.scrollByAxisY < this.startY ? this.scrollByAxisY + window.innerHeight : this.startY) :
          (this.scrollByAxisY > this.heightPage + this.startY ? this.scrollByAxisY - window.innerHeight :
            this.heightPage + this.startY);
      },
      replaceObjToRenderFunc,
      isVisible(comp) {
        return this.currRoute.visible && this.currRoute.visible[comp];
      },
    },
    mounted() {
      setActionForScrolling({
          innerListener: (e) => {
            this.setBScroll(e.wheelDeltaY > 1);
          },
          innerTimeout: () => {
            if (this.pauseScroll) return;

            this.mutableScroll(this.setScrollByAxisY(this.isScrollUp));
          },
        },
        this.durationSroll * 1000,
      );

      //* --------

      const elem = this.$refs.wrapper;
      this.startY = Math.abs(Math.round(elem.getBoundingClientRect().top));

      elem.style.cssText = `
        transition-duration: ${this.durationSroll}s;
      `;

      this.heightPage =
        Math.round(
          (-elem.offsetHeight + window.innerHeight) / window.innerHeight,
        ) * window.innerHeight;
    },
    watch: {
      scrollByAxisY() {
        this.$refs.wrapper.style.transform = `translateY(${this.scrollByAxisY}px)`;
      },
    },
  };
</script>

<style scoped>
  .wrapper {
    position: relative;
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.42, 0, 0.32, 0.85);
    overflow: hidden;
  }
</style>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700&family=Raleway:wght@300;400;500&display=swap");
  @import url("./style/global.css");

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    list-style: none;
    font-family: 'Nunito Sans', sans-serif;
    font-size: var(--textSize);
    word-spacing: 1px;
    outline: none;
    appearance: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  ::selection {
    background: rgba(var(--blackCoffee), 0.7);
    color: rgb(var(--white));
  }

  i::before {
    font-family: "Font Awesome 5 Pro";
  }

  body {
    background: rgb(var(--milk));
    overflow: hidden;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    pointer-events: none;
    user-select: none;
  }

  label {
    display: block;
  }

  video {
    object-fit: cover;
  }

  button {
    --backg: rgba(var(--transp));
    --color: rgb(var(--black));

    display: block;
    border: none;
    background: none;
    cursor: pointer;
    user-select: none;
  }

  video {
    pointer-events: none;
  }

  main section,
  footer {
    min-height: 100vh;
  }

  main section,
  footer {
    position: relative;
  }

  main>section:nth-child(even) {
    background: rgb(var(--white));
  }

  main>section:nth-child(odd) {
    box-shadow: inset 0 0 30px rgba(var(--blackCoffee), 0.2);
  }

  .logo {
    display: block;
    width: clamp(200px, 50%, 260px);
  }

  h1 {
    font-size: var(--step-3);
  }

  h2 {
    font-size: var(--step-2);
  }

  h3,
  p,
  span,
  a,
  button {
    font-size: var(--step-0);
  }

  a,
  p {
    color: rgb(var(--black));
  }

  a {
    cursor: pointer;
    user-select: none;
  }

  input {
    display: block;
    background: unset;
    border: unset;
  }

  input::placeholder {
    color: var(--black);
    user-select: none;
  }

  .whiteButton {
    background: rgba(var(--backg));
    box-shadow: 0 0 0 2px rgb(var(--blackCoffee));
    font-weight: 600;
    border-radius: 100vw;
    transition: .2s all;
    padding: calc(var(--step-0) - 0.3rem) calc(var(--step-0));
    color: rgb(var(--color));
  }

  .whiteButton:hover {
    --backg: var(--blackCoffee);
    --color: var(--white);
  }

  .title {
    position: relative;
    text-transform: capitalize;
    font-size: 27px;
    padding: 5vh 0;
    width: fit-content;
  }

  .title.left,
  :where(main>*:not(:where(.slider)), footer) .title.left::after {
    left: 0;
  }

  .title.center,
  :where(main>*:not(:where(.slider)), footer) .title.center::after {
    transform: translateX(-50%);
    left: 50%;
  }

  :where(main>*:not(:where(.slider)), footer) .title::after {
    content: '';
    position: absolute;
    background: rgb(var(--black));
    width: 40px;
    height: 2px;
    top: 80%;
  }

  #menu .content {
    box-shadow: 0 0 20px rgba(var(--black), 0.2);
    max-width: 500px;
    width: 100%;
    height: inherit;
    right: 0;
    top: 0;
  }

  select {
    background: unset;
    border: unset;
    cursor: pointer;
    user-select: none;
  }

  select option {
    padding: 0 20px;
  }

  .scroll::-webkit-scrollbar {
    display: unset;
    width: 16px;
  }

  .scroll::-webkit-scrollbar-thumb {
    background: rgb(var(--gray));
    border: 4px solid rgb(var(--white));
    border-radius: 100vw;
  }

  #menu .content {
    display: flex;
    flex-direction: column;
  }

  #menu .navigation {
    overflow-y: scroll;
  }

  #menu .content>* {
    padding: 4%;
  }

  #menu nav {
    border-bottom: 2px solid rgba(var(--coffee), 0.2);
    padding: 10px 0;
  }

  #menu nav:last-child {
    border-bottom: unset;
  }

  #menu li a::before {
    content: '';
    position: absolute;
    background: rgb(var(--black));
    width: 8px;
    height: 1px;
    transform: translateY(-50%);
    transition: 0.2s opacity;
    top: 50%;
    left: 0;
    pointer-events: none;
    opacity: 0;
  }

  #menu li a {
    --space: 0px;

    position: relative;
    display: block;
    transition: .2s padding-left;
    padding: 6px 0 6px var(--space);
  }

  #menu li a:hover {
    --space: 20px;
  }

  #menu li a:hover::before {
    opacity: 1;
  }

  #menu .panel {
    display: flex;
    align-items: center;
    background: rgba(var(--coffee), 0.2);
    border-bottom: 2px solid rgba(var(--coffee), 0.6);
  }

  #menu .panel>*:not(:last-child) {
    margin-right: 4%;
  }

  #menu #select span {
    text-transform: uppercase;
  }
</style>
