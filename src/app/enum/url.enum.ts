import { environment } from '../../environments/environment';

export const url = {
    protocol: environment.serverProtocol,
    niceHashResource: environment.port+environment.nicehash,
    niceHashResourceKd: environment.port+environment.nicehashKd,
    bddProfitability: environment.port+environment.profitability,
    bddChangeRate: environment.port+environment.changeRate,
    bddChangeRateEth: environment.port+environment.changeRateEth,
    wallet: environment.serverProtocol,
    walletResource: environment.port+environment.wallet,
    walletResourceKd: environment.port+environment.walletKd,
    withdrawals: environment.port+environment.withdrawal,
    withdrawalsKd: environment.port+environment.withdrawalkd,
    order: environment.port+environment.order,
    orderKd: environment.port+environment.orderKd,
    insertOrder: environment.port+environment.insertOrder,
    insertOrderKd: environment.port+environment.insertOrderKd,
    averageProfit: environment.port+environment.averageProfit,
    averageHashrate: environment.port+environment.averageHashrate,
    blockchainChangeRate: "https://blockchain.info/tobtc?currency=EUR&value=1&cors=true",
    EthChangeRate: "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR"
} 