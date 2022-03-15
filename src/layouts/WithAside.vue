<template>
<div id="page">
    <slot name="main"></slot>
    <slot name="aside"></slot>
  </div>
</template>

<script>
  export default {
    name: 'With-Aside',
  };
</script>

<style scoped>
  #page {
    display: flex;
    width: 100%;
  }

  #page .wrapper {
    width: 100%;
  }

  #aside {
    height: 100vh;
  }
</style>
