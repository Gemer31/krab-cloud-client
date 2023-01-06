import { createStore } from 'vuex'
import axios from "axios";

const SERVER = "http://localhost:5000";

export default createStore({
    state() {
        return {
            user: null,
            files: [],
            filesInLoading: [],
            breadCrumbs: [],
            isAuth: false,
            loading: true,
        }
    },
    mutations: {
        setLoading: (store, value) => store.loading = value,
        setUser: (store, payload) => {
            store.user = payload?.user;
            store.isAuth = !!payload?.user;
        },
        setFiles: (store, payload) => {
            store.files = payload;
        },
        setBreadCrumbs: (store, payload) => {
            store.breadCrumbs = payload;
        },
        setFileInLoading: (store, payload) => {
            const file = store.filesInLoading?.find((item) => payload._id === item._id);
            if (file) {
                file.progress = payload.progress;
            } else {
                store.filesInLoading = [...store.filesInLoading, payload];
            }
        },
        removeFileInLoading: (store, id) => {
            store.filesInLoading = store.filesInLoading?.filter((item) => item._id !== id);
        }
    },
    getters: {
        getAuth: (store) => (store.isAuth),
        getUser: (store) => (store.user),
        getFiles: (store) => (store.files),
        getFilesInLoading: (store) => (store.filesInLoading),
        getBreadCrumbs: (store) => (store.breadCrumbs),
        getLoading: (store) => store.loading,
    },
    actions: {
        // eslint-disable-next-line no-unused-vars
        login({ commit }, payload) {
            return axios.post(`${SERVER}/api/auth/login`, payload)
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
                `${SERVER}/api/auth/auth`,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
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
            return axios.post(`${SERVER}/api/auth/registration`, payload);
        },
        loadFiles({ commit }, { parent }) {
            commit("setLoading", true);
            return axios.get(
                `${SERVER}/api/files` + (parent !== 'root' ? `?parent=${parent}` : ""),
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
            ).then(response => {
                const currentDir = response.data.parent;
                const breadCrumbs = currentDir
                    ? [...currentDir.parents, { name: currentDir.name, parent: currentDir.parent}]
                    : [];

                commit('setFiles', response.data.files);
                commit('setBreadCrumbs', breadCrumbs);
                commit("setLoading", false);
            })
        },
        searchFiles({ commit }, { searchText }) {
            commit("setLoading", true);
            return axios.get(
                `${SERVER}/api/files/search?text=${searchText}`,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
            ).then(response => {
                commit('setFiles', response.data.files);
                commit("setLoading", false);
            })
        },
        createDir({ dispatch, commit }, payload) {
            axios.post(
                `${SERVER}/api/files`,
                payload,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
            ).then(response => {
                commit('setFiles', response.data.files);
                dispatch("loadFiles", { parent: payload.parent || "root" });
            })
        },
        deleteFile({ dispatch, commit }, { id, parent }) {
            return axios.delete(
                `${SERVER}/api/files?id=${id}`,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
            ).then(response => {
                dispatch("loadFiles", { parent });
            });
        },
        uploadFile({ dispatch, commit }, { file, parent }) {
            const formData = new FormData();
            const fakeId = file.name;
            formData.append("file", file);
            parent && formData.append("parent", parent);
            return axios.post(
                `${SERVER}/api/files/upload`,
                formData,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    // eslint-disable-next-line no-unused-vars
                    onUploadProgress: progressEvent => {
                        console.log(Math.round(progressEvent.loaded / progressEvent.total * 100));
                        commit("setFileInLoading", {
                            _id: fakeId,
                            name: file.name,
                            progress: Math.round(progressEvent.loaded / progressEvent.total * 100),
                        });
                    }
                },
            ).then(response => {
                dispatch("loadFiles", { parent })
                    .then(() => commit("removeFileInLoading", fakeId));
            });
        },
    }
})