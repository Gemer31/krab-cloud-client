<template>
  <div class="form">
    <span>{{ title }}</span>
    <slot></slot>
    <button @click.prevent="$emit('enter-click')">Войти</button>
  </div>
</template>

<script>
import {
  defineComponent,
} from 'vue';

export default defineComponent({
  props: {
    title: String,
  },
  setup() {
    return {

    }
  }
})
</script>

<style lang="less">
.common-form {
  &__error {
    color: red;
  }
}
</style>