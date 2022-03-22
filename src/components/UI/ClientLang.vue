<template>
  <Select :content="lang" :actInd="actInd" :strictAction="strictAction" @switch="(ind) => $root.currLang = ind"></Select>
</template>

<script>
  import {
    mapGetters,
  } from 'vuex';

  export default {
    name: 'Lang',
    props: {
      actInd: {
        type: Number,
        required: true,
      },
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
