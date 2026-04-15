<script lang="ts" setup>
import { ref, toRaw, watch, onMounted, onBeforeUnmount } from "vue"
import { useDataStore, useThemeStore } from "@/store"
import NavBar from "@/components/nav_bar"
import HeadedrTool from "./child_cpn/header_tool"
import ResumeEdit from "./child_cpn/resume_edit"
import ResumeBody from "./child_cpn/resume_body"
import { subpub, formatOutData, editTagManager } from "@/utils"
import { getResumeById, updateResume, type IResume } from "@/service/indexedDB"
import { useLeaveTag } from "@/hooks"
import { ElMessage } from "element-plus"

const props = defineProps<{ id: string }>()

const dataStore = useDataStore()
const themeStore = useThemeStore()
const resume = ref<IResume | null>(null)

watch(
  () => {
    return dataStore.curSelectId
  },
  () => {
    isUnfold.value = true
  }
)

const getResume = async () => {
  const data = await getResumeById(props.id)
  if (!data) return
  resume.value = data
  dataStore.$patch({
    inputConfig: resume.value.content.input,
    imgUrl: resume.value.avatar,
    curSelectId: resume.value.content.input[0].id
  })
  themeStore.$patch(data.content.theme)
}

const handleUpdateResume = async () => {
  if (!resume.value) return
  const inputConfig = toRaw(dataStore.inputConfig)
  const data = await getResumeById(props.id)
  await updateResume(props.id, {
    // id: props.id,
    remark: data!.remark,
    avatar: dataStore.imgUrl,
    content: {
      output: formatOutData(inputConfig),
      theme: toRaw(themeStore.$state),
      input: inputConfig,
      templateId: resume.value?.content.templateId
    }
  })
}

const beforeUnload = async () => {
  editTagManager.remove(props.id)
  handleUpdateResume()
  window.removeEventListener("beforeunload", beforeUnload)
}

let Title = document.title

useLeaveTag({
  unload: beforeUnload,
  visibilityChange: () => {
    if (document.visibilityState === "hidden") {
      document.title = "不要离开我..."
      handleUpdateResume()
    } else {
      document.title = Title
    }
  }
})

const keydown = (e: KeyboardEvent) => {
  if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
    e.preventDefault()
    handleUpdateResume()
    ElMessage.success("保存成功")
  }
}

onMounted(() => {
  document.addEventListener("keydown", keydown)
  subpub.on("changeSelectId", () => {
    isUnfold.value = true
  })
  getResume()
  editTagManager.add(props.id)
})

onBeforeUnmount(() => {
  subpub.off("changeSelectId")
  beforeUnload()
  document.removeEventListener("keydown", keydown)
})

const barMouserEnter = () => {
  isUnfold.value = false
}
const isUnfold = ref(true)
</script>

<template>
  <div class="editor">
    <NavBar @mouseEnter="barMouserEnter">
      <template #center>
        <HeadedrTool />
      </template>
    </NavBar>
    <ResumeBody
      v-if="resume"
      :resumeId="resume.id"
      :id="resume.content.templateId || ''"
      @print="handleUpdateResume"
    />
    <div class="editor-area" :style="{ height: isUnfold ? '475px' : '70px' }">
      <div class="content-container">
        <div class="ball" @click="isUnfold = !isUnfold">
          <img
            class="arrow"
            src="../../assets/img/arrow.svg"
            :class="{ 'img-rotate': !isUnfold }"
          />
        </div>
        <ResumeEdit />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.editor {
  .editor-area {
    width: 100%;
    min-width: 1360px;
    height: 475px;
    max-height: calc(100% - 100px);
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    transition: height 0.3s ease-in-out;
    filter: drop-shadow(0px -5px 8px rgba(0, 0, 0, 0.1));
  }
  .content-container {
    position: relative;
    width: 100%;
    height: 100%;

    .ball {
      width: 80px;
      height: 80px;
      position: absolute;
      top: 0%;
      border-radius: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 10px;
      box-sizing: border-box;
      cursor: pointer;
      transition:
        height 0.3s ease-in-out,
        width 0.3s ease-in-out;
      z-index: 1;
      &:hover {
        height: 100px;
        width: 85px;
      }
      & > .arrow {
        width: 50%;
        height: 50%;
        transform: rotateZ(90deg);
        transition: transform 0.3s ease-in-out;
      }
    }
  }
}
.img-rotate {
  transform: rotateZ(270deg) !important;
}
</style>
