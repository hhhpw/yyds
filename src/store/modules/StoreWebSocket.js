import VWebSocket from "@utils/VWebSocket/index.js";
import * as types from "../types/websocket";
import eventHandle from "@utils/VWebSocket/eventHandle.js";
/* eslint-disable*/

const StoreWebSocket = {
  namespaced: true,
  moduleName: "StoreWebSocket",
  state: {
    wsInstance: null,
    wsInstanceReadyState: 0,
    testData: null,
  },
  mutations: {
    // 再定义个链接状态是因为wsInstance连接需要过程
    // 此时readyState再次变化无法检测到
    [types.SET_WEB_SOCKET_STATE](state, value) {
      state.wsInstanceReadyState = value;
    },
    [types.SET_WEB_SOCKET](state, payload) {
      state.wsInstance = payload;
    },
    [types.SET_WEB_SOCKET_TEST_DATA](state, payload) {
      state.testData = payload;
    },
  },
  actions: {
    initWS({ commit }) {
      const ws = new VWebSocket("wss://real.okex.com:8443/ws/v3", eventHandle);
      commit(types.SET_WEB_SOCKET, ws);
    },
  },
};

export default StoreWebSocket;
