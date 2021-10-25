<template>
  <div>
    <div id="ws-wrap">
      {{ state.wsdata }}
    </div>
    <div id="metamask-container">
      <button @click="connectMetaMask">链接</button>
    </div>
  </div>
</template>
<script setup>
/* eslint-disable */
import {
  computed,
  onMounted,
  reactive,
  defineProps,
  defineEmits,
  watch,
  watchEffect,
  ref,
} from "vue";
import { useStore } from "vuex";
import web3 from "@utils/getWeb3";
// import metamask from "@utils/metamask";

console.log("metamask", metamask);

console.log(metamask.isInstalled());
if (metamask.isInstalled()) {
  metamask.connectMetaMask();
}

let state = reactive({
  wsInstance: computed(() => store.state.StoreWebSocket.wsInstance),
  wsInstanceReadyState: computed(
    () => store.state.StoreWebSocket.wsInstanceReadyState
  ),
  wsdata: computed(() => store.state.StoreWebSocket.testData),
});

const store = useStore();

watchEffect(() => {
  if (state.wsInstanceReadyState === 1) {
    console.log("ok");
    const data = {
      op: "subscribe",
      args: ["spot/candle60s:ETH-USDT"],
    };
    state.wsInstance.emit(data);
  }
});

// -> logs 0

// setTimeout(() => {
//   count.value++;
//   // -> logs 1
// }, 100);

onMounted(() => {
  // console.log("state.wsInstance.A", state.wsInstance);
  setTimeout(() => {
    // console.log("state.wsInstance.B", state.wsInstance);
    // const data = {
    //   op: "subscribe",
    //   args: [
    //     "spot/candle60s:ETH-USDT",
    //     // {
    //     //   channel: "candle1D",
    //     //   instId: "DOT-USDT",
    //     // },
    //   ],
    // };
    // state.vws.emit(data);
  }, 5000);
});
</script>
<style lang="scss" scoped>
#ws-wrap {
  width: 800px;
  height: 500px;
  border: 1px solid red;
  margin: 0 auto;
}
</style>
