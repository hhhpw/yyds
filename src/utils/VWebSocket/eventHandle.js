const pako = require("pako");
import store from "@store";

/* eslint-disable*/

const inflate = (data) => {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.addEventListener("loadend", () => {
      let value = pako.inflateRaw(reader.result, { to: "string" });
      if (value === "pong") {
        resolve(value);
      } else {
        resolve(JSON.parse(value));
      }
    });
    reader.readAsArrayBuffer(data);
  });
};
const eventHandle = async (res) => {
  if (res.data instanceof Blob) {
    inflate(res.data).then((data) => {
      if (data.table === "spot/candle60s") {
        store.commit("StoreWebSocket/SET_WEB_SOCKET_TEST_DATA", data.data);
      }
    });
  }
  //
  // 需要与后端约定返回的type字段
  // 例如：trade、kline等
  // 根据type去commit从而修改ui
  // const {
  //   arg: { channel },
  //   data,
  // } = res;
  // if (channel === "candle1D") {
  // console.log("----data", data);
  // store.commit("kline/KLINE_GET_DATA", { data }, { root: true });
  // }
};

export default eventHandle;
