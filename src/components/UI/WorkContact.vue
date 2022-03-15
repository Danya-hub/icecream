<template>
  <ul id="socialNetwork">
    <li v-for="(num, i) in telNum" :key="i">
      <a :href="`tel:${num}`">{{ num }}</a>
    </li>
  </ul>
</template>

<script>
    import {
        mapGetters,
    } from 'vuex';

  export default {
    name: 'WorkContact',
    computed: {
        ...mapGetters(['telNum']),
    },
  };
</script>

<style>

</style>
