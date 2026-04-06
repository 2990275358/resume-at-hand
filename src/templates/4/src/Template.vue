<script lang="ts" setup>
import { ElRow, ElCol, ElIcon } from "element-plus"
import { Avatar, Promotion } from "@element-plus/icons-vue"
import type { OutputType } from "@/config"
import { BASIC_INFO, RICH, TAG_INFO, TAG_SKILLED } from "@/config"
import ResumeView from "@/custom_cpn/resume_view"
import { useDataStore, useThemeStore } from "@/store"
import { useResumeStyle } from "@/hooks"
import { subpub } from "@/utils"

const { style } = useResumeStyle()
const themeStore = useThemeStore()

const dataStore = useDataStore()
defineProps<{
  data: OutputType[]
}>()

const handleClick = (id: string) => {
  dataStore.curSelectId = id
  subpub.emit("changeSelectId")
}
</script>

<template>
  <div class="resume-template" :style="style">
    <div class="header">
      <div class="header-content">
        <div class="left-side">
          <div class="title">{{ themeStore.title.text }}</div>
          <div class="slogan">{{ themeStore.title.slogan }}</div>
        </div>
        <div class="right-side" v-if="dataStore.imgUrl">
          <div class="photo-container">
            <img :src="dataStore.imgUrl" draggable="false" alt="证件照" />
          </div>
        </div>
      </div>
      <div class="header-border"></div>
    </div>
    <div class="content">
      <div class="content-grid">
        <template v-for="outPut in data" :key="outPut.id">
          <ResumeView
            v-if="outPut.type === BASIC_INFO"
            :id="outPut.id"
            @click="handleClick"
            class="section"
          >
            <div class="resume-title">
              <div class="icon-container">
                <el-icon><Avatar /></el-icon>
              </div>
              <div class="text">{{ outPut.title }}</div>
            </div>
            <div class="resume-content">
              <div class="content-container">
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
              </div>
            </div>
          </ResumeView>
          <ResumeView
            v-if="outPut.type === RICH"
            :id="outPut.id"
            @click="handleClick"
            class="section"
          >
            <div class="resume-title">
              <div class="icon-container">
                <el-icon><Promotion /></el-icon>
              </div>
              <div class="text">{{ outPut.title }}</div>
            </div>
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
            class="section"
          >
            <div class="resume-title">
              <div class="icon-container">
                <el-icon><Promotion /></el-icon>
              </div>
              <div class="text">{{ outPut.title }}</div>
            </div>
            <div class="resume-content">
              <div class="content-container">
                <div
                  class="rich-content-container"
                  v-for="richInfo in outPut.data"
                  :key="richInfo.id"
                >
                  <div class="rich-content" v-html="richInfo.richText"></div>
                  <div class="tag-list s-flex">
                    <template v-if="richInfo.tags">
                      <template v-if="richInfo.tags.type === TAG_SKILLED">
                        <div
                          class="tag_skilled"
                          v-for="tag in richInfo.tags.data"
                          :key="tag.value"
                        >
                          <div class="tag_skilled_item">{{ tag.value }}</div>
                          <div class="tag_skilled_line s-flex">
                            <div class="tag_skilled_progress">
                              <div
                                class="tag_skilled_progress_bar"
                                :style="{ width: tag.number + '%' }"
                              ></div>
                            </div>
                            <span>{{
                              tag.type === 1 ? tag.label : tag.number + "%"
                            }}</span>
                          </div>
                        </div>
                      </template>
                      <template v-else>
                        <div
                          class="tag_nomal_item"
                          v-for="tag in richInfo.tags.data"
                          :key="tag.value"
                        >
                          {{ tag.value }}
                        </div>
                      </template>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </ResumeView>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.resume-template {
  --page-gap: 10px;
  --row-gap: 0.7;
  --module-gap: 20px;
  --theme-color: #9c27b0;
  --theme-color-weak: #7b1fa2;
  --font-family: "Montserrat", sans-serif;
  --font-size: 14px;
  --tag-nomal-border-color: rgba(156, 39, 176, 0.3);
  --tag-nomal-bg-color: rgba(156, 39, 176, 0.04);
}

.resume-template .header {
  padding: 20px var(--page-gap);
  margin-bottom: 20px;
}

.resume-template .header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.resume-template .left-side {
  flex: 1;
}

.resume-template .title {
  font-size: 32px;
  font-weight: bold;
  color: var(--theme-color);
  margin-bottom: 5px;
}

.resume-template .slogan {
  font-size: 16px;
  color: var(--theme-color-weak);
  font-style: italic;
}

.resume-template .right-side {
  margin-left: 20px;
}

.resume-template .photo-container {
  width: 100px;
  height: 130px;
  overflow: hidden;
  border-radius: 5px;
  border: 2px solid var(--theme-color);
}

.resume-template .photo-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.resume-template .header-border {
  height: 3px;
  background: linear-gradient(to right, var(--theme-color), transparent);
  margin-top: 15px;
}

.resume-template .content {
  padding: 0 var(--page-gap);
}

.resume-template .content-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
}

.resume-template .section {
  margin-bottom: 0;
}

.resume-info-view .resume-title {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--theme-color);
}

.resume-info-view .resume-title .icon-container {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--theme-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.resume-info-view .resume-title .text {
  color: var(--theme-color);
  font-size: 18px;
  font-weight: bold;
}

.resume-info-view .content-container {
  padding: 0 0 var(--module-gap) 40px;
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
  font-weight: bold;
  color: var(--theme-color);
  margin-right: 15px;
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
  color: var(--theme-color);
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

.rich-content-container .tag-list {
  flex-wrap: wrap;
  column-gap: 20px;
}

.rich-content-container .tag_skilled_item {
  margin-top: 10px;
  font-weight: bold;
  color: var(--theme-color);
}

.rich-content-container .tag_skilled_line {
  column-gap: 10px;
  align-items: center;
}

.rich-content-container .tag_skilled_progress {
  width: 130px;
  height: 5px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #ebeef5;
}

.rich-content-container .tag_skilled_progress_bar {
  background-color: var(--theme-color);
  height: 100%;
}

.rich-content-container .tag_nomal_item {
  padding: 5px 15px;
  border: 1px solid var(--tag-nomal-border-color);
  border-radius: 20px;
  margin-top: 5px;
  background-color: var(--tag-nomal-bg-color);
}
</style>
