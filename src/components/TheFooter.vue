<template>
  <footer>
    <h2 class="title left">{{ $root.byCurrLang('Наше меню', 'Our menu') }}</h2>
    <div class="wrapper">
      <div :id="parent.name" v-for="parent in links" :key="parent.name">
        <h3>{{ $root.byCurrLang(...parent.title) }}:</h3>
        <nav>
          <ul>
            <li :id="child.name" v-for="child in parent.content" :key="child.name">
              <a href="">{{ $root.byCurrLang(...child.title) }}</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="socialNetwork">
        <h3>{{ $root.byCurrLang('Наши контакты', 'Our contacts') }}:</h3>
        <WorkSocialNetwork></WorkSocialNetwork>
        <WorkContact></WorkContact>
        <button class="whiteButton">{{ $root.byCurrLang('Заказать звонок', 'Request call') }}</button>
      </div>
    </div>
  </footer>
</template>

<script>
  import {
    mapGetters,
  } from 'vuex';

  export default {
    name: 'Footer',
    computed: {
      ...mapGetters(['links']),
    },
  };
</script>

<style scoped>
  footer {
    background: rgb(var(--white));
  }

  footer>* {
    align-self: baseline;
  }

  .title {
    margin-left: 6%;
  }

  .wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 14px 3%;
    padding: 0 6%;
  }

  li>* {
    position: relative;
    transition: 0.4s padding;
    padding: 4px 0 4px 4px;
    font-weight: 400;
  }

  a,
  span {
    display: block;
    white-space: nowrap;
  }

  h3 {
    margin-bottom: 6px;
  }

  address {
    display: flex;
    align-items: center;
    background: rgb(var(--lightGray));
    padding: 3vh 8%;
    height: 100%;
  }

  #copyright {
    font-style: normal;
  }

  .whiteButton {
    margin-top: 14px;
  }

  footer ul {
    margin-top: 4%;
  }
</style>
