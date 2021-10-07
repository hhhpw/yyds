import VWebSocket from "@utils/VWebSocket/index.js";
import * as types from "../types/websocket";
import eventHandle from "@utils/VWebSocket/eventHandle.js";
/* eslint-disable*/

const StoreWebSocket = {
  namespaced: true,
  moduleName: "StoreWebSocket",
  state: {
    wsInstance: null,
  },
  mutations: {
    [types.SET_WEB_SOCKET_STATE](state, value) {
      state.websocketState = value;
    },
    [types.SET_WEB_SOCKET](state, payload) {
      state.wsInstance = payload;
    },
  },
  actions: {
    initWS({ commit }) {
      const ws = new VWebSocket(
        // "wss://ws.okex.com:8443/ws/v4/public",
        "wss://real.okex.com:8443/ws/v3",
        // "wss://wspri.okex.com:8443/ws/v5/public",
        eventHandle
      );
      commit(types.SET_WEB_SOCKET, ws);
    },
  },
};

export default StoreWebSocket;
