import { defineAsyncComponent } from "vue"
const TemplateList: Record<string, any> = {
  1: defineAsyncComponent(() => import("@/templates/1/src/Template.vue")),
  2: defineAsyncComponent(() => import("@/templates/2/src/Template.vue")),
  3: defineAsyncComponent(() => import("@/templates/3/src/Template.vue")),
  4: defineAsyncComponent(() => import("@/templates/4/src/Template.vue"))
}

export { TemplateList }
