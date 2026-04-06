<script setup lang="ts">
import { ElIcon } from "element-plus"
import { HomeFilled, Warning } from "@element-plus/icons-vue"
</script>

<template>
  <div class="not-found-container">
    <div class="content-wrapper">
      <!-- 渐变数字效果 -->
      <h1 class="status-code">
        <span class="gradient-text">4</span>
        <span class="gradient-text">0</span>
        <span class="gradient-text">4</span>
      </h1>

      <!-- 主题色消息提示 -->
      <p class="message">
        <el-icon><Warning /></el-icon>
        页面迷路了，让我们带您返回正轨
      </p>

      <!-- 主题色按钮 -->
      <router-link to="/" class="primary-button">
        <el-icon :size="18"><HomeFilled /></el-icon>
        返回简历中心
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  --gradient: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--primary-lighter) 100%
  );
  min-height: calc(100vh - var(--nav-bar-height) + 2px);
  display: flex;
  background: var(--gradient);
  padding: 2rem;
}

.content-wrapper {
  margin: auto;
  text-align: center;
  max-width: 600px;
  padding: 3rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 131, 143, 0.1);
  backdrop-filter: blur(10px);
}

.status-code {
  font-size: 8rem;
  font-weight: 700;
  line-height: 1;
  margin: 0 0 1.5rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.gradient-text {
  background: var(--gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 131, 143, 0.2);
}

.message {
  font-size: 1.25rem;
  color: var(--primary-dark);
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
}

.icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.primary-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 32px;
  background: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px -1px rgba(0, 131, 143, 0.2);
}

.primary-button:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 131, 143, 0.3);
}

.primary-button .icon {
  width: 20px;
  height: 20px;
}
</style>
