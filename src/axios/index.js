import axios from 'axios'
import router from 'vue-router'

// Add a 401 response interceptor
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        // handle error: inform user, go to login, etc
        localStorage.clear();
        router. 
        window.location.href = '/';
    } else {
        return Promise.reject(error);
    }
});

const token = localStorage.getItem('user-token')
if (token) axios.defaults.headers.common['Authorization'] = token
