<script lang="ts" setup>
import { ref, computed } from "vue"
import {
  ElTooltip,
  ElForm,
  ElFormItem,
  ElDialog,
  ElInput,
  ElButton,
  ElNotification,
  ElIcon
} from "element-plus"
import { InfoFilled } from "@element-plus/icons-vue"
import type {
  InputDataType,
  CustomContentType,
  RichContentType
} from "@/config"
import { BASIC_INFO, RICH, TAG_INFO } from "@/config"
import { storeToRefs } from "pinia"
import { useDataStore } from "@/store"

const dataStore = useDataStore()

const { inputConfig, curSelectId } = storeToRefs(dataStore)

const renameDialog = ref({ isShow: false, title: "", oldTitle: "", id: "" })

const renameDialogTitle = computed(() => {
  return `修改模块${renameDialog.value.oldTitle ? `（${renameDialog.value.oldTitle}）` : ""}名称`
})

const moveTitle = (idx: number, type: string, e: MouseEvent) => {
  e.stopPropagation()
  const curindex = inputConfig.value[idx].index
  let replaceIdx = idx
  if (type === "prev") {
    replaceIdx = idx - 1
  } else {
    replaceIdx = idx + 1
  }
  inputConfig.value[idx].index = inputConfig.value[replaceIdx].index
  inputConfig.value[replaceIdx].index = curindex
  inputConfig.value = inputConfig.value.sort((a, b) => a.index - b.index)
}
const changeCurId = (item: InputDataType) => {
  if (item.isShow) {
    curSelectId.value = item.id
  } else {
    ElNotification({
      title: "这是隐藏模块",
      message: "启用请点击标题上面的灰色开关",
      type: "warning",
      position: "bottom-right"
    })
  }
}
const renameStart = (itme: InputDataType) => {
  const { id, title } = itme
  renameDialog.value = { isShow: true, title: "", oldTitle: title, id }
}
const handleRenameCancel = () => {
  renameDialog.value.isShow = false
}
const handleRenameConfirm = (e?: MouseEvent) => {
  e?.preventDefault()
  renameDialog.value.isShow = false
  const { id, title } = renameDialog.value
  const idx = inputConfig.value.findIndex((item) => item.id === id)
  if (idx !== -1) {
    inputConfig.value[idx].title = title
  }
}
</script>

<template>
  <div class="resume-edit">
    <div class="editor-header">
      <TransitionGroup tag="ul" name="list" class="title-list">
        <template v-for="(item, idx) in inputConfig" :key="item.id">
          <li
            class="title-item"
            :class="{ active: item.id === curSelectId }"
            @click="changeCurId(item)"
          >
            <b>{{ item.title || "无标题" }}</b>
            <div
              class="switch"
              v-show="idx !== 0"
              :class="{ 'switch-checked': item.isShow }"
              @click="item.isShow = !item.isShow"
            >
              <el-tooltip placement="top" content="点击可以隐藏">
                <div class="container">
                  <div class="dot"></div>
                </div>
              </el-tooltip>
            </div>
            <div
              class="move prev"
              v-show="item.isShow && ![0, 1].includes(idx)"
              @click="moveTitle(idx, 'prev', $event)"
            >
              <el-tooltip placement="top" content="前移模块">
                <div class="symbol">
                  <img src="@/assets/img/left.png" alt="" />
                </div>
              </el-tooltip>
            </div>
            <div
              class="move next"
              v-show="
                item.isShow && idx !== inputConfig.length - 1 && idx !== 0
              "
              @click="moveTitle(idx, 'next', $event)"
            >
              <el-tooltip placement="top" content="后移模块">
                <div class="symbol">
                  <img src="@/assets/img/right.png" alt="" />
                </div>
              </el-tooltip>
            </div>
            <div
              class="rename"
              v-show="item.isShow && idx !== 0"
              @click.stop="renameStart(item)"
            >
              <el-tooltip placement="top" content="修改模块标题">
                <img src="@/assets/img/editor.png" alt="" />
              </el-tooltip>
            </div>
          </li>
        </template>
      </TransitionGroup>
    </div>
    <div style="height: 10px"></div>
    <template v-for="inputContent in inputConfig" :key="inputContent.id">
      <div
        class="hint-text"
        v-show="
          curSelectId === inputConfig[0].id &&
          inputContent.id === inputConfig[0].id
        "
      >
        <el-icon><InfoFilled :size="18" color="#ff6600" /></el-icon>
        <span class="tip">
          填写后会自动排版在简历上，不需要的信息可以选择不填或删除内容。
        </span>
      </div>
      <MyBaseInfo
        v-if="
          curSelectId === inputContent.id &&
          inputContent.isShow &&
          inputContent.type === BASIC_INFO
        "
        v-model="inputContent.content as CustomContentType"
      />
      <MyRichInfo
        v-if="
          curSelectId === inputContent.id &&
          inputContent.isShow &&
          inputContent.type === RICH
        "
        v-model="inputContent.content as RichContentType[]"
        :name="inputContent.title"
      />
      <MyTagInfo
        v-if="
          curSelectId === inputContent.id &&
          inputContent.isShow &&
          inputContent.type === TAG_INFO
        "
        v-model="(inputContent.content as RichContentType[])[0]"
        :name="inputContent.title"
      />
    </template>
    <el-dialog
      width="500"
      v-model="renameDialog.isShow"
      :title="renameDialogTitle"
      :append-to-body="true"
    >
      <el-form>
        <el-form-item>
          <el-input
            placeholder="请输入新标题(为空则不显示)"
            v-model="renameDialog.title"
            @keyup.enter="handleRenameConfirm($event)"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleRenameCancel">取消</el-button>
          <el-button type="primary" @click="handleRenameConfirm">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.resume-edit {
  height: 100%;
  position: relative;
  z-index: 1;
  padding: 0px 285px;
  box-sizing: border-box;
  overflow: auto;
  .editor-header {
    height: 60px;
    position: sticky;
    top: 0px;
    background-color: var(--bg-primary);
    z-index: 999;
    .title-list {
      padding: 20px 0 0;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      border-bottom: 2px solid var(--border-medium);
    }
    .title-item {
      min-width: 102px;
      padding: 20px 15px 10px;
      box-sizing: border-box;
      text-align: center;
      position: relative;
      margin: 0 5px;
      cursor: pointer;
      &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 2px;
      }
      &.active {
        &::after {
          background-color: var(--secondary-color);
        }
        color: var(--secondary-color);
        .move,
        .rename {
          display: block;
        }
        .switch {
          width: 45px;
          .container {
            display: block;
          }
        }
      }
      &:hover {
        .move,
        .rename {
          display: block;
        }
        .switch {
          width: 45px;
          .container {
            display: block;
          }
        }
      }
      .switch {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 16px;
        height: 16px;
        background-color: var(--bg-tertiary);
        border-radius: 10px;
        .container {
          width: 100%;
          height: 100%;
          position: relative;
          display: none;
          .dot {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: #fff;
            transform: translate(2px, 1px);
            transition: transform 0.3s ease-in-out;
          }
        }
        &.switch-checked {
          background: var(--primary-gradient);
          .dot {
            transform: translate(30px, 1px);
          }
        }
      }
      .move {
        display: none;
        position: absolute;
        top: 0;
        &.prev {
          left: 2px;
        }
        &.next {
          right: 2px;
        }
        .symbol {
          background: var(--primary-gradient);
          color: #fff;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px;
          box-sizing: border-box;
          img {
            width: 100%;
            height: 100%;
          }
          &:hover {
            background: var(--primary-color);
          }
        }
      }
      .rename {
        display: none;
        position: absolute;
        right: -8px;
        bottom: 10px;
        width: 20px;
        height: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      b {
        font-size: 18px;
      }
    }
  }
  .hint-text {
    color: var(--secondary-color);
    margin-top: 15px;
    display: flex;
    align-items: center;
    .tip {
      font-size: 14px;
      margin-left: 5px;
    }
  }
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
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
