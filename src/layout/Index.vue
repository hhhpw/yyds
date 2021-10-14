<template>
  <div class="star-layout">
    <div>
      <keep-alive>
        <nav-bar></nav-bar>
      </keep-alive>
      <app-main class="star-layout-content"> </app-main>
    </div>
  </div>
</template>

<script setup>
import AppMain from "./AppMain.vue";
import NavBar from "./NavBar.vue";
</script>

<style lang="scss" scoped>
.star-layout-content {
  // background-size: 100% 90%;
  width: calc(100%);
  min-height: 100vh;
  margin-top: 72px;
  background: #191d28;
  margin-bottom: 5px;
}
</style>
