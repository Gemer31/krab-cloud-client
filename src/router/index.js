import LoginPage from "@/pages/LoginPage";
import RegistrationPage from "@/pages/RegistrationPage";
import NotFoundPage from "@/pages/NotFoundPage";
import FolderPage from "@/pages/FolderPage";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/folder/:id',
        name: 'folder',
        component: FolderPage,
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
    },
    {
        path: '/registration',
        name: 'registration',
        component: RegistrationPage,
    },
    {
        path: '/:catchAll(.*)',
        name: 'notFound',
        component: NotFoundPage,
    },
];

export default createRouter({
    history: createWebHashHistory(),
    routes,
})

