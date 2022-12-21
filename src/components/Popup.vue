<template>
  <teleport to="html">
    <div class="overlay">
      <div class="popup">
        <slot></slot>
        <button @click.prevent="$emit('submit')">{{ buttonText }}</button>
      </div>
    </div>
  </teleport>
</template>

<script>
import {
  defineComponent,
} from 'vue';

export default defineComponent({
  props: ["buttonText"],
  setup() {

  }
})
</script>

<style scoped>
.popup {
  padding: 20px;
  background: white;
  border-radius: 12px;
}

.overlay {
  top: 0;
  position: fixed;
  background: black;
  opacity: .5;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>