<template>
  <div id="select" :class="{visible: isVisible}">
    <span class="mask" @click="isVisible = !isVisible">{{ content[actInd] }}</span>
    <div class="window scroll" v-show="isVisible">
      <span class="option" v-for="(text, ind) in content" :key="ind"
        @click="(isVisible = false, $emit('switch', actInd = ind))">{{ text }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Select',
    props: {
      content: {
        type: Array,
        required: true,
      },
      strictClose: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        actInd: 0,
        isVisible: false,
      };
    },
    watch: {
      strictClose() {
        this.isVisible = false;
      },
    },
  };
</script>

<style scoped>
  #select {
    position: relative;
  }

  .mask {
    display: flex;
    align-items: center;
    padding-right: 14px;
    height: 100%;
  }

  .mask::after {
    --size: 10px;

    content: '';
    position: absolute;
    background: url(../../assets/svg/arrow-bottom.svg) no-repeat center/contain;
    transition: transform .2s;
    transform: translateY(-50%);
    width: var(--size);
    height: var(--size);
    right: 0;
    top: 50%;
  }

  #select.visible .mask::after {
    transform: translateY(-50%) rotate(180deg);
  }

  .window {
    position: absolute;
    box-shadow: 0 2px 2px rgba(var(--black), 0.2);
    background: rgb(var(--white));
    top: calc(100% + 4px);
    border-radius: 6px;
    max-height: 140px;
    overflow-y: scroll;
    z-index: 1;
  }

  .window span {
    display: block;
    border-bottom: 1px solid rgb(var(--coffee));
    padding: 6px 20px;
  }

  .window span:last-child {
    border-bottom: unset;
  }

  .option {
    --backg: rgb(var(--transp));

    background: var(--backg);
    transition: 0.2s background;
  }

  .option:hover {
    --backg: rgba(var(--caramel), 0.4)
  }

  span {
    cursor: pointer;
    user-select: none;
  }
</style>
