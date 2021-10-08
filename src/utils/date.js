/**
 * 倒计时
 * @param {*} timestamp
 * @returns
 */

const countdown = (timestamp) => {
  let interval = timestamp - Date.now();
  if (interval > 0) {
    let day, hour, minute, second;
    interval /= 1000;
    day = Math.floor(interval / 60 / 60 / 24);
    hour = Math.floor((interval / 60 / 60) % 24);
    minute = Math.floor((interval / 60) % 60);
    second = Math.floor(interval % 60);
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    return {
      day: day,
      hour: hour,
      minute: minute,
      second: second,
    };
  }
  return "";
};

export default {
  Format,
  countdown,
};
