<template>
  <el-container class="layout-container">
    <!-- 顶部 Header -->
    <el-header class="layout-header">
      <div class="header-left">
        <div class="logo" @click="router.push('/dashboard')">
          <img src="/vite.svg" alt="Logo" />
          <span v-show="!isCollapse" class="logo-text">会议室预约系统</span>
        </div>
      </div>

      <div class="header-center">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">

          <el-breadcrumb-item
              v-for="item in breadcrumbList"
              :key="item.path"
              :to="item.path"
          >
            {{ item.meta?.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="header-right">
        <!-- 全屏切换 -->
        <el-tooltip :content="isFullscreen ? '退出全屏' : '全屏'">
          <el-button
              :icon="FullScreen"
              circle
              @click="toggleFullscreen"
          />
        </el-tooltip>

        <!-- 用户菜单 -->
        <el-dropdown @command="handleUserCommand">
          <span class="user-dropdown">
            <el-avatar :size="32" :src="userAvatar" />
            <span class="user-name">{{ userInfo?.username || "Unknown" }}</span>
            <el-icon><ArrowDown /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">
                <el-icon><User /></el-icon>
                个人信息
              </el-dropdown-item>
              <el-dropdown-item command="settings">
                <el-icon><Setting /></el-icon>
                个人设置
              </el-dropdown-item>
              <el-dropdown-item divided command="logout">
                <el-icon><SwitchButton /></el-icon>
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>

    <el-container class="main-container">
      <!-- 侧边栏 Aside -->
      <el-aside
          :width="isCollapse ? '64px' : '220px'"
          class="layout-aside"
      >
        <!-- 菜单区域 -->
        <el-scrollbar class="sidebar-scrollbar">
          <el-menu
              :default-active="activeMenu"
              :collapse="isCollapse"
              :collapse-transition="false"
              :unique-opened="true"
              router
              class="layout-menu"
              background-color="#304156"
              text-color="#bfcbd9"
              active-text-color="#409eff"
          >
            <!-- 菜单项 -->
            <template v-for="item in menuRoutes" :key="item.path">
              <!-- 没有子菜单 -->
              <el-menu-item
                  v-if="!item.children || item.children.length === 0"
                  :index="item.path"
              >
                <el-icon v-if="item.meta?.icon">
                  <component :is="item.meta.icon" />
                </el-icon>
                <template #title>{{ item.meta?.title }}</template>
              </el-menu-item>

              <!-- 有子菜单 -->
              <el-sub-menu v-else :index="item.path">
                <template #title>
                  <el-icon v-if="item.meta?.icon">
                    <component :is="item.meta.icon" />
                  </el-icon>
                  <span>{{ item.meta?.title }}</span>
                </template>
                <el-menu-item
                    v-for="child in item.children"
                    :key="child.path"
                    :index="child.path"
                >
                  <template #title>{{ child.meta?.title }}</template>
                </el-menu-item>
              </el-sub-menu>
            </template>
          </el-menu>
        </el-scrollbar>

        <!-- 折叠按钮 -->
        <div class="collapse-trigger" @click="toggleCollapse">
          <el-icon>
            <component :is="isCollapse ? Expand : Fold" />
          </el-icon>
        </div>
      </el-aside>

      <!-- 主内容区域 Main -->
      <el-main class="layout-main">
        <!-- 页面内容 -->
        <div class="layout-content">
          <router-view v-slot="{ Component, route }">
            <component :is="Component" :key="route.path" />
          </router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
defineOptions({
  name: 'BasicLayout',
})
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Fold,
  Expand,
  FullScreen,
  User,
  Setting,
  SwitchButton,
  ArrowDown
} from '@element-plus/icons-vue'
import {useMenuStore, useUserStore} from "@/store";

const route = useRoute()
const router = useRouter()
const menuStore = useMenuStore()
const menuRoutes = computed(() => menuStore.menuRoutes)
const activeMenu = computed(() => route.path)
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore)

const userAvatar = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')

// 响应式数据
const isCollapse = ref(false)
const isFullscreen = ref(false)

const breadcrumbList = computed(() => {
  return route.matched.filter(item => item.meta && item.meta?.title)
})

// 切换侧边栏
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
// 切换全屏
const toggleFullscreen = async () => {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
      isFullscreen.value = true
    } else {
      await document.exitFullscreen()
      isFullscreen.value = false
    }
  } catch (error) {
    console.error('全屏切换失败:', error)
  }
}

const handleUserCommand = (command: string) => {
  switch (command) {
    case 'profile':
      router.push({
        name: 'Profile',
      })
      break
    case 'settings':
      router.push({
        name: 'Settings',
      })
      break
    case 'logout':
      handleLogout()
      break
  }
}

const handleLogout = () => {
  // 退出登录逻辑
  console.log('退出登录')
  router.push({
    name: 'Login',
  })
}

// 监听全屏变化
const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
}

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
})
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

/* Header 样式 */
.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  padding: 0 20px;
  height: 60px;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 12px;
}

.logo img {
  width: 32px;
  height: 32px;
}

.logo-text {
  font-size: 18px;
  font-weight: bold;
  color: #409eff;
}

.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-dropdown {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.user-dropdown:hover {
  background-color: #f5f7fa;
}

.user-name {
  font-size: 14px;
  color: #303133;
}

/* Main Container 样式 */
.main-container {
  height: calc(100vh - 60px);
}

/* Aside 样式 */
.layout-aside {
  background-color: #304156;
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
}

.sidebar-scrollbar {
  flex: 1;
}

.layout-menu {
  border: none;
  width: 100%;
}

.collapse-trigger {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bfcbd9;
  cursor: pointer;
  border-top: 1px solid #263445;
  transition: background-color 0.3s;
}

.collapse-trigger:hover {
  background-color: #263445;
  color: #fff;
}

/* Main 样式 */
.layout-main {
  padding: 0;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
}


.layout-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .layout-aside {
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    z-index: 1000;
  }

  .layout-main {
    margin-left: 0;
  }

  .header-center {
    display: none;
  }

  .user-name {
    display: none;
  }
}
</style>
