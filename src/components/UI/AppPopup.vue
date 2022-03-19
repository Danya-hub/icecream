<template>
  <transition name="back">
    <div class="popup" @click.self="$emit('close', false)">
      <button id="close" @click="$emit('close', false)">
        <img :src="require('@/assets/svg/close.svg')" alt="close">
      </button>
      <div class="content">
        <slot name="content"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Popup',
  };
</script>

<style scoped>
  .popup {
    position: fixed;
    backdrop-filter: blur(4px);
    background: rgba(var(--black), 0.4);
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: 999;
  }

  .content {
    position: absolute;
    background: rgb(var(--white));
  }

  #close {
    --size: 30px;

    position: absolute;
    width: var(--size);
    height: var(--size);
    right: 0;
    top: 0;
    margin: 20px;
    z-index: 1;
  }

  .back-enter-active,
  .back-leave-active {
    transition: .2s opacity;
  }

  .back-enter,
  .back-leave-to {
    opacity: 0;
  }
</style>
