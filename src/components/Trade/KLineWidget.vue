<template>
  <div class="kline">
    <div id="tv_chart_container" />
  </div>
</template>
<script>
import { DataFeed, widget as TvWidget } from "tradingview-api";
import { onMounted, ref, toRefs } from "vue";
import { getKlineHistory } from "@/api/trade";
import { intervalMap, supported_resolutions } from "@/socket/hardCode";
import { ws } from "@/socket/socket";
export default {
  name: "KLineWidget",
  props: {
    symbolInfo: {
      type: Object,
      required: true,
    },
    symbol: {
      type: String,
    },
  },
  setup(props) {
    const widget = ref(null);
    const interval = ref("1min");
    const { symbol, symbolInfo } = toRefs(props);
    /** 訂閱websocket */
    const subscribeKLine = () => {
      ws.subscribe(
        `market.${symbol.value.toLocaleLowerCase()}.kline.${interval.value}`,
        {
          id: "react-tv",
          sub: `market.${symbol.value.toLocaleLowerCase()}.kline.${
            interval.value
          }`,
        },
        (data) => {
          const tick = data.tick;
          datafeed.value.updateKLine({
            time: tick.id * 1000,
            open: tick.open,
            high: tick.high,
            low: tick.low,
            close: tick.close,
            volume: tick.vol,
          });
        }
      );
    };
    /** websocket取消訂閱 */
    const unsubscribeKLine = () => {
      ws.unsubscribe(`market.${symbol.value}.kline.${interval.value}`);
    };
    /** 取得數據 訂閱數據 */
    const getBars = async (params) => {
      try {
        console.log("params: ", params);
        const size = window.innerWidth;
        // 是否第一次請求歷史數據
        if (!params.firstDataRequest) {
          return {
            bars: [],
            meta: {
              noData: true,
            },
          };
        }
        if (params.resolution !== intervalMap[interval.value]) {
          unsubscribeKLine();
          for (let key in intervalMap) {
            if (intervalMap[key] === params.resolution) {
              interval.value = key;
            }
          }
        }

        // do api get history
        const [list] = await getKlineHistory({
          symbol: symbol.value.toLocaleLowerCase(),
          period: interval.value,
          size: size > 2000 ? 2000 : size,
        });

        console.log("list: ", list);

        if (
          params.resolution === intervalMap[interval.value] &&
          params.firstDataRequest &&
          list
        ) {
          subscribeKLine();
        }

        if (!list) {
          return {
            bars: [],
            meta: { noData: true },
          };
        }
        return {
          bars: list,
          meta: {
            noData: !list.length,
          },
        };
      } catch (error) {
        console.log("getBars error:", error);
      }
    };
    /** 配置trading-view */
    const resolveSymbol = () => {
      return new Promise((resolve) => {
        resolve({
          name: symbol.value, // 商品名称/交易对
          full_name: symbol.value,
          description: symbol.value, // 商品描述
          type: symbol.value, // 仪表的可选类型 'bitcoin'
          session: "24x7", // 商品交易时间段 "HHMM-HHMM"
          exchange: "HuoBi", // 交易所简称 同 listed_exchange
          listed_exchange: symbol.value, // 交易所简称
          timezone: "Asia/Shanghai", // 时区
          format: "price", //在价格刻度上标签格式  price/volume
          pricescale: Math.pow(10, symbolInfo.value["price-precision"]), // 价格精度
          minmov: 1, //最小波动价格
          volume_precision: symbolInfo.value["value-precision"], // 以整数显示成交量数字的小数位
          has_intraday: true, // 是否有日内(分钟)历史数据
          supported_resolutions: supported_resolutions, // 周期数组
        });
      });
    };
    const datafeed = ref(
      new DataFeed({
        getBars: (params) => getBars(params),
        fetchResolveSymbol: () => resolveSymbol(),
        fetchConfiguration: () => {
          return new Promise((resolve) => {
            resolve({
              supported_resolutions,
            });
          });
        },
      })
    );
    /** 初始化trading-view */
    const initTradingView = () => {
      widget.value = new TvWidget({
        fullscreen: true, //是否充满屏幕
        symbol: symbol.value, // 商品信息/交易对信息
        interval: intervalMap[interval.value], // 周期
        container_id: "tv_chart_container", // 元素id
        datafeed: datafeed.value, // dataFeed 封装后数据
        library_path: "/charting_library/", // tv 图表库地址
        locale: "zh", // 语言
        theme: "Dark", // 盘面主题风格
        timezone: "Asia/Shanghai", // 时区
      });
    };
    const setSymbol = (newSymbol) => {
      unsubscribeKLine();
      symbol.value = newSymbol;
      widget.value?.setSymbol(
        newSymbol.toLocaleUpperCase(),
        intervalMap[interval.value],
        () => {
          console.log("------setSymbol---------", symbol.value);
        }
      );
    };
    onMounted(() => {
      initTradingView();
    });

    return {
      widget,
      setSymbol,
    };
  },
};
</script>
