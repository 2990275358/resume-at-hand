<script lang="ts" setup>
import { ref } from "vue"
import { ElButton, ElIcon, ElSpace, ElInput, ElRow, ElCol } from "element-plus"
import WangEditor from "@/components/wang_editor"
// import MySelect from "@/custom_cpn/my_select"
import { Plus, Remove } from "@element-plus/icons-vue"
import { degreeOfProficiencyList } from "@/i18n"
import {
  TAG_SKILLED,
  DROPDOWN_SELECTOR_TAG,
  type BasicInfoContentType
} from "@/config"
import type { RichContentType } from "@/config"

defineProps<{ name: string }>()
const value = defineModel<RichContentType>()
const newTag = ref<string>()
function createSkilledOp(name: string): BasicInfoContentType[] {
  return [
    {
      name: "熟练程度",
      value: 50,
      field: `${name}_skilled`,
      component: DROPDOWN_SELECTOR_TAG,
      options: degreeOfProficiencyList
    },
    {
      name: "显示方式",
      value: 0,
      field: `${name}_isNumber`,
      component: DROPDOWN_SELECTOR_TAG,
      options: [
        { label: "百分比", value: 0 },
        { label: "文字", value: 1 }
      ]
    }
  ]
}
const handleAddTag = (name?: string) => {
  if (!newTag.value && !name) return
  let val = (name || newTag.value) as string
  val = val.trim()
  if (!val) return
  const idx = value.value?.tags?.values?.indexOf(val)
  if (idx !== undefined && idx !== -1) {
    handleRemoveTag(idx)
    return
  }
  if (value.value?.tags?.type === TAG_SKILLED) {
    value.value.tags.controls?.push(createSkilledOp(val))
  }
  value.value!.tags?.values.push(val)
  newTag.value = ""
}
const handleRemoveTag = (idx: number) => {
  value.value!.tags?.values.splice(idx, 1)
  if (value.value?.tags?.type === TAG_SKILLED) {
    value.value!.tags?.controls?.splice(idx, 1)
  }
}
</script>

<template>
  <div class="tag-info">
    <WangEditor
      :editorConfig="value?.editorConfig || undefined"
      v-model="value!.rich"
    />
    <div class="tags-wrapper">
      <div class="tag-list">
        <el-space :size="10" wrap>
          <div
            class="tag-item"
            :class="{
              'item-active': value?.tags?.values.includes(item)
            }"
            v-for="item in value!.tags?.list"
            :key="item"
            @click="handleAddTag(item)"
          >
            {{ item }}
          </div>
        </el-space>
      </div>
      <el-space>
        <el-input v-model="newTag" :placeholder="`请输入${name}名称`" />
        <el-button @click="handleAddTag()">
          <el-icon><Plus /></el-icon>
          添加自定义{{ name }}
        </el-button>
      </el-space>
      <div class="tag-values">
        <template
          v-if="
            value?.tags?.type === TAG_SKILLED && value!.tags!.values.length > 0
          "
        >
          <el-space :size="30" wrap>
            <div
              class="tag-skilled"
              v-for="(item, i) in value?.tags?.values"
              :key="item"
            >
              <div class="title">{{ item }}</div>
              <div v-if="value!.tags!.controls!.length">
                <el-row :gutter="5" align="middle">
                  <el-col :span="12">
                    <my-select
                      :options="value?.tags?.controls![i][0].options!"
                      v-model="value!.tags!.controls![i][0].value"
                    />
                  </el-col>
                  <el-col :span="10">
                    <my-select
                      :options="value?.tags?.controls![i][1].options!"
                      v-model="value!.tags!.controls![i][1].value"
                    />
                  </el-col>
                  <el-col :span="2">
                    <span
                      style="
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                      "
                      @click="handleRemoveTag(i)"
                    >
                      <el-icon :size="24" color="red"><Remove /></el-icon>
                    </span>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-space>
        </template>
        <template v-else>
          <div class="tag-list" style="border-top: none; margin: 0px">
            <el-space :size="10">
              <div v-for="(item, i) in value!.tags?.values" :key="item">
                <el-space :size="5" wrap alignment="center">
                  <div class="tag-item show-value">
                    {{ item }}
                  </div>
                  <span
                    style="cursor: pointer; display: flex; align-items: center"
                    @click="handleRemoveTag(i)"
                  >
                    <el-icon :size="24" color="red"><Remove /></el-icon>
                  </span>
                </el-space>
              </div>
            </el-space>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tag-info {
  padding: 20px 0;
  width: calc(100% - 10px);
  .tags-wrapper {
    padding-bottom: 20px;
    .tag-list {
      padding: 20px 0;
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      border-top: 1px dotted var(--primary-color);
    }
    .tag-item {
      padding: 5px 20px;
      border: 1px solid var(--primary-color);
      border-radius: 20px;
      &:not(.show-value) {
        cursor: pointer;
      }
      &:not(.show-value):hover,
      &.item-active {
        color: var(--bg-primary);
        background-color: var(--primary-color);
      }
      .show-value {
        margin: 0;
      }
    }
  }
  .tag-values {
    padding: 20px 0;
    .tag-skilled {
      width: 250px;
      .title {
        margin-bottom: 10px;
        font-weight: 600;
      }
    }
  }
}
</style>
