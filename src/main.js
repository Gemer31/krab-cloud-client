import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store'
import axios from 'axios'
import router from '@/router'

const app = createApp(App);

// Add a 401 response interceptor
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        // handle error: inform user, go to login, etc
        localStorage.clear();
        router.push({ name: "login" });
    } else {
        return Promise.reject(error);
    }
});

app.use(store);
app.use(router);
app.mount('#app')