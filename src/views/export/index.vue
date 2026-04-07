<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue"
import TemplateSlot from "@/components/template_slot"
import { getResumeById, type IResume } from "@/service/indexedDB"
import { useDataStore, useThemeStore } from "@/store"

const props = defineProps<{ id: string }>()
const resume = ref<IResume>()
const themeStore = useThemeStore()
const dataStore = useDataStore()

async function setReumeData(data: IResume | undefined) {
  if (!data) {
    return
  }
  resume.value = data
  dataStore.$patch({
    imgUrl: data!.avatar
  })
  themeStore.$patch(data!.content.theme)
  resume.value = data
  setTimeout(() => {
    window.dispatchEvent(
      new CustomEvent("app-ready-for-pdf", { bubbles: true })
    )
  }, 500)
}

async function getResume() {
  let data = await getResumeById(props.id)
  setReumeData(data)
}
function eventHandle(event: any) {
  setReumeData(event.detail)
}
onMounted(() => {
  window.addEventListener("resume:ready", eventHandle)
})
onUnmounted(() => {
  window.removeEventListener("resume:ready", eventHandle)
})
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
