<template>
  <section>
    <div id="form">
      <h2 class="title left">{{ ['Войти', 'Sign in'][$root.currLang] }}</h2>
      <Form>
        <label>
          <InputClient :isInner="false" :placeholder="['Имя или почту', 'Name or email'][$root.currLang]"
            :contentType="'String'">
            <i class="fa fa-user-o" aria-hidden="true"></i>
          </InputClient>
        </label>
        <label>
          <InputClient :type="isVisPasswod ? 'text' : 'password'" :isInner="false"
            :placeholder="['Пароль', 'Password'][$root.currLang]" :contentType="'String'">
            <i class="fa fa-lock" aria-hidden="true"></i>
            <button type="button" id="eye" @click="isVisPasswod = !isVisPasswod">
              <i :class="['fa', 'noPoint', `fa-${isVisPasswod ? 'eye' : 'eye-slash'}`]" aria-hidden="true"></i>
            </button>
          </InputClient>
        </label>
        <a href="">{{ ['Забыли пароль?', 'Forgot password?'][$root.currLang] }}</a>
        <button type="button" id="submit">{{ ['Войти', 'Sign in'][$root.currLang] }}</button>
      </Form>
    </div>
    <Slider :cards="images" :fixRow="1" :content="images.map((src, i) => ({
      tag: 'video',
      options: {
        class: 'card',
        attrs: {
          id: i,
          autoplay: 'autoplay',
          muted: 'muted',
          loop: 'loop',
        },
      },
      components: [{
        tag: 'source',
        options: {
          attrs: {
            type: 'video/mp4',
            src,
          },
        },
      }],
    }))"></Slider>
  </section>
</template>

<script>
  import {
    mapGetters,
  } from 'vuex';

  export default {
    name: 'Login',
    computed: {
      ...mapGetters(['images']),
    },
    data() {
      return {
        isVisPasswod: false,
      };
    },
  };
</script>

<style>
  section {
    display: flex;
  }

  #form {
    --width: 100%;

    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: rgb(var(--white));
    min-width: var(--width);
    padding: 0 5%;
  }

  #form::after {
    content: '';
    position: absolute;
    background: rgb(var(--white));
    clip-path: polygon(0 0, 100% 100%, 0 100%);
    width: 10%;
    height: 100%;
    transform: translateX(100%);
    right: 0;
    z-index: 1;
  }

  label {
    margin: 16px 0;
    width: 90%;
  }

  input {
    --opacity: 0.4;

    transition: .2s box-shadow;
    box-shadow: inset 0 0 0 1px rgba(var(--blackCoffee), var(--opacity));
    border-radius: 8px;
  }

  input:focus {
    --opacity: 1;
  }

  #submit {
    margin-top: 30px;
  }

  a {
    color: rgb(var(--blackCoffee));
  }

  #eye {
    left: unset;
    right: 0;
  }

  #eye i {
    color: rgb(var(--blackCoffee));
  }

  @media (min-width: 460px) {
    #form {
      --width: 30%;
    }
  }
</style>
