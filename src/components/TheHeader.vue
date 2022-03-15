<template>
  <header>
    <section id="topPanel" ref="section">
      <div class="wrapper">
        <button id="catalog">
          <i class="fas fa-ice-cream"></i>
          {{ $root.byCurrLang('Каталог', 'Catalog') }}
        </button>
        <ul id="baseLinks" v-if="width >= 880">
          <li>
            <a href="">{{ $root.byCurrLang('Помощь', 'Help') }}</a>
          </li>
          <li>
            <a href="">{{ $root.byCurrLang('Контакты', 'Contact') }}</a>
          </li>
          <li>
            <a href="">{{ $root.byCurrLang('Акции', 'Stock') }}</a>
          </li>
        </ul>
        <a href="" class="logo" v-if="width >= 560">
          <img :src="require('@/assets/svg/logo.svg')" alt="logo" title="logo">
        </a>
        <ul id="currLinks" v-if="width >= 1280">
          <li :id="obj.id" v-for="(obj, ind) in Object.values(currLinks.state || [])" :key="ind">
            <a @click="$emit('clickLink', ind)">{{ $root.byCurrLang(...obj.title) }}</a>
          </li>
        </ul>
        <div v-if="width >= 560" id="client">
          <button id="cart">
            <i class="fas fa-shopping-cart"></i>
          </button>
          <button id="user">
            <i class="fas fa-user"></i>
          </button>
        </div>
      </div>
    </section>
  </header>
</template>

<script>
  export default {
    name: 'Header',
    props: {
      currLinks: {
        type: Object,
        required: true,
      },
    },
    computed: {
      width: {
        get() {
          return window.innerWidth;
        },
      },
      height: {
        get() {
          return window.innerHeight;
        },
      },
    },
    mounted() {
      console.log(this.currLinks);
    },
  };
</script>

<style>
  header {
    position: absolute;
    width: 100%;
  }

  #topPanel {
    background: rgba(var(--white), 0.8);
    box-shadow: 0 0 20px rgba(var(--black), 0.1);
    width: 100%;
    left: 0;
    top: 0;
    z-index: 2;
  }

  #topPanel .wrapper>*:not(ul) {
    margin: 20px 10px;
  }

  .slider :where(.cards, .card) {
    --sizeArrowSlider: 100%;
  }
</style>

<style scoped>
  .wrapper {
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: 0 auto;
    padding: 0 2vw;
  }

  .wrapper>* {
    display: flex;
  }

  button {
    align-self: center;
  }

  ul a {
    position: relative;
    display: flex;
    align-items: center;
    font-weight: 700;
    height: 100%;
    padding: 0 1.4vw;
    white-space: nowrap;
  }

  ul:not(#socNetwork) a::after {
    content: '';
    position: absolute;
    transition: 0.2s opacity;
    background: rgb(var(--black));
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
  }

  ul:not(#socNetwork) a:hover::after {
    opacity: 1;
  }

  #catalog {
    background: var(--backg);
    transition: all 0.4s;
    align-items: center;
    box-shadow: inset 0 0 0 2px rgb(var(--blackCoffee));
    padding: 12px 20px;
    border-radius: 4px;
    color: var(--color);
  }

  #catalog:hover {
    --backg: rgb(var(--blackCoffee));
    --color: rgb(var(--white));
  }

  #catalog i {
    margin-right: 4px;
  }

  #client button {
    margin: 0 14px;
  }
</style>
