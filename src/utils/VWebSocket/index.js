import YXLog from "@utils/YXLog.js";
import store from "@store";
class VWebSocket {
  constructor(url, handleData = null) {
    this.url = url;
    this.dispatchData = handleData; // 数据分发处理函数
    this.ws = null; // 原生ws对象
    this.heartbeatDetectTimer = null; // 心跳检测轮询
    this.errorResetTimer = null; // 错误重连轮询器
    this.errorDispatchOpen = true; // 开启错误调度
    this.reconnetNumber = 0; // 重连次数
    this.isCloseSocket = false; // 是否关闭socket
    this.disConnetSource = "";
    this.init();
  }
  // 错误处理
  handleError(type) {
    return () => {
      // this.handleDisconnect();
      if (this.errorDispatchOpen && this.disConnetSource === "") {
        this.disConnetSource = type;
      }
      YXLog.logError(`Disconneted VWebSocket from ${type} event`);
      // 排除手动断开
      if (this.disConnetSource === type) {
        this.errorResetTimer && clearTimeout(this.errorResetTimer);
        this.handleDisconnect();
      }
    };
  }

  // 心跳检测
  heartbeatDetect() {
    this.heartbeatDetectTimer && clearInterval(this.heartbeatDetectTimer);
    this.heartbeatDetectTimer = setInterval(() => {
      const state = this.getSocketState();
      console.log("state", state, WebSocket);
      if (state === WebSocket.OPEN || state === WebSocket.CONNECTING) {
        // 发送心跳
        this.ws.send("ping");
      } else {
        console.log("A");
        this.init();
      }
    }, 20000);
  }

  // 断开处理
  handleDisconnect() {
    // 重连五次失败 宣告ws连接失败
    // 重制所有属性
    console.log("reconnetNumber", this.reconnetNumber);
    if (this.reconnetNumber > 4) {
      this.reconnetNumber = 0;
      this.errorDispatchOpen = false;
      this.ws = null;
      YXLog.logError("WS连接失败");
      return false;
    }
    // 重连尝试
    this.errorResetTimer = setTimeout(() => {
      console.log("B");
      this.init();
      this.reconnetNumber++;
      YXLog.logWarning(`尝试重连webSocket第${this.reconnetNumber}次`);
    }, this.reconnetNumber * 1000);
  }

  // 初始化连接
  init() {
    console.log("store", store);
    this.heartbeatDetectTimer && clearTimeout(this.heartbeatDetectTimer);
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => {
      // 通知连接状态状态
      store.commit("StoreWebSocket/SET_WEB_SOCKET_STATE", 1);
      this.reconnetNumber = 0;
      this.errorResetTimer = null;
      this.errorDispatchOpen = true;
      this.subscribe();
      YXLog.logSuccess("WebSocket连接成功");
      this.heartbeatDetect();
    };
    this.ws.onclose = this.handleError("close");
    this.ws.onerror = this.handleError("error");
  }

  // 订阅者 监听服务器段的消息
  subscribe() {
    // 接受信息 要在这里处理容错情况
    this.ws.onmessage = (res) => {
      // YXLog.log(res);
      console.log("subscribe", res);
      try {
        this.dispatchData && this.dispatchData(res);
      } catch (e) {
        YXLog.logError("subscribe错误:" + e);
      }
    };
  }

  // 用于组件发布
  emit(data, cb, time = 500) {
    const state = this.getSocketState();
    if (state === this.ws.OPEN) {
      this.ws.send(JSON.stringify(data));
      cb && cb();
      this.heartbeatDetect();
    } else if (state === this.ws.CONNECTING) {
      VWebSocket.eventPoll(state, this.ws.OPEN, time, () => {
        this.ws.send(JSON.stringify(data));
        cb && cb();
        this.heartbeatDetect();
      });
    } else {
      console.log("C");
      this.init(() => {
        this.emit(data, cb);
      });
    }
  }

  // 事件轮询器
  static eventPoll() {}

  // 获取ws连接状态
  getSocketState() {
    return this.ws && this.ws.readyState;
  }

  // 手动连接
  open() {
    if (!this.isCloseSocket) {
      YXLog.logError("VWebSocket already connected, do not connect again");
    }
    this.heartbeatDetectTimer = null;
    this.reconnetNumber = 0;
    this.disConnetSource = null;
    this.errorResetTimer = null;
    this.isCloseSocket = false;
    this.init();
  }

  // 手动关闭
  close() {
    this.heartbeatDetectTimer && clearTimeout(this.heartbeatDetectTimer);
    this.errorResetTimer && clearTimeout(this.errorResetTimer);
    this.isCloseSocket = true;
    this.ws.close();
  }
}

export default VWebSocket;

// // 0(VWebSocket.CONNECTING)  正在链接中;
// // 1(VWebSocket.OPEN) 已经链接并且可以通讯;
// // 2(VWebSocket.CLOSING) 连接正在关闭;
// // 3(VWebSocket.CLOSED) 连接已关闭或者没有链接成功;
