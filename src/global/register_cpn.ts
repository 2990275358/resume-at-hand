import { App, defineAsyncComponent } from "vue"
import {
  ElSelect,
  ElButton,
  ElOption,
  ElInput,
  ElRadio,
  ElRadioGroup
} from "element-plus"
import { withLogin } from "@/utils"

const elementsCpn = [
  ElSelect,
  ElButton,
  ElOption,
  ElInput,
  ElRadio,
  ElRadioGroup
]
const registerElementsCpn = {
  install(app: App) {
    for (const cpn of elementsCpn) {
      app.use(cpn) // 注册全局组件
    }
  }
}
// 加载自定义的组件
const getCustomCpn = () => {
  const cpns: Record<string, any> = {}
  const modules = import.meta.glob("@/custom_cpn/**/*.vue")
  for (const path in modules) {
    const module: any = modules[path]
    const cpnName = path.split("/").pop()?.split(".")[0]
    if (cpnName) {
      cpns[cpnName] = defineAsyncComponent(module)
    }
  }
  return cpns
}
const registerCustomCpn = (app: App) => {
  const cpns = getCustomCpn()
  for (const cpnName in cpns) {
    app.component(cpnName, cpns[cpnName])
  }
  app.config.globalProperties.$withLogin = withLogin
}

export { registerElementsCpn, registerCustomCpn }

declare module "vue" {
  export interface ComponentCustomProperties {
    $withLogin: (fn: (...args: any[]) => any) => (...args: any[]) => any
  }
}
