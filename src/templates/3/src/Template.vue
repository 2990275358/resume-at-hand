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
    <div class="sidebar">
      <div class="avatar-container" v-if="dataStore.imgUrl">
        <img :src="dataStore.imgUrl" draggable="false" alt="证件照" />
      </div>
      <div class="sidebar-title">
        <div class="title">{{ themeStore.title.text }}</div>
        <div class="slogan">{{ themeStore.title.slogan }}</div>
      </div>
    </div>
    <div class="main-content">
      <template v-for="outPut in data" :key="outPut.id">
        <ResumeView
          v-if="outPut.type === BASIC_INFO"
          :id="outPut.id"
          @click="handleClick"
        >
          <div class="resume-title">
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
        >
          <div class="resume-title">
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
        >
          <div class="resume-title">
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
</template>

<style lang="scss">
.resume-template {
  --page-gap: 10px;
  --row-gap: 0.7;
  --module-gap: 20px;
  --theme-color: #27ae60;
  --theme-color-weak: #219653;
  --font-family: "Roboto", Arial, sans-serif;
  --font-size: 14px;
  --tag-nomal-border-color: rgba(39, 174, 96, 0.3);
  --tag-nomal-bg-color: rgba(39, 174, 96, 0.04);
  display: flex;
  min-height: 100%;
}

.resume-template .sidebar {
  width: 25%;
  background-color: var(--theme-color);
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.resume-template .avatar-container {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
  border: 3px solid white;
}

.resume-template .avatar-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.resume-template .sidebar-title {
  text-align: center;
}

.resume-template .sidebar-title .title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.resume-template .sidebar-title .slogan {
  font-size: 14px;
  font-style: italic;
}

.resume-template .main-content {
  flex: 1;
  padding: 20px;
}

.resume-info-view .resume-title {
  position: relative;
  margin-bottom: 10px;
}

.resume-info-view .resume-title .text {
  display: inline-block;
  color: var(--theme-color);
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 5px;
  border-bottom: 2px solid var(--theme-color);
}

.resume-info-view .content-container {
  padding: 0 0 var(--module-gap) 10px;
  border-left: 2px solid var(--theme-color);
}

.resume-info-view .resume-content {
  padding: 0 15px;
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
