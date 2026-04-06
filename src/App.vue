<script setup lang="ts">
import zh from "element-plus/dist/locale/zh-cn.mjs"
import en from "element-plus/dist/locale/en.mjs"
import ja from "element-plus/dist/locale/ja.mjs"
import zhTw from "element-plus/dist/locale/zh-tw.mjs"
import ko from "element-plus/dist/locale/ko.mjs"
import { ElConfigProvider } from "element-plus"
import { computed, ref, watch } from "vue"
import { useThemeStore } from "@/store"
import LoginCpn from "@/components/login"

const themeStore = useThemeStore()
const language = ref(themeStore.locale)
const languages: { [key: string]: any } = {
  zh,
  en,
  ja,
  ko,
  "zh-TW": zhTw
}
watch(
  () => themeStore.locale,
  (val) => {
    language.value = val
  }
)
const locale = computed(() => languages[language.value])
</script>

<template>
  <el-config-provider :locale="locale">
    <RouterView />
    <login-cpn> </login-cpn>
  </el-config-provider>
</template>

<style></style>
