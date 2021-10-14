<template>
  <div class="kiko-dex-content">
    <div class="dex-sidebar"></div>
    <div class="dex-content">
      <div class="dex-header"></div>
      <div class="dex-trading-kline">
        <dex-trade-kline></dex-trade-kline>
      </div>
    </div>
  </div>
</template>
<script setup>
import dexTradeKline from "../Trade/Index.vue";
</script>

<style lang="scss" scoped>
.kiko-dex-content {
  width: calc(100%);
  min-height: 100vh;
  padding: 5px 16px;
  .dex-sidebar {
    width: 88px;
    height: 100vh;
    background: #090808;
    overflow: hidden;
    float: left;
  }
  .dex-content {
    width: 70%;
    float: left;
    margin-left: 5px;
    .dex-header {
      width: 100%;
      height: 46px;
      background: #090808;
    }
    .dex-trading-kline {
      width: 70%;
      height: 395px;
      margin-top: 5px;
    }
  }
}
</style>
