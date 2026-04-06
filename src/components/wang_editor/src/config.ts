import type { IEditorConfig } from "@wangeditor/editor"

export type WangEditorProps = {
  editorConfig?: Partial<IEditorConfig>
}

// 工具栏配置
export const toolbarKeys = [
  "headerSelect",
  "fontSize",
  "fontFamily",
  "lineHeight",
  "bold",
  "underline",
  "italic",
  "color",
  "bgColor",
  "|",
  "bulletedList",
  "numberedList",
  "|",
  {
    key: "group-justify",
    title: "对齐",
    iconSvg:
      '<svg viewBox="0 0 1024 1024"><path d="M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z"></path></svg>',
    menuKeys: ["justifyLeft", "justifyRight", "justifyCenter", "justifyJustify"]
  },
  "|",
  "undo",
  "redo"
]
