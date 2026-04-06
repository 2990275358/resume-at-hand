<script lang="ts" setup>
import { computed, ref } from "vue"
import { useDataStore } from "@/store"
import { formatOutData } from "@/utils"
import { getResumeById } from "@/service/indexedDB"
import { serverPrintPdf } from "@/service"
import TemplateSlot from "@/components/template_slot"
import {
  ElButton,
  ElSelect,
  ElOption,
  ElCol,
  ElRow,
  ElMessage,
  ElLoading
} from "element-plus"
import { Download, Edit } from "@element-plus/icons-vue"
import PageLine from "./PageLine.vue"
import { saveAs } from "file-saver"

const props = defineProps<{ id: string; resumeId: string }>()
const printType = ref(2)
const dataStore = useDataStore()
const output = computed(() => formatOutData(dataStore.inputConfig))

const emit = defineEmits(["print"])
const broswerPrint = () => {
  const origin = location.origin
  let iframeRef: HTMLIFrameElement | null = document.createElement("iframe")
  iframeRef.classList.add("preview-iframe")
  iframeRef.src = `${origin}/#/export/${props.resumeId}`
  const container = document.querySelector(".resume-body")
  if (!container) return
  container.appendChild(iframeRef)
  const iframeWindow = iframeRef.contentWindow
  if (!iframeWindow) return
  iframeWindow.onload = () => {
    const mediaQueryList = iframeWindow?.matchMedia("print")
    mediaQueryList?.addEventListener("change", (mql) => {
      // 用户完成打印操作后
      if (!mql.matches) {
        setTimeout(() => {
          if (!iframeRef) return
          iframeRef.remove()
          iframeRef = null
        }, 3000)
      }
    })
  }
  // 轮询判断iframe是否加载完成
  let timer = setInterval(() => {
    if (!iframeRef) {
      clearInterval(timer)
      return
    }
    const doc = iframeRef.contentDocument?.querySelector(".resume-template")
    if (doc) {
      clearInterval(timer)
      iframeWindow.print()
    }
  }, 10)
}
const handleExport = async () => {
  if (printType.value === 1) {
    emit("print")
    broswerPrint()
    return
  }
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)"
  })
  try {
    const resume = await getResumeById(props.resumeId)
    const { data } = await serverPrintPdf(props.resumeId, { resume })
    if (!data) return ElMessage.error("导出失败")
    const blob = new Blob([data], { type: "application/pdf" })
    saveAs(blob, `${resume?.remark || "简历"}.pdf`)
  } finally {
    loading.close()
  }
}
</script>

<template>
  <div class="resume-body s-flex">
    <!-- 简历视图 -->
    <div class="container" id="resume-preview-container">
      <TemplateSlot :id="id" :data="output" />
      <!-- 页面线，提示分页 -->
      <page-line />
    </div>
    <!-- 功能区 -->
    <div class="control-panel">
      <div class="control-panel-item">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-button :icon="Download" @click="handleExport">
              导出PDF
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button :icon="Edit">编辑选项</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="control-panel-item">
        <el-col :span="14">
          <el-select v-model="printType">
            <el-option label="浏览器打印" :value="1" />
            <el-option label="server打印" :value="2" />
          </el-select>
        </el-col>
      </div>
      <!-- 导出提示 -->
      <div class="control-panel-item">
        <span
          >*&nbsp;{{
            printType === 1
              ? "为了更好的导出结果，需要您配合设置"
              : "导出较慢，但简单效果好"
          }}</span
        >
        <ul v-if="printType === 1">
          <li>
            <div></div>
            更多设置-纸张尺寸-A4
          </li>
          <li>
            <div></div>
            更多设置-边距-无
          </li>
          <li>
            <div></div>
            更多设置-背景图形-选中
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.resume-body {
  justify-content: center;
  align-items: flex-start;
  column-gap: 10px;
  padding: 10px 20px 575px;
  user-select: none;
  position: relative;
  .container {
    width: 210mm;
    /* height: 297mm; */
    overflow: hidden;
    background: #fff; /* 可见边框用于调试 */
    padding: 20px 0px;
    position: relative;
  }
  .control-panel-item {
    margin-bottom: 10px;
    span {
      color: orange;
      margin: 10px 0;
      display: block;
      font-size: 12px;
    }
    ul {
      font-size: 12px;
      li {
        line-height: 20px;
        margin-left: 10px;
        div {
          --size: 6px;
          display: inline-block;
          width: var(--size);
          height: var(--size);
          background-color: orange;
          border-radius: 5px;
          margin-right: 5px;
        }
      }
    }
  }
  :deep(.preview-iframe) {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
  }
}
</style>
