import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserStore = defineStore("user", () => {
  const info = ref<UserInfo>()
  const resumeIds = ref<string[]>([])

  return { resumeIds, info }
})
