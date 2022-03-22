<template>
  <With-Aside>
    <template v-slot:main>
      <div class="wrapper" ref="wrapper" :style="[$root.widthPage >= media.mobile ?{transitionDuration: `${durationSroll}s`} : {}]">
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
      <Aside v-if="isVisible('aside')" @open="(bool) => setPauseScroll(isOpenMenu = bool)"></Aside>
      <Popup @close="(bool) => setPauseScroll(isOpenMenu = bool)" id="menu" v-show="pauseScroll">
        <template v-slot:content>
          <div class="panel">
            <a href="" class="logo">
              <img :src="require('@/assets/svg/logo.svg')" alt="logo" title="logo">
            </a>
            <Lang :actInd="$root.currLang" :strictAction="{ close: !isOpenMenu}"></Lang>
          </div>
          <div class="navigation scroll">
            <nav :id="parent.name" v-for="(parent, i) in links" :key="i">
              <ul>
                <li :id="child.name" v-for="(child, i) in parent.content" :key="i">
                  <a href="">{{ child.title[$root.currLang] }}</a>
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
        'lang',
        'media',
      ]),
      currRoute() {
        return this.$route.meta;
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
                components: [obj.title[this.$root.currLang]],
              },
              obj.property.$options.render(),
            ],
          })));

        return arr;
      },
      startY() {
        return Math.abs(Math.round(this.$refs.wrapper.getBoundingClientRect().top));
      },
      widthPage() {
        return this.$root.widthPage;
      },
    },
    data() {
      return {
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
          (this.scrollByAxisY > this.getHeightPage() + this.startY ? this.scrollByAxisY - window.innerHeight :
            this.getHeightPage() + this.startY);
      },
      replaceObjToRenderFunc,
      isVisible(comp) {
        return this.currRoute.visible && this.currRoute.visible[comp];
      },
      setCurrLang() {
        const transLang = this.$route.params.lang;

        if (transLang) {
          const _ = this.lang.indexOf(transLang);
          ~_ ? this.$root.currLang = _ : this.$router.push({
            name: 'Error',
          });
        }
      },
      getHeightPage() {
        return Math.round((window.innerHeight - document.body.offsetHeight) / window.innerHeight) * window.innerHeight;
      },
      disableScroll() {
        document.body.style.overflow = this.widthPage >= this.media.mobile ? 'hidden' : '';
      },
      setScroll() {
        if (this.widthPage < this.media.mobile) return;
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
      },
    },
    created() {
      this.setCurrLang();
    },
    mounted() {
      this.disableScroll();
      this.setScroll();
    },
    watch: {
      scrollByAxisY() {
        this.$refs.wrapper.style.transform = `translateY(${this.scrollByAxisY}px)`;
      },
      widthPage() {
        this.disableScroll();
        this.setScroll();
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
  @import url("./style/base.css");

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
</style>
