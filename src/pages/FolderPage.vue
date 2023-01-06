<template>
  <div class="folder-page"
       v-if="!dragEnter"
       @dragenter.prevent.stop="onDragEnter"
       @dragover.prevent.stop="onDragEnter"
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
       @dragenter.prevent.stop="onDragEnter"
       @dragleave.prevent.stop="onDragLeave"
       @dragover.prevent.stop="onDragEnter"
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

    const isAuth = computed(() => $store.getters.getAuth);
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
    const availableSpace = computed(() =>
        `${getSize($store.getters.getUser?.usedSpace, 'Mb')}/${getSize($store.getters.getUser?.diskSpace, 'Mb')}`
    );

    watch(isAuth, (value => {
      value && $store.dispatch("loadFiles", { parent: $route?.params?.id });
    }), { immediate: true });

    const onDragEnter = () => dragEnter.value = true;
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

.folder-page {
  height: calc(100% - 65px);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & > {
    padding: 0 20px;
  }
}
</style>