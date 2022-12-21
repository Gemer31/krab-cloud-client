<template>
  <div class="table__row">
    <img v-if="file.type === 'dir'" src="../assets/img/folder.svg" alt="">
    <img v-else src="../assets/img/file.svg" alt="">

    <span>{{ file.name }}</span>
    <span class="table__column-center">{{ date }}</span>
    <span class="table__column-center">{{ file.size }}</span>
  </div>
</template>

<script>
import {
  defineComponent, ref,
} from 'vue';
export default defineComponent( {
  props: ["file"],
  setup(props) {
    const date = ref(props.file.date.split("T")[0]);
    return {
      date
    }
  }
})
</script>

<style scoped lang="less">
</style>