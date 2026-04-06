import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import { editTagManager } from "@/utils"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "/",
    redirect: "/home"
  },
  {
    path: "/:patchMatch(.*)",
    name: "notFound",
    component: () => import("@/views/not_found/index.vue")
  }
]

type RouteParamsType = {
  [key: string]: {
    type: "params" | "query"
    name: string
  }
}

const routeParams: RouteParamsType[] = [
  {
    resume_detail: {
      type: "params",
      name: "id"
    },
    editor_pc: {
      type: "params",
      name: "id"
    },
    export: {
      type: "params",
      name: "id"
    }
  }
]

const DEFAULT_TITLE = "随手简历"
const titleMap: Record<string, string> = {
  editor_pc: DEFAULT_TITLE + "-编辑",
  resume_detail: DEFAULT_TITLE + "-详情",
  my_resume: DEFAULT_TITLE + "-我的",
  home: DEFAULT_TITLE + "-首页",
  template: DEFAULT_TITLE + "-模版"
}

// 创建路由，并且会区分是否为子路由
function createRoute(path: string, module: any) {
  let name = path.match(/\/views\/(.*)\/index.vue/)
  if (!name) return [[]]
  const names = name[1].split("/child_pages/")
  const isChild = names.length > 1
  const routeName = names.join("_")
  const routePath = `/${names.join("/")}`
  const route: RouteRecordRaw = {
    path: routePath,
    name: routeName,
    component: module,
    children: []
  }
  for (const params of routeParams) {
    const paramsInfo = params[routeName]
    if (!paramsInfo) continue
    if (paramsInfo.type === "params") {
      route.path = routePath + "/:" + paramsInfo.name
    }
    route.props = true
  }
  // console.log(route)
  return [route, isChild]
}

// 注册路由，返回路由映射表
function useRegisterRouter() {
  const routes: any[] = []
  const childRoutes = []
  const modules = import.meta.glob("@/views/**/index.vue")
  for (const path in modules) {
    if (path.includes("child_cpn")) continue
    const [route, isChild] = createRoute(path, modules[path])
    if (isChild) {
      childRoutes.push(route)
    } else {
      routes.push(route)
    }
  }
  childRoutes.forEach((res: any) => {
    const parentRoute = routes.find((parent) => {
      return parent.name === res.name.split("_")[0]
    })
    parentRoute["children"].push(res)
  })
  return routes
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes, ...useRegisterRouter()]
})

router.beforeEach((to) => {
  // 仅开启一个 编辑
  if (to.name === "editor_pc") {
    const { params } = to
    if (params.id && editTagManager.isExist(params.id as string)) {
      return "/"
    }
  }
})
router.afterEach((to) => {
  const title = titleMap[to.name as string]
  if (title) {
    document.title = title
  } else {
    document.title = DEFAULT_TITLE
  }
})

export default router
