import { defineStore } from 'pinia'
import {type RouteRecordRaw, useRouter} from 'vue-router'

export const useMenuStore = defineStore('menu', () => {
    const router = useRouter()

    // 从路由生成菜单
    const menuRoutes = computed(() => {
        const routes = router.getRoutes()
        const layoutRoute = routes.find(route =>
            route.path === '/' && route.children && route.children.length > 0
        )

        if (layoutRoute && layoutRoute.children) {
            return filterMenuRoutes(layoutRoute.children)
        }

        return []
    })

    // 过滤菜单路由
    const filterMenuRoutes = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
        return routes.filter(route => {
            // 不显示隐藏的路由
            if (route.meta?.hidden) return false

            // 必须有标题
            return route.meta?.title;


        }).map(route => ({
            ...route,
            children: route.children ? filterMenuRoutes(route.children) : []
        }))
    }

    return {
        menuRoutes
    }
})
