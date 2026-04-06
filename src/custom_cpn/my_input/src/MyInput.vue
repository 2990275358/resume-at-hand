<script lang="ts" setup>
import { ElInput } from "element-plus"
const value = defineModel<string>()
</script>

<template>
  <ElInput v-model="value" type="text" />
</template>

<style lang="scss" scoped></style>
