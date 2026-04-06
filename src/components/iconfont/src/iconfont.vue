<script lang="ts" setup>
withDefaults(
  defineProps<{
    name: string
    color?: string
    size?: number
  }>(),
  {
    name: "icon-mobanguanli",
    size: 36,
    color: ""
  }
)
</script>

<template>
  <i
    class="iconfont iconfont-cpn"
    :class="name"
    :style="{ '--size': size + 'px', color }"
  ></i>
</template>

<style lang="scss" scoped>
.iconfont-cpn {
  font-size: var(--size);
  color: inherit;
}
</style>
