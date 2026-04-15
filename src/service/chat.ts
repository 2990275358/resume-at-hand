import { API } from "./api"
import request from "./request"
import type { IDataType } from "./request/type"

export function getChat(data: any) {
  return request.get<IDataType>({
    url: "/chat",
    params: data
  })
}
