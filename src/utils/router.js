import router from "../router/index";
import { ref } from "vue";

/**
 *
 * @param {
 * name: String,
 * query: Object,
 * params: Object,
 * path: String,
 * meta: String,
 *
 * } options
 */
function push(options) {
  router.push(options);
}

function back() {
  router.go(-1);
}

function getCurrentRoute() {
  return ref(router.currentRoute).value;
}
export default {
  push,
  back,
  getCurrentRoute,
};
