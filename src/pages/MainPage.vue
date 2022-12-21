<template>
  <div class="page">
    <bread-crumbs></bread-crumbs>
    <file-table :files="files"></file-table>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
import FileTable from "@/components/FileTable";
import BreadCrumbs from "@/components/BreadCrumbs";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    FileTable, BreadCrumbs
  },
  setup() {
    const $store = useStore();
    const files = computed(() => $store.getters.getFiles);

    $store.dispatch("loadFiles", {});

    return {
      files
    }
  }
})
</script>

<style scoped lang="less">

</style>