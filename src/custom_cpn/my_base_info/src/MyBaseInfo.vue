<script lang="ts" setup>
import { ref } from "vue"
import {
  ElForm,
  ElFormItem,
  ElRow,
  ElCol,
  ElButton,
  ElInput,
  ElNotification,
  ElIcon,
  ElSpace
} from "element-plus"
import { Plus, Remove } from "@element-plus/icons-vue"
import type { CustomContentType, BasicInfoContentType } from "@/config"
import { TEXT_INPUT_TAG } from "@/config"
const value = defineModel<CustomContentType>()
const customItemState = ref<
  Partial<Omit<BasicInfoContentType, "value"> & { value: string }>
>({
  name: "",
  value: ""
})
const addCustomItem = () => {
  const config: any = {
    title: "提示",
    message: "",
    type: "warning",
    position: "bottom-right"
  }
  if (!customItemState.value.name) {
    config.message = "请输入自定义项名称"
    ElNotification(config)
    return
  } else if (!customItemState.value.value) {
    config.message = "请输入自定义项值"
    ElNotification(config)
    return
  }
  value.value?.customContent.push({
    component: TEXT_INPUT_TAG,
    name: customItemState.value.name!,
    field: Date.now() + "",
    value: customItemState.value.value!,
    config: {}
  })
  customItemState.value.value = customItemState.value.name = ""
}
</script>

<template>
  <div class="base-info">
    <el-form label-width="80px">
      <el-row :gutter="40">
        <template v-for="item in value?.defaultContent" :key="item.field">
          <el-col :span="6">
            <el-form-item :label="item.name" :field="item.field">
              <component
                :is="item.component"
                v-bind="item"
                v-model="item.value"
                v-model:config="item.config"
              ></component>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="custom-item" v-if="value?.customContent.length">
      <el-form>
        <el-row :gutter="40">
          <template v-for="(item, i) in value?.customContent" :key="item.field">
            <el-col :span="6">
              <el-form-item :label="item.name" :field="item.field">
                <el-space>
                  <component
                    :is="item.component"
                    v-bind="item"
                    v-model="item.value"
                    v-model:config="item.config"
                  ></component>
                  <span
                    style="cursor: pointer; display: flex; align-items: center"
                    @click="value?.customContent.splice(i, 1)"
                  >
                    <el-icon :size="24" color="red"><Remove /></el-icon>
                  </span>
                </el-space>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
    </div>
    <div class="custom-item">
      <el-form>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <el-row :gutter="10">
                <el-col :span="9">
                  <el-input
                    v-model="customItemState.name"
                    placeholder="信息名称，例如：姓名"
                  ></el-input>
                </el-col>
                <div style="text-align: center">:</div>
                <el-col :span="9">
                  <el-input
                    v-model="customItemState.value"
                    placeholder="信息内容，例如：王有为"
                  ></el-input>
                </el-col>
                <el-col :span="5">
                  <el-button @click="addCustomItem">
                    <el-space>
                      <el-icon><Plus /></el-icon>添加自定义信息
                    </el-space>
                  </el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-info {
  padding: 20px 0;
  width: calc(100% - 10px);
  .custom-item {
    border-top: 1px dotted var(--primary-color);
    padding: 20px 0;
  }
}
</style>
