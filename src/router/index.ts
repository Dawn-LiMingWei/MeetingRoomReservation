import type { App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import BasicLayout from "@/layout/index.vue"

const routes = [
    {
        path: '/',
        component: BasicLayout,
        redirect: '/login',
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: () => import('@/views/dashboard/index.vue'),
                meta: { title: "首页" }
            },
            {
                path: '/hall',
                name: 'Hall',
                component: () => import('@/views/hall/index.vue'),
                meta: { title: "大厅" }
            },

        ]
    },
    {
        path: '/user',
        component: BasicLayout,
        redirect: '/user/profile',
        children: [
            {
                path: 'profile',
                name: 'Profile',
                component: () => import('@/views/system/user/profile/index.vue'),
                meta: { title: "用户信息"}
            },
            {
                path: 'settings',
                name: 'Settings',
                component: () => import('@/views/system/user/settings/index.vue'),
                meta: { title: "用户设置"}
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
        meta: { hidden: true }
    }
]

/**
 * 创建路由
 */
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// 全局注册 router
export function setupRouter(app: App<Element>) {
    app.use(router);
}

export default router;
