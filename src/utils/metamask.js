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

export default {
  isInstalled,
  connectMetaMask,
};
