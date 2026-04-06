<script lang="ts" setup>
const props = defineProps<{ id: string }>()
const emit = defineEmits<{
  (event: "click", val: string): void
}>()
const handleClick = () => {
  emit("click", props.id)
}
</script>

<template>
  <div class="resume-info-view" @click="handleClick">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.resume-info-view {
  cursor: text;
}
</style>
