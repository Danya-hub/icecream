<template>
  <div class="input">
    <span v-if="!isInner" class="text">{{ placeholder }}</span>
    <div class="wrapper">
      <Elem v-if="limit" :placeholder="placeholder" :value="value" :type="type" :isInner="isInner"
        @update="(val) => $emit('update', value = setValidVal(val))" :maxLength="limit"></Elem>
      <Elem v-else :value="value" :placeholder="placeholder" :type="type" :isInner="isInner" @update="(val) => $emit('update', value = val)">
      </Elem>
      <slot></slot>
    </div>
    <span v-if="limit" class="limit">{{value.length}}/{{limit}}</span>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default {
    name: 'InputClient',
    components: {
      Elem: Vue.component('Elem', {
        template: `
            <input :placeholder="isInner ? placeholder : ''" :value="value" @input="$emit('update', $event.target.value)" required>
          `,
        props: {
          isInner: Boolean,
          value: {
            type: String,
            default: '',
          },
          placeholder: String,
        },
      }),
    },
    data() {
      return {
        value: '',
        regex: {
          Number: '\\D',
          String: '\\d',
        },
      };
    },
    props: {
      isInner: {
        type: Boolean,
        default: true,
      },
      placeholder: {
        type: String,
        default: '',
      },
      contentType: {
        type: String,
        required: true,
      },
      format: {
        type: String,
        default: '',
      },
      limit: {
        type: Number,
        default: 0,
      },
      type: {
        type: String,
        default: 'text',
      },
    },
    methods: {
      setValidVal(val) {
        return val.length <= this.limit ? val : this.value;
      },
    },
    computed: {
      readyFormat: {
        get() {
          let rez = '';

          let isOutside = false,
            ind = 0;

          if (!this.format.length || !this.limit) return this.value;
          this.format.split('').forEach((e) => {
            if (isOutside) return;
            let isContentType = this.contentType == 'String' ? isNaN(parseInt(e, 10)) : !isNaN(parseInt(e, 10)),
              value = this.value.split(new RegExp(`${this.regex[this.contentType]}*`)).filter(symb => symb != '');

            if ((isContentType && !value[ind]) || (this.limit > 0 && this.limit < rez.length)) {
              isOutside = true;
              return;
            }

            rez += isContentType ? value[ind++] : this.value.length > rez.length ? e : '';
          });

          return rez;
        },
      },
    },
    watch: {
      value() {
        this.value = this.readyFormat;
        this.$emit('write', this.value);
      },
      format() {
        this.value = this.readyFormat;
      },
    },
  };
</script>

<style>
  .input i:not(.noPoint) {
    pointer-events: none;
  }
</style>

<style scoped>
  .input {
    position: relative;
  }

  input {
    padding: 10px calc(var(--step-0) * 2);
    width: 100%;
  }

  .limit {
    position: absolute;
    font-size: calc(var(--step-0) - 2px);
    color: rgba(var(--gray), 0.6);
    right: 0;
    bottom: calc(var(--step-0) * -1.5);
    user-select: none;
    pointer-events: none;
  }

  .text {
    display: block;
    color: rgb(var(--gray));
    font-size: calc(var(--step-0) - 2px);
    font-weight: 600;
    line-height: 24px;
    text-transform: capitalize;
    margin-bottom: 10px;
    user-select: none;
  }

  .wrapper {
    --size: calc(var(--step-0) - 2px);
    position: relative;
  }

  .wrapper>*:not(input) {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 0 var(--size);
  }

  .input i {
    color: rgb(var(--coffee));
    font-size: var(--size);
  }
</style>
