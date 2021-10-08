export default [
  {
    label: "首页",
    path: "/",
  },
  {
    label: "兑换",
    path: "/swap",
  },
  {
    label: "流动性",
    path: "/liquidity",
  },
  {
    label: "NFT",
    children: [
      {
        label: "盲盒",
        path: "/nftblindbox",
      },
      {
        label: "市场",
        path: "/nftmarket",
      },
      {
        label: "我的NFT",
        path: "/nftcollection",
      },
      {
        label: "平台回购",
        path: "/nftbuyback",
      },
    ],
  },
  {
    label: "交易",
    path: "/trade",
  },
];
