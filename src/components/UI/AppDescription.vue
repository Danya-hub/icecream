<template>
  <div class="description" ref="section">
    <div v-for="obj in content" :key="obj.text" class="wrapper">
      <div class="image">
        <img :src="obj.imgSrc" alt="imgText">
      </div>
      <p class="text">{{ obj.text }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Description',
    props: {
      content: {
        type: Array,
        required: true,
      },
    },
  };
</script>

<style scoped>
  .description {
    --sizeWrapImg: 40%;
    --sizeImg: 280px;

    position: relative;
    height: 100%;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
    height: 100vh;
  }

  .wrapper:last-child {
    border-bottom: unset;
  }

  .wrapper>* {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 3vw;
  }

  .image {
    --size: clamp(200px, 50vw, 380px);

    width: var(--size);
    height: var(--size);
  }

  .image img {
    filter: drop-shadow(4px 4px 6px rgba(var(--black), 0.6));
  }

  .text {
    font-weight: 600;
    line-height: var(--step-3);
    height: fit-content;
  }

  @media (min-width: 780px) {
    .wrapper:nth-child(odd) {
      flex-direction: row;
    }

    .wrapper:nth-child(even) {
      flex-direction: row-reverse;
    }

    .text {
      width: calc(100% - var(--sizeWrapImg));
    }
  }
</style>
