<template>
  <header>
    <section id="topPanel" :style="{position: isAbs ? 'absolute' : 'unset'}">
      <div class="wrapper">
        <button id="catalog">
          <i class="fas fa-ice-cream" aria-hidden="true"></i>
          {{ ['Каталог', 'Catalog'][$root.currLang] }}
        </button>
        <ul id="baseLinks" v-if="$root.widthPage >= media.tablet">
          <li>
            <a href="">{{ ['Помощь', 'Help'][$root.currLang] }}</a>
          </li>
          <li>
            <a href="">{{ ['Контакты', 'Contact'][$root.currLang] }}</a>
          </li>
          <li>
            <a href="">{{ ['Акции', 'Stock'][$root.currLang] }}</a>
          </li>
        </ul>
        <router-link class="logo" v-if="$root.widthPage >= media.mobile"
          :title="['Магазин мороженого - №1', 'Ice cream shop - №1'][$root.currLang]" :to="{ name: 'Main',
            params: {
              lang: lang[$root.currLang],
            },
          }">
          <img :src="require('@/assets/svg/logo.svg')" alt="logo" title="logo">
        </router-link>
        <ul id="currLinks" v-if="$root.widthPage >= media.desktop">
          <li :id="obj.id" v-for="(obj, ind) in Object.values(currLinks.state || [])" :key="ind">
            <a @click="$emit('clickLink', ind)">{{ obj.title[$root.currLang] }}</a>
          </li>
        </ul>
        <div v-if="$root.widthPage >= media.mobile" id="client">
          <button id="cart" :title="['Корзина', 'Cart'][$root.currLang]">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
          </button>
          <div id="user">
            <button @click="isVisUser = !isVisUser" :title="['Пользователь', 'User'][$root.currLang]">
              <i class="fas fa-user" aria-hidden="true"></i>
            </button>
            <Select :content="[
              [...currClient ? ['Мой кабинет', 'My cabinet'] : ['Войти', 'Sign in']][$root.currLang],
              ['Регистрация', 'Sign up'][$root.currLang],
            ]" @switch="(ind) => $router.push({ name: [
                currClient ? 'Cabinet' : 'Signin',
                'Signup',
              ][ind], params: {
                lang: lang[$root.currLang],
             }})" :isVisSel="false" :strictAction="{ open: isVisUser }"></Select>
          </div>
        </div>
      </div>
    </section>
  </header>
</template>

<script>
  import {
    mapGetters,
  } from 'vuex';

  export default {
    name: 'Header',
    props: {
      currLinks: {
        type: Object,
        required: true,
      },
      isAbs: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        isVisUser: false,
      };
    },
    computed: {
      ...mapGetters([
        'lang',
        'media',
        'currClient',
      ]),
    },
  };
</script>

<style>
  header {
    width: 100%;
    z-index: 9;
  }

  header .window {
    transform: translateX(-50%);
    left: 50%;
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
    padding: 14px;
  }
</style>
