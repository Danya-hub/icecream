<template>
  <Select :content="lang" :strictClose="strictClose" @switch="(ind) => $root.selectLangInd = ind"></Select>
</template>

<script>
  export default {
    name: 'Lang',
    data() {
      return {
        lang: ['ru', 'en'],
      };
    },
    props: {
      strictClose: {
        type: Boolean,
      },
    },
  };
</script>

<style>

</style>
