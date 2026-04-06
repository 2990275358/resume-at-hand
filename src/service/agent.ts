import { API } from "./api"
import request from "./request"
import type { IDataType } from "./request/type"

/** 生成简历 */
export function generateResume<T>(data: any) {
  return request.post<IDataType<T>>({
    url: API.agent + "/generate",
    data
  })
}
