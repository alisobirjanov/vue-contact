import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "contacts",
        alias: '/contacts',
        component: () => import('./view/Contacts.vue'),
    },
    {
        path: "/contacts/:idx",
        name: "create",
        component: () => import('./view/AddEdit.vue'),
    },
]

export default createRouter({
    history: createWebHistory(),
    routes,
    linkExactActiveClass: "active"
});