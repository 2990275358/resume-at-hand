import MyTagInfo from "./src/MyTagInfo.vue"

export default MyTagInfo

declare module "vue" {
  export interface GlobalComponents {
    MyTagInfo: typeof MyTagInfo
  }
}
