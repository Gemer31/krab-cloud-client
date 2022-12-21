import { createStore } from 'vuex'
import axios from "axios";

const SERVER = "http://localhost:5000";

export default createStore({
    state() {
        return {
            user: null,
            files: [],
            isAuth: false,
        }
    },
    mutations: {
        setUser: (store, payload) => {
            store.user = payload?.user;
            store.isAuth = !!payload?.user;
        },
        setFiles: (store, payload) => {
            store.files = payload;
        }
    },
    getters: {
        getAuth: (store) => (store.isAuth),
        getFiles: (store) => (store.files),
    },
    actions: {
        // eslint-disable-next-line no-unused-vars
        login({ commit }, payload) {
            axios.post(`${ SERVER }/api/auth/login`, payload)
                .then(response => {
                    commit("setUser", response.data);
                    localStorage.setItem("token", response.data.token);
                });
        },
        logout({ commit }) {
            commit("setUser");
            localStorage.removeItem("token");
        },
        auth({ dispatch, commit }) {
            axios.get(
                `${ SERVER }/api/auth/auth`,
                { headers: { Authorization: `Bearer ${ localStorage.getItem("token") }` } },
            ).then(response => {
                commit("setUser", response.data);
                localStorage.setItem("token", response.data.token);
            }).catch(() => {
                dispatch("logout");
                // localStorage.clear();
                // window.location.href = '/';
            });
        },
        // eslint-disable-next-line no-unused-vars
        registration({ commit }, payload) {
            axios.post(`${ SERVER }/api/auth/registration`, payload)
                .then(response => {
                    console.log(response);
                })
        },
        loadFiles({ commit }, { parent }) {
            axios.get(
                `${ SERVER }/api/files` + (parent ? `?parent=${ parent }` : ""),
                { headers: { Authorization: `Bearer ${ localStorage.getItem("token") }` } },
            ).then(response => {
                commit('setFiles', response.data.files);
            })
        },
        createDir({ dispatch, commit }, payload) {
            axios.post(
                `${ SERVER }/api/files`,
                payload,
                { headers: { Authorization: `Bearer ${ localStorage.getItem("token") }` } },
            ).then(response => {
                commit('setFiles', response.data.files);
                dispatch("loadFiles", { parent: payload.parent });
            })
        },
        uploadFile({ dispatch, commit }, payload) {
            const file = payload.file;
            const dirId = payload.dirId;

            const formData = new FormData();
            formData.append("file", file);

            if (dirId) {
                formData.append("parent", dirId);
            }
            axios.post(
                `${ SERVER }/api/files/upload`,
                formData,
                {
                    headers: { Authorization: `Bearer ${ localStorage.getItem("token") }` },
                    // eslint-disable-next-line no-unused-vars
                    onUploadProgress: progressEvent => {
                        // const totalLength = progressEvent.lengthComputable
                        //     ? progressEvent.total
                        //     : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader("x-decompressed-content-length");
                        //
                        // console.log(totalLength);
                        // if (totalLength) {
                        //     let progress = Math.round((progressEvent.loaded*100) / totalLength);
                        //     console.log(progress);
                        // }
                    }
                },
            ).then(response => {
                commit('setFiles', response.data.files);
                dispatch("loadFiles", { parent: payload.parent });
            })
        },
    }
})