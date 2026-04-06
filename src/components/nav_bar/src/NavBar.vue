<script lang="ts" setup>
const emit = defineEmits(["mouseEnter"])
const handleMouseEnter = () => {
  emit("mouseEnter")
}
const isMyself = new URL(location.href).hash === "#/my_resume"
</script>

<template>
  <div class="navbar s-flex" @mouseenter="handleMouseEnter">
    <div class="container s-flex">
      <a href="/">
        <div class="logo-wrapper s-flex">
          <img
            class="logo-img"
            src="@/assets/img/logo.svg"
            draggable="false"
            alt="logo"
          />
        </div>
      </a>
      <slot name="center"></slot>
      <div class="right s-flex">
        <div class="right-tag pointer" v-if="!isMyself">
          <a href="#my_resume" target="_blank">我的简历</a>
        </div>
        <slot name="right">
          <div class="right-tag pointer">
            <img src="@/assets/img/weChat.svg" draggable="false" alt="wechat" />
          </div>
          <div class="right-tag">
            <a href="https://github.com/2990275358/fxl_utils" target="_blank">
              <img
                src="@/assets/img/GitHub.svg"
                draggable="false"
                alt="wechat"
              />
            </a>
          </div>
        </slot>
      </div>
    </div>
  </div>
  <div class="_block"></div>
</template>

<style lang="scss" scoped>
._block {
  height: var(--nav-bar-height);
}
.container {
  width: 1100px;
  justify-content: space-between;
}
.navbar {
  width: 100%;
  height: var(--nav-bar-height);
  background: var(--primary-gradient);
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  justify-content: center;
  position: fixed;
  top: 0px;
  z-index: 99;
  .logo-wrapper {
    height: 100%;
    align-items: center;
    overflow: hidden;
    .logo-img {
      height: 300%;
    }
  }
  .right {
    height: 100%;
    align-content: center;
    .pointer {
      cursor: pointer;
    }
    .pointer:hover {
      color: var(--primary-color);
    }
    .right-tag {
      align-content: center;
      margin-left: 20px;
      color: #fff;
      img {
        height: 24px;
      }
    }
  }
  @media screen and (max-width: 1200px) {
    padding: 0px 100px;
  }
  @media screen and (max-width: 600px) {
    padding: 0px 10px;
  }
}
</style>
