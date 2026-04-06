import TagList from "./tag_list/src/index.vue"

export { TagList }

declare module "vue" {
  export interface GlobalComponents {
    TagList: typeof TagList
  }
}
