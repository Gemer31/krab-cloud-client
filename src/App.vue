<template>
  <SnackBar/>
  <NavBar></NavBar>
  <router-view></router-view>
</template>

<script>
import NavBar from "@/components/NavBar";
import SnackBar from "@/components/SnackBar";
import { defineComponent } from 'vue';
import { useStore } from "vuex";

export default defineComponent({
  components: { NavBar, SnackBar },
  setup() {
    const $store = useStore();

    $store.dispatch("auth");

    return {}
  }
})
</script>

<style lang="less">
@import "assets/styles/main";
</style>
