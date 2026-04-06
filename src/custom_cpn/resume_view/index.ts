import ResumeView from "./src/ResumeView.vue"

export default ResumeView

declare module "vue" {
  export interface GlobalComponents {
    ResumeView: typeof ResumeView
  }
}
