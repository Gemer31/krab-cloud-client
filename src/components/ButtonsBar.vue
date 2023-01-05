<template>
  <div>
    <button type="button" @click="popupVisible = true">Создать новую папку</button>
    <button v-if="breadCrumbs.length" type="button" @click="onBackClick">Назад</button>

    <label class="input-file">
      <input multiple type="file" @change="fileUploadHandler($event)">
      <span>Загрузить файл</span>
    </label>

    <popup
        v-if="popupVisible"
        :button-text="'Создать'"
        :title="'Новая папка'"
        @submit="onCreateDirClick"
        @close-click="onClosePopupClick"
    >
      <input type="text" placeholder="Имя" v-model="newDirName">
    </popup>
  </div>
</template>

<script>
import { computed, defineComponent, ref, } from 'vue';
import Popup from "@/components/Popup";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  components: {
    Popup,
  },
  setup() {
    const $store = useStore();
    const $router = useRouter();
    const $route = useRoute();

    const popupVisible = ref(false);
    const newDirName = ref("");
    const breadCrumbs = computed(() => $store.getters.getBreadCrumbs);

    const onCreateDirClick = () => {
      const file = { name: newDirName.value, type: "dir" };

      if ($route?.params.id !== "root") {
        file.parent = $route?.params.id;
      }

      $store.dispatch("createDir", file)
          .then(() => {
            newDirName.value = "";
            popupVisible.value = false;
          })
    }

    const onClosePopupClick = () => {
      popupVisible.value = false;
      newDirName.value = "";
    }

    const onBackClick = () => {
      const parent = breadCrumbs.value.length > 1
          ? breadCrumbs.value[breadCrumbs.value.length - 1].parent
          : "root";
      $router.push({ name: "folder", params: { id: parent }});
    }

    const fileUploadHandler = (event) => {
      const files = [...event.target.files];
      files.forEach((file) => {
        $store.dispatch("uploadFile", {
          file,
          parent: breadCrumbs.value.length ? breadCrumbs.value[breadCrumbs.value.length - 1].parent : null,
        });
      })
    };

    return {
      popupVisible,
      newDirName,
      breadCrumbs,

      onClosePopupClick,
      onCreateDirClick,
      onBackClick,
      fileUploadHandler,
    }
  }
})
</script>

<style lang="less">

</style>