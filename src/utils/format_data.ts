import type {
  InputDataType,
  OutputType,
  DataItem,
  CustomContentType,
  RichContentType,
  BasicInfoContentType,
  TagComponentType,
  TagOutType
} from "@/config"
import {
  BASIC_INFO,
  RICH,
  TAG_INFO,
  TAG_NORMAL,
  TAG_SKILLED,
  TEXT_INPUT_TAG,
  DROPDOWN_SELECTOR_TAG,
  DATE_PICKER_TAG,
  DATE_RANGE_PICKER_TAG,
  FILE_SELECTOR_TAG
} from "@/config"
import { nanoid } from "nanoid"
import i18n from "@/i18n"
import dayjs from "dayjs"

/**
 * 计算年龄（周岁）
 * @param {string} birthStr - 出生日期字符串（格式：YYYY-MM）
 * @returns {number} 年龄
 */
function calculateAge(birthStr: string): number {
  // 1. 解析出生日期（默认日期为当月第1天）
  const birthDate = dayjs(birthStr)
  const currentDate = dayjs()

  // 2. 计算基础年龄（年份差）
  let age = currentDate.year() - birthDate.year()

  // 3. 判断是否已过生日
  if (
    currentDate.month() < birthDate.month() || // 当前月份未到出生月份
    (currentDate.month() === birthDate.month() &&
      currentDate.day() < birthDate.day()) // 当前月份相同但日期未到
  ) {
    age-- // 减1岁（未过生日）
  }

  return age
}

function parseTextInput(item: BasicInfoContentType): DataItem {
  return {
    id: nanoid(),
    name: item.name,
    value: item.value
  }
}

function parseTag(tags: TagComponentType | undefined): TagOutType | undefined {
  if (!tags) return undefined
  const { type } = tags
  const result = { type } as TagOutType
  if (type === TAG_NORMAL) {
    result.data = tags.values.map((item) => {
      return {
        value: item
      }
    })
  }
  if (type === TAG_SKILLED) {
    result.data = tags.values.map((item, index) => {
      const control = tags!.controls![index]
      const label = control[0].options!.find(
        (option) => option.value === control[0].value
      )?.label
      return {
        value: item,
        label: i18n.global.t(label as any),
        number: control[0].value as number,
        type: control[1].value as number
      }
    })
  }
  return result
}
function parseDropDown(item: BasicInfoContentType): DataItem {
  const { options, value } = item
  const realValue = options!.find((option) => option.value === value)?.label
  return {
    id: nanoid(),
    name: item.name,
    value: i18n.global.t(realValue as any)
  }
}

function formatTime(input: string): string {
  return dayjs(input).format("YYYY-MM")
}

function parseDateRange(item: BasicInfoContentType): DataItem {
  const { value, config } = item
  const result = {} as DataItem
  Object.assign(result, {
    id: nanoid(),
    name: item.name,
    value: formatTime(value as string)
  })
  if (Array.isArray(value)) {
    const [begin, end] = value
    Object.assign(result, {
      value: `${formatTime(begin)} ~ ${config?.isSoFar ? "至今" : formatTime(end)}`
    })
  } else if (config?.isOfNumber) {
    Object.assign(result, {
      value: calculateAge(value as string),
      name: "年龄"
    })
  }
  return result
}

function parseBasicInfo(content: BasicInfoContentType[]): DataItem[] {
  const result = [] as DataItem[]
  for (const item of content) {
    const { component, value } = item
    if (value !== 0 && !value) continue
    if (component === TEXT_INPUT_TAG) {
      result.push(parseTextInput(item))
    }
    if (component === DROPDOWN_SELECTOR_TAG) {
      if (item.value === "-1") continue
      result.push(parseDropDown(item))
    }
    if ([DATE_PICKER_TAG, DATE_RANGE_PICKER_TAG].includes(component)) {
      result.push(parseDateRange(item))
    }
  }
  return result
}

function formatBasicInfo(input: InputDataType): OutputType {
  const result = {} as OutputType
  const { id, title, content, type } = input
  Object.assign(result, {
    id: id || nanoid(),
    title,
    component: "BaseInfoView",
    type
  })
  const { defaultContent, customContent } = content as CustomContentType
  const dataContent = defaultContent.concat(customContent)
  result["data"] = parseBasicInfo(dataContent)
  for (const item of dataContent) {
    const { component } = item
    if (component === FILE_SELECTOR_TAG) {
      Object.assign(result, {
        isShowAvartar: item.config?.isShow
      })
    }
  }
  return result
}

function formatTagInfo(input: InputDataType): OutputType {
  const result = {} as OutputType
  const { id, title, content, type } = input
  const data = (content as RichContentType[])[0]
  Object.assign(result, {
    id: id || nanoid(),
    title,
    type,
    component: "TagInfoView",
    data: [
      {
        id: nanoid(),
        richText: data.rich || "",
        tags: parseTag(data.tags)
      }
    ] as DataItem[]
  })
  return result
}
function formatRichInfo(input: InputDataType): OutputType {
  const result = {} as OutputType
  const { id, title, content, index, type } = input
  Object.assign(result, {
    id: id || nanoid(),
    title,
    index,
    component: "RichInfoView",
    type
  })
  result["data"] = [] as DataItem[]
  for (const item of content as RichContentType[]) {
    const { rich, index } = item
    const data = {
      id: nanoid(),
      richText: rich,
      index, // 排序
      data: parseBasicInfo(item.content as BasicInfoContentType[]),
      tags: parseTag(item.tags)
    } as DataItem
    result["data"].push(data)
  }
  return result
}

export function formatOutData(input: InputDataType[]): OutputType[] {
  const result: OutputType[] = []
  for (const item of input) {
    const { type, isShow } = item
    if (!isShow) continue // 不显示的跳过
    if (type === BASIC_INFO) {
      result.push(formatBasicInfo(item))
    }
    if (type === TAG_INFO) {
      result.push(formatTagInfo(item))
    }
    if (type === RICH) {
      result.push(formatRichInfo(item))
    }
  }
  return result
}
