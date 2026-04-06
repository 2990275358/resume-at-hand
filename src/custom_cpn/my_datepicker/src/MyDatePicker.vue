<script lang="ts" setup>
import { ElDatePicker, ElSpace, ElCheckbox } from "element-plus"
import type { BasicInfoContentType } from "@/config.ts"
const value = defineModel<string>()
const config = defineModel<BasicInfoContentType["config"]>("config")
</script>

<template>
  <el-space>
    <el-date-picker type="month" value-format="YYYY-MM" v-model="value" />
    <el-checkbox v-model="config!.isOfNumber" label="转年龄" />
  </el-space>
</template>

<style>
.el-date-editor.el-input,
.el-date-editor.el-input__wrapper {
  width: 100%;
}
</style>
