<template>
  <label>
    <input :placeholder="placeholder" v-model.trim="value">
    <span v-if="limit" id="limit">{{~(value.length - 1) ? value.length - 1 : 0}}/{{limit}}</span>
  </label>
</template>

<script>
  export default {
    name: 'Input',
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
      placeholder: {
        type: String,
        required: true,
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
    },
    computed: {
      readyFormat: {
        get() {
          let rez = '';

          let isOutside = false,
            ind = 0;

          if (!this.format.length) return this.value;
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
      },
      format() {
        this.value = this.readyFormat;
      },
    },
  };
</script>

<style scoped>
  label {
    display: flex;
  }

  #limit {
    display: flex;
    align-items: center;
    padding: var(--space-top) 14px;
    font-size: calc(var(--step-0) - 2px);
    color: rgba(var(--gray), 0.8);
    user-select: none;
    pointer-events: none;
  }
</style>
