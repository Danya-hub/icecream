<template>
  <section>
    <div id="form" :style="{minWidth: $root.widthPage >= tablet.tablet ? '30%' : '100%'}">
      <Lang :actInd="$root.currLang" id="lang"></Lang>
      <h2 class="title left">{{ ['Войти', 'Sign in'][$root.currLang] }}</h2>
      <Form>
        <label>
          <InputClient :isInner="false" :placeholder="['Имя или почту', 'Name or email'][$root.currLang]"
            contentType="String">
            <i class="fa fa-user-o" aria-hidden="true"></i>
          </InputClient>
        </label>
        <label>
          <InputClient :type="isVisPasswod ? 'text' : 'password'" :isInner="false"
            :placeholder="['Пароль', 'Password'][$root.currLang]" contentType="String">
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
    <Slider :cards="images" v-if="$root.widthPage >= media.mobile" :content="images.map((src, i) => ({
      tag: 'video',
      options: {
        class: 'card',
        attrs: {
          id: i,
          autoplay: 'autoplay',
          muted: 'muted',
          loop: 'loop',
        },
        style: {
          size: $root.widthPage * 0.7,
        }
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
      ...mapGetters(['images', 'media']),
    },
    data() {
      return {
        isVisPasswod: false,
      };
    },
  };
</script>

<style>
  @import url("../style/auth.css");
</style>
