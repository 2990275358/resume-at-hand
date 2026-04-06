<script setup lang="ts">
import {
  ElUpload,
  ElButton,
  ElSpace,
  ElCheckbox,
  type UploadFile
} from "element-plus"
import type { BasicInfoContentType } from "@/config.ts"
import { useDataStore } from "@/store"

const dataStore = useDataStore()
const config = defineModel<BasicInfoContentType["config"]>("config")
const handleChange = (uploadFile: UploadFile) => {
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw as Blob)
  reader.onload = () => {
    const base64 = reader.result as string
    dataStore.imgUrl = base64
  }
}
</script>

<template>
  <el-space>
    <el-upload
      :show-file-list="false"
      :auto-upload="false"
      :on-change="handleChange"
    >
      <template #trigger>
        <el-button type="primary">上传照片</el-button>
      </template>
    </el-upload>
    <el-checkbox v-model="config!.isShow" label="展示照片" />
  </el-space>
</template>

<style lang="less"></style>
