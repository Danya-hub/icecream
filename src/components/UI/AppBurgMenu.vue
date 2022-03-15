<template>
  <button id="burgerMenu">
    <span v-for="ind in countLine" :key="ind"></span>
  </button>
</template>

<script>
  export default {
    name: 'BurgerMenu',
    props: {
      countLine: {
        type: Number,
        default: 3,
      },
    },
  };
</script>

<style scoped>
  button {
    --size: 30px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: var(--size);
    height: var(--size);
  }

  span {
    display: block;
    background: rgb(var(--black));
    transition: width 0.4s;
    border-radius: 100vw;
    width: 100%;
    height: 10%;
  }

  span:nth-child(even) {
    width: 80%;
  }

  button:hover span {
    width: 100%;
  }
</style>
