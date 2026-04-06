<script lang="ts" setup>
import "@wangeditor/editor/dist/css/style.css" // 引入 css
import { onBeforeUnmount, shallowRef } from "vue"
import { Editor, Toolbar } from "@wangeditor/editor-for-vue"
import { toolbarKeys, type WangEditorProps } from "./config"

withDefaults(defineProps<WangEditorProps>(), {
  editorConfig: () => ({ placeholder: "请输入内容..." })
})

const value = defineModel({ type: String })

const editorRef = shallowRef<any>()
const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>

<template>
  <div class="editor-container">
    <Toolbar :editor="editorRef" :defaultConfig="{ toolbarKeys }" />
    <div class="line"></div>
    <Editor
      v-model="value"
      mode="default"
      @onCreated="handleCreated"
      :defaultConfig="editorConfig"
    />
  </div>
</template>

<style lang="scss" scoped>
.editor-container {
  --w-e-textarea-bg-color: #f3f4f6;
  --w-e-toolbar-bg-color: #f3f4f6;
  width: 100%;
  height: 301px;
  border: 1px solid #ccc;
  background-color: #ccc;
  border-radius: var(--radius);
  overflow: hidden;
}
.line {
  height: 1px;
  background-color: #ccc;
}
</style>
