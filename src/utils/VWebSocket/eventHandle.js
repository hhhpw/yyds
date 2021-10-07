// import store from "@store";
/* eslint-disable*/
const pako = require("pako");
const eventHandle = async (res) => {
  // console.log("A", res.data.arrayBuffer());
  // console.log("res", res.data instanceof Blob);
  if (res.data instanceof Blob) {
    // res.data.arrayBuffer().then((text) => {
    //   console.log("text", text);
    //   let t = JSON.parse(pako.inflate(text, { to: "string" }));
    //   console.log("=====t=====", t);
    // });
    // console.log("====res====", res);
    // const t = pako.inflate(new Uint8Array(res), { to: "string" });
    // console.log(t);
    let reader = new FileReader();
    reader.onload = function () {
      console.log("reader.result", reader.result);
      // console.log("aa", reader);
      // const t = pako.inflate(reader.result);
      // console.log("t", t);
    };
    reader.readAsArrayBuffer(res.data);
    // var t = await new Response(res.data).text();
    // console.log("t", t);
    // reader.addEventListener("onload", function () {
    //   console.log(
    //     "e",
    //     JSON.parse(pako.inflate(reader.result), { to: "string" })
    //   );
    // });
  }
  // const result = JSON.parse(res.data);
  // {"arg":{"channel":"candle1D","instId":"LTC-USDT"},
  // "data":[["1624636800000","128.03","129.41","118.58","121.96","422657.544073","53056957.286635"]]}
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
