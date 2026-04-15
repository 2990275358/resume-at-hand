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
import { uploadFileApi } from "@/service/file"

const dataStore = useDataStore()
const config = defineModel<BasicInfoContentType["config"]>("config")
const handleChange = async (uploadFile: UploadFile) => {
  const formData = new FormData()
  formData.append("file", uploadFile.raw as Blob)
  const { isOk, data } = await uploadFileApi(formData)
  if (!isOk) {
    return
  }
  dataStore.imgUrl = import.meta.env.VITE_API_BASE_URL + data?.url || ""
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
