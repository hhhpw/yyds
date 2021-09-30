

import store from '@store';

export const handleData = (res) => {
  const result = JSON.parse(res.data);
  // {"arg":{"channel":"candle1D","instId":"LTC-USDT"},
  // "data":[["1624636800000","128.03","129.41","118.58","121.96","422657.544073","53056957.286635"]]}
  //
  // 需要与后端约定返回的type字段
  // 例如：trade、kline等
  // 根据type去commit从而修改ui
  const { arg: { channel }, data } = result;
  if (channel === 'candle1D') {
    store.commit('kline/KLINE_GET_DATA', { data }, { root: true });
  }

};

