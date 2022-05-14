import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import {url} from '../enum/url.enum' 
const textResponse: Object = {
    responseType: 'text'
  }

@Injectable()
export class NiceHashService{
    
public token: string
public login: string
public sharedAmount: BehaviorSubject<Number> = new BehaviorSubject<Number>(null);
public sharedAmountKd: BehaviorSubject<Number> = new BehaviorSubject<Number>(null);


constructor(private http: HttpClient){

} 

public getInfosFromBtcAddress(): Observable<Object>{
    return this.http.get(url.protocol+window.location.hostname+url.niceHashResource)
}

public getWithdrawalAdresses(): Observable<Object>{
    return this.http.get(url.protocol+window.location.hostname+url.withdrawals)
}

public getInfosWallet(): Observable<Object>{
    return this.http.get(url.protocol+window.location.hostname+url.walletResource)
}

public getChangeRate(): Observable<Object>{
    return this.http.get(url.protocol+window.location.hostname+url.blockchainChangeRate)
}

public getChangeRateEth(): Observable<Object>{
    return this.http.get(url.protocol+window.location.hostname+url.EthChangeRate)
}

public sendOrder(id:string,amount:Number): Observable<Object>{
    return this.http.get(url.protocol+window.location.hostname+url.order+"/"+id+"/"+amount)
}

public insertOrder(uuid:string,mail:string,amount: Number): Observable<Object>{
    return this.http.get(url.protocol+window.location.hostname+url.insertOrder+"/"+uuid+"/"+mail+"/"+amount)
}

public getIPAddress()  
{  
  return this.http.get("http://api.ipify.org/?format=json");  
}

public getAverageProfit(): Observable<Object>{
    return this.http.get(url.protocol+window.location.hostname+url.profitAvg)
}

public getAverageHashrate(): Observable<Object>{
    return this.http.get(url.protocol+window.location.hostname+url.hashrateAvg)
}

public getProfitStats(rig): Observable<Object>{
    return this.http.get(url.protocol+window.location.hostname+url.profitStats+"/"+rig)
}

public getHashrateStats(rig): Observable<Object>{
    return this.http.get(url.protocol+window.location.hostname+url.hashrateStats+"/"+rig)
}

public getChangeRateStats(table): Observable<Object>{
    console.log("Url : ",url.protocol+window.location.hostname+url.changerateStats+"/"+table)
    return this.http.get(url.protocol+window.location.hostname+url.changerateStats+"/"+table)
}

public getUpTime(rig): Observable<Object>{
    return this.http.get(url.protocol+window.location.hostname+url.upTime+"/"+rig)
}

} 