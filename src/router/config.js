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
    ],
  },
];
export default routes;
