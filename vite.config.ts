import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import ElementPlus from "unplugin-element-plus/vite"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import path from "path"
import { fileURLToPath } from "url"

function resolvePath(relativePath: string) {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    relativePath
  )
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ElementPlus({}), vue()],
  resolve: {
    alias: {
      "@": resolvePath("./src"),
      "@utils": resolvePath("./src/utils"),
      "@components": resolvePath("./src/components"),
      "@styles": resolvePath("./src/styles"),
      "@store": resolvePath("./src/store"),
      "@router": resolvePath("./src/router")
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        additionalData: `@use "@/styles/mixin.scss" as *;`
      }
    }
  }
})
