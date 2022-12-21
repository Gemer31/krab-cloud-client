<template>
  <div>
    <NavBar></NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import { defineComponent } from 'vue';
import { useStore } from "vuex";

export default defineComponent({
  components: { NavBar },
  setup() {
    const store = useStore();
    store.dispatch("auth");

    return {
    }
  }
})
</script>

<style lang="less">
@import "assets/styles/main";
</style>
