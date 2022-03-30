<template>
  <section>
    <div id="nav">
      <div id="info">
        <span id="name">{{ currClient.name }}</span>
        <span id="email">{{ currClient.email }}</span>
      </div>
    </div>
    <div id="content"></div>
  </section>
</template>

<script>
  import {
    mapGetters,
  } from 'vuex';

  export default {
    name: 'Cabinet',
    computed: {
      ...mapGetters(['currClient']),
    },
  };
</script>

<style scoped>
  section {
    display: flex;
  }

  #nav {
    background: rgba(var(--white), 0.8);
    height: 100vh;
    min-width: 34%;
    padding: 0 2%;
  }

  span {
    display: block;
  }

  #nav>* {
    padding: 4% 0%;
  }

  #nav:not(:last-child) {
    border-bottom: 1px solid;
  }

  #info>* {
    margin: 2% 0;
  }

  #info #name {
    letter-spacing: 2px;
    font-weight: 600;
    font-size: calc(var(--step-0) + 2px);
  }

  #info #email {
    color: rgba(var(--gray), 0.7);
  }
</style>
