export enum MESSAGES {
    ApiBtcAddressSuccess = "Communication API via BTC address OK.",
    ApiBtcAddressFailed = "Communication API via BTC address échouée.",
    ApiWalletSuccess = "Communication API Wallet OK.",
    ApiWalletFailed = "Communication API Wallet échouée.",
    ApiChangeRateSuccess = "Communication API change rate OK.",
    ApiChangeRateFailed = "Communication API change rate échouée.",
    WrongIdOrAmount = "Le montant ou l'id du destinataire n'est pas correct. Le montant doit etre >= 0.0005",
    WithdrawalOk = "Virement effectué.",
    WithdrawalNOk = "Problème avec le virement.",
    CronWithdrawlNok = "Problème avec le virement automatique.",
    CronWithdrawalOk = "Virement automatique effectué.",

} 