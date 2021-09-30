const openNewWindow = (url) => {
  window.open(url, "_blank");
};

const hexCharCodeToStr = (hexCharCodeStr) => {
  let trimedStr = hexCharCodeStr.trim();
  let rawStr =
    trimedStr.substr(0, 2).toLowerCase() === "0x"
      ? trimedStr.substr(2)
      : trimedStr;
  let len = rawStr.length;
  if (len % 2 !== 0) {
    return "";
  }
  let curCharCode;
  let resultStr = [];
  for (let i = 0; i < len; i = i + 2) {
    curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
    resultStr.push(String.fromCharCode(curCharCode));
  }
  return resultStr.join("");
};

export default {
  openNewWindow,
  hexCharCodeToStr, // 16进制转string
};
