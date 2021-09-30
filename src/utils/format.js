import utilsNumber from "./number.js";

const formatBalance = (balance, precision) => {
  return utilsNumber.bigNum(balance).div(Math.pow(10, precision)).toString();
};

const getTokenCurrency = (token) => {
  return token.split("::")[2];
};

const formatPrice = (price, precision = 9) => {
  return utilsNumber.formatNumberMeta(
    utilsNumber.bigNum(price).div(Math.pow(10, precision)).toString(),
    {
      trailingZero: false,
      grouped: true,
    }
  ).text;
};

export default {
  formatBalance,
  getTokenCurrency,
  formatPrice,
};
