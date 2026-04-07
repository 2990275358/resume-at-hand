<script lang="ts" setup>
import { ref, onMounted, toRaw } from "vue"
import NavBar from "@/components/nav_bar"
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElIcon,
  ElDialog,
  ElMessage,
  ElMessageBox,
  ElTag,
  ElSpace,
  ElCheckbox,
  vLoading
} from "element-plus"
import { EditPen, Tickets, User } from "@element-plus/icons-vue"
import dayjs, { type ConfigType } from "dayjs"
import "dayjs/locale/zh-cn"
import RelativeTime from "dayjs/plugin/relativeTime"
import {
  getDbResumeList,
  updateResume,
  deleteResume
} from "@/service/indexedDB"
import { queryResumeIds } from "@/service"
import type { IResume } from "@/service/indexedDB"
import { createMemorize, editTagManager } from "@/utils"
import { useAppRouter } from "@/hooks"
import { loginManager } from "@/utils"

dayjs.locale("zh-cn")
dayjs.extend(RelativeTime)
function formatTime(date: ConfigType, format = "YYYY-MM-DD") {
  if (format === "now") {
    return dayjs(date).fromNow()
  }
  return dayjs(date).format(format)
}

type ResumeList = IResume & {
  isChecked?: boolean
  isSync?: boolean
  isLoading?: boolean
}

const checkedItem = ref(2)
const resumeList = ref<ResumeList[]>([])
const remarkDailog = ref<{ isShow: boolean; data: Partial<IResume> }>({
  isShow: false,
  data: {}
})
const userInfo = ref<UserInfo>()
const dbResumeIds = ref<string[]>()
const isReadySync = ref(false)
const appRouter = useAppRouter()

onMounted(async () => {
  getResumeList()
  const info = loginManager.get()
  if (!info) return
  userInfo.value = info.user
})

const changeMenuChecked = (index: number) => {
  checkedItem.value = index
}
const getResumeList = async () => {
  const { data: ids } = await queryResumeIds()
  dbResumeIds.value = ids
  const resumes = await getDbResumeList()
  resumeList.value = resumes.sort((a, b) => {
    return b.updateTime - a.updateTime
  })
  resumeList.value.forEach((resume) => {
    resume.isChecked = false
    resume.isSync = dbResumeIds.value?.includes(resume.id!)
    resume.isLoading = false
  })
}
// 获取求职岗位
const getExpect = createMemorize((resume: IResume) => {
  const expectObj = resume.content.output[0].data.find(
    (item) => item.name === "求职岗位"
  )
  if (expectObj) return expectObj.value as string
  return ""
})

const handleRenameConfirm = async (e?: MouseEvent) => {
  e?.preventDefault()
  const newResume = remarkDailog.value.data
  await updateResume(newResume.id!, toRaw(newResume) as Required<IResume>)
  getResumeList()
  remarkDailog.value.isShow = false
}
const handleSetRemark = (resume: IResume) => {
  remarkDailog.value = {
    isShow: true,
    data: JSON.parse(JSON.stringify(resume))
  }
}
const handleGotoUpdateResume = (resume: IResume) => {
  if (editTagManager.isExist(resume.id)) {
    ElMessage({
      type: "warning",
      message: " 您正在编辑这份简历，请勿重复操作~"
    })
    return
  }
  appRouter.goTo("/editor_pc/" + resume.id)
}
const handleDeleteResume = async (resumeId: string) => {
  const confirm = await ElMessageBox.confirm(
    "此操作将永久删除该简历, 是否继续?",
    "提示",
    {
      confirmButtonText: "想好了",
      cancelButtonText: "没想好",
      confirmButtonClass: "el-button--danger",
      type: "warning"
    }
  )
  if (confirm === "confirm") {
    await deleteResume(resumeId)
    getResumeList()
  }
}
const handleSyncResume = async () => {
  if (!isReadySync.value) {
    isReadySync.value = true
    return
  }
  const list = resumeList.value
    .filter((item) => item.isChecked)
    .map((item) => {
      const { isChecked, isLoading, isSync, ...resume } = item
      return resume
    })
  handleSelectAll(false)
  isReadySync.value = false
}
const handleSelectAll = (value?: any) => {
  const isChecked = resumeList.value.every(
    (resume) => resume.isChecked && !resume.isSync
  )
  resumeList.value.forEach((resume) => {
    if (!resume.isSync) {
      if (typeof value === "boolean") {
        resume.isChecked = value
      } else {
        resume.isChecked = !isChecked
      }
    }
  })
}
</script>

<template>
  <div class="my-resume">
    <nav-bar />
    <div class="content-container s-flex">
      <div class="control-panel s-flex">
        <div
          class="control-panel__item s-flex"
          :class="{ active: checkedItem === 2 }"
          @click="changeMenuChecked(2)"
        >
          <el-icon><Tickets /></el-icon>
          <div>我的简历</div>
        </div>
        <div
          class="control-panel__item s-flex"
          :class="{ active: checkedItem === 1 }"
          @click="changeMenuChecked(1)"
          v-if="loginManager.isExist()"
        >
          <el-icon><User /></el-icon>
          <div>账号信息</div>
        </div>
      </div>
      <div class="main-content">
        <template v-if="checkedItem === 1">
          <div class="content-cart">
            <div class="content-cart__header">账号信息</div>
            <div class="content-cart__body">
              <div class="content-cart__body_item">
                ID:{{ userInfo?.account }}
              </div>
              <div class="content-cart__body_item">
                邮箱:{{ userInfo?.email }}
              </div>
              <div class="content-cart__body_item">
                简历数量：{{ resumeList.length }}
              </div>
              <div class="content-cart__body_item">
                AI次数：
                <el-space>
                  <el-tag type="info">已使用 {{ userInfo?.aiCount }}</el-tag>
                  <el-tag type="success">剩余 {{ 10 }}</el-tag>
                </el-space>
              </div>
            </div>
          </div>
          <div class="content-cart">
            <div class="content-cart__header">编辑信息</div>
            <div class="content-cart__body form-wrapper">
              <el-form label-width="80px">
                <el-form-item label="邮箱">
                  <div>
                    <el-button type="primary">绑定邮箱</el-button>
                    <div>
                      <span style="color: #ff9900">提示：</span>
                      绑定邮箱可以用于登录和找回密码
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input style="width: 240px" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item label="确认密码">
                  <el-input style="width: 240px" placeholder="请确认密码" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary">保存</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="content-cart">
            <div class="content-cart__header s-flex">
              <span>简历列表</span>
              <div>
                <el-button
                  class="btn-hover"
                  v-show="isReadySync"
                  @click="handleSelectAll"
                >
                  全选
                </el-button>
                <el-button
                  type="primary"
                  class="btn-hover"
                  @click="handleSyncResume"
                >
                  {{ isReadySync ? "开始同步" : "同步" }}
                </el-button>
              </div>
            </div>
            <div class="content-cart__body resume-wrapper s-flex">
              <div
                class="s-flex resume-item"
                v-for="resume in resumeList"
                :key="resume.id"
                v-loading="isReadySync && resume.isLoading!"
                element-loading-text="极速处理中..."
              >
                <div
                  class="mask"
                  @click="
                    resume.isChecked = !resume.isSync && !resume.isChecked
                  "
                  v-if="isReadySync"
                >
                  <el-checkbox
                    :disabled="resume.isSync"
                    v-model="resume.isChecked"
                    size="large"
                  ></el-checkbox>
                </div>
                <div class="img-wrapper">
                  <img
                    :src="`/public/resume_${resume.content.templateId!}.png`"
                    alt=""
                    draggable="false"
                  />
                </div>
                <div class="s-flex resume-list">
                  <div
                    class="s-flex"
                    style="row-gap: 20px; flex-direction: column"
                  >
                    <div>
                      <span>{{ resume.remark }}</span>
                      <span
                        style="
                          font-size: 12px;
                          color: #888;
                          cursor: pointer;
                          margin-left: 10px;
                        "
                        @click="handleSetRemark(resume)"
                      >
                        <el-icon><EditPen /></el-icon>
                        备注
                      </span>
                    </div>
                    <div style="color: #888" v-if="getExpect(resume)">
                      期望：{{ getExpect(resume) }}
                    </div>
                    <div style="color: #888">
                      创建时间：{{ formatTime(resume.createTime) }}
                    </div>
                    <div style="color: #888">
                      上次编辑：{{ formatTime(resume.updateTime, "now") }}
                    </div>
                    <div style="color: #888">
                      是否同步：
                      <el-tag
                        type="success"
                        v-if="dbResumeIds?.includes(resume.id)"
                      >
                        已同步
                      </el-tag>
                      <el-tag type="info" v-else> 未同步 </el-tag>
                    </div>
                  </div>
                  <div style="padding-bottom: 20px">
                    <el-button
                      type="primary"
                      @click="handleGotoUpdateResume(resume)"
                    >
                      编辑 & 下载
                    </el-button>
                    <el-button
                      type="danger"
                      @click="handleDeleteResume(resume.id)"
                      >删除</el-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <el-dialog
      width="500"
      v-model="remarkDailog.isShow"
      title="修改备注"
      :append-to-body="true"
    >
      <el-form>
        <el-form-item>
          <el-input
            placeholder="请输入新标题(为空则不显示)"
            v-model="remarkDailog.data.remark"
            @keyup.enter="handleRenameConfirm($event)"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="remarkDailog.isShow = false">取消</el-button>
          <el-button type="primary" @click="handleRenameConfirm">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.my-resume {
  height: 100%;
  .content-container {
    margin: 0 auto;
    max-width: 1200px;
    margin-top: 20px;
    align-items: flex-start;
    gap: 10px;
  }
  .control-panel {
    flex-direction: column;
    .control-panel__item {
      height: 40px;
      align-items: center;
      cursor: pointer;
      & > div {
        margin-left: 10px;
      }
      &.active,
      &:hover {
        color: var(--primary-color);
      }
    }
  }
  .main-content {
    flex: 1;
  }
  .content-cart {
    background-color: #fff;
    margin-bottom: 10px;
    border-radius: var(--radius);
    box-shadow: 0 2px 15px var(--shadow-light);
    .content-cart__header {
      line-height: 52px;
      padding: 0 20px;
      box-sizing: border-box;
      font-size: 18px;
      border-bottom: 1px solid #eee;
      cursor: default;
      user-select: none;
      justify-content: space-between;
      align-items: center;
    }
    .content-cart__body {
      padding: 0 20px 10px;
      box-sizing: border-box;
      &.form-wrapper {
        padding-top: 10px;
      }
      &.resume-wrapper {
        padding-top: 10px;
        /* flex-direction: column; */
        flex-wrap: wrap;
        column-gap: 40px;
        row-gap: 20px;
      }
    }
    .content-cart__body_item {
      line-height: 42px;
      display: flex;
      align-items: center;
    }
  }
  .img-wrapper {
    width: 165px;
    height: 230px;
    border-radius: 5px;
    overflow: hidden;
    margin-right: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);
    margin-right: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .resume-list {
    flex-direction: column;
    row-gap: 20px;
    justify-content: space-between;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1;
    padding: 0 10px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .resume-item {
    position: relative;
    border: 2px dashed #eee;
    padding: 10px;
    border-radius: 10px;
    width: 385px;
    &:deep(.el-checkbox__inner) {
      width: 16px;
      height: 16px;
    }
  }
}
</style>
