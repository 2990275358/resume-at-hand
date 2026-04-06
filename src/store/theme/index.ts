import { defineStore } from "pinia"

type ThemeStateType = {
  themeColor: string
  font: {
    [key: string]: string
    size: string
    family: string
  }
  space: {
    [key: string]: number
    page: number
    row: number
    module: number
  }
  locale: string
  title: {
    [key: string]: string
    text: string
    slogan: string
  }
  isEdit: boolean
}

export const useThemeStore = defineStore<string, ThemeStateType>("theme", {
  state: () => {
    return {
      themeColor: "#333333",
      font: {
        size: "14px",
        family: "Arial"
      },
      space: {
        page: 16,
        row: 0.7,
        module: 5
      },
      locale: "zh",
      title: {
        text: "个人简历",
        slogan: "细心从每一个细节开始"
      },
      isEdit: false
    }
  },
  actions: {
    setThemeColor(color: string) {
      this.themeColor = color
    },
    setLocale(locale: string) {
      this.locale = locale
    },
    getState() {
      return {
        themeColor: this.themeColor,
        locale: this.locale,
        title: this.title,
        font: this.font,
        space: this.space
      }
    },
    setState(state: ThemeStateType) {
      Object.assign(this, state)
    }
  },
  persist: true
})
