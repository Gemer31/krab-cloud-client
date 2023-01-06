<template>
  <div class="page"
       v-if="!dragEnter"
       @dragenter.prevent.stop="onDragEnter($event)"
       @dragover.prevent.stop="onDragEnter($event)"
  >
    <div class="folder-page__header">
      <bread-crumbs></bread-crumbs>
      <span>{{availableSpace}}</span>
    </div>
    <div class="folder-page__header">
      <buttons-bar></buttons-bar>
      <input class="search" type="text" placeholder="Введите название файла" v-model="searchChanged">
    </div>

    <file-table :search-text="searchText"></file-table>
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
import eventBus from "@/eventBus";
import { getSize } from "@/helpers/file-formatter.helper";

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
    const searchText = ref("");
    let timer = null;

    const searchChanged = computed({
      get() {
        return searchText.value;
      },
      set(value) {
        console.log(value);
        searchText.value = value;
        clearTimeout(timer);
        timer = setTimeout(() => {
          value.length
              ? $store.dispatch("searchFiles", { searchText: value })
              : $store.dispatch("loadFiles", { parent: $route?.params?.id });
        }, value.length ? 2000 : 0);
      }
    });

    const isAuth = computed(() => $store.getters.getAuth);
    const availableSpace = computed(() =>
        `${getSize($store.getters.getUser?.usedSpace, 'Mb')}/${getSize($store.getters.getUser?.diskSpace, 'Mb')}`
    );

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
      eventBus.$emit('animation-change', { name: "" });
      files.forEach((file) => {
        $store.dispatch("uploadFile", {
          file,
          parent: $route?.params.id,
        });
      })
    };

    return {
      dragEnter,
      availableSpace,
      searchChanged,
      searchText,

      onDragEnter,
      onDragLeave,
      onDrop,
    }
  }
})
</script>

<style scoped lang="less">
.folder-page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search {
  padding: 6px;
}

.drop-area {
  height: calc(100% - 95px);
  border: dashed;
  margin: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>