<script lang="ts" setup>
import { ElDatePicker, ElCheckbox, ElRow, ElCol } from "element-plus"
import type { BasicInfoContentType } from "@/config.ts"
defineProps<{
  placeholder: string[]
}>()
const value = defineModel<string[]>()
const config = defineModel<BasicInfoContentType["config"]>("config")
</script>

<template>
  <el-row :gutter="10">
    <el-col :span="config!.isSoFar ? 12 : 8">
      <el-date-picker
        :placeholder="placeholder[0]"
        type="month"
        value-format="YYYY-MM"
        v-model="value![0]"
      />
    </el-col>
    <span>-</span>
    <el-col :span="8" v-show="!config!.isSoFar">
      <el-date-picker
        :placeholder="placeholder[1]"
        type="month"
        value-format="YYYY-MM"
        v-model="value![1]"
      />
    </el-col>
    <el-col :span="6">
      <el-checkbox v-model="config!.isSoFar" label="至今" />
    </el-col>
  </el-row>
</template>

<style>
.el-date-editor.el-input,
.el-date-editor.el-input__wrapper {
  width: 100%;
}
</style>
