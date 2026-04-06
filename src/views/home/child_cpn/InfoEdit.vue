<script lang="ts" setup>
import { onMounted, ref } from "vue"
import {
  ElForm,
  ElFormItem,
  ElRow,
  ElCol,
  ElInput,
  ElSelect,
  ElOption,
  ElDatePicker
} from "element-plus"
import { sexList } from "@/i18n"
import { useI18n } from "vue-i18n"

const formRef = ref<InstanceType<typeof ElForm>>()
const value = defineModel({ type: Object })
const { t } = useI18n()
defineExpose({
  formRef
})
</script>

<template>
  <div class="info-edit">
    <ElForm ref="formRef" label-width="80px" :model="value">
      <ElRow :gutter="20">
        <ElCol :span="8">
          <ElFormItem required label="姓名" prop="name">
            <ElInput v-model="value.name" placeholder="请输入姓名" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem required label="出生年月" prop="birthday">
            <ElDatePicker
              v-model="value.birthday"
              placeholder="请选择出生年月"
            />
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem label="性别" prop="sex">
            <ElSelect v-model="value.sex" placeholder="请选择性别">
              <ElOption
                v-for="item in sexList"
                :key="item.value"
                :label="t(item.label)"
                :value="item.value"
              />
            </ElSelect>
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem required label="求职岗位" prop="job">
            <ElInput v-model="value.job" placeholder="请输入求职岗位" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem required label="工作年限" prop="workYears">
            <ElInput v-model="value.workYears" placeholder="请选择工作年限" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem label="电话" prop="phone">
            <ElInput v-model="value.phone" placeholder="请输入电话" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="24">
          <ElFormItem required label="过往经历" prop="experience">
            <ElInput
              :autosize="{
                minRows: 5
              }"
              resize="none"
              type="textarea"
              v-model="value.experience"
              :placeholder="`请输入过往经历，经历越详细简历越合适\n示例：\n1. 公司名称，职位，工作时间，工作内容\n2. 拥有技能
            `"
            />
          </ElFormItem>
        </ElCol>
      </ElRow>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
.info-edit {
  width: 100%;
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;
}
</style>
