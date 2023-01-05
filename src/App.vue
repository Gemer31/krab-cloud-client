<template>
  <SnackBar/>
  <div>
    <NavBar></NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import SnackBar from "@/components/SnackBar";
import { defineComponent } from 'vue';
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default defineComponent({
  components: { NavBar, SnackBar },
  setup() {
    const $store = useStore();
    const $route = useRoute();

    console.log($route.fullPath);
    $store.dispatch("auth");

    return {
      $route
    }
  }
})
</script>

<style lang="less">
@import "assets/styles/main";
</style>
