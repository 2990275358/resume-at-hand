<script lang="ts" setup>
import { ref } from "vue"
import { ElDialog } from "element-plus"
import Iconfont from "@/components/iconfont"
import { menuConfig, MenuItemEnum } from "./config"
import { type MenuConfigType } from "./types"
import SetFont from "./SetFont.vue"
import SetTitle from "./SetTitle.vue"

const isShowFontSetting = ref(false)
const isShowTitleSetting = ref(false)

const handleClickMenu = (item: MenuConfigType) => {
  const { name } = item
  if (name === MenuItemEnum.font) {
    isShowFontSetting.value = true
  }
  if (name === MenuItemEnum.title) {
    isShowTitleSetting.value = true
  }
}
</script>

<template>
  <ul class="header-tool s-flex">
    <template v-for="item in menuConfig" :key="item.name">
      <li class="item s-flex" :class="{ menu: item.component }">
        <div class="btn-wrapper" @click="handleClickMenu(item)">
          <div class="btn-text"><Iconfont :size="28" :name="item.icon" /></div>
          <div class="btn-text">{{ item.name }}</div>
        </div>
        <div class="tool-menu" v-if="item.component">
          <component :is="item.component" />
        </div>
      </li>
    </template>
  </ul>
  <el-dialog v-model="isShowFontSetting" title="字体/语言设置" width="30%">
    <set-font />
  </el-dialog>
  <el-dialog
    v-model="isShowTitleSetting"
    title="简历标题/Slogan设置"
    width="30%"
  >
    <set-title />
  </el-dialog>
</template>

<style lang="scss">
.header-tool {
  align-items: center;
  column-gap: 40px;
  flex: 1;
  padding: 0;
  margin: 0;
  .item.menu {
    .btn-wrapper {
      position: relative;
      z-index: 10;
    }
  }
  .item {
    cursor: pointer;
    position: relative;
    height: 100%;
    .btn-wrapper {
      width: 100%;
      height: 100%;
      padding: 0px 16px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      /* background-: ; */
      row-gap: 5px;
    }
    .btn-text {
      color: var(--bg-primary);
    }
    &:hover {
      .btn-text {
        color: var(--primary-lighter);
      }
    }
    .tool-menu {
      position: absolute;
      background-color: var(--bg-primary);
      bottom: 1px;
      left: 50%;
      min-width: 268px;
      box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.3);
      padding: 20px 30px;
      box-sizing: border-box;
      z-index: 2;
      transform: translate3d(-50%, 100%, 0);
      display: none;
    }
  }
  .menu.item:hover {
    .btn-wrapper {
      box-shadow: 0 -8px 10px rgba(0, 0, 0, 0.3);
    }
    .tool-menu {
      display: block;
    }
  }
}
</style>
