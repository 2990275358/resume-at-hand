import { API } from "./api"
import request from "./request"
import type { IDataType, RequestStatus } from "./request/type"

type ErrorResponse = IDataType<UserInfo> & RequestStatus

const ERR_OBJ: ErrorResponse = {
  code: 400,
  isOk: false
}

export const login = async (body: { account: string; password: string }) => {
  try {
    return request.post<UserInfo>({
      url: API.login,
      data: body
    })
  } catch (err) {
    return ERR_OBJ
  }
}

export const codeLogin = async (body: { code: string; email: string }) => {
  try {
    return await request.post({
      url: API.login + "/code",
      data: body
    })
  } catch (err) {
    return ERR_OBJ
  }
}

export const register = async (body: { account: string; password: string }) => {
  try {
    return await request.put({
      url: API.login,
      data: body
    })
  } catch (err) {
    return ERR_OBJ
  }
}

export const sendCode = async (body: { email: string; type: number }) => {
  try {
    return await request.put({
      url: API.login + "/code",
      data: body
    })
  } catch (error) {
    return ERR_OBJ
  }
}

export const resetPassword = async (body: {
  password: string
  newPassword: string
}) => {
  try {
    return await request.post({
      url: API.login + "/reset",
      data: body
    })
  } catch (error) {
    return ERR_OBJ
  }
}

export const queryResumeIds = async () => {
  return request.get<string[]>({
    url: API.resume + "/ids"
  })
}
