<template>
  <ul id="socialNetwork">
    <li v-for="(e, i) in socNetwork" :key="i">
      <a :href="e.url" :id="e.name" class="whiteButton">
        <FontAwesomeIcon :icon="['fab', e.name]" class="icon" />
      </a>
    </li>
  </ul>
</template>

<script>
  import {
    mapGetters,
  } from 'vuex';

  export default {
    name: 'WorkSocialNetwork',
    computed: {
      ...mapGetters(['socNetwork']),
    },
  };
</script>

<style scoped>
  ul {
    display: flex;
  }

  li {
    margin: 0 6px;
  }

  a {
    --size: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 1px rgb(var(--black));
    border-radius: 50%;
    width: calc(var(--size) + var(--step-0));
    height: calc(var(--size) + var(--step-0));
  }
</style>
