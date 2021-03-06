/* eslint-disable */
import StarMaskOnboarding from "@starcoin/starmask-onboarding";
import utilsNumber from "@utils/number.js";
import { providers, utils, bcs } from "@starcoin/starcoin";
import { arrayify, hexlify } from "@ethersproject/bytes";

/**
 *  StarMaskOnboarding 实例化
 * */
const createStcProvider = () => {
  let stcProvider;
  try {
    if (window.starcoin) {
      // We must specify the network as 'any' for starcoin to allow network changes
      stcProvider = new providers.Web3Provider(window.starcoin, "any");
    }
  } catch (error) {
    console.error(error);
  }
  return stcProvider;
};

/**
 *  StarMaskOnboarding 实例化
 * */
const createStarMaskOnboarding = () => {
  const currentUrl = new URL(window.location.href);
  const forwarderOrigin =
    currentUrl.hostname === "localhost" ? "http://localhost:9032" : undefined;

  let onboarding;
  try {
    onboarding = new StarMaskOnboarding({ forwarderOrigin });
  } catch (error) {
    console.error(error);
  }
  return onboarding;
};

/**
 * Check Starmask Installed
 * */
const checkStarMaskInstalled = () => {
  const { isStarMaskInstalled } = StarMaskOnboarding;
  return isStarMaskInstalled();
};

/**
 * connectWallet
 * */
const connect = async () => {
  let newAccounts = [];
  try {
    newAccounts = await window.starcoin.request({
      method: "stc_requestAccounts",
    });
  } catch (error) {
    console.error(error);
  }
  return newAccounts;
};

/**
 * Get chianID
 *
 * */
const getStcChianID = async () => {
  let chianID;
  try {
    const { id } = await window.starcoin.request({
      method: "chain.id",
    });
    chianID = id;
  } catch (error) {
    console.error(error);
  }
  return chianID;
};
/**
 * Get account balance
 *
 * */
const getAccountBalance = async ({ provider, account, token }) => {
  let balance;
  try {
    if (token === undefined) {
      token = "0x1::STC::STC";
    }
    const result = await provider.getResource(
      account,
      `0x1::Account::Balance<${token}>`
    );
    if (result) {
      balance = utilsNumber.bigNum(result.token.value).toString();
      return balance;
    } else {
      balance = "0";
      return balance;
    }
  } catch (error) {
    console.error(error);
    return "0";
  }
};

/**
 * Set Account permissions
 *
 * */
const setPermissions = async () => {
  let permissionsArray;
  try {
    permissionsArray = await window.starcoin.request({
      method: "wallet_requestPermissions",
      params: [{ stc_accounts: {} }],
    });
  } catch (err) {
    console.error(err);
  }
  return permissionsArray.map((perm) => perm.parentCapability);
};

/**
 * Get permissions
 *
 * */
const getPermissions = async () => {
  let permissionsArray;
  try {
    permissionsArray = await window.starcoin.request({
      method: "wallet_getPermissions",
    });
  } catch (err) {
    console.error(err);
  }
  return permissionsArray.map((perm) => perm.parentCapability);
};

const swapToken = async ({ provider, tokenCode, amount, focusType }) => {
  try {
    let funcId;
    let tokenIndex = tokenCode.length > 2 ? tokenCode.length - 1 : 0;
    if (focusType === "from") {
      if (tokenIndex === 0) {
        funcId = process.env.VUE_APP_SWAP_EXCHANGE_IN;
      } else {
        funcId = process.env.VUE_APP_SWAP_EXCHANGE_IN + `_${tokenIndex}`;
      }
    }
    if (focusType === "to") {
      if (tokenIndex === 0) {
        funcId = process.env.VUE_APP_SWAP_EXCHANGE_OUT;
      } else {
        funcId = process.env.VUE_APP_SWAP_EXCHANGE_OUT + `_${tokenIndex}`;
      }
    }
    const tyArgs = utils.tx.encodeStructTypeTags(tokenCode);
    const amountHexA = (function () {
      const se = new bcs.BcsSerializer();
      se.serializeU128(amount[0].toString(10));
      return hexlify(se.getBytes());
    })();
    const amountHexB = (function () {
      const se = new bcs.BcsSerializer();
      se.serializeU128(amount[1].toString(10));
      return hexlify(se.getBytes());
    })();

    const args = [arrayify(amountHexA), arrayify(amountHexB)];
    const scriptFunction = utils.tx.encodeScriptFunction(funcId, tyArgs, args);
    const payloadInHex = (function () {
      const se = new bcs.BcsSerializer();
      scriptFunction.serialize(se);
      return hexlify(se.getBytes());
    })();
    const txhash = await provider.getSigner().sendUncheckedTransaction({
      data: payloadInHex,
    });

    return txhash;
  } catch (e) {}
};

const addLiquidity = async ({ provider, tokens, amounts }) => {
  try {
    let funcId = process.env.VUE_APP_ADD_LIQUIDITY_FUNCTION_ID;
    const tyArgs = utils.tx.encodeStructTypeTags(tokens);
    const amountHexA = (function () {
      const se = new bcs.BcsSerializer();
      se.serializeU128(amounts[0].toString(10));
      return hexlify(se.getBytes());
    })();
    const amountHexB = (function () {
      const se = new bcs.BcsSerializer();
      se.serializeU128(amounts[1].toString(10));
      return hexlify(se.getBytes());
    })();
    const amountHexC = (function () {
      const se = new bcs.BcsSerializer();
      se.serializeU128(amounts[2].toString(10));
      return hexlify(se.getBytes());
    })();
    const amountHexD = (function () {
      const se = new bcs.BcsSerializer();
      se.serializeU128(amounts[3].toString(10));
      return hexlify(se.getBytes());
    })();

    const args = [
      arrayify(amountHexA),
      arrayify(amountHexB),
      arrayify(amountHexC),
      arrayify(amountHexD),
    ];
    const scriptFunction = utils.tx.encodeScriptFunction(funcId, tyArgs, args);

    const payloadInHex = (function () {
      const se = new bcs.BcsSerializer();
      scriptFunction.serialize(se);
      return hexlify(se.getBytes());
    })();
    const txhash = await provider.getSigner().sendUncheckedTransaction({
      data: payloadInHex,
    });

    return txhash;
  } catch (e) {}
};

const delLiquidity = async ({ provider, tokens, amounts }) => {
  try {
    let funcId = process.env.VUE_APP_DELETE_LIQUIDITY_FUNCTION_ID;
    const tyArgs = utils.tx.encodeStructTypeTags(tokens);
    const amountHexA = (function () {
      const se = new bcs.BcsSerializer();
      se.serializeU128(amounts[0].toString(10));
      return hexlify(se.getBytes());
    })();
    const amountHexB = (function () {
      const se = new bcs.BcsSerializer();
      se.serializeU128(amounts[1].toString(10));
      return hexlify(se.getBytes());
    })();
    const amountHexC = (function () {
      const se = new bcs.BcsSerializer();
      se.serializeU128(amounts[2].toString(10));
      return hexlify(se.getBytes());
    })();

    const args = [
      arrayify(amountHexA),
      arrayify(amountHexB),
      arrayify(amountHexC),
    ];
    const scriptFunction = utils.tx.encodeScriptFunction(funcId, tyArgs, args);

    const payloadInHex = (function () {
      const se = new bcs.BcsSerializer();
      scriptFunction.serialize(se);
      return hexlify(se.getBytes());
    })();
    const txhash = await provider.getSigner().sendUncheckedTransaction({
      data: payloadInHex,
    });

    return txhash;
  } catch (e) {}
};

/**
 * NFT部分合约
 */

// provider: stcProvider,
// tyArgs :Array,  [NFTMETA, NFTBody, PayToken]
// args: [id] bid/sell: [id, sell]
// type: String, BUY/SELL/BID/ACCEPT_BID/OFFLINE
// contractType: String, NFT/BLIND_BOX
const nftContractCall = async ({ provider, tyArgs, args, type }) => {
  try {
    const funcId = process.env[`VUE_APP_NFT_${type}_FUNCTION_ID`];
    console.log("funcId", funcId, "tyArgs", tyArgs, "args", args);
    const scriptFunction = await utils.tx.encodeScriptFunctionByResolve(
      funcId,
      tyArgs,
      args,
      process.env.VUE_APP_STAR_COIN_URL
    );
    const payloadInHex = (function () {
      const se = new bcs.BcsSerializer();
      scriptFunction.serialize(se);
      return hexlify(se.getBytes());
    })();
    const txhash = await provider.getSigner().sendUncheckedTransaction({
      data: payloadInHex,
    });
    return txhash;
  } catch (e) {
    console.error(`NFT:${type}:error`, e);
    return "error";
  }
};

const blindBoxContractCall = async ({
  provider,
  tyArgs, //[BoxToken, payToken] open:[]
  args, // [] buy:quantity, open:[], offline:id
  type, // BUY/OPEN/OFFLINE/SELL/BID
}) => {
  try {
    const funcId = process.env[`VUE_APP_BLIND_BOX_${type}_FUNCTION_ID`];
    console.log("funcId", funcId, tyArgs, args);
    const scriptFunction = await utils.tx.encodeScriptFunctionByResolve(
      funcId,
      tyArgs,
      args,
      process.env.VUE_APP_STAR_COIN_URL
    );
    const payloadInHex = (function () {
      const se = new bcs.BcsSerializer();
      scriptFunction.serialize(se);
      return hexlify(se.getBytes());
    })();
    const txhash = await provider.getSigner().sendUncheckedTransaction({
      data: payloadInHex,
    });
    return txhash;
  } catch (e) {
    console.log("e", e);
    return "error";
  }
};

const openBlindBox = async ({ provider, blindboxId }) => {
  try {
    const funcId = `${blindboxId}::open_box`;
    console.log("funcId", funcId);
    const tyArgs = [];
    const args = [];
    const scriptFunction = await utils.tx.encodeScriptFunctionByResolve(
      funcId,
      tyArgs,
      args,
      process.env.VUE_APP_STAR_COIN_URL
    );
    const payloadInHex = (function () {
      const se = new bcs.BcsSerializer();
      scriptFunction.serialize(se);
      return hexlify(se.getBytes());
    })();
    const txhash = await provider.getSigner().sendUncheckedTransaction({
      data: payloadInHex,
    });
    return txhash;
  } catch (e) {
    console.error("open blind box:", e);
    return "error";
  }
};

export default {
  createStcProvider,
  connect,
  createStarMaskOnboarding,
  checkStarMaskInstalled,
  getStcChianID,
  getAccountBalance,
  setPermissions,
  getPermissions,
  swapToken,
  addLiquidity,
  delLiquidity,
  nftContractCall,
  blindBoxContractCall,
  openBlindBox,
};
