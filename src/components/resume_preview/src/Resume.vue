<script lang="ts" setup>
import { ElButton } from "element-plus"
const emit = defineEmits<{
  click: [id: string]
}>()
const handleSelectTemplate = (id: string) => {
  emit("click", id)
}
defineProps<{
  info: {
    id: string
    cover: string
  }
}>()
</script>

<template>
  <div class="resume">
    <img draggable="false" class="cover" :src="info.cover" alt="简历" />
    <div class="mask s-flex">
      <el-button
        class="btn-hover"
        type="primary"
        @click="handleSelectTemplate(info.id)"
      >
        使用模版
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.resume {
  height: 650px;
  border-radius: var(--radius);
  overflow: hidden;
  position: relative;
  .cover {
    height: 100%;
    width: 100%;
    object-fit: fill;
  }
  &:hover .mask {
    display: flex;
  }
  .mask {
    display: none;
    position: absolute;
    inset: 0;
    background-color: rgba($color: #000000, $alpha: 0.2);
    align-items: center;
    justify-content: center;
    .btn-hover {
      width: 120px;
    }
  }
}
</style>
