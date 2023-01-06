<template>
  <div class="common-form">
    <span>{{ title }}</span>
    <slot></slot>
    <button @click.prevent="$emit('enter-click')">Войти</button>
  </div>
</template>

<script>
import { defineComponent, } from 'vue';

export default defineComponent({
  props: {
    title: String,
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less">
@import "../assets/styles/colors";

.common-form {
  display: flex;
  width: 600px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 20px;
  border-radius: 12px;
  border: 1px solid @main;

  &__error {
    color: red;
  }

  * {
    margin-top: 5px;
  }

  input {
    width: 100%;
  }
}
</style>