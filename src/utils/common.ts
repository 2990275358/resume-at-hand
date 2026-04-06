import { ElMessage } from "element-plus"
import { subpub } from "./event_bus"

export function insterStyle(templateId: string) {
  const link = document.createElement("link")
  document.head.querySelector(`link[data-type="tempalte"]`)?.remove()
  link.rel = "stylesheet"
  link.type = "text/css"
  link.href = `/src/styles/template/${templateId}.css`
  link.dataset.type = "tempalte"
  document.head.appendChild(link)
}

/**
 * 将RGB颜色字符串转换为十六进制颜色字符串
 * @param rgb RGB颜色字符串，例如："rgb(255,255,255)"
 * @param weaken 弱化系数，0到1之间的小数
 * @returns 十六进制颜色字符串，例如："#ffffff"
 */
export function rgbToHex(rgb: string, weaken: number) {
  let [r, g, b] = rgb
    .replace(/[rgba\(\)]/g, "")
    .split(",")
    .map(Number)
  // 确保r、g、b都在0到255之间
  r = Math.max(0, Math.min(255, r))
  g = Math.max(0, Math.min(255, g))
  b = Math.max(0, Math.min(255, b))

  if (weaken) {
    r = Math.floor(r * weaken)
    g = Math.floor(g * weaken)
    b = Math.floor(b * weaken)
  }

  // 将r、g、b转换为十六进制，并拼接成一个字符串，不足两位的前面补0
  const toHex = (component: number) => {
    let hex = component.toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }

  return "#" + toHex(r) + toHex(g) + toHex(b)
}

/**
 * 十六进制颜色弱化
 * @param hex 十六进制颜色字符串
 * @param weaken 弱化系数，0到1之间的小数
 * @returns 弱化后的十六进制颜色字符串
 */
export function hexWeaken(hex: string, weaken: number) {
  if (!hex.startsWith("#")) return rgbToHex(hex, weaken)
  // 去除字符串开头的 '#' 符号（如果存在）
  hex = hex.replace(/^#/, "")

  // 解析r、g、b的值
  let bigint = parseInt(hex, 16)
  let r = (bigint >> 16) & 255
  let g = (bigint >> 8) & 255
  let b = bigint & 255

  if (weaken) {
    r = Math.floor(r * weaken)
    g = Math.floor(g * weaken)
    b = Math.floor(b * weaken)
  }

  // 返回RGB对象
  return `rgb(${r},${g},${b})`
}

export function hexToRgba(hex: string, opacity = 1) {
  // 去除字符串开头的 '#' 符号（如果存在）
  hex = hex.replace(/^#/, "")

  // 解析r、g、b的值
  let bigint = parseInt(hex, 16)
  let r = (bigint >> 16) & 255
  let g = (bigint >> 8) & 255
  let b = bigint & 255
  return `rgba(${r},${g},${b},${opacity})`
}

export function colorWeaken(color: string, weaken: number) {
  if (!color.startsWith("#")) return rgbToHex(color, weaken)
  return hexWeaken(color, weaken)
}

export function createMemorize(fn: (...arg: any[]) => any) {
  const cache = new Map()
  return (...args: any[]) => {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }
    const result = fn(...args)
    cache.set(key, result)
    return result
  }
}

class EditTagManager {
  #key = "editing_in_progress"
  isExist(resumeId?: string) {
    const curResumes = JSON.parse(
      localStorage.getItem(this.#key) || "[]"
    ) as string[]
    if (resumeId) {
      return curResumes.includes(resumeId)
    }
    return curResumes.length > 0
  }
  add(resumeId: string) {
    const curResumes = JSON.parse(
      localStorage.getItem(this.#key) || "[]"
    ) as string[]
    if (!curResumes.includes(resumeId)) {
      curResumes.push(resumeId)
      localStorage.setItem(this.#key, JSON.stringify(curResumes))
    }
  }
  remove(resumeId: string) {
    const curResumes = JSON.parse(
      localStorage.getItem(this.#key) || "[]"
    ) as string[]
    const index = curResumes.indexOf(resumeId)
    if (index !== -1) {
      curResumes.splice(index, 1)
      localStorage.setItem(this.#key, JSON.stringify(curResumes))
    }
  }
  clear() {
    localStorage.removeItem(this.#key)
  }
}

export const editTagManager = new EditTagManager()

class LoginManager {
  #key = "SSJL_TOKEN"
  isExist() {
    return !!localStorage.getItem(this.#key)
  }
  get() {
    try {
      const info = localStorage.getItem(this.#key)
      if (info) {
        return JSON.parse(info)
      }
    } catch (error) {
      return null
    }
  }
  getToken() {
    const userInfo = this.get()
    if (!userInfo) return null
    return userInfo.token
  }
  set<T = Record<string, any>>(info: T) {
    localStorage.setItem(this.#key, JSON.stringify(info))
  }
  remove() {
    localStorage.removeItem(this.#key)
  }
}

export const loginManager = new LoginManager()

/**
 * 登录保护装饰器
 * @param fn 被保护的函数
 * @returns 保护后的函数
 */
export function withLogin<T>(fn: (...args: any[]) => any) {
  return function (this: T, ...args: any[]) {
    if (loginManager.isExist()) {
      return fn.apply(this, args)
    }
    ElMessage.warning("请先登录")
    subpub.emit("showLogin")
    return false
  }
}

const emailRegex =
  /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/

export function isEmail(email: string) {
  return emailRegex.test(email)
}
