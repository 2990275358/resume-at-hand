<script lang="ts" setup>
import { ElColorPicker } from "element-plus"
import { useThemeStore } from "@/store"
const colorList = [
  "#333333",
  "#545969",
  "#284967",
  "#4e7282",
  "#3978a3",
  "#1575bf",
  "#0e88ad",
  "#5695c3",
  "#609ef3",
  "#a08f75",
  "#c19f67",
  "#ed7d31",
  "#67a886",
  "#76ba31",
  "#f36c6c",
  "#a05fca"
]
const themeStore = useThemeStore()
const handleSelectColor = (color: string) => {
  themeStore.themeColor = color
}
</script>

<template>
  <div class="set-color s-flex">
    <div class="content left">
      <div class="title">推荐皮肤</div>
      <ul class="color-list">
        <li
          class="color-item"
          v-for="color in colorList"
          :key="color"
          :style="{ '--bg-color': color }"
          @click="handleSelectColor(color)"
        >
          <div class="color"></div>
        </li>
      </ul>
    </div>
    <div class="content right">
      <div class="title">自定义颜色</div>
      <div class="custom-color s-flex">
        <div class="text">选择颜色</div>
        <el-color-picker v-model="themeStore.themeColor" :teleported="false" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.set-color {
  column-gap: 20px;
  .content {
    height: 100%;
    flex: 1;
    .title {
      margin-bottom: 10px;
      text-align: center;
    }
    .color-list {
      height: 100%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      .color-item {
        background-color: var(--bg-color);
        width: 26px;
        height: 26px;
        border-radius: 50%;
      }
    }
  }
  .right {
    width: 120px;
  }
  .custom-color {
    align-items: center;
    column-gap: 10px;
  }
}
</style>
