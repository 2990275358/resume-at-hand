<script lang="ts" setup>
import { ref } from "vue"
import TemplateSlot from "@/components/template_slot"
import { getResumeById, type IResume } from "@/service/indexedDB"
import { useDataStore, useThemeStore } from "@/store"
import { queryTempReume } from "@/service"

const props = defineProps<{ id: string }>()
const resume = ref<IResume>()
const themeStore = useThemeStore()
const dataStore = useDataStore()

async function getResume() {
  let data = await getResumeById(props.id)
  if (!data) {
    const { data: resData } = await queryTempReume(props.id)
    data = resData
  }
  dataStore.$patch({
    imgUrl: data!.avatar
  })
  themeStore.$patch(data!.content.theme)
  resume.value = data
}
getResume()
</script>

<template>
  <template v-if="resume">
    <TemplateSlot
      :id="resume.content.templateId"
      :data="resume?.content.output"
    />
  </template>
  <div v-else>No Data</div>
</template>

<style scoped lang="scss">
.resume-template {
  background-color: #fff !important;
}
@media print {
  .resume-template {
    visibility: visible !important;
    display: block !important;
  }
}
</style>
