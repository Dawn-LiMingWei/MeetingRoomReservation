<template>
  <div class="login-container">
    <!-- 左侧品牌展示区 -->
    <div class="login-brand">
      <div class="brand-content">
        <h1>会议室预约系统</h1>
      </div>
    </div>

    <!-- 右侧登录表单区 -->
    <div class="login-form-section">
      <div class="login-form-wrapper">
        <div class="form-header">
          <h2>欢迎回来</h2>
          <p>请输入您的账号信息登录系统</p>
        </div>

        <el-form
          ref="loginFormRef"
          :model="formData"
          :rules="formRules"
          @submit.prevent="handleLogin"
          class="login-form"
          size="large"
        >
          <div class="form-item-group">
            <el-form-item prop="username" class="form-item">
              <template #label>
                <span class="form-label">用户名</span>
              </template>
              <el-input
                v-model="formData.username"
                placeholder="请输入用户名"
                :prefix-icon="User"
                clearable
              />
            </el-form-item>

            <el-form-item prop="password" class="form-item">
              <template #label>
                <span class="form-label">密码</span>
              </template>
              <el-input
                v-model="formData.password"
                placeholder="请输入用户密码"
                :prefix-icon="Lock"
                clearable
              />
            </el-form-item>
          </div>

          <el-form-item class="submit-item">
            <el-button
              type="primary"
              native-type="submit"
              :loading="loginLoading"
              class="login-btn"
              size="large"
            >
              {{ loginLoading ? "登录中..." : "登录" }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "@/store";
import type { FormInstance, FormRules } from "element-plus";
import { User, Lock } from "@element-plus/icons-vue";
import { type LoginForm } from "@/api/login/login-api";

// 使用Pinia store
const { login } = useUserStore();
const loginFormRef = ref<FormInstance>();

// 响应式数据
const formData = reactive<LoginForm>({
  username: "",
  password: "",
});

// 表单校验规则
const formRules = reactive<FormRules<LoginForm>>({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 2, max: 20, message: "用户名长度在2-20之间", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 1, max: 20, message: "用户密码不能为空", trigger: "blur" },
  ],
});

// 登录处理函数
const loginLoading = ref<boolean>(false);
const handleLogin = async () => {
  if (!loginFormRef.value) return;

  // 先进行表单验证
  const valid = await loginFormRef.value.validate().catch(() => false);
  if (!valid) return;

  try {
    loginLoading.value = true;
    await login(formData);
  } finally {
    loginLoading.value = false;
  }
};

// // 重置表单验证
// const resetFormValidation = () => {
//   if (loginFormRef.value) {
//     loginFormRef.value.clearValidate();
//   }
// };
</script>

<style scoped>
/* 保持原有的样式不变 */
.login-container {
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-brand {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  color: white;
}

.brand-content {
  max-width: 400px;
  text-align: center;
}

.brand-content h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.login-form-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 2rem;
}

.login-form-wrapper {
  width: 100%;
  max-width: 400px;
}

.form-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.form-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.form-header p {
  color: #666;
  font-size: 0.95rem;
}

.login-form {
  margin-bottom: 2rem;
}

.form-item-group {
  margin-bottom: 1.5rem;
}

.form-item {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #374151;
  font-size: 0.95rem;
}

.submit-item {
  margin-bottom: 0;
}

.login-btn {
  width: 100%;
  height: 48px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  margin-top: 0.5rem;
}

.login-footer p {
  color: #6b7280;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }

  .login-brand {
    padding: 1.5rem;
  }

  .brand-content h1 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .login-form-section {
    padding: 1rem;
  }

  .form-header h2 {
    font-size: 1.75rem;
  }

  .login-btn {
    height: 44px;
  }
}
</style>
