const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

export default web3;

// const ethEnabled = () => {
//   if (window.web3) {
//     window.web3 = new Web3(window.web3.currentProvider);
//     window.ethereum.enable();
//     return true;
//   }
//   return false;
// };
