<script lang="ts" setup>
import {
  ElSelect,
  ElForm,
  ElFormItem,
  ElOption,
  ElCol,
  ElRow
} from "element-plus"
import SelectLocale from "@/components/select_locale"
import { fontList } from "@/config"
import { useThemeStore } from "@/store"
const themeStore = useThemeStore()
</script>

<template>
  <el-form label-width="60px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="字体">
          <el-select v-model="themeStore.font.family">
            <template v-for="font in Object.entries(fontList)" :key="font[0]">
              <el-option :label="font[0]" :value="font[1]" />
            </template>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="大小">
          <el-select v-model="themeStore.font.size">
            <el-option
              v-for="size in [12, 13, 14, 15, 16]"
              :label="size"
              :value="size + 'px'"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="语言">
          <select-locale />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
