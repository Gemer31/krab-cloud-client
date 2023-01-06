<template>
  <div class="breadcrumbs">
    <img class="breadcrumbs__return" v-if="breadCrumbs.length" src="../assets/img/return.svg" @click.prevent="onBackClick">
    <router-link
        :class="{ 'breadcrumbs__disabled': breadCrumbs.length === 0, '_main': breadCrumbs.length === 0 }"
        :to="{ name: 'folder', params: { id: 'root' } }"
    >Мой диск</router-link>
    <template v-for="( item, index ) in breadCrumbs" :key="item.parent">
      <img src="../assets/img/arrow.svg" alt="">
      <router-link
          :class="{ 'breadcrumbs__disabled': index === (breadCrumbs.length - 1) }"
          :to="item.parent ? { name: 'folder', params: { id: item.parent } } : {}"
      >{{ item.name }}</router-link>
    </template>
  </div>
</template>

<script>
import { computed, defineComponent, } from 'vue';
import { useStore } from "vuex";
import eventBus from "@/eventBus";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const $store = useStore();
    const $router = useRouter();

    const breadCrumbs = computed(() => $store.getters.getBreadCrumbs);


    const onBackClick = () => {
      const parent = breadCrumbs.value.length > 1
          ? breadCrumbs.value[breadCrumbs.value.length - 1].parent
          : "root";
      eventBus.$emit('animation-change', { name: "slide-right" });
      $router.push({ name: "folder", params: { id: parent }});
    }

    return {
      breadCrumbs,
      onBackClick,
    }
  }
})
</script>

<style lang="less">
.breadcrumbs {
  font-size: 24px;
  padding: 12px;
  display: flex;
  align-items: center;

  &__return {
    padding: 0 6px;
    cursor: pointer;
  }

  &__disabled {
    cursor: text;
    pointer-events: none;
    text-decoration: none;

    &._main {
      margin-left: 40px;
    }
  }

  & a {
    text-decoration: none;
  }

  * {
    margin-right: 8px;
  }
}
</style>