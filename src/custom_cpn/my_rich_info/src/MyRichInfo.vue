<script lang="ts" setup>
import {
  ElForm,
  ElFormItem,
  ElRow,
  ElCol,
  ElButton,
  ElIcon,
  ElSpace,
  ElMessageBox
} from "element-plus"
import WangEditor from "@/components/wang_editor"
import { Plus } from "@element-plus/icons-vue"
import { DATE_RANGE_PICKER_TAG } from "@/config"
import type { RichContentType } from "@/config"
import { nanoid } from "nanoid"
import TG from "@/components/t_g"

defineProps<{ name: string }>()
const value = defineModel<RichContentType[]>()
const handleAddContent = () => {
  const content: RichContentType = JSON.parse(JSON.stringify(value.value![0]))
  content.id = nanoid()
  content.rich = ""
  content.index = value.value!.length
  for (const item of content.content) {
    if (item.component === DATE_RANGE_PICKER_TAG) {
      item.value = []
      item.config!.isSoFar = false
    } else {
      item.value = ""
    }
  }
  value.value?.push(content)
}
const deleteContent = async (index: number, name: string) => {
  try {
    await ElMessageBox.confirm(
      `您确定要删除 ${name ? name : `第 ${index + 1} 条`} 的内容吗？`,
      "警告",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }
    )
    value.value?.splice(index, 1)
  } catch (error) {}
}
const moveContewnt = (idx: number, type: string, e: MouseEvent) => {
  e.stopPropagation()
  if (!value.value) return
  const curindex = value.value[idx].index
  let replaceIdx = idx
  if (type === "prev") {
    replaceIdx = idx - 1
  } else {
    replaceIdx = idx + 1
  }
  value.value[idx].index = value.value[replaceIdx].index
  value.value[replaceIdx].index = curindex
  value.value = value.value.sort((a, b) => a.index - b.index)
}
</script>

<template>
  <div class="rich-info">
    <TG
      tag="div"
      name="item"
      class="content-box"
      v-for="(item, i) in value!"
      :key="item.id"
    >
      <div class="left">
        <template v-if="item.content.length">
          <el-form>
            <el-row :gutter="10">
              <template v-for="res in item.content" :key="res.field">
                <el-col :span="res.config?.span || 4">
                  <el-form-item :label="res.name" :field="res.field">
                    <component
                      :is="res.component"
                      v-bind="res"
                      v-model="res.value"
                      v-model:config="res.config"
                    ></component>
                  </el-form-item>
                </el-col>
              </template>
            </el-row>
          </el-form>
        </template>
        <WangEditor
          :editorConfig="item.editorConfig || undefined"
          v-model="item.rich"
        />
      </div>
      <div class="right" v-show="value!.length > 1">
        <el-space
          direction="vertical"
          :size="20"
          style="width: 100%"
          alignment="center"
        >
          <el-button
            style="width: 102px"
            v-show="i !== 0"
            @click="moveContewnt(i, 'prev', $event)"
          >
            上移
          </el-button>
          <el-button
            style="width: 102px"
            v-show="i !== value!.length - 1"
            @click="moveContewnt(i, 'next', $event)"
          >
            下移
          </el-button>
          <el-button
            style="width: 102px"
            type="danger"
            v-show="i !== 0"
            @click="deleteContent(i, item.content[0].value as string)"
          >
            删除
          </el-button>
        </el-space>
      </div>
    </TG>
    <div class="h-60">
      <el-button size="large" type="primary" @click="handleAddContent">
        <el-icon size="18">
          <Plus />
        </el-icon>
        <span style="margin-left: 5px">新增一条 {{ name }}</span>
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rich-info {
  padding: 20px 0;
  width: calc(100% - 10px);
  .left {
    flex: 1;
  }
  .right {
    width: 120px;
    margin-top: 160px;
  }
  .content-box {
    margin-bottom: 20px;
    display: flex;
  }
}
.h-60 {
  height: 60px;
}
</style>
