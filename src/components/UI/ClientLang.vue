<template>
  <Select :content="lang" :strictAction="strictAction" @switch="(ind) => $root.currLang = ind"></Select>
</template>

<script>
  import {
    mapGetters,
  } from 'vuex';

  export default {
    name: 'Lang',
    props: {
      strictAction: {
        type: Object,
      },
    },
    computed: {
      ...mapGetters(['lang']),
    },
  };
</script>

<style>

</style>
