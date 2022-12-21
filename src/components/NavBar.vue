<template>
  <div class="navbar _main">
    <div class="navbar _zone">
      <img src="../assets/img/logo.svg" alt="">
      KRABCLOUD
    </div>
    <div class="navbar _zone">
      <template v-if="!isAuth">
        <router-link :to="{ name: 'login' }">Войти</router-link>
        <router-link :to="{ name: 'registration' }">Регистрация</router-link>
      </template>
      <div v-else @click="onLogoutClick">Выход</div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
} from 'vue';
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const $store = useStore();
    const $router = useRouter();

    const isAuth = computed(() => $store.getters.getAuth);
    const onLogoutClick = () => {
      $store.dispatch("logout").then(() => {
        $router.push({ name: "login" });
      });
    }

    return {
      isAuth,

      onLogoutClick,
    }
  }
})
</script>

<style lang="less">
@import "../assets/styles/colors";

.navbar {
  display: flex;
  align-items: center;

  * {
    color: white;
  }

  &._main {
    width: auto;
    padding: 10px 15px;
    background: @main;
    justify-content: space-between;
  }

  &._zone {
    & > {
      margin: 0 8px;
    }
  }
}
</style>