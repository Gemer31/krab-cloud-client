<template>
  <transition name="open">
    <teleport to="html">
      <div class="overlay">
        <div class="popup">
          <div class="popup__header">
            <span>{{title}}</span>
            <img class="popup__cross" src="../assets/img/cross.svg" @click.prevent="$emit('close-click')">
          </div>
          <slot></slot>
          <button @click.prevent="$emit('submit')">{{ buttonText }}</button>
        </div>
      </div>
    </teleport>
  </transition>
</template>

<script>
import {
  defineComponent,
} from 'vue';

export default defineComponent({
  props: {
    title: String,
    buttonText: String,
  },
  setup() {

    return {
    }
  }
})
</script>

<style lang="less" scoped>
.popup {
  padding: 20px;
  background: white;
  border-radius: 12px;
  opacity: 1;

  &__cross {
    width: 14px;
    height: 14px;

    &:hover {
      cursor: pointer;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
}

.overlay {
  top: 0;
  position: fixed;
  background: black;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, .5);
}

.open-enter-active {
  transition: all 0.15s ease-out;
}

.open-leave-active {
  transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1);
}

.open-enter-from,
.open-leave-to {
  opacity: 0;
}
</style>