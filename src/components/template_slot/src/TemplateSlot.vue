<script lang="ts" setup>
import type { OutputType } from "@/config"
import { TemplateList } from "@/utils"

defineProps<{ id: string; data: OutputType[] }>()
</script>

<template>
  <component :is="TemplateList[id]" :data="data"></component>
</template>
