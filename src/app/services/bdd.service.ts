import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import {url} from '../enum/url.enum' 

const textResponse: Object = {
    responseType: 'text'
  }

@Injectable()
export class BddService{
    
public token: string
public login: string

constructor(private http: HttpClient){

} 

public getProfitability(): Observable<Object>{
    return this.http.get(url.protocol+window.location.hostname+url.bddProfitability)
}

public getChangeRate(): Observable<Object>{
    return this.http.get(url.protocol+window.location.hostname+url.bddChangeRate)
}

public getChangeRateEth(): Observable<Object>{
    return this.http.get(url.protocol+window.location.hostname+url.bddChangeRateEth)
}
} 