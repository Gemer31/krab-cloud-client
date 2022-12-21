<template>
  <common-form :title="'Регистрация'" @enter-click="onRegisterClick">
    <input placeholder="Имя" v-model="form.firstName">
    <input placeholder="Фамилия" v-model="form.lastName">
    <input type="email" placeholder="Email" v-model="form.email">
    <input type="password" placeholder="Password" v-model="form.password">
  </common-form>
</template>

<script>
import { defineComponent, reactive } from "vue";
import CommonForm from "@/components/CommonForm";
import { useStore } from "vuex";

export default defineComponent({
  components: { CommonForm },
  setup() {
    const $store = useStore();

    const form = reactive({});

    // const password = ref("");
    // const email = ref("");
    // const firstName = ref("");
    // const lastName = ref("");

    const onRegisterClick = () => {
      $store.dispatch("registration", form)
    };

    return {
      // password,
      // email,
      // lastName,
      // firstName,
      form,

      onRegisterClick,
    }
  }
})
</script>

<style scoped>

</style>