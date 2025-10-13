import { createApp } from 'vue'
import App from './App.vue'
import setupPlugins from "@/plugin"

createApp(App).use(setupPlugins).mount('#app')
