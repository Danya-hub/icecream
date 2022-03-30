<template>
  <section>
    <div id="form" :style="{minWidth: $root.widthPage >= media.tablet ? '30%' : '100%'}">
      <Lang :actInd="$root.currLang" id="lang"></Lang>
      <h2 class="title left">{{ ['Войти', 'Sign in'][$root.currLang] }}</h2>
      <Form :method="send" ref="form">
        <div class="wrapper">
          <label>
            <InputClient @update="(val) => authData.login = val" :isInner="false"
              :placeholder="['Имя или почту', 'Name or email'][$root.currLang]" contentType="String">
              <i class="fa fa-user-o" aria-hidden="true"></i>
            </InputClient>
          </label>
          <label>
            <InputClient @update="(val) => authData.password = val" :limit="16"
              :type="isVisPasswod ? 'text' : 'password'" :isInner="false"
              :placeholder="['Пароль', 'Password'][$root.currLang]" contentType="String">
              <i class="fa fa-lock" aria-hidden="true"></i>
              <button type="button" class="eye" @click="isVisPasswod = !isVisPasswod">
                <i :class="['fa', 'noPoint', `fa-${isVisPasswod ? 'eye' : 'eye-slash'}`]" aria-hidden="true"></i>
              </button>
            </InputClient>
          </label>
        </div>
        <a href="">{{ ['Забыли пароль?', 'Forgot password?'][$root.currLang] }}</a>
        <router-link :to="{
          name: 'Signup',
          params: {
            lang: lang[$root.currLang],
          },}" replace>{{ ['Вы не зарегистрированы?', 'You are not sign up?'][$root.currLang] }}</router-link>
        <button type="submit" id="submit">{{ ['Войти', 'Sign in'][$root.currLang] }}</button>
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
    mapActions,
  } from 'vuex';

  export default {
    name: 'Signin',
    data() {
      return {
        authData: {
          login: null,
          password: null,
        },
        isVisPasswod: false,
      };
    },
    computed: {
      ...mapGetters([
        'images',
        'media',
        'lang',
        'dataAPI',
      ]),
      isValid() {
        return this.dataAPI.some(obj => obj.login == this.authData.name || obj.login == this.authData.email);
      },
    },
    methods: {
      ...mapActions(['onSignin']),
      send() {
        if (!this.isValid) return;
        this.onSignin(this.authData).then(this.clear);

        this.$router.push({
          name: 'Main',
          params: {
            lang: this.lang[this.$root.currLang],
          },
        });
      },
      clear() {
        this.$refs.form.$children.forEach((e) => {
          if (e.value) e.value = '';
        });

        for (const key in this.authData)
          if (Object.hasOwnProperty.call(this.authData, key))
            this.authData[key] = null;
      },
    },
  };
</script>

<style scoped>
  @import url("../style/auth.css");
</style>
