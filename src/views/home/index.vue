<script lang="ts" setup>
import { ref } from "vue"
import NavBar from "@/components/nav_bar"
import TemplateList from "./child_cpn/TemplateList.vue"
import AiGenerate from "./child_cpn/AiGenerate.vue"

const isShowAiEdit = ref(false)

const handleToTemplate = () => {
  window.scrollTo({
    top: document.querySelector(".hero")?.clientHeight || 377,
    behavior: "smooth"
  })
}
</script>

<template>
  <div class="home">
    <NavBar></NavBar>
    <section class="hero">
      <div class="hero-content">
        <h1>AI简历生成</h1>
        <p>简历编写本就应该是随手的事，没有思路，还可以用AI。</p>
        <div class="hero-btns">
          <button
            class="btn btn-primary"
            id="startAI"
            @click="$withLogin(() => (isShowAiEdit = true))()"
          >
            <i class="fas fa-bolt"></i> 立即体验AI生成
          </button>
          <button class="btn btn-secondary" @click="handleToTemplate">
            <i class="fas fa-eye"></i> 查看简历模板
          </button>
        </div>
      </div>
    </section>
    <section>
      <div class="title">简历模版</div>
      <TemplateList @click="(id) => $router.push(`/resume_detail/${id}`)" />
    </section>
    <AiGenerate v-model="isShowAiEdit" />
  </div>
</template>

<style lang="scss" scoped>
.home {
  .hero {
    background: linear-gradient(
      120deg,
      var(--primary-lighter) 0%,
      var(--primary-light) 100%
    );
    padding: 80px 20px;
    text-align: center;
    color: white;
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,0 L100,0 L100,100 Z" fill="rgba(255,255,255,0.1)"/></svg>');
    background-size: cover;
    opacity: 0.2;
  }

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  .hero h1 {
    font-size: 3.2rem;
    margin-bottom: 20px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .hero p {
    font-size: 1.4rem;
    margin-bottom: 30px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-btns {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
  }
  .btn {
    padding: 14px 32px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: all 0.3s ease;
    font-size: 1.1rem;
  }

  .btn-primary {
    background: var(--primary-gradient);
    color: var(--bg-primary);
    box-shadow: 0 4px 15px var(--shadow-primary);
  }

  .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px var(--shadow-primary);
  }

  .btn-secondary {
    background: var(--bg-primary);
    color: var(--primary-dark);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .btn-secondary:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    background: var(--primary-lighter);
    color: white;
  }
  .title {
    font-weight: bold;
    font-size: 24px;
    color: var(--primary-color);
    text-align: center;
    border-bottom: 1px solid var(--border-dark);
    padding-bottom: 10px;
    margin: 10px 0;
  }
}
</style>
