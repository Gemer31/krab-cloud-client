<template>
  <common-form :title="'Авторизация'" @enter-click="onLoginClick">
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
  </common-form>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import CommonForm from "@/components/CommonForm";

export default defineComponent({
  components: { CommonForm },
  setup() {
    const $store = useStore();
    const $router = useRouter();

    const password = ref("");
    const email = ref("");
    const onLoginClick = () => {
      $store.dispatch("login", { email: email.value, password: password.value })
      .then(() => $router.push({ name: "main" }));
    }

    return {
      password,
      email,

      onLoginClick,
    }
  }
})
</script>

<style scoped lang="less">

</style>