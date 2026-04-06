import Dexie from "dexie"
import { nanoid } from "nanoid"
import type { OutputType, InputDataType } from "@/config"
import type { EntityTable } from "dexie"

type ResumeContentType = {
  output: OutputType[]
  input: InputDataType[]
  templateId: string
  theme: Record<string, any>
}

export interface IResume {
  id: string
  content: ResumeContentType
  avatar: string
  createTime: number
  updateTime: number
  remark: string
}

const lastDbVersion = 0.1

const db = new Dexie("resume_at_hand") as Dexie & {
  resume: EntityTable<IResume, "id">
}

db.version(lastDbVersion).stores({
  resume: "id"
})

type DBResultType = Promise<{ isOk: boolean; body?: IResume }>

async function insterResume(
  content: ResumeContentType,
  avatar: string
): DBResultType {
  const remark = content.output[0].data[0].value as string
  const body = {
    id: nanoid(),
    content,
    avatar,
    remark,
    createTime: Date.now(),
    updateTime: Date.now()
  }
  try {
    await db.resume.add(body)
    return {
      isOk: true,
      body
    }
  } catch (e) {
    return {
      isOk: false
    }
  }
}

async function getDbResumeList() {
  return db.resume.toArray()
}

async function deleteResume(id: string) {
  return db.resume.delete(id)
}

async function updateResume(
  id: string,
  body: Omit<IResume, "updateTime" | "createTime" | "id">
) {
  return db.resume.update(id, {
    ...body,
    updateTime: Date.now()
  })
}

async function getResumeById(id: string) {
  return db.resume.get(id)
}

export {
  db,
  insterResume,
  updateResume,
  getDbResumeList,
  deleteResume,
  getResumeById
}
