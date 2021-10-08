import Layout from "../layout/Index.vue";
const routes = [
  {
    component: Layout,
    redirect: () => {
      return {
        name: "home",
      };
    },
    children: [
      {
        path: "/",
        component: () => import("@views/Demo.vue"),
        name: "home",
        meta: { title: "Demo", icon: "test", affix: true, url: "/" },
      },
      {
        path: "/trade",
        component: () => import("@views/Trade/Index.vue"),
        name: "trade",
        meta: { title: "交易", affix: true, url: "/trade" },
      },
    ],
  },
];
export default routes;
