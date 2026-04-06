<script lang="ts" setup>
import { computed, reactive, ref } from "vue"
import {
  ElButton,
  ElDialog,
  ElRadio,
  ElRadioGroup,
  ElSteps,
  ElStep,
  ElMessage
} from "element-plus"
import TemplateList from "./TemplateList.vue"
import { localeList } from "@/i18n"
import TemplateSlot from "@/components/template_slot"
import AiEdit from "./AiEdit.vue"
import InfoEdit from "./InfoEdit.vue"
import type { OutputType } from "@/config"
import { useRouter } from "vue-router"

const isShow = defineModel({ default: false })
const infoRef = ref<InstanceType<typeof InfoEdit>>()
const router = useRouter()

const aiEdisConfig = reactive({
  active: 0,
  locale: "zh",
  info: {
    name: "王有为",
    phone: "15828917951",
    job: "前端开发",
    birthday: "2020-12-14",
    sex: -1,
    workYears: "1",
    // 经历描述，越详细越好
    experience:
      "我掌握前端常用技能，不局限于单一框架，能使用node编写后端服务，目前在一家公司做bom系统开发"
  },
  loading: false,
  templateId: "",
  steps: ["选择语言", "选择模版", "填写信息", "AI撰写", "预览/编辑"],
  data: [] as OutputType[]
})

const dialogTitle = computed(() => {
  return aiEdisConfig.steps[aiEdisConfig.active]
})
const isSelectTemplate = computed(() => {
  return aiEdisConfig.active === 1
})
const nextText = computed(() => {
  return aiEdisConfig.active === aiEdisConfig.steps.length - 1
    ? "前往编辑"
    : "下一步"
})

const handleNextStep = async () => {
  if (aiEdisConfig.active >= aiEdisConfig.steps.length - 1) {
    router.push(`/editor_pc/${aiEdisConfig.templateId}`)
    return
  }
  if (aiEdisConfig.active === 2) {
    if (!infoRef.value || !infoRef.value.formRef) return
    try {
      await infoRef.value.formRef.validate()
    } catch (e) {
      ElMessage.error("请填写完整信息")
      return
    }
  }
  aiEdisConfig.active++
}
const handlePrevStep = () => {
  if (aiEdisConfig.active <= 0) return
  aiEdisConfig.active--
}
const handleSelectTemplate = (id: string) => {
  aiEdisConfig.templateId = id
  handleNextStep()
}
const handleGenerateStart = () => {
  aiEdisConfig.loading = true
}
const handleGenerateTimeout = (isOk: boolean, data: OutputType[]) => {
  if (!isOk) {
    ElMessage.error("AI撰写失败，请稍后重试")
  } else {
    aiEdisConfig.data = data
    handleNextStep()
  }
  aiEdisConfig.loading = false
}
</script>

<template>
  <ElDialog
    v-model="isShow"
    :title="dialogTitle"
    :close-on-click-modal="false"
    :width="isSelectTemplate ? '80vw' : undefined"
    top="5vh"
  >
    <div>
      <ElSteps simple finish-status="success" :active="aiEdisConfig.active">
        <ElStep v-for="step in aiEdisConfig.steps" :key="step" :title="step" />
      </ElSteps>
    </div>
    <div
      class="ai-edit_wrap"
      :style="{
        width: isSelectTemplate ? '79vw' : undefined,
        backgroundColor: isSelectTemplate ? 'var(--primary-lighter)' : undefined
      }"
    >
      <!-- 选择语言 -->
      <div class="select-locale" v-if="aiEdisConfig.active === 0">
        <ElRadioGroup v-model="aiEdisConfig.locale" size="large">
          <ElRadio
            v-for="locale in localeList"
            :key="locale.value"
            :value="locale.value"
            >{{ locale.label }}
          </ElRadio>
        </ElRadioGroup>
      </div>
      <!-- 选择模版 -->
      <template v-if="isSelectTemplate">
        <TemplateList v-if="isSelectTemplate" @click="handleSelectTemplate" />
      </template>
      <template v-if="aiEdisConfig.active === 2">
        <InfoEdit ref="infoRef" v-model="aiEdisConfig.info" />
      </template>
      <template v-if="aiEdisConfig.active === 3">
        <AiEdit
          :config="aiEdisConfig"
          :info="aiEdisConfig.info"
          @click="handleGenerateStart"
          @progerss-end="handleGenerateTimeout"
        />
      </template>
      <!-- 预览简历 -->
      <template v-if="aiEdisConfig.active === 4">
        <TemplateSlot :id="aiEdisConfig.templateId" :data="aiEdisConfig.data" />
      </template>
      <div class="ai-edit_bottom" v-show="!aiEdisConfig.loading">
        <ElButton
          class="btn-hover"
          type="primary"
          v-show="aiEdisConfig.active > 0"
          @click="handlePrevStep"
        >
          上一步
        </ElButton>
        <ElButton
          v-if="aiEdisConfig.active !== 3"
          class="btn-hover"
          type="primary"
          @click="handleNextStep"
        >
          {{ nextText }}
        </ElButton>
      </div>
    </div>
  </ElDialog>
</template>

<style lang="scss" scoped>
.ai-edit_wrap {
  max-height: 76vh;
  overflow: auto;
  &:deep(.template-content) {
    padding: 20px !important;
  }
  .select-locale {
    margin: 20px 0;
  }
  .ai-edit_bottom {
    .el-button {
      width: 120px;
    }
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>
