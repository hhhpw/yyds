<template>
  <div class="kiko-dex-content">
    <div
      :class="
        state.sidebarVisible ? 'dex-sidebar dex-sidebar-show' : 'dex-sidebar '
      "
    ></div>
    <div
      :class="
        state.sidebarVisible
          ? 'dex-content-box dex-content-box-show'
          : 'dex-content-box'
      "
    >
      <div class="dex-content">
        <div class="dex-header"></div>
        <div
          :class="
            state.sidebarVisible
              ? 'dex-trading-kline-show'
              : 'dex-trading-kline-hide'
          "
        >
          <dex-trade-kline></dex-trade-kline>
        </div>
        <div class="dex-online-list"></div>
      </div>
      <div class="dex-trade"></div>
    </div>
    <div
      :class="
        state.sidebarVisible
          ? 'dex-entrust-panel dex-entrust-panel-show'
          : 'dex-entrust-panel'
      "
    ></div>
  </div>
</template>
<script setup>
import dexTradeKline from "../Trade/Index.vue";
import { reactive } from "vue";
let state = reactive({
  sidebarVisible: false,
});
</script>

<style lang="scss" scoped>
@import "./dex.scss";
</style>
