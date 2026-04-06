<script lang="ts" setup>
import { toRaw } from "vue"
import { ElMessage } from "element-plus"
import NavBar from "@/components/nav_bar"
import ControlPanel from "./child_cpn/control_panel"
import TemplateSlot from "@/components/template_slot"
import { defaultOutput, inputData } from "@/config"
import { insterResume } from "@/service/indexedDB"
import { useThemeStore, useDataStore } from "@/store"
import { editTagManager } from "@/utils"

const props = defineProps<{
  id: string
}>()

const themeStore = useThemeStore()
const dataStore = useDataStore()
const handleGoToEdit = async () => {
  if (editTagManager.isExist()) {
    ElMessage({
      type: "warning",
      message: " 您有正在编辑的简历，请先完善好存在的哦~"
    })
    return
  }
  const theme = toRaw(themeStore.$state)
  const { isOk, body } = await insterResume(
    { output: defaultOutput, input: inputData, templateId: props.id, theme },
    dataStore.$state.imgUrl
  )
  if (!isOk) {
    ElMessage({
      type: "error",
      message: "简历创建失败"
    })
    return
  }
  window.open("#/editor_pc/" + body!.id)
}
</script>

<template>
  <div class="resume-detail">
    <NavBar />
    <div class="content s-flex">
      <div class="breadcrumbs">
        <span class="breadcrumbs-item">
          <a href="#">首页</a>
        </span>
        <span class="breadcrumbs-item">&gt;</span>
        <span class="breadcrumbs-item">简历模版详情</span>
      </div>
      <div class="resume-detail-container">
        <div class="resume-detail-content">
          <TemplateSlot :id="id" :data="defaultOutput" />
        </div>
        <ControlPanel @on-click="handleGoToEdit" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.resume-detail {
  height: 100%;
  .content {
    min-width: 1200px;
    padding: 10px;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    row-gap: 10px;
    @media screen and (max-width: 1700px) {
      padding: 10px 100px;
    }
    @media screen and (max-width: 1400px) {
      padding: 10px 50px;
    }
    @media screen and (max-width: 600px) {
      padding: 10px 10px;
      min-width: 390px;
      overflow: hidden;
    }
    .breadcrumbs {
      width: 100%;
      box-sizing: border-box;
      padding-left: 40px;
      .breadcrumbs-item {
        margin-right: 10px;
        &:nth-child(2) {
          color: var(--primary-color);
          font-size: 18px;
          cursor: default;
        }
        &:last-child {
          cursor: default;
          font-weight: bold;
        }
        &:last-child,
        & > a:hover {
          color: var(--primary-color);
        }
      }
    }
  }
  .resume-detail-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    column-gap: 10px;
    @media screen and (max-width: 1400px) {
      & > div {
        margin-bottom: 10px;
      }
      flex-direction: column;
    }
  }
  .resume-detail-content {
    height: 1160px;
    background-color: #fff;
    width: 895px;
    border-radius: var(--radius);
    overflow: hidden;
    user-select: none;
    box-shadow: 0 2px 15px var(--shadow-light);
  }
}
</style>
