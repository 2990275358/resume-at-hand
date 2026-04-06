<script lang="ts" setup>
import { ElForm, ElFormItem, ElInput } from "element-plus"
import { useThemeStore } from "@/store"
const themeStore = useThemeStore()
</script>

<template>
  <el-form label-position="top">
    <el-form-item label="简历标题">
      <el-input v-model="themeStore.title.text"></el-input>
    </el-form-item>
    <el-form-item label="简历Slogan （部分模板无Slogan）">
      <el-input
        v-model="themeStore.title.slogan"
        type="textarea"
        resize="none"
        maxlength="99"
        :rows="3"
      ></el-input>
    </el-form-item>
  </el-form>
</template>
