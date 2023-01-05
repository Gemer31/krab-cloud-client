<template>
  <div class="breadcrumbs">
    <router-link
        :class="{ 'breadcrumbs__disabled': breadCrumbs.length === 0 }"
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

export default defineComponent({
  setup() {
    const $store = useStore();
    const breadCrumbs = computed(() => $store.getters.getBreadCrumbs);
    return {
      breadCrumbs,
    }
  }
})
</script>

<style lang="less">
.breadcrumbs {
  font-size: 24px;
  padding: 12px;

  &__disabled {
    cursor: text;
    pointer-events: none;
    text-decoration: none;
  }

  & a {
    text-decoration: none;
  }

  * {
    margin-right: 8px;
  }
}
</style>