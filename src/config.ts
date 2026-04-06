import { maritalStatusList, educationList, sexList } from "@/i18n"
import { nanoid } from "nanoid"
import { type WangEditorProps } from "@/components/wang_editor/index"

// 普通文本输入框组件
export const TEXT_INPUT_TAG = "MyInput"
// 自定义复选框组件
export const CHECKBOX_TAG = "MyCheckbox"
// 日期选择器
export const DATE_PICKER_TAG = "MyDatePicker"
// 自定义日期段选择
export const DATE_RANGE_PICKER_TAG = "MyRangeDatePicker"
// 富文本编辑器
export const RICH_TEXT_EDITOR_TAG = "WangEditor"
// 标签
// 下拉选择器
export const DROPDOWN_SELECTOR_TAG = "MySelect"
// 级联选择器
export const CASCADED_SELECTOR_TAG = "cascaded"
// 文件选择器
export const FILE_SELECTOR_TAG = "MyUpload"

// 以下是输入类型
// 基本信息
export const BASIC_INFO = "basic_info"
// 富文本输入
export const RICH = "rich"
// tag标签
export const TAG_INFO = "tag_info"

// 标签类型
// 普通
export const TAG_NORMAL = "tag_nomal"
// 带进度的
export const TAG_SKILLED = "tag_skilled"

// 输入组件类型
export type InputComponentType =
  | typeof TEXT_INPUT_TAG
  | typeof DATE_PICKER_TAG
  | typeof DATE_RANGE_PICKER_TAG
  | typeof FILE_SELECTOR_TAG
  | typeof CHECKBOX_TAG
  | typeof DROPDOWN_SELECTOR_TAG
  | typeof CASCADED_SELECTOR_TAG
// 输入类型
export type InputType = typeof BASIC_INFO | typeof RICH | typeof TAG_INFO
export type InputTagType = typeof TAG_NORMAL | typeof TAG_SKILLED

export type DataContentType = {
  label: string
  value: number | string
}
// 基本信息输入类型
export type BasicInfoContentType = {
  name: string
  component: InputComponentType
  field: string
  value: string | number | string[]
  config?: {
    isOfNumber?: boolean // 是否转为年龄
    isSoFar?: boolean // 是否至今
    isShow?: boolean // 是否显示
    span?: number // 跨度
  }
  placeholder?: string | string[]
  options?: DataContentType[]
}
// 富文本输入类型
export type RichType = {
  value: string
  field: string
}
export type CustomContentType = {
  customContent: BasicInfoContentType[]
  defaultContent: BasicInfoContentType[]
}
export type TagComponentType = {
  type: InputTagType
  list: string[]
  field: string
  content?: BasicInfoContentType[]
  controls?: BasicInfoContentType[][]
  values: string[]
}
export type RichContentType = {
  id: string
  index: number
  rich: string
  tags?: TagComponentType
  editorConfig?: WangEditorProps["editorConfig"]
  content: BasicInfoContentType[]
}
// 输入数据结构
export type InputDataType = {
  title: string
  type: InputType
  id: string
  index: number
  isShow: boolean
  field?: string
  content: BasicInfoContentType[] | RichContentType[] | CustomContentType
}

export type TagItemOutType = {
  value: string
  label?: string
  number?: number
  type?: number
}
export type TagOutType = {
  type: string
  data: TagItemOutType[]
}

// 输出数据结构
export type DataItem = {
  avatar?: string
  id: string
  index?: number // 用于排序的索引
  richText?: string
  name?: string
  value?: string | number | string[]
  tags?: TagOutType
  data?: DataItem[]
}
export type OutputType = {
  title: string
  type: InputType
  id: string
  index?: number
  component: string
  isShowAvartar?: boolean
  data: DataItem[]
}

// 输入数据格式
export const inputData: InputDataType[] = [
  {
    title: "基本信息",
    type: BASIC_INFO,
    id: nanoid(),
    isShow: true,
    index: 0,
    content: {
      defaultContent: [
        {
          name: "您的姓名",
          component: TEXT_INPUT_TAG,
          field: "name",
          placeholder: "请输入您的姓名",
          value: "王有为"
        },
        {
          name: "您的性别",
          component: DROPDOWN_SELECTOR_TAG,
          field: "sex",
          value: 1,
          options: sexList,
          config: {}
        },
        {
          name: "出生年月",
          component: DATE_PICKER_TAG,
          value: "2000-12",
          placeholder: "请选择出生年月",
          field: "birthday",
          config: {
            isOfNumber: true // 是否转为年龄
          }
        },
        {
          name: "照片设置",
          value: "",
          component: FILE_SELECTOR_TAG,
          field: "avatar",
          config: {
            isShow: true
          }
        },
        {
          name: "籍贯",
          component: TEXT_INPUT_TAG,
          value: "四川巴中",
          placeholder: "请输入籍贯",
          field: "nativePlace"
        },
        {
          name: "联系电话",
          component: TEXT_INPUT_TAG,
          value: "15828917951",
          placeholder: "请输入联系电话",
          field: "phone"
        },
        {
          name: "联系邮箱",
          component: TEXT_INPUT_TAG,
          value: "2990275358@qq.com",
          placeholder: "请输入联系邮箱",
          field: "email"
        },
        {
          name: "婚姻状况",
          component: DROPDOWN_SELECTOR_TAG,
          value: "-1",
          field: "maritalStatus",
          options: maritalStatusList
        },
        {
          name: "工作年限",
          component: TEXT_INPUT_TAG,
          value: "1",
          placeholder: "请输入工作年限",
          field: "workYears"
        },
        {
          name: "求职岗位",
          component: TEXT_INPUT_TAG,
          value: "前端开发",
          placeholder: "请输入求职岗位",
          field: "job"
        }
      ],
      customContent: []
    }
  },
  {
    title: "工作经历",
    type: RICH,
    id: nanoid(),
    index: 1,
    isShow: true,
    content: [
      {
        id: nanoid(),
        index: 0,
        rich: `<ul><li style="text-align: left;">熟练使用React/Vue，并理解其基本原理</li><li style="text-align: left;">熟练掌握JavaScript高级语法，包括其ES6-ES12的新语法</li><li style="text-align: left;">熟练掌握nodejs，能结合第三方库开发服务端代码</li><li style="text-align: left;">熟练使用Webpack/vite等打包工具</li><li style="text-align: left;">熟练使用git作为版本控制工具</li><li style="text-align: left;">熟练使用SQL语句和一些数据库产品，例如MySQL、Redis</li><li style="text-align: left;">了解并使用过c#、java、python、flutter</li></ul>`,
        editorConfig: {
          placeholder:
            "详细描述你的职责范围、工作任务及取得的成绩，描述尽量具体简洁，工作经验的描述尽量与目标岗位的招聘要求匹配。"
        },
        content: [
          {
            name: "公司名称",
            value: "武汉辛纳",
            placeholder: "请输入公司名称",
            component: TEXT_INPUT_TAG,
            field: "companyName"
          },
          {
            name: "职位",
            value: "前端开发",
            placeholder: "请输入职位名称",
            component: TEXT_INPUT_TAG,
            field: "jobTitle"
          },
          {
            name: "在职日期",
            component: DATE_RANGE_PICKER_TAG,
            placeholder: ["入职时间", "离职时间"],
            value: ["2023-12-20", "2023-12-20"],
            field: "dateOfEmployment",
            config: {
              isSoFar: true, // 是否至今
              span: 8
            }
          }
        ]
      }
    ]
  },
  {
    title: "教育背景",
    type: RICH,
    id: nanoid(),
    index: 2,
    isShow: true,
    content: [
      {
        id: nanoid(),
        index: 0,
        rich: `<ul><li style="text-align: left;">熟练使用React/Vue，并理解其基本原理</li><li style="text-align: left;">熟练掌握JavaScript高级语法，包括其ES6-ES12的新语法</li><li style="text-align: left;">熟练掌握nodejs，能结合第三方库开发服务端代码</li><li style="text-align: left;">熟练使用Webpack/vite等打包工具</li><li style="text-align: left;">熟练使用git作为版本控制工具</li><li style="text-align: left;">熟练使用SQL语句和一些数据库产品，例如MySQL、Redis</li><li style="text-align: left;">了解并使用过c#、java、python、flutter</li></ul>`,
        editorConfig: {
          placeholder:
            "所修课程、成绩排名、在校的职务、参赛获奖情况等有利于突出个人优势的信息。尽量简洁，突出重点。"
        },
        content: [
          {
            name: "学校名称",
            value: "荆州学院",
            placeholder: "请输入学校名称",
            component: TEXT_INPUT_TAG,
            field: "schoolName"
          },
          {
            name: "所学专业",
            value: "计算机科学与技术",
            placeholder: "请输入专业名称",
            component: TEXT_INPUT_TAG,
            field: "nameMajor"
          },
          {
            name: "就读时间",
            component: DATE_RANGE_PICKER_TAG,
            placeholder: ["入学时间", "毕业时间"],
            value: ["2023-12-20", "2023-12-20"],
            field: "dateOfEmployment",
            config: {
              isSoFar: false, // 是否至今
              span: 8
            }
          },
          {
            name: "学历",
            value: "-1",
            component: DROPDOWN_SELECTOR_TAG,
            options: educationList,
            field: "education"
          }
        ]
      }
    ]
  },
  {
    title: "技能特长",
    type: TAG_INFO,
    id: nanoid(),
    index: 3,
    isShow: true,
    content: [
      {
        id: nanoid(),
        index: 1,
        rich: `<ul><li style="text-align: left;">熟练使用React/Vue，并理解其基本原理</li><li style="text-align: left;">熟练掌握JavaScript高级语法，包括其ES6-ES12的新语法</li><li style="text-align: left;">熟练掌握nodejs，能结合第三方库开发服务端代码</li><li style="text-align: left;">熟练使用Webpack/vite等打包工具</li><li style="text-align: left;">熟练使用git作为版本控制工具</li><li style="text-align: left;">熟练使用SQL语句和一些数据库产品，例如MySQL、Redis</li><li style="text-align: left;">了解并使用过c#、java、python、flutter</li></ul>`,
        editorConfig: {
          placeholder: "技能特长非必填"
        },
        tags: {
          type: TAG_SKILLED,
          list: ["JavaScript", "Java", "NodeJs", "Office软件", "英语"],
          field: "tags",
          controls: [],
          values: []
        },
        content: []
      }
    ]
  },
  {
    title: "项目经验",
    type: RICH,
    id: nanoid(),
    index: 4,
    isShow: true,
    content: [
      {
        id: nanoid(),
        index: 0,
        rich: `<ul><li style="text-align: left;">熟练使用React/Vue，并理解其基本原理</li><li style="text-align: left;">熟练掌握JavaScript高级语法，包括其ES6-ES12的新语法</li><li style="text-align: left;">熟练掌握nodejs，能结合第三方库开发服务端代码</li><li style="text-align: left;">熟练使用Webpack/vite等打包工具</li><li style="text-align: left;">熟练使用git作为版本控制工具</li><li style="text-align: left;">熟练使用SQL语句和一些数据库产品，例如MySQL、Redis</li><li style="text-align: left;">了解并使用过c#、java、python、flutter</li></ul>`,
        editorConfig: {
          placeholder: "请输入项目内容、成果和感悟,简洁突出重点。"
        },
        content: [
          {
            name: "项目名称",
            value: "",
            placeholder: "请输入项目名称",
            component: TEXT_INPUT_TAG,
            field: "companyName"
          },
          {
            name: "参与角色",
            value: "",
            placeholder: "请输入角色名称",
            component: TEXT_INPUT_TAG,
            field: "jobTitle"
          },
          {
            name: "项目时间",
            component: DATE_RANGE_PICKER_TAG,
            placeholder: ["开始时间", "结束时间"],
            value: ["2023-12-20", "2023-12-20"],
            field: "dateOfEmployment",
            config: {
              isSoFar: true, // 是否至今
              span: 8
            }
          }
        ]
      }
    ]
  },
  {
    title: "兴趣爱好",
    type: TAG_INFO,
    id: nanoid(),
    index: 5,
    isShow: true,
    content: [
      {
        id: nanoid(),
        index: 1,
        rich: `<ul><li style="text-align: left;">熟练使用React/Vue，并理解其基本原理</li><li style="text-align: left;">熟练掌握JavaScript高级语法，包括其ES6-ES12的新语法</li><li style="text-align: left;">熟练掌握nodejs，能结合第三方库开发服务端代码</li><li style="text-align: left;">熟练使用Webpack/vite等打包工具</li><li style="text-align: left;">熟练使用git作为版本控制工具</li><li style="text-align: left;">熟练使用SQL语句和一些数据库产品，例如MySQL、Redis</li><li style="text-align: left;">了解并使用过c#、java、python、flutter</li></ul>`,
        editorConfig: {
          placeholder: "兴趣爱好非必填"
        },
        tags: {
          type: TAG_NORMAL,
          list: ["爬山", "跑步", "唱歌", "跳舞", "摄影", "旅行", "健身"],
          field: "hobbyTags",
          values: ["爬山", "跑步"]
        },
        content: []
      }
    ]
  },
  {
    title: "自我评价",
    type: TAG_INFO,
    id: nanoid(),
    index: 6,
    isShow: true,
    content: [
      {
        id: nanoid(),
        index: 1,
        rich: `<ul><li style="text-align: left;">熟练使用React/Vue，并理解其基本原理</li><li style="text-align: left;">熟练掌握JavaScript高级语法，包括其ES6-ES12的新语法</li><li style="text-align: left;">熟练掌握nodejs，能结合第三方库开发服务端代码</li><li style="text-align: left;">熟练使用Webpack/vite等打包工具</li><li style="text-align: left;">熟练使用git作为版本控制工具</li><li style="text-align: left;">熟练使用SQL语句和一些数据库产品，例如MySQL、Redis</li><li style="text-align: left;">了解并使用过c#、java、python、flutter</li></ul>`,
        editorConfig: {
          placeholder: "简单真诚的自我评价。"
        },
        tags: {
          type: TAG_NORMAL,
          list: ["爬山", "跑步", "唱歌", "跳舞", "摄影", "旅行", "健身"],
          field: "hobbyTags",
          values: []
        },
        content: []
      }
    ]
  }
]

export const fontList = {
  微软雅黑: "Microsoft YaHei, SimSun, PingFang SC, PingFang SC Regular",
  宋体: "SimSun, Microsoft YaHei",
  黑体: "SimHei, Microsoft YaHei",
  楷体: "KaiTi, Microsoft YaHei",
  Arial: "Arial, Microsoft YaHei"
}

export const defaultOutput: OutputType[] = [
  {
    id: "rG38fY4a7vq8OoCsEL5Zw",
    title: "基本信息",
    component: "BaseInfoView",
    type: "basic_info",
    data: [
      {
        id: "32CWAo6PiAUY_3umWANW2",
        name: "您的姓名",
        value: "李明"
      },
      {
        id: "_RfLK4ahW2E1Ngpyj7Rwq",
        name: "您的性别",
        value: "男"
      },
      {
        id: "Fm4Lcqghn45StvFc-wPNE",
        name: "年龄",
        value: 26
      },
      {
        id: "RGx6eHuOvnvk9tdhFJsXZ",
        name: "籍贯",
        value: "浙江杭州"
      },
      {
        id: "MK7ykkgKCa3gmOeJ3k4gR",
        name: "联系电话",
        value: "13812345678"
      },
      {
        id: "oZElv-bQxK1i-39_CZCV-",
        name: "联系邮箱",
        value: "liming@example.com"
      },
      {
        id: "buhDc-NLic3WXrcNXbEiQ",
        name: "婚姻状况",
        value: "未婚"
      },
      {
        id: "vKnIzzsRsCwcbxLBCu4qe",
        name: "工作年限",
        value: "3"
      },
      {
        id: "ahaorLmdJ3J9ZsL31kNk_",
        name: "求职岗位",
        value: "前端开发工程师"
      }
    ],
    isShowAvartar: true
  },
  {
    id: "7JppCHiK5g4nqiRncl2iX",
    title: "工作经历",
    index: 1,
    component: "RichInfoView",
    type: "rich",
    data: [
      {
        id: "Uhx8jsCycjZFnXkCWBOD1",
        richText:
          "<ul><li>负责公司主站前端开发，使用Vue 3和TypeScript开发高性能单页应用</li><li>优化页面加载速度，首屏渲染时间缩短30%</li><li>搭建组件库，提升团队开发效率</li><li>对接后端API，处理复杂表单和数据可视化</li></ul>",
        index: 0,
        data: [
          {
            id: "MjkLimWCjHQlpp57cHOYH",
            name: "公司名称",
            value: "杭州某科技公司"
          },
          {
            id: "mp55ESg0c32-6xUujWuAe",
            name: "职位",
            value: "前端开发工程师"
          },
          {
            id: "dtCcZynxTud3c4a4c4lZ_",
            name: "在职日期",
            value: "2022-06 ~ 2025-06"
          }
        ]
      }
    ]
  },
  {
    id: "bodiAh2mjUCkZF5gsHIEj",
    title: "教育背景",
    index: 2,
    component: "RichInfoView",
    type: "rich",
    data: [
      {
        id: "6i4x296I0dQMV_WtRKldl",
        richText:
          "<ul><li>主修课程：数据结构、算法、计算机网络、Web开发</li><li>参与校企合作项目，开发校园管理Web应用</li></ul>",
        index: 0,
        data: [
          {
            id: "6PsPcpobFmj6k0sriLvSq",
            name: "学校名称",
            value: "浙江工业大学"
          },
          {
            id: "R8R6LrhD0qNnVXz2wj2Ka",
            name: "所学专业",
            value: "计算机科学与技术"
          },
          {
            id: "zcS_z08-yM1EJFRmxnIso",
            name: "就读时间",
            value: "2018-09 ~ 2022-06"
          },
          {
            id: "3kTLyv5ALjUup0LrjhfLV",
            name: "学历",
            value: "本科"
          }
        ]
      }
    ]
  },
  {
    id: "9BSSyBteetoS3LAqDN2FP",
    title: "技能特长",
    type: "tag_info",
    component: "TagInfoView",
    data: [
      {
        id: "iL_9MAVlOC5seUx2IeCmF",
        richText:
          "<ul><li>熟练掌握Vue 3、React及TypeScript，熟悉组件化开发</li><li>精通JavaScript（ES6+）、HTML5、CSS3</li><li>熟悉Node.js，能开发简单后端接口</li><li>熟练使用Vite/Webpack，优化构建性能</li><li>掌握Git，熟悉团队协作流程</li></ul>",
        tags: {
          type: "tag_skilled",
          data: [
            {
              value: "Vue.js",
              label: "精通",
              number: 90,
              type: 1
            },
            {
              value: "TypeScript",
              label: "熟练",
              number: 80,
              type: 1
            },
            {
              value: "Node.js",
              label: "一般",
              number: 60,
              type: 0
            }
          ]
        }
      }
    ]
  },
  {
    id: "Iq7eyipzmvjV0TMU7WFLh",
    title: "项目经验",
    index: 4,
    component: "RichInfoView",
    type: "rich",
    data: [
      {
        id: "zTdQ6fAO24H6GR3ROeFnF",
        richText:
          "<ul><li>使用Vue 3和Element Plus开发企业级后台管理系统</li><li>实现动态路由、权限管理和数据可视化</li><li>优化复杂表格性能，支持大数据量渲染</li></ul>",
        index: 0,
        data: [
          {
            id: "nkpDOqKtqLE8r8Z1jrWPq",
            name: "项目时间",
            value: "2023-03 ~ 2023-12"
          }
        ]
      }
    ]
  },
  {
    id: "OuQKTfbW_69usCYp6Rs74",
    title: "兴趣爱好",
    type: "tag_info",
    component: "TagInfoView",
    data: [
      {
        id: "UdViufYvqLBYcYZhxC2Lw",
        richText: "<p>喜欢探索新技术，关注前端社区动态</p>",
        tags: {
          type: "tag_nomal",
          data: [
            {
              value: "技术博客"
            },
            {
              value: "开源项目"
            }
          ]
        }
      }
    ]
  },
  {
    id: "CHrBQezXzbUZ4J4WuRDVU",
    title: "自我评价",
    type: "tag_info",
    component: "TagInfoView",
    data: [
      {
        id: "H1_FlZZkGLYqGIlg3xynI",
        richText:
          "<p>热爱前端开发，具备良好的学习能力和团队协作精神，注重代码质量和用户体验</p>",
        tags: {
          type: "tag_nomal",
          data: []
        }
      }
    ]
  }
]
