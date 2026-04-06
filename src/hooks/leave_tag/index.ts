import { onMounted, onUnmounted } from "vue"

type noon = (...args: any[]) => any
type Fns = { unload?: noon; visibilityChange?: noon }

function useLeaveTag(fns: Fns): void

function useLeaveTag(fn: noon | Fns) {
  let unload, _visibilityChange
  if (typeof fn === "function") {
    unload = fn
    _visibilityChange = fn
  } else {
    unload = fn.unload
    _visibilityChange = fn.visibilityChange
  }
  const unListener = () => {
    window.removeEventListener("beforeunload", unListener)
    document.removeEventListener("visibilitychange", visibilityChange)
  }
  const beforeunload = () => {
    unload && unload()
    unListener()
  }
  const visibilityChange = () => {
    console.log("visibilityChange", document.visibilityState)
    _visibilityChange &&
      _visibilityChange(document.visibilityState === "hidden")
  }
  onMounted(() => {
    window.addEventListener("beforeunload", beforeunload)
    document.addEventListener("visibilitychange", visibilityChange)
    onUnmounted(unListener)
  })
}

export { useLeaveTag }
