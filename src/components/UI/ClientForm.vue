<template>
  <form action="" method="post" @submit="isValid">
    <slot></slot>
  </form>
</template>

<script>
  export default {
    name: 'Form',
    methods: {
      isValid() {

      },
    },
  };
</script>

<style scoped>
  input {
    color: rgba(var(--gray), 0.7);
  }

  input,
  input::placeholder {
    letter-spacing: 1px;
    font-weight: 600;
  }
</style>
