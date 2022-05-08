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
    blockchainChangeRate: environment.port+"/btc",
    EthChangeRate: environment.port+"/eth",
    profitAvg: environment.port+"/averageProfit/global",
    hashrateAvg: environment.port+"/averageHashrate/global",
    profitStats:  environment.port+"/profitStats",
    hashrateStats:  environment.port+"/hashrateStats",
    changerateStats:  environment.port+"/changerategraph"
} 