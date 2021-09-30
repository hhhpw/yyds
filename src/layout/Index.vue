<template>
  <div class="star-layout">
    <side-bar class="star-sidebar-wrap"></side-bar>
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
import SideBar from "./SideBar.vue";
import NavBar from "./NavBar.vue";
</script>

<style lang="scss" scoped>
.star-layout-content {
  // background-size: 100% 90%;
}

.star-sidebar-wrap {
}
</style>
