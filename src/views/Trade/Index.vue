<template>
  <div class="trade">
    <KLineHeader
      v-if="symbolList.value"
      :symbol="symbol"
      :symbolList="symbolList.value"
      @symbolHanlder="symbolHanlder"
    />
    <el-main v-if="symbol">
      <KLineWidget
        :symbolInfo="symbolInfo"
        :symbol="symbol.toLocaleUpperCase()"
        ref="kLineRef"
      />
    </el-main>
  </div>
</template>
<script>
import { ref, onMounted, reactive } from "vue";
import KLineHeader from "@/components/Trade/KLineHeader";
import KLineWidget from "@/components/Trade/KLineWidget";
import { getSymbols } from "@/api/trade";
import { ws } from "@/socket/socket";
export default {
  name: "App",
  components: {
    KLineHeader,
    KLineWidget,
  },
  setup() {
    const symbolList = reactive({});
    const symbol = ref("");
    const symbolInfo = ref({});
    const kLineRef = ref(null);
    onMounted(async () => {
      ws.initWebSocket();
      const [list, symbolData] = await getSymbols();
      symbolList.value = list;
      symbol.value = symbolData;
      symbolInfo.value = list[0];
    });
    const symbolHanlder = (e) => {
      symbol.value = e;
      kLineRef.value.setSymbol(e);
    };

    return {
      symbol,
      symbolList,
      symbolInfo,
      symbolHanlder,
      kLineRef,
    };
  },
};
</script>
<style lang="scss" scoped>
::v-deep(.el-main) {
  padding: 0;
}
</style>
