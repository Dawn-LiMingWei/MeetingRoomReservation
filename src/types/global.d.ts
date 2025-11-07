// src/types/global.d.ts
// 全局类型定义

interface ApiResponse<T = any> {
  code: string
  data: T
  msg: string
}
