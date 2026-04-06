<script lang="ts" setup>
import { ElSlider, ElButton } from "element-plus"
import { spaceItems } from "./config"
import { useThemeStore } from "@/store"
const themeStore = useThemeStore()
</script>

<template>
  <ul class="set-space">
    <li class="space-item" v-for="item in spaceItems" :key="item.filed">
      <div class="set-space s-flex">
        <div class="title">
          {{ item.name }}：<span class="num">{{
            item.filed === "row"
              ? themeStore.space[item.filed].toFixed(2)
              : themeStore.space[item.filed]
          }}</span>
        </div>
        <div class="value s-flex">
          <el-slider
            class="slider"
            v-model="themeStore.space[item.filed]"
            :min="item.min"
            :max="item.max"
            :step="item.step"
          />
          <el-button
            v-show="item.value !== themeStore.space[item.filed]"
            @click="themeStore.space[item.filed] = item.value"
          >
            重置
          </el-button>
        </div>
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.set-space {
  width: 220px;
  .set-space {
    flex-direction: column;
    row-gap: 10px;
    .title {
      text-align: center;
    }
    .value {
      column-gap: 20px;
    }
    .num {
      color: #ff6600;
      font-weight: bold;
    }
  }
  .slider {
    width: 138px;
  }
}
</style>
