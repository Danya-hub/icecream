<template>
  <div id="select" :class="{visible: isOpen}">
    <span v-if="isVisSel" class="mask" @click="isOpen = !isOpen">{{ content[_actInd] }}</span>
    <transition name="window">
      <div class="window scroll" v-show="isOpen || strOpen">
        <span class="option" v-for="(text, ind) in content" :key="ind"
          @click="(isOpen = false, $emit('switch', _actInd = ind))">{{ text }}</span>
      </div>
    </transition>
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
      strictAction: {
        type: Object,
        default: () => ({
          close: false,
          open: false,
        }),
      },
      actInd: {
        type: Number,
        default: 0,
      },
      isVisSel: {
        type: Boolean,
        default: true,
      },
    },
    computed: {
      _actInd() {
        return this.actInd;
      },
      strClose() {
        return this.strictAction.close;
      },
      strOpen() {
        return this.strictAction.open;
      },
    },
    data() {
      return {
        isOpen: false,
      };
    },
    watch: {
      strClose() {
        this.isOpen = false;
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
    z-index: 1;
  }

  .window span {
    display: block;
    border-bottom: 1px solid rgb(var(--coffee));
    padding: 6px 20px;
    white-space: nowrap;
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

  .window-enter-active,
  .window-leave-active {
    transition: .2s opacity;
  }

  .window-enter,
  .window-leave-to {
    opacity: 0;
  }
</style>
