<template>
  <div class="breadcrumbs">
    <span>Мой диск</span>
    <template v-for="directory in directories" :key="directory">
      <img src="../assets/img/arrow.svg" alt="">
      <span>{{ directory }}</span>
    </template>
  </div>
</template>

<script>
import {
  defineComponent,
} from 'vue';

export default defineComponent({
  props: ["title"],
  setup() {
    const directories = ["dir_1", "dir_2"];

    return {
      directories,
    }
  }
})
</script>

<style lang="less">
.breadcrumbs {
  font-size: 24px;
  padding: 12px;

  * {
    margin-right: 8px;
  }
}
</style>