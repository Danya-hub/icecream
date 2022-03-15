<template>
  <section ref="el">
    <slot></slot>
  </section>
</template>

<script>
  export default {
    name: 'Section',
    computed: {
      y() {
        return -Math.floor(this.$refs.el.getBoundingClientRect().top);
      },
    },
  };
</script>
