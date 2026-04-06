import { defineStore } from "pinia"
import { ref } from "vue"
import type { InputDataType } from "@/config"

export const useDataStore = defineStore("data", () => {
  const inputConfig = ref<InputDataType[]>([])
  const curSelectId = ref<string>("")
  const imgUrl = ref<string>(
    "https://n.sinaimg.cn/sinacn10113/332/w1024h1708/20190806/73d1-iatixpm8624905.jpg"
  )
  return { inputConfig, curSelectId, imgUrl }
})
