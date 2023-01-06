<template>
  <div class="table__row" :class="{ '_in-progress': file.progress }">
    <img v-if="file.type === 'dir'" src="../assets/img/folder.svg" alt="">
    <img v-else src="../assets/img/file.svg" alt="">
    <span>{{ file.name }}</span>

    <div v-if="file.progress" class="table__row-progress">
      <progress max="100" :value="file.progress"></progress>
      <span>{{ file.progress }}%</span>
    </div>
    <template v-else>
      <span class="table__column-center">{{ date }}</span>
      <span class="table__column-center">{{ size }}</span>
      <span class="table__column-center">
        <img class="table__column-center__button" src="../assets/img/download.svg" @click.prevent.stop="onDownloadClick">
        <img class="table__column-center__button" src="../assets/img/cross.svg" @click.prevent.stop="onDeleteClick">
      </span>
    </template>
  </div>
</template>

<script>
import {
  defineComponent, ref,
} from 'vue';
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import eventBus from "@/eventBus";
import { getSize } from "@/helpers/file-formatter.helper";
export default defineComponent( {
  props: ["file"],
  setup(props) {
    const $store = useStore();
    const $route = useRoute();

    const date = ref(props.file.date?.split("T")[0]);
    const size = ref(props.file.size ? getSize(props.file.size) : null);

    const onDeleteClick = () => {
      $store.dispatch("deleteFile", { id: props.file._id, parent: $route?.params?.id })
          .catch((error) => eventBus.$emit('showSnack', { message: error.response.data.message }));
    };

    const onDownloadClick = () => {
    };

    return {
      date,
      size,

      onDownloadClick,
      onDeleteClick,
    }
  }
})
</script>

<style scoped lang="less">

</style>