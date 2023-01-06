<template>
  <div class="table">
    <div class="table__row">
      <span></span>
      <span>Название</span>
      <span class="table__column-center">Дата</span>
      <span class="table__column-center">Размер</span>
    </div>

    <div style="display: flex">
      <transition :name="animationName" mode="out-in">
        <div style="width: 100%" v-if="!loading && (files.length || filesInLoading.length)" :key="folderId">
          <file-row
              class="table__row-file"
              v-for="file in [...files, ...filesInLoading]"
              :file="file"
              :key="file._id"
              @click.prevent="onFileClick(file)"
          ></file-row>
        </div>
        <div class="table__empty" v-else>
          <transition name="fade" mode="out-in">
            <svg v-if="loading" version="1.1" width="60px" id="L9"
                 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                 y="0px"
                 viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve"
            >
              <path fill="#198A7E"
                    d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    dur="1s"
                    from="0 50 50"
                    to="360 50 50"
                    repeatCount="indefinite"/>
              </path>
            </svg>
            <span v-else>{{ searchText.length ? 'Ничего не найдено' : 'Папка пуста' }}</span>
          </transition>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref, watch, } from 'vue';
import FileRow from "@/components/FileRow";
import { useStore } from "vuex";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import eventBus from "@/eventBus";

export default defineComponent({
  props: {
    searchText: String,
  },
  components: {
    FileRow,
  },
  setup() {
    const $store = useStore();
    const $router = useRouter();
    const $route = useRoute();

    const animationName = ref("slide-left");

    const breadCrumbs = computed(() => $store.getters.getBreadCrumbs);
    const files = computed(() => $store.getters.getFiles);
    const filesInLoading = computed(() => $store.getters.getFilesInLoading);
    const loading = computed(() => $store.getters.getLoading);

    watch(loading, (value) => {
      if (!value) {
        animationName.value = "fade";
      }
    })

    onBeforeRouteUpdate((to) => {
      $store.dispatch("loadFiles", { parent: to.params.id });
    });

    eventBus.$on('animation-change', (params) => {
      animationName.value = params.name;
    });

    const onFileClick = (file) => {
      if (file.type === "dir") {
        animationName.value = "slide-left";
        $router.push({ name: "folder", params: { id: file._id } });
      }
    }

    return {
      breadCrumbs,
      files,
      filesInLoading,
      loading,
      folderId: $route?.params?.id,
      animationName,
      onFileClick,
    }
  }
})
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.25s ease-out;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.25s ease-out;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.fade-enter-active {
  transition: all 0.15s ease-out;
}

.fade-leave-active {
  transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>