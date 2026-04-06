import { type Component } from "vue"
export type MenuConfigType = {
  name: string
  icon: string
  component?: Component
}
export type SpaceItemType = {
  name: string
  value: number
  filed: string
  step: number
  min: number
  max: number
}
