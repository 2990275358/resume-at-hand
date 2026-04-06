<script lang="ts" setup>
import { ElRow, ElCol, ElIcon } from "element-plus"
import { Avatar, Promotion } from "@element-plus/icons-vue"
import type { OutputType } from "@/config"
import { BASIC_INFO, RICH, TAG_INFO } from "@/config"
import ResumeView from "@/custom_cpn/resume_view"
import { useDataStore, useThemeStore } from "@/store"
import { useResumeStyle } from "@/hooks"
import { subpub } from "@/utils"
import { createReusableTemplate } from "@vueuse/core"
import { TagList } from "../../components"
import { hexToRgba } from "@/utils"

const { style } = useResumeStyle()
const themeStore = useThemeStore()

const dataStore = useDataStore()
defineProps<{
  data: OutputType[]
}>()

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

const handleClick = (id: string) => {
  dataStore.curSelectId = id
  subpub.emit("changeSelectId")
}
</script>

<template>
  <div class="resume-template2" :style="style">
    <DefineTemplate v-slot="{ title }">
      <div
        class="resume-title"
        :style="{ backgroundColor: hexToRgba(themeStore.themeColor, 0.2) }"
      >
        <div class="text" :style="{ color: themeStore.themeColor }">
          {{ title }}
        </div>
      </div>
    </DefineTemplate>
    <div class="header">
      <div class="header-left"></div>
      <div>个人简历</div>
    </div>
    <div class="content">
      <template v-for="outPut in data" :key="outPut.id">
        <ResumeView
          v-if="outPut.type === BASIC_INFO"
          :id="outPut.id"
          @click="handleClick"
        >
          <ReuseTemplate :title="outPut.title" />
          <div class="resume-content">
            <div class="content-container">
              <el-row :gutter="20">
                <el-col :span="20">
                  <div class="base-content-list">
                    <div
                      class="base-item"
                      v-for="item in outPut.data"
                      :key="item.id"
                    >
                      <span class="base-item-title">{{ item.name }}</span>
                      <span class="base-item-content">{{ item.value }}</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div
                    class="base-item-img"
                    v-show="outPut.isShowAvartar && dataStore.imgUrl"
                  >
                    <img
                      :src="dataStore.imgUrl"
                      draggable="false"
                      alt="证件照"
                    />
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </ResumeView>
        <ResumeView
          v-if="outPut.type === RICH"
          :id="outPut.id"
          @click="handleClick"
        >
          <ReuseTemplate :title="outPut.title" />
          <div class="resume-content">
            <div class="content-container">
              <div
                class="rich-content-container"
                v-for="richInfo in outPut.data"
                :key="richInfo.id"
              >
                <ul class="rich-conten-list s-flex">
                  <li
                    class="item"
                    v-for="titleInfo in richInfo.data"
                    :key="titleInfo.id"
                  >
                    {{ titleInfo.value }}
                  </li>
                </ul>
                <div class="rich-content" v-html="richInfo.richText"></div>
              </div>
            </div>
          </div>
        </ResumeView>
        <ResumeView
          v-if="outPut.type === TAG_INFO"
          :id="outPut.id"
          @click="handleClick"
        >
          <ReuseTemplate :title="outPut.title" />
          <div class="resume-content">
            <div class="content-container">
              <div
                class="rich-content-container"
                v-for="richInfo in outPut.data"
                :key="richInfo.id"
              >
                <div class="rich-content" v-html="richInfo.richText"></div>
                <TagList :tags="richInfo.tags" />
              </div>
            </div>
          </div>
          <div></div>
        </ResumeView>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.resume-template2 {
  --page-gap: 10px;
  --row-gap: 0.7;
  --module-gap: 20px;
  --theme-color: #f70d0d;
  --theme-color-weak: #991212;
  --font-family: SimSun, Microsoft YaHei;
  --font-size: 14px;
  --tag-nomal-border-color: rgba(247, 13, 13, 0.3);
  --tag-nomal-bg-color: rgba(247, 13, 13, 0.04);
}

.resume-template2 .content {
  padding: 0px var(--page-gap);
}
.resume-template2 .little-line {
  background-color: #c19f67;
  height: 100%;
}
.resume-template2 {
  .header {
    height: 30px;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    column-gap: 5px;
    padding: 20px var(--page-gap);
    .header-left {
      height: 100%;
      width: 4px;
      background-color: var(--theme-color);
      border-radius: 10px;
    }
  }
  .resume-info-view .resume-title {
    color: #fff;
    position: relative;
    border-radius: 4px;
  }
  .resume-info-view .resume-title .text {
    padding: 3px 10px;
    font-weight: 500;
  }
  .resume-info-view .content-container {
    padding: 10px 10px var(--module-gap);
  }
  .resume-info-view .resume-content {
    font-size: var(--font-size, 14px);
  }

  /* base-info-view */
  .resume-info-view .base-content-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .resume-info-view .base-item-title {
    min-width: 70px;
    display: inline-block;
    text-align-last: justify;
    margin-right: 15px;
  }
  .resume-info-view .base-item-img {
    width: 98px;
    height: 120px;
    overflow: hidden;
    border-radius: 4px;
  }
  .resume-info-view .base-item-img {
    /* 两寸照片 */
    width: 110px;
    height: 146px;
    overflow: hidden;
    border-radius: 4px;
  }
  .resume-info-view .base-item-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* rich */
  .rich-content-container {
    padding: 0;
    margin: 0;
  }
  .rich-content-container .rich-conten-list {
    align-items: center;
    justify-content: space-between;
    font-weight: 700;
    padding: 0;
    margin: 0;
  }

  .rich-content-container .rich-content ul li {
    list-style-type: disc;
  }
  .rich-content-container .rich-content ol li {
    list-style-type: decimal;
  }
  .rich-content-container .rich-content ul,
  .rich-content-container .rich-content ol {
    padding-left: 20px;
  }
  .rich-content-container .rich-content {
    line-height: var(--row-gap);
  }
}
</style>
