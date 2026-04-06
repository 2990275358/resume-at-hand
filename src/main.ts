import { createApp } from "vue"
import App from "./App.vue"
import { pinia } from "./store"
import router from "@/router"
import i18n from "@/i18n"
import { registerCustomCpn } from "@/global"
// CSS
import "./styles/global.scss"
import "normalize.css"
import "element-plus/dist/index.css"

createApp(App)
  .use(router)
  .use(pinia)
  .use(i18n)
  .use(registerCustomCpn)
  .mount("#app")
