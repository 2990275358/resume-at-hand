<script lang="ts" setup>
import { ElSelect, ElOption } from "element-plus"
import type { DataContentType } from "@/config.ts"
import { useI18n } from "vue-i18n"
defineProps<{
  options: DataContentType[]
}>()

const value = defineModel<any>()
const { t } = useI18n()
</script>

<template>
  <ElSelect v-model="value">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="t(item.label)"
      :value="item.value"
    />
  </ElSelect>
</template>

<style scoped></style>
