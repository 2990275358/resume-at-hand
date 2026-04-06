<script lang="ts" setup>
import { ref } from "vue"
import { ElButton, ElDescriptions, ElDescriptionsItem } from "element-plus"
import { generateResume } from "@/service"
import type { OutputType } from "@/config"

const isLoading = ref(false)
const emit = defineEmits<{
  click: []
  progerssEnd: [isOk: boolean, data: OutputType[]]
}>()

const props = defineProps<{
  info: {
    name: string // 姓名
    phone: string // 联系电话
    job: string // 求职岗位
    birthday: string // 出生年月
    sex: number // 性别 0:女 1:男
    workYears: string // 工作年限
    experience: string // 过往经历
  }
}>()

const startProgress = async () => {
  isLoading.value = true
  emit("click")
  const { isOk, data = [] } = await generateResume<OutputType[]>(props.info)
  emit("progerssEnd", isOk, data as OutputType[])
  isLoading.value = false
}
const sexMap: Record<number, string> = {
  0: "女",
  1: "男"
}
</script>

<template>
  <div class="progress-bar">
    <el-descriptions
      class="info"
      title="预填的信息"
      direction="vertical"
      :column="3"
      :border="true"
    >
      <el-descriptions-item label="姓名">{{ info.name }}</el-descriptions-item>
      <el-descriptions-item label="性别" v-if="sexMap[info.sex]">
        {{ sexMap[info.sex] }}
      </el-descriptions-item>
      <el-descriptions-item label="出生年月">
        {{ info.birthday }}
      </el-descriptions-item>
      <el-descriptions-item label="联系电话">
        {{ info.phone }}
      </el-descriptions-item>
      <el-descriptions-item label="求职岗位">
        {{ info.job }}
      </el-descriptions-item>
      <el-descriptions-item label="工作年限">
        {{ info.workYears }}
      </el-descriptions-item>
      <el-descriptions-item label="过往经历">
        {{ info.experience }}
      </el-descriptions-item>
    </el-descriptions>
    <template v-if="isLoading">
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p class="loading-text">AI正在奋笔疾书...</p>
      </div>
    </template>
    <template v-else>
      <ElButton class="btn-hover" type="primary" @click="startProgress">
        开始撰写
      </ElButton>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.progress-bar {
  padding: 20px 0;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .info {
    width: 100%;
    margin-bottom: 20px;
  }
  .btn-hover {
    width: 120px;
  }

  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    height: 100%;
  }

  .loading-spinner {
    width: 48px;
    height: 48px;
    border: 4px solid transparent;
    border-top-color: var(--primary-lighter);
    border-right-color: var(--primary-light);
    border-bottom-color: var(--primary-color);
    border-left-color: var(--primary-dark);
    border-radius: 50%;
    animation: spin 1.2s linear infinite;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .loading-text {
    font-size: 16px;
    color: var(--primary-color);
    margin: 0;
    font-weight: 500;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
