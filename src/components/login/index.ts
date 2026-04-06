import Login from "./src/Login.vue"

export default Login

declare module "vue" {
  export interface GlobalComponents {
    Login: typeof Login
  }
}
