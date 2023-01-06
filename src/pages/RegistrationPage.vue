<template>
  <div class="registration-page">
    <common-form :title="'Регистрация'" @enter-click="onRegisterClick">
      <input placeholder="Имя" v-model="form.firstName">
      <input placeholder="Фамилия" v-model="form.lastName">
      <input type="email" placeholder="Email" v-model="form.email">
      <input type="password" placeholder="Password" v-model="form.password">
    </common-form>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import CommonForm from "@/components/CommonForm";
import { useStore } from "vuex";
import eventBus from "@/eventBus";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { CommonForm },
  setup() {
    const $store = useStore();
    const $router = useRouter();

    const form = reactive({});

    const onRegisterClick = () => {
      $store.dispatch("registration", form)
          .then((response) => {
            eventBus.$emit('showSnack', { type: "success", message: response.data.message, });
            $store.dispatch("login", { email: form.email, password: form.password })
                .then(() => $router.push({ name: "folder", params: { id: "root" } }))
          })
          .catch((error) => {
            eventBus.$emit('showSnack', {
              type: "error",
              message: error.response.data.message,
            });
          })
    };

    return {
      form,

      onRegisterClick,
    }
  }
})
</script>

<style scoped>
.registration-page {
  display: flex;
  align-items: center;
  height: 50%;
  justify-content: center;
}
</style>