<template>
  <section>
    <div id="form" :style="{minWidth: $root.widthPage >= media.tablet ? '30%' : '100%'}">
      <Lang :actInd="$root.currLang" id="lang"></Lang>
      <h2 class="title left">{{ ['Регистрация', 'Sign up'][$root.currLang] }}</h2>
      <Form :method="send" ref="form">
        <div class="wrapper scroll">
          <label>
            <InputClient @update="(val) => authData.name = val" :isInner="false"
              :placeholder="['Имя', 'Name'][$root.currLang]" contentType="String">
              <i class="fa fa-user-o" aria-hidden="true"></i>
            </InputClient>
          </label>
          <label>
            <InputClient type="email" @update="(val) => authData.email = val" :isInner="false"
              :placeholder="['Почта', 'Email'][$root.currLang]" contentType="String">
              <i class="fa fa-envelope-o" aria-hidden="true"></i>
            </InputClient>
          </label>
          <label>
            <InputClient :type="isVisPasswod ? 'text' : 'password'" :limit="16"
              @update="(val) => authData.password = val" :isInner="false"
              :placeholder="['Пароль', 'Password'][$root.currLang]" contentType="String">
              <i class="fa fa-lock" aria-hidden="true"></i>
              <button type="button" class="eye" @click="isVisPasswod = !isVisPasswod">
                <i :class="['fa', 'noPoint', `fa-${isVisPasswod ? 'eye' : 'eye-slash'}`]" aria-hidden="true"></i>
              </button>
            </InputClient>
          </label>
          <label>
            <InputClient :type="isVisPasswod ? 'text' : 'password'" @update="(val) => confirmPassword = val"
              :isInner="false" :placeholder="['Подтвердить пароль', 'Confirm password'][$root.currLang]"
              contentType="String">
              <i class="fa fa-lock" aria-hidden="true"></i>
              <button type="button" class="eye" @click="isVisPasswod = !isVisPasswod">
                <i :class="['fa', 'noPoint', `fa-${isVisPasswod ? 'eye' : 'eye-slash'}`]" aria-hidden="true"></i>
              </button>
            </InputClient>
          </label>
        </div>
        <router-link :to="{
          name: 'Signin',
          params: {
            lang: this.lang[this.$root.currLang],
          },}" replace>{{ ['Вы уже зарегистрированы?', 'You are already signed up?'][$root.currLang] }}</router-link>
        <button type="submit" id="submit">{{ ['Зарегистрироваться', 'Sign up'][$root.currLang] }}</button>
      </Form>
    </div>
    <Slider :cards="images" v-if="$root.widthPage >= media.tablet" :content="images.map((src, i) => ({
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
    name: 'Signup',
    computed: {
      ...mapGetters([
        'images',
        'media',
        'lang',
        'dataAPI',
      ]),
      isValid() {
        return this.dataAPI.every(obj => (obj.name != this.authData.name || obj.email != this.authData.email) && this
          .authData.password == obj.password);
      },
    },
    data() {
      return {
        isVisPasswod: false,
        confirmPassword: null,
        authData: {
          id: Date.now(),
          name: null,
          email: null,
          password: null,
        },
      };
    },
    methods: {
      ...mapActions(['onSignout']),
      send() {
        if (!this.isValid) return;
        this.onSignout(this.authData).then(this.clear);

        this.$router.push({
          name: 'Signin',
          params: {
            lang: this.lang[this.$root.currLang],
          },
        });
      },
      clear() {
        this.confirmPassword = '';
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

<style>
  @import url("../style/auth.css");
</style>
