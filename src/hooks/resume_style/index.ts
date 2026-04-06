import { ref, watchEffect } from "vue"
import { useThemeStore } from "@/store"
import { hexToRgba, colorWeaken } from "@/utils"

function calcRowGap(gap: number) {
  return Math.floor((gap - 1) * 15 + 30)
}

export const useResumeStyle = () => {
  const themeStore = useThemeStore()
  const style = ref({})
  watchEffect(() => {
    style.value = {
      "--page-gap": themeStore.space.page + "px",
      "--row-gap": calcRowGap(themeStore.space.row) + "px",
      "--module-gap": themeStore.space.module + "px",
      "--theme-color": themeStore.themeColor,
      "--theme-color-weak": colorWeaken(themeStore.themeColor, 0.8),
      "--font-family": themeStore.font.family,
      "--font-size": themeStore.font.size,
      "--tag-nomal-border-color": hexToRgba(themeStore.themeColor, 0.8),
      "--tag-nomal-bg-color": hexToRgba(themeStore.themeColor, 0.05)
    }
  })
  return { style }
}
