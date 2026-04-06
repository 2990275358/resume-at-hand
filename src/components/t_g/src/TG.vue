<script lang="ts" setup></script>

<template>
  <TransitionGroup name="item">
    <slot></slot>
  </TransitionGroup>
</template>

<style lang="scss">
.item-move, /* 对移动中的元素应用的过渡 */
.item-enter-active,
.item-leave-active {
  transition: all 0.5s ease;
}

.item-enter-from,
.item-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
