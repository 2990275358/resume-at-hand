import type { MenuConfigType, SpaceItemType } from "./types"
import SetSpace from "./SetSpace.vue"
import SetColor from "./SetColor.vue"

export enum MenuItemEnum {
  gap = "间距设置",
  font = "字体/语言",
  skin = "皮肤设置",
  title = "标题设置",
  template = "更换模版"
}

export const menuConfig: MenuConfigType[] = [
  {
    name: MenuItemEnum.gap,
    icon: "icon-zhengchangzhuangtai",
    component: SetSpace
  },
  {
    name: MenuItemEnum.font,
    icon: "icon-a-Language"
  },
  {
    name: MenuItemEnum.skin,
    icon: "icon-pifu",
    component: SetColor
  },
  {
    name: MenuItemEnum.title,
    icon: "icon-biaoti"
  },
  {
    name: MenuItemEnum.template,
    icon: "icon-mobanguanli"
  }
]

export const spaceItems: SpaceItemType[] = [
  {
    name: "模块上下间距",
    value: 20,
    filed: "module",
    min: 5,
    max: 50,
    step: 1
  },
  {
    name: "行间距",
    value: 0.7,
    filed: "row",
    min: 0.3,
    max: 1.2,
    step: 0.05
  },
  {
    name: "页面边距",
    value: 30,
    filed: "page",
    min: 10,
    max: 50,
    step: 2
  }
]
