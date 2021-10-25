<template>
  <div class="send-trade">
    <div class="trade-change">
      <div class="buy">
        <span>买入</span>
      </div>
      <div class="sell">
        <span>卖出</span>
      </div>
    </div>
    <div class="limit-market-change">
      <span class="limit-btn limit-market-changed">限价</span>
      <span class="market-btn">市价</span>
    </div>
    <div class="trade-panel">
      <div class="price input-box">
        <strong>123456789.6123</strong>
        <span>USDT</span>
      </div>
      <div class="amount input-box">
        <strong>买入量</strong>
        <span>BTC</span>
      </div>
      <div class="trade-slider">
        <star-slider></star-slider>
      </div>
      <div class="turnover input-box">
        <strong>成交额</strong>
        <span>USDT</span>
      </div>
      <div class="available">
        <label>可用</label>
        <p>888,548,345.53</p>
        <span>USDT</span>
      </div>
    </div>
    <div class="trade-btn">
      <span>买入</span>
    </div>
  </div>
</template>

<script setup>
import starSlider from "@/StarUI/StarSlider.vue";
// import { reactive } from "vue";
// let state = reactive({
//   // sidebarVisible: false,
// });
</script>

<style lang="scss" scoped>
.send-trade {
  padding: 10px 12px;
  font-size: 14px;
  color: #b9c5e2;
  font-weight: bold;
}
.trade-change {
  overflow: hidden;
  div {
    width: 50%;
    height: 36px;
    float: left;
    text-align: center;
    line-height: 36px;
    transform: skewX(-10deg);
    position: relative;
    color: #fff;
    span {
      display: block;
      transform: skewX(10deg);
    }
  }
}
.buy {
  background: #0ec89b;
  left: -0.5%;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 12px;
}
.sell {
  background: #f34653;
  left: 0.5%;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 3px;
}
.limit-market-change {
  margin-top: 8px;
  height: 46px;
  line-height: 46px;
  border-bottom: 1px solid #384362;
  span {
    min-width: 28px;
    display: inline-block;
    margin-right: 5%;
  }
}
.limit-market-changed {
  color: #ff9534;
  border-bottom: 2px solid #ff9534;
}
.trade-panel {
  margin-top: 20px;
  .input-box {
    height: 32px;
    line-height: 32px;
    background: #282b36;
    margin-bottom: 8px;
    padding: 0 10px;
    overflow: hidden;
    span {
      float: right;
    }
  }
  .price {
    strong {
      color: #fff;
    }
  }
}
.trade-slider {
  width: 96%;
  height: 32px;
  text-align: center;
  margin: 20px auto;
}
.available {
  margin: 20px auto;
  overflow: hidden;
  label,
  p,
  span {
    display: inline-block;
    margin-right: 10px;
  }
}
.trade-btn {
  height: 36px;
  line-height: 36px;
  background: #0ec89b;
  text-align: center;
  color: #fff;
}
</style>
