<template>
  <div  class="table">
    <div class="table__row">
      <span></span>
      <span>Название</span>
      <span class="table__column-center">Дата</span>
      <span class="table__column-center">Размер</span>
    </div>
    <template v-if="files.length">
      <file-row
          class="table__row-file"
          v-for="file in files"
          :file="file"
          :key="file._id"
          @click="onFileClick(file)"
      ></file-row>
    </template>
    <div class="table__empty" v-else>Папка пуста</div>
  </div>
</template>

<script>
import { computed, defineComponent, } from 'vue';
import FileRow from "@/components/FileRow";
import { useStore } from "vuex";
import { onBeforeRouteUpdate, useRouter } from "vue-router";

export default defineComponent( {
  components: {
    FileRow,
  },
  setup() {
    const $store = useStore();
    const $router = useRouter();
    const breadCrumbs = computed(() => $store.getters.getBreadCrumbs);
    const files = computed(() => $store.getters.getFiles);

    onBeforeRouteUpdate((to) => {
      $store.dispatch("loadFiles", { parent: to.params.id });
    });

    const onFileClick = (file) => {
      if (file.type === "dir") {
        $router.push({ name: "folder", params: { id: file._id }});
      }
    }

    return {
      breadCrumbs,
      files,

      onFileClick,
    }
  }
})
</script>

<style scoped>
</style>