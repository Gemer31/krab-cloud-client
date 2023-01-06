<template>
  <div>
    <button class="create-btn" type="button" @click="popupVisible = true">Создать папку</button>
    <label class="input-file">
      <input multiple type="file" :placeholder="asdasd" @change="fileUploadHandler($event)">
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
import { defineComponent, ref, } from 'vue';
import Popup from "@/components/Popup";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import eventBus from "@/eventBus";

export default defineComponent({
  components: {
    Popup,
  },
  setup() {
    const $store = useStore();
    const $route = useRoute();

    const popupVisible = ref(false);
    const newDirName = ref("");

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

    const fileUploadHandler = (event) => {
      const files = [ ...event.target.files ];
      eventBus.$emit('animation-change', { name: "" });
      files.forEach((file) => {
        $store.dispatch("uploadFile", {
          file,
          parent: $route?.params.id,
        });
      })
    };

    return {
      popupVisible,
      newDirName,

      onClosePopupClick,
      onCreateDirClick,
      fileUploadHandler,
    }
  }
})
</script>

<style lang="less">
.create-btn {
  padding: 6px;
  margin-right: 10px;
}

.input-file {
  position: relative;
  display: inline-block;
}
.input-file span {
  position: relative;
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  border-radius: 4px;
  padding: 5px 20px;
  box-sizing: border-box;
  border: dashed;
}
.input-file input[type=file] {
  position: absolute;
  z-index: -1;
  opacity: 0;
  display: block;
  width: 0;
  height: 0;
}
</style>