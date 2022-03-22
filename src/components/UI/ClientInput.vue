<template>
  <div>
    <span v-if="!isInner" class="text">{{ placeholder }}</span>
    <div class="input">
      <input :type="type" :placeholder="isInner ? placeholder : ''" v-model.trim="value">
      <slot></slot>
    </div>
    <span v-if="limit" class="limit">{{~(value.length - 1) ? value.length - 1 : 0}}/{{limit}}</span>
  </div>
</template>

<script>
  export default {
    name: 'InputClient',
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

<style>
  .input i:not(.noPoint) {
    pointer-events: none;
  }
</style>

<style scoped>
  input {
    padding: 10px calc(var(--step-0) * 2);
    width: 100%;
  }

  .limit {
    display: flex;
    align-items: center;
    padding: var(--space-top) 14px;
    font-size: calc(var(--step-0) - 2px);
    color: rgba(var(--gray), 0.8);
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

  .input {
    --size: calc(var(--step-0) - 2px);
    position: relative;
  }

  .input>*:not(input) {
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
