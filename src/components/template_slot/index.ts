import TemplateSlot from "./src/TemplateSlot.vue"

export default TemplateSlot

declare module "vue" {
  export interface GlobalComponents {
    TemplateSlot: typeof TemplateSlot
  }
}
