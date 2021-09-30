import { createStore, createLogger } from "vuex";
import StoreApp from "./modules/StoreApp";
import StoreWebSocket from "./modules/StoreWebSocket";
const debug = process.env.NODE_ENV !== "production";
export default createStore({
  modules: {
    StoreApp,
    StoreWebSocket,
    strict: debug,
    plugins: debug ? [createLogger()] : [],
  },
});
