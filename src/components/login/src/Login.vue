<script lang="ts" setup>
import { ref, reactive, onMounted, onUnmounted } from "vue"
import {
  ElDialog,
  ElButton,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
  ElIcon
} from "element-plus"
import { User, Unlock, Message, Coin } from "@element-plus/icons-vue"
import { login, codeLogin, register, sendCode } from "@/service"
import { isEmail, loginManager, subpub } from "@/utils"
import { useUserStore } from "@/store"

const userStore = useUserStore()

const loginVisible = ref(false)
const activeTab = ref("account")
const loading = ref(false)
const countdown = ref(0)

onMounted(() => {
  subpub.on("showLogin", () => {
    loginVisible.value = true
  })
  onUnmounted(() => {
    subpub.off("showLogin")
  })
})

// 账号密码登录表单
const accountForm = reactive({
  account: "",
  password: ""
})

// 邮箱验证码登录表单
const emailForm = reactive({
  email: "",
  code: ""
})

// 注册表单
const registerForm = reactive({
  account: "",
  password: "",
  confirmPassword: ""
})

// 发送验证码
const handleSendCode = async () => {
  if (!isEmail(emailForm.email)) {
    ElMessage.warning("请输入正确的邮箱地址")
    return
  }
  sendCode({
    email: emailForm.email,
    type: 0
  })
  loading.value = true
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      loading.value = false
    }
  }, 1000)
}

// 处理登录
const handleLogin = async () => {
  let data: UserInfo | undefined, isOk
  if (activeTab.value === "account") {
    if (!accountForm.account || !accountForm.password) {
      ElMessage.warning("请输入账号和密码")
      return
    }
    loading.value = true
    ;({ data, isOk } = await login({
      account: accountForm.account,
      password: accountForm.password
    }))
  } else {
    if (!emailForm.email || !emailForm.code) {
      ElMessage.warning("请输入邮箱和验证码")
      return
    }
    loading.value = true
    ;({ data, isOk } = await codeLogin({
      email: emailForm.email,
      code: emailForm.code
    }))
  }
  loading.value = false
  if (!isOk) {
    return
  }
  loginManager.set(data)
  userStore.$patch({ info: data })
  loginVisible.value = false
  ElMessage.success("登录成功")
}

// 处理注册
const handleRegister = async () => {
  if (
    !registerForm.account ||
    !registerForm.password ||
    !registerForm.confirmPassword
  ) {
    ElMessage.warning("请填写完整的注册信息")
    return
  }
  if (registerForm.password !== registerForm.confirmPassword) {
    ElMessage.warning("两次输入的密码不一致")
    return
  }
  loading.value = true
  const { isOk } = await register({
    account: registerForm.account,
    password: registerForm.password
  })
  loading.value = false
  if (!isOk) return
  activeTab.value = "account"
  accountForm.account = registerForm.account
  accountForm.password = registerForm.password
  ElMessage.success("注册成功，请登录")
}
</script>

<template>
  <el-dialog
    :model-value="loginVisible"
    width="400px"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <el-tabs v-model="activeTab" class="login-tabs">
      <el-tab-pane label="账号密码登录" name="account">
        <el-form :model="accountForm" class="login-form">
          <el-form-item>
            <el-input v-model="accountForm.account" placeholder="请输入账号">
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="accountForm.password"
              type="password"
              placeholder="请输入密码"
            >
              <template #prefix>
                <el-icon><Unlock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="邮箱验证码登录" name="email">
        <el-form :model="emailForm" class="login-form">
          <el-form-item>
            <el-input v-model="emailForm.email" placeholder="请输入邮箱">
              <template #prefix>
                <el-icon><Message /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="code-input">
              <el-input v-model="emailForm.code" placeholder="请输入验证码">
                <template #prefix>
                  <el-icon><Coin /></el-icon>
                </template>
              </el-input>
              <el-button
                type="primary"
                :disabled="loading"
                @click="handleSendCode"
                class="code-btn"
              >
                {{ loading ? `${countdown}s后重试` : "获取验证码" }}
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="注册账号" name="register">
        <el-form :model="registerForm" class="login-form">
          <el-form-item>
            <el-input v-model="registerForm.account" placeholder="请输入用户名">
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="registerForm.password"
              type="password"
              placeholder="请输入密码"
            >
              <template #prefix>
                <el-icon><Unlock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="registerForm.confirmPassword"
              type="password"
              placeholder="请确认密码"
            >
              <template #prefix>
                <el-icon><Unlock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="loginVisible = false">取消</el-button>
        <el-button
          type="primary"
          class="btn-hover"
          :loading="loading"
          @click="activeTab === 'register' ? handleRegister() : handleLogin()"
        >
          {{ activeTab === "register" ? "注册" : "登录" }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.login-tabs {
  :deep(.el-tabs__nav-wrap::after) {
    background-color: var(--border-light);
  }

  :deep(.el-tabs__active-bar) {
    background: var(--primary-gradient);
  }

  :deep(.el-tabs__item.is-active) {
    color: var(--primary-color);
  }
}

.login-form {
  margin-top: 20px;

  :deep(.el-input__wrapper) {
    background-color: var(--bg-secondary);
  }

  .code-input {
    display: flex;
    gap: 10px;

    .el-input {
      flex: 1;
    }

    .code-btn {
      width: 120px;
    }
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid var(--border-light);
}
</style>
