import Layout from "../layout/Index.vue";
const routes = [
  {
    component: Layout,
    redirect: () => {
      return {
        name: "dex",
      };
    },
    children: [
      {
        path: "/home",
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
      {
        path: "/dex",
        component: () => import("@views/Dex/Index.vue"),
        name: "dex",
        meta: { title: "现货", affix: true, url: "/dex" },
      },
    ],
  },
];
export default routes;
