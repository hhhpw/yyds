<template>
  <div></div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, defineProps, defineEmits } from "vue";
import { useStore } from "vuex";

let state = reactive({
  vws: computed(() => store.state.StoreWebSocket.wsInstance),
});

const store = useStore();

onMounted(() => {
  setTimeout(() => {
    const data = {
      op: "subscribe",
      args: [
        "spot/candle60s:ETH-USDT",
        // {
        //   channel: "candle1D",
        //   instId: "DOT-USDT",
        // },
      ],
    };
    console.log("state.ws", state.ws);
    state.vws.emit(data);
  }, 4000);
});
</script>
<style lang="scss" scoped></style>
