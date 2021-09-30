import session from "@utils/session";

const StoreApp = {
  namespaced: true,
  moduleName: "StoreApp",
  state: {
    currLang: session.getItem("language"),
    settings: {
      slippageTolerance: session.getItem("slippageTolerance") || 0.5,
      switchSlippage: session.getItem("switchSlippage") || true,
      slippageInput: session.getItem("slippageInput"),
    },
    isShowSettings: false,
    languages: [
      {
        label: "繁体中文",
        value: "zh",
      },
      {
        label: "English",
        value: "en",
      },
    ],
    homeData: null,
  },
  mutations: {},
  actions: {},
};

export default StoreApp;
