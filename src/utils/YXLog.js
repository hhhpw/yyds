class YXLog {
  constructor() {}

  baseLog(logType, info) {
    if (!logType) {
      return null;
    }
    switch (logType) {
      case 1:
        console.log(
          `%c====logInfo:${JSON.stringify(info)}====`,
          "background-color:#409eff;color:#FFF;font-size:16px;"
        );
        break;
      case 2:
        console.log(
          `%c====logInfo:${JSON.stringify(info)}====`,
          "background-color:#67c23a;color:#FFF;font-size:16px;"
        );
        break;
      case 3:
        console.log(
          `%c====logInfo:${JSON.stringify(info)}====`,
          "background-color:#e6a23c;color:#FFF;font-size:16px;"
        );
        break;
      case 4:
        console.log(
          `%c====logInfo:${JSON.stringify(info)}====`,
          "background-color:#f56c6c;color:#FFF;font-size:16px;"
        );
        break;
      default:
        break;
    }
    return false;
  }

  log(params) {
    this.baseLog(1, params);
  }
  logSuccess(params) {
    this.baseLog(2, params);
  }
  logWarning(params) {
    this.baseLog(3, params);
  }
  logError(params) {
    this.baseLog(4, params);
  }
}
export default new YXLog();
