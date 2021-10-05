import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import "element-plus/lib/theme-chalk/index.css";
import installElementPlus from "./utils//element";
import "@styles/index.scss"; // global css
// import ElementPlus from "element-plus";
import { ElInfiniteScroll } from "element-plus";

const app = createApp(App);
installElementPlus(app);

console.log("store", store);

//
// app.use(ElementPlus);
app.use(ElInfiniteScroll);
app.use(store);

app.use(router).use(i18n).mount("#app");

// store.dispatch("StoreWebSocket/initWS");
// setTimeout(() => store.dispatch("StoreWebSocket/initWS"), 2000);
