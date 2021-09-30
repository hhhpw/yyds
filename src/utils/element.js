// import lang from "element-plus/lib/locale/lang/zh-cn";
// import locale from "element-plus/lib/locale";
// import "element-plus/packages/theme-chalk/src/base.scss";

import {
  // ElButton,
  ElInput,
  // ElMenu,
  // ElMenuItem,
  // ElSubmenu,
  // ElMessage,
} from "element-plus";

const components = [
  // ElButton,
  ElInput,
  // ElMenu,
  // ElMenuItem,
  // ElSubmenu,
  // ElMessage,
];

export default (app) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });

  // plugins.forEach((plugin) => {
  //   app.use(plugin);
  // });
};
