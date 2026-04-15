import { API } from "./api"
import request from "./request"
import type { IResume } from "./indexedDB"

export const serverPrintPdf = (id: string, body: any) => {
  return request.post<BlobPart>({
    url: API.file + `/export_pdf/${id}`,
    responseType: "arraybuffer",
    data: body,
    timeout: 1000 * 60 * 3
  })
}

export const queryTempReume = (id: string) => {
  return request.get<IResume>({
    url: API.file + `/resume/${id}`
  })
}

export const uploadFileApi = (formData: FormData) => {
  return request.post<{ url: string }>({
    url: API.file + `/upload`,
    data: formData
  })
}
