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

  button {
    --backg: rgb(var(--coffee));
    --color: rgb(var(--blackCoffee));

    display: block;
    background: var(--backg);
    box-shadow: inset 0 0 0 2px rgba(var(--blackCoffee), 0.6);
    border-radius: 100vw;
    font-weight: 700;
    text-transform: uppercase;
    transition: all 0.4s;
    padding: 14px 20px;
    letter-spacing: 1px;
    color: var(--color);
  }

  button:hover {
    box-shadow: unset;
    --backg: rgb(var(--blackCoffee));
    --color: rgb(var(--milk));
  }
</style>
