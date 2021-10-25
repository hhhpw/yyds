/*disabled-eslint*/
import { arrayify, hexlify } from "@ethersproject/bytes";
const isInstalled = () => {
  // if (typeof window.ethereum !== "undefined") {
  //   return true;
  // } else {
  //   return false;
  // }
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};

const connectMetaMask = async () => {
  let result = [];
  try {
    result = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return result;
  } catch (err) {
    // return result;
    if (err.code === 4001) {
      // EIP-1193 userRejectedRequest error
      // If this happens, the user rejected the connection request.
      console.log("Please connect to MetaMask.");
    }
  }
};

const sendTransaction = async () => {
  let result = [];
  try {
    const amountHexValue = (function () {
      const se = new bcs.BcsSerializer();
      se.serializeU128(amounts[0].toString(10));
      return hexlify(se.getBytes());
    })();
    result = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: "0xAB30eC1CF9366B3c7d5BB07AEf45A841",
          to: "0x2f318C334780961FB129D2a6c30D0763d9a5C970",
          value: amountHexValue,
          gasPrice: "0x09184e72a000",
          gas: "0x2710",
        },
      ],
    });
    return result;
  } catch (err) {
    if (err.code === 4001) {
      console.log("send failed");
    }
  }
};

function GetAngleRewards(Address, useraddr, callback) {
  myContract = new web3.eth.Contract(AngelABI, Address);
  const account = useraddr;
  sendEtherFrom(account, function (err, transaction) {
    if (err) {
      Message.error("I'm sorry you can't contribute!");
    }
  });

  function sendEtherFrom(account) {
    const method = "eth_sendTransaction";
    let data = web3.eth.abi.encodeFunctionCall(
      {
        name: "send",
        type: "function",
        inputs: [],
        outputs: [],
      },
      []
    );
    const parameters = [
      {
        from: account,
        to: Address,
        data: data,
      },
    ];
    const from = account;
    const payload = {
      method: method,
      params: parameters,
      from: from,
    };
    callback(null);
    ethereum.sendAsync(payload, function (err, response) {
      const rejected = "User denied transaction signature.";
      if (response.error && response.error.message.includes(rejected)) {
        callback("refuse");
      }
      if (response.code == "-32603") {
        callback("fail");
      }
      if (response.error && response.error.code == "-32603") {
        callback("fail");
      }
      if (response.result) {
        timer_takeGain = setInterval(() => {
          number_takeGain++;
          // 查询交易是否完成，这里要通过这个方法去一直查询交易是否完成
          web3.eth.getTransactionReceipt(response.result).then(function (res) {
            if (res == null) {
              callback(res);
            } else if (res.status) {
              callback(res.status);
              clearInterval(timer_takeGain);
            } else {
              clearInterval(timer_takeGain);
            }
          });
          if (number_takeGain > 10) {
            clearInterval(timer_takeGain);
            callback("timeout");
            number_takeGain = 1;
          }
        }, 2000);
      }
    });
  }
}

export default {
  isInstalled,
  connectMetaMask,
  sendTransaction,
};
