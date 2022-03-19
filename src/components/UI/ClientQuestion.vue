<template>
  <section id="question">
    <h2 class="title left">{{ ['Остались вопросы?', 'Do you have any questions?'][$root.currLang] }}</h2>
    <div class="wrapper">
      <p>{{ [
        'Заполните форму и наш менеджер свяжется с Вами в ближайшее время',
        'Fill out the form and our manager will contact You shortly'
      ][$root.currLang] }}</p>
      <Form id="form">
        <label>
          <Select :content="telephone.map(prop => '+' + prop.code)" @switch="(ind) => actInd = ind"></Select>
          <InputClient :placeholder="telephone[actInd].placeholder" :format="telephone[actInd].placeholder"
            :contentType="'Number'" />
        </label>
        <button type="submit">{{ ['Отправить', 'Send'][$root.currLang] }}</button>
      </Form>
    </div>
  </section>
</template>

<script>
  import {
    mapGetters,
  } from 'vuex';

  export default {
    name: 'Question',
    data() {
      return {
        actInd: 0,
      };
    },
    computed: {
      ...mapGetters(['telephone']),
    },
  };
</script>

<style>
  #question form input {
    max-width: 400px;
    padding: var(--space-top) 0;
    margin-left: 4px;
  }
</style>

<style scoped>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 6%;
  }

  form {
    --space-top: 14px;

    display: flex;
    flex-wrap: wrap;
  }

  form>label {
    display: flex;
    box-shadow:
      0 0 0 2px rgba(var(--blackCoffee), 0.6),
      inset 0 0 20px rgba(var(--coffee), 0.3);
    padding-left: 20px;
    margin-bottom: 20px;
    margin-right: 20px;
  }

  form>* {
    border-radius: 100vw;
    height: fit-content;
  }

  .wrapper>* {
    margin: 30px 0;
  }

  .title::after {
    top: 100%;
  }

  p {
    font-weight: 600;
  }
</style>
