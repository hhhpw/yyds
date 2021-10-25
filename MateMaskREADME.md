#MetaMask 概述

1. 什么是 MetaMask?<br/>MetaMask 可以用来管理所有的以太坊网络的资产，允许用户以各种方式（包括硬件钱包）管理帐户及其密钥。

2. 相关文档:
3. web3js: https://web3js.readthedocs.io/en/v1.3.4/
4. Ethereum Wiki: https://eth.wiki/json-rpc/API
5. MetaMask docs: https://docs.metamask.io/guide/

#web3js Api

1. 引入 web3js 库

```
  const Web3 = require('web3');
  -> Web3.utils   // web3 可访问属性和实例
  -> Web3.version  // 返回web3 版本
  -> Web3.givenProvider // web3 所要提供的参数
  -> Web3.modules // 返回一个包含所有子模块类的对象，可实例调用
      {
        Eth: Eth(provider),   // 用于与以太坊网络交互的Eth模块
        Net: Net(provider),  // 用于与网络属性交互的Net模块
        Personal: Personal(provider),  // 用于与以太坊账户交互
        Shh: Shh(provider),  // 用于通信 p2p 和 广播
        Bzz: Bzz(provider),  // 用于 swarm 协议，分散的文件存储
      }
```

2.  web3js-eth 常用 API

```
   // const ETH = require('web3-eth');
   // const eth = new Eth(Eth.givenProvider || 'ws://some.local-or-remote.node:8546');

  web3.eth.getAccounts(console.log);  // 获取账户地址
  web3.eth.subscribe(type [, options] [, callback]);  // 支持订阅特定事件
    e.g: web3.eth.subscribe('logs', {} ,function(){ ... });  // 订阅日志
        ...
        web3.eth.clearSubscriptions();  // 取消订阅

  new web3.eth.Contract(jsonInterface[, address][, options]) // 创建一个合约实例  options: from/gasPrice/gas/data
    e.g: const myContract = new web3.eth.Contract([...], '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', {
        from: '0x1234567890123456789012345678901234567891',
        gasPrice: '20000000000'
    });

  web3.eth.accounts.create();  // 使用私钥和公钥生成账户对象
    e.g: return {
      address,   // 地址
      privateKey,  // 私钥
      signTransaction, // 带签名交易 => function
      sign, // 签名 => function
    }

  web3.eth.accounts.privateKeyToAccount(privateKey,[, innoreLength])  // 从私钥创建账户，私钥长度验证

  web3.eth.account.signTransaction(tx, privateKey, callback); // 带签名的以太坊交易
    e.g:
      tx: {
        nonce,  // 交易产生的随机数
        chainId,  //  交易链 ID
        to,  // 交易接收地址,
        data,  // 交易调用数据
        value, // 参数value值
        gasPrice,  // 本次交易设置的gas费
        gas, // 交易提供的gas
        common: {  // 公共对象
          customChain: {} // 自定义链属性
          baseChain,
          hardfork,
        }
      }
      return {  // 签名数据 RLP 编码的交易
        messageHash: '0x31c2f03766b36f0346a850e78d4f7db2d9f4d7d54d5f272a750ba44271e370b1',  // 给定消息的哈希值
        v: '0x25',  // 恢复值
        r: '0xc9cf86333bcb065d140032ecaab5d9281bde80f21b9687b3e94161de42d51895',   // 签名的前 32 个字节
        s: '0x727a108a0b8d101465414033c3f705a9c7b826e596766046ee1183dbc8aeaa68',   // 签名的下 32 个字节
        rawTransaction:       '0xf869808504e3b29200831e848094f0109fc8df283027b6285cc889f5aa624eac1f55843b9aca008025a0c9cf86333bcb065d140032ecaab5d9281bde80f21b9687b3e94161de42d51895a0727a108a0b8d101465414033c3f705a9c7b826e596766046ee1183dbc8aeaa68'  // RLP 编码的交易
        transactionHash: '0xde8db924885b0803d2edc335f745b2b8750c8848744905684c20b987443a9593'  // RLP 的交易哈希
      }

   web3.eth.accounts.sign(); // 对任意数据进行签名
     e.g: return {
        message: 'Some data',  // 返回的 message
        messageHash: '0x1da44b586eb0729ff70a73c326926f6ed5a25f5b056e7f47fbc6e58d86871655',  // 返回 message 的哈希
        v: '0x1c',  // 恢复值
        r: '0xb91467e570a6466aa9e9876cbcd013baba02900b8979d43fe208a4a4f339f5fd',  // 签名的前 32 个字节
        s: '0x6007e74cd82e037b800186422fc2da167c747ef045e5d18a5f5d4300f8e1a029',  // 签名的下 32 个字节
        signature: '0xb91467e570a6466aa9e9876cbcd013baba02900b8979d43fe208a4a4f339f5fd6007e74cd82e037b800186422fc2da167c747ef045e5d18a5f5d4300f8e1a0291c'  // RLP 编码的交易
     }

  web3.eth.accounts.encrypt(privateKey, password);  // 将私钥加密到 web3 密钥库 v3 标准
  web3.eth.accounts.decrypt(keystoreJsonV3, password);  // 解密 密钥库 v3 JSON , 并创建账户
  web3.eth.accounts.wallet;   // 包含多个账户的钱包
  web3.eth.accounts.wallet.create(numberOfAccounts [, entropy]);  // 创建钱包账户
  web3.eth.accounts.wallet.add(account);  // 使用私钥或账户对象向钱包添加账户
  web3.eth.accounts.wallet.remove(account);  // 钱包中删除账户
  web3.eth.accounts.wallet.clear(); // 安全地清空钱包并删除其所有帐户。
  web3.eth.accounts.wallet.encrypt(password); // 将所有钱包帐户加密为一组加密的密钥库 v3 对象。
  web3.eth.accounts.wallet.decrypt(keystoreArray, password);  // 解密密钥库 v3 对象
  web3.eth.accounts.wallet.save(password [, keyName]);  // 将钱包加密并作为字符串存储到本地
```

#MetaMask Api

1. 链接钱包

```
    const connectMetaMask = async () => {
      let result = [];
      try {
        result = await window.ethereum.request({
          method: "eth_requestAccounts",  //
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
```

2. 发起交易及调用合约

```
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

```

3.  web3js 通过 metamask 调用合约

```
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

```
