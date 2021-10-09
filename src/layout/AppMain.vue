<template>
  <section class="star-main">
    <router-view v-slot="{ Component }" :key="route.path">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </section>
</template>

<script setup>
// import { onMounted } from "vue";
import { useRoute } from "vue-router";
// import { useI18n } from "vue-i18n"; //要在js中使用国际化
const route = useRoute();
// const router = useRouter();
// const { t } = useI18n();
// onMounted(() => {
//   document.title = t(route.meta.title) + " | KikoSwap";
// });
// router.beforeEach((to) => {
//   /* 路由发生变化修改页面title */
//   if (to.meta.title) {
//     document.title = t(to.meta.title) + " | KikoSwap";
//   }
// });
</script>

<style lang="scss" scoped>
.star-main {
  // padding-top: 24px;
}
</style>
