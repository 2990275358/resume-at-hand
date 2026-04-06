import MyBaseInfo from "./src/MyBaseInfo.vue"

export default MyBaseInfo

declare module "vue" {
  export interface GlobalComponents {
    MyBaseInfo: typeof MyBaseInfo
  }
}
