import {
  useRouter,
  useRoute,
  onBeforeRouteLeave,
  onBeforeRouteUpdate
} from "vue-router"

interface GoToRouteOpt {
  isReplace?: boolean
  query?: Record<string, any>
}

export const useAppRouter = () => {
  const router = useRouter()
  const route = useRoute()
  function goTo(path: string, options: GoToRouteOpt = {}) {
    const { isReplace } = options
    const fn = router[isReplace ? "replace" : "push"]
    Reflect.deleteProperty(options, "isReplace")
    fn.call(router, { path, ...options })
  }
  function goBack() {
    router.back()
  }
  return { goTo, route, goBack, onBeforeRouteLeave, onBeforeRouteUpdate }
}
