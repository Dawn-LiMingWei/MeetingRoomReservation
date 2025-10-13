import type { App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

/**
 * 创建路由
 */
const router = createRouter({
    history: createWebHashHistory(),
});

// 全局注册 router
export function setupRouter(app: App<Element>) {
    app.use(router);
}

export default router;
