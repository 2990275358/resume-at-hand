<script lang="ts" setup>
import { useThemeStore } from "@/store"
import { themeColors } from "@/utils"
import SelectLocale from "@/components/select_locale"

const themeStore = useThemeStore()
const emit = defineEmits<{ onClick: [] }>()

function handleColorChange(color: string) {
  themeStore.themeColor = color
}
const handleGotoEdit = () => {
  emit("onClick")
}
</script>

<template>
  <div class="control-panel">
    <div class="title">全职业通用模版</div>
    <div class="container">
      <div class="input-row s-flex">
        <div class="label s-flex">选择语言:</div>
        <SelectLocale />
      </div>
      <div class="input-row s-flex">
        <div class="label s-flex">选择颜色:</div>
        <div class="select-color s-flex">
          <div
            class="color-item"
            v-for="color in themeColors"
            :style="{ backgroundColor: color }"
            :key="color"
            :class="{ 'color-actvie': themeStore.themeColor === color }"
            @click="handleColorChange(color)"
          ></div>
        </div>
      </div>
      <div class="input-row s-flex btn-hover">
        <a href="#" @click.prevent="handleGotoEdit">
          <div class="custom-button">
            <span>使用此模版</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.control-panel {
  width: 380px;
  .title {
    font-size: 20px;
    border-bottom: 1px solid #000;
    padding-bottom: 10px;
  }
  .input-row {
    margin: 20px 0;
    align-content: center;
    .label {
      width: 100px;
      align-items: center;
      font-weight: bold;
    }
    .custom-button {
      width: 340px;
      height: 52px;
      line-height: 52px;
      background: var(--primary-gradient);
      border-radius: var(--radius);
      color: #fff;
      text-align: center;
      cursor: pointer;
    }
  }
  .select-color {
    flex-wrap: wrap;
  }
  .color-item {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer;
    margin-bottom: 5px;
    position: relative;
    box-sizing: border-box;
    &:hover {
      border: 2px solid var(--primary-color);
    }
  }
  .color-actvie {
    border: 3px solid var(--primary-color);
  }
}
</style>
