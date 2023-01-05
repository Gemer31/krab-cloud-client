<template>
  <div class="page"
       v-if="!dragEnter"
       @dragenter.prevent.stop="onDragEnter($event)"
       @dragover.prevent.stop="onDragEnter($event)"
  >
    <bread-crumbs></bread-crumbs>
    <buttons-bar></buttons-bar>
    <file-table></file-table>
  </div>
  <div v-else
       class="drop-area"
       @dragenter.prevent.stop="onDragEnter($event)"
       @dragleave.prevent.stop="onDragLeave($event)"
       @dragover.prevent.stop="onDragEnter($event)"
       @drop.prevent.stop="onDrop($event)"
  >Перетащите файлы</div>
</template>

<script>
import { computed, defineComponent, ref, watch } from "vue";
import FileTable from "@/components/FileTable";
import BreadCrumbs from "@/components/BreadCrumbs";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import ButtonsBar from "@/components/ButtonsBar";

export default defineComponent({
  components: {
    ButtonsBar,
    FileTable,
    BreadCrumbs,
  },
  setup() {
    const $store = useStore();
    const $route = useRoute();
    const dragEnter = ref(false);

    const isAuth = computed(() => $store.getters.getAuth);
    const breadCrumbs = computed(() => $store.getters.getBreadCrumbs);

    watch(isAuth, (value => {
      value && $store.dispatch("loadFiles", { parent: $route?.params?.id });
    }));

    const onDragEnter = (event) => dragEnter.value = true;
    const onDragLeave = () => dragEnter.value = false;
    const onDrop = (event) => {
      fileUploadHandler(event);
      dragEnter.value = false;
    };
    const fileUploadHandler = (event) => {
      const files = [...event.dataTransfer.files];
      files.forEach((file) => {
        $store.dispatch("uploadFile", {
          file,
          parent: breadCrumbs.value.length ? breadCrumbs.value[breadCrumbs.value.length - 1].parent : null,
        });
      })
    };

    return {
      dragEnter,

      onDragEnter,
      onDragLeave,
      onDrop,
    }
  }
})
</script>

<style scoped lang="less">
.drop-area {
  height: calc(100% - 95px);
  border: dashed;
  margin: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>