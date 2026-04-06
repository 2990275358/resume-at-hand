<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import { ElTooltip } from "element-plus"
const pageLines = ref<number[]>([])
const A4_HEIGHT_PX = 297 * (96 / 25.4) // ✅ 标准换算
function updatePageLines() {
  const el = document.querySelector("#resume-preview-container")
  if (!el) return
  const height = el.scrollHeight // ✅ 用 scrollHeight 更准
  if (height <= A4_HEIGHT_PX) {
    pageLines.value = []
    return
  }
  const pageNum = Math.ceil(height / A4_HEIGHT_PX)
  pageLines.value = Array.from({ length: pageNum - 1 }, (_, i) => i + 1)
}
onMounted(() => {
  const el = document.querySelector("#resume-preview-container")
  if (!el) return
  updatePageLines()
  const ob = new ResizeObserver(() => {
    updatePageLines()
  })
  ob.observe(el)
  onBeforeUnmount(() => {
    ob.disconnect()
  })
})
</script>

<template>
  <div
    v-for="page in pageLines"
    :key="page"
    class="page-line"
    :style="{ top: `${page * A4_HEIGHT_PX}px` }"
  >
    <el-tooltip content="请至少绕开这条白线，避免遮挡" placement="top">
      <div class="s-flex">
        <div class="line"></div>
        第{{ page }}页 共{{ pageLines.length }}页
        <div class="line"></div>
      </div>
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.page-line {
  position: absolute;
  width: 100%;
  height: 20px;
  background-color: var(--primary-color);
  color: #fff;
  text-align: center;
  font-size: 14px;
  top: 297mm;
  .s-flex {
    align-items: center;
    justify-content: center;
    column-gap: 10px;
  }
  .line {
    width: 300px;
    height: 1px;
    background-color: #fff;
  }
}
</style>
