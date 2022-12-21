<template>
  <div class="table">
    <div v-if="dragEnter"
         @dragenter.prevent.stop="onDragEnter($event)"
         @dragleave.prevent.stop="onDragLeave($event)"
         @dragover.prevent.stop="onDragEnter($event)"
    >
      <button type="button" @click="popupVisible = true">Создать новую папку</button>
      <button v-if="dirStack.length > 1" type="button" @click="onBackClick">Назад</button>

      <label class="input-file">
        <input multiple type="file" @change="fileUploadHandler($event)">
        <span>Загрузить файл</span>
      </label>

      <div class="table__row">
        <span></span>
        <span>Название</span>
        <span class="table__column-center">Дата</span>
        <span class="table__column-center">Размер</span>
      </div>
      <file-row
          class="table__row-file"
          v-for="file in files"
          :file="file"
          :key="file._id"
          @click="onFileClick(file)"
      ></file-row>

      <popup
          v-if="popupVisible"
          :button-text="'Создать'"
          @submit="onCreateDirClick"
      >
        <input type="text" v-model="newDirName">
      </popup>
    </div>
    <div v-else
         class="drop-area"
         @dragenter.prevent.stop="onDragEnter($event)"
         @dragleave.prevent.stop="onDragLeave($event)"
         @dragover.prevent.stop="onDragEnter($event)"
         @drop.prevent.stop="onDrop($event)"
    >Перетащите файлы</div>
  </div>
</template>

<script>
import { defineComponent, ref, } from 'vue';
import FileRow from "@/components/FileRow";
import Popup from "@/components/Popup";
import { useStore } from "vuex";

export default defineComponent( {
  props: ["files"],
  components: {
    FileRow,
    Popup,
  },
  setup() {
    const $store = useStore();
    const popupVisible = ref(false);
    const newDirName = ref("");
    const dragEnter = ref(false);
    const dirStack = ref([null]);
    const currentDir = ref(null);

    const onFileClick = (file) => {
      if (file.type === "dir") {
        dirStack.value.push(file._id);
        currentDir.value = file._id;
        $store.dispatch("loadFiles", { parent: file._id });
      }
    }
    const onCreateDirClick = () => {
      const file = { name: newDirName.value, type: "dir" };
      if (currentDir.value) {
        file.parent = currentDir.value;
      }

      $store.dispatch("createDir", file)
      .then(() => {
        newDirName.value = "";
        popupVisible.value = false;
      })
    }
    const onBackClick = () => {
      dirStack.value.pop();
      currentDir.value = dirStack.value[dirStack.value.length - 1];
      $store.dispatch("loadFiles", { parent: currentDir.value });
    }
    const fileUploadHandler = (event) => {
      const files = [...event.target.files];
      files.forEach((file) => {
        $store.dispatch("uploadFile", { file, parent: currentDir.value });
      })
    }
    const onDragEnter = (event) => {
      event.preventDefault();
      event.stopPropagation();
      console.log("enter");
      dragEnter.value = true;
    };
    const onDragLeave = () => {
      // event.preventDefault();
      // event.stopPropagation();
      console.log("leave");
      // dragEnter.value = false;
    };
    const onDrop = (event) => {
      // event.preventDefault();
      // event.stopPropagation();
      const files = [...event.dataTransfer.files];
      console.log(files);
    };

    return {
      popupVisible,
      newDirName,
      currentDir,
      dirStack,
      dragEnter,

      onFileClick,
      onCreateDirClick,
      onBackClick,

      fileUploadHandler,

      onDragEnter,
      onDragLeave,
      onDrop,
    }
  }
})
</script>

<style scoped>
.drop-area {
  height: 1000px;
  width: 1000px;
}


</style>