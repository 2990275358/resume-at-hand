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
  <div class="resume-template" :style="style">
    <DefineTemplate v-slot="{ title }">
      <div class="resume-title">
        <div class="text">
          {{ title }}
          <div class="line">
            <div class="line-item">
              <div class="mask"></div>
            </div>
          </div>
        </div>
        <dfn></dfn>
      </div>
    </DefineTemplate>
    <div class="header s-flex">
      <div class="left s-flex">
        <div class="title">{{ themeStore.title.text }}</div>
        <div class="line"></div>
        <div class="slogan">
          <div class="slogan-item">{{ themeStore.title.slogan }}</div>
          <div>Personal resume</div>
        </div>
      </div>
      <div class="right s-flex">
        <div class="circle">
          <el-icon><Avatar /></el-icon>
        </div>
        <div class="circle">
          <el-icon><Promotion /></el-icon>
        </div>
      </div>
    </div>
    <div class="header-line s-flex">
      <div class="left"></div>
      <div class="center"></div>
      <div class="right">
        <div class="little-line"></div>
      </div>
    </div>
    <div class="content">
      <div class="_block"></div>
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
.resume-template {
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
.resume-template .header {
  height: 50px;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
}
.resume-template .left {
  height: 100%;
}
.resume-template .title {
  font-size: 38px;
  color: var(--theme-color);
}
.resume-template .header .line {
  width: 2px;
  height: 100%;
  background-color: var(--theme-color);
  margin: 0 15px;
}
.resume-template .slogan-item {
  line-height: 23px;
  font-size: 14px;
}
.resume-template .slogan {
  font-size: 24px;
  color: var(--theme-color);
}
.resume-template .header .right {
  align-items: center;
}
.resume-template .header .circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #c19f67;
  color: #fff;
  text-align: center;
  margin-left: 10px;
  line-height: 46px;
  font-size: 22px;
}

.resume-template .content {
  padding: 0px var(--page-gap);
}
.resume-template .header-line {
  height: 30px;
}
.resume-template .header-line .left {
  background-color: var(--theme-color);
  width: 55%;
  height: 100%;
  position: relative;
  margin-right: 25px;
}
.resume-template .header-line .left::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-width: 30px 0 0 20px;
  border-style: solid;
  overflow: hidden;
  border-color: transparent;
  border-left-color: var(--theme-color);
  left: 100%;
}
.resume-template .header-line .center {
  width: 0px;
  height: 100%;
  background-color: #fff;
}
.resume-template .header-line .right {
  flex: 1;
  padding-top: 10px;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}
.resume-template .header-line .right::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-width: 20px 0px 0px 14px;
  border-style: solid;
  overflow: hidden;
  border-color: transparent;
  border-top-color: #c19f67;
  right: 100%;
  top: 10px;
}
.resume-template .little-line {
  background-color: #c19f67;
  height: 100%;
}
.resume-template ._block {
  height: 10px;
  border-left: 1px solid var(--theme-color);
  margin: 0 15px;
}
.resume-template {
  .resume-info-view .resume-title {
    color: #fff;
    border-bottom: 1px solid var(--theme-color);
    position: relative;
  }
  .resume-info-view .resume-title .line {
    position: absolute;
    width: 50px;
    height: 100%;
    top: 0px;
    right: 0px;
  }
  .resume-info-view .resume-title .line-item {
    position: relative;
    height: 100%;
    overflow: hidden;
  }
  .resume-info-view .resume-title .line-item::before {
    content: "";
    position: absolute;
    width: 4px;
    height: 169%;
    right: 28px;
    top: -12px;
    transform: rotate(315deg);
    border: 2px solid #ffffff;
  }
  .resume-info-view .resume-title .mask {
    position: absolute;
    width: 50px;
    height: 100%;
    top: -11px;
    right: -15px;
    transform: rotate(45deg);
    background-color: #ffffff;
  }
  .resume-info-view .resume-title .text {
    color: #fff;
    padding: 4px 60px 4px 20px;
    display: inline-block;
    position: relative;
    background-color: var(--theme-color);
  }
  .resume-info-view .resume-title dfn {
    width: 0;
    height: 0;
    overflow: hidden;
    border-style: solid;
    border-width: 9px 0 0 16px;
    border-color: var(--theme-color-weak) transparent transparent;
    position: absolute;
    left: 0px;
    top: 100%;
  }
  .resume-info-view .content-container {
    border-left: 1px solid var(--theme-color);
    padding: 20px 20px var(--module-gap);
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
