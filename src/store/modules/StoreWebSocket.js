import WebSocket from "@utils/WebSocket/index.js";
import * as types from "../types/websocket";
/* eslint-disable*/

const test = (res) => {
  console.log("res", res);
};
const StoreWebSocket = {
  namespaced: true,
  moduleName: "StoreWebSocket",
  state: {
    wsInstance: null,
  },
  mutations: {
    [types.SET_WEB_SOCKET_STATE](state, value) {},
  },
  actions: {
    initWS({ commit }) {
      const ws = new WebSocket("wss://ws.okex.com:8443/ws/v4/public", test);
      commit(types.SET_WEB_SOCKET, ws);
    },
  },
};

export default StoreWebSocket;
