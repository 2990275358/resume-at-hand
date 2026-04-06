import MyRichInfo from "./src/MyRichInfo.vue"

export default MyRichInfo

declare module "vue" {
  export interface GlobalComponents {
    MyRichInfo: typeof MyRichInfo
  }
}
