<script lang="ts" setup>
import { TAG_SKILLED } from "@/config"
import type { TagOutType } from "@/config"
defineProps<{ tags?: TagOutType }>()
</script>

<template>
  <div class="tag-list s-flex">
    <template v-if="tags">
      <template v-if="tags.type === TAG_SKILLED">
        <div class="tag_skilled" v-for="tag in tags.data" :key="tag.value">
          <div class="tag_skilled_item">{{ tag.value }}</div>
          <div class="tag_skilled_line s-flex">
            <div class="tag_skilled_progress">
              <div
                class="tag_skilled_progress_bar"
                :style="{ width: tag.number + '%' }"
              ></div>
            </div>
            <span>{{ tag.type === 1 ? tag.label : tag.number + "%" }}</span>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="tag_nomal_item" v-for="tag in tags.data" :key="tag.value">
          {{ tag.value }}
        </div>
      </template>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.tag-list {
  flex-wrap: wrap;
  column-gap: 20px;
}
.tag_skilled_item {
  margin-top: 10px;
  font-weight: bold;
}
.tag_skilled_line {
  column-gap: 10px;
  align-items: center;
}
.tag_skilled_progress {
  width: 130px;
  height: 5px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #ebeef5;
}
.tag_skilled_progress_bar {
  background-color: var(--theme-color);
  height: 100%;
}
.tag_nomal_item {
  padding: 5px 15px;
  border: 1px solid var(--tag-nomal-border-color);
  border-radius: 20px;
  margin-top: 5px;
  background-color: var(--tag-nomal-bg-color);
}
</style>
