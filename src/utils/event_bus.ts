import mitt from "mitt"

export const subpub = mitt<{
  showLogin: void
  changeSelectId: void
}>()
