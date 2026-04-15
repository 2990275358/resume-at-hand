<script lang="ts" setup>
import ResumePreview from "@/components/resume_preview"
const emit = defineEmits<{
  click: [id: string]
}>()
const templateList = [
  {
    id: "1",
    cover: "/resume_1.png"
  },
  {
    id: "2",
    cover: "/resume_2.png"
  }
]
const handleClick = (id: string) => {
  emit("click", id)
}
</script>

<template>
  <section class="template">
    <div class="template-content">
      <div class="wrapper">
        <ResumePreview
          :info="i"
          v-for="i in templateList"
          :key="i.id"
          @click="handleClick(i.id)"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.template {
  height: 100%;
  .template-content {
    padding: 10px 285px;
    box-sizing: border-box;
    .title {
      font-weight: bold;
      font-size: 24px;
      color: var(--primary-color);
      text-align: center;
      border-bottom: 1px solid var(--border-dark);
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
    @media screen and (max-width: 1200px) {
      padding: 0px 100px;
    }
    @media screen and (max-width: 600px) {
      padding: 0px 10px;
    }
    .wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 2fr));
      gap: 20px;
    }
  }
}
</style>
