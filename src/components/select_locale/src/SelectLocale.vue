<script lang="ts" setup>
import { ref, watch } from "vue"
import { localeList } from "@/i18n"
import { useThemeStore } from "@/store"
import { useI18n } from "vue-i18n"
import { ElSelect, ElOption } from "element-plus"
import { i18nChangeLanguage } from "@wangeditor/editor"

const themeStore = useThemeStore()
const { locale } = useI18n()

const value = ref(locale.value)
watch(value, (newVal) => {
  locale.value = newVal
  themeStore.locale = newVal

  i18nChangeLanguage(newVal === "en" ? "en" : "zh-CN")
})
</script>

<template>
  <ElSelect v-model="value">
    <ElOption
      v-for="locale in localeList"
      :key="locale.value"
      :label="locale.label"
      :value="locale.value"
    ></ElOption>
  </ElSelect>
</template>

<style lang="scss" scoped></style>
