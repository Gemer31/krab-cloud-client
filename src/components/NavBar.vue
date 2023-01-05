<template>
  <div class="navbar _main">
    <div class="navbar _zone">
      <img src="../assets/img/logo.svg" alt="">
      KRABCLOUD
    </div>
    <div class="navbar _zone">
      <template v-if="!isAuth">
        <div v-if="$route.name === 'registration'" class="navbar-button" @click="onNavigateClick('login')">Вход</div>
        <div v-else class="navbar-button" @click="onNavigateClick('registration')">Регистрация</div>
      </template>
      <div v-else class="navbar-button" @click="onLogoutClick">Выход</div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, watch, } from 'vue';
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const $store = useStore();
    const $router = useRouter();
    const $route = useRoute();

    const isAuth = computed(() => $store.getters.getAuth);
    const onLogoutClick = () => {
      $store.dispatch("logout").then(() => onNavigateClick("login"));
    };
    const onNavigateClick = (name) => $router.push({ name });

    watch($route, (value => {
      console.log($route);
    }));

    return {
      isAuth,
      $route,
      onNavigateClick,
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

  &-button {
    cursor: pointer;
  }

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
    & * {
      margin: 0 8px;
    }
  }
}
</style>