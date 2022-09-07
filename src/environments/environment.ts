// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  port: ":4001",
  serverProtocol: "http://",
  nicehash: "/nicehash",
  nicehashKd: "/nicehashkd",
  profitability: "/profitability",
  changeRate: "/changerate",
  changeRateEth: "/changerateeth",
  wallet: "/wallet",
  walletKd: "/walletkd",
  withdrawal: "/withdrawals",
  withdrawalkd: "/withdrawalskd",
  order: "/order",
  orderKd: "/orderkd",
  insertOrder: "/insertOrder",
  insertOrderKd: "/insertOrderKd"
};
