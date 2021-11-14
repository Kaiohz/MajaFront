import { Component, OnInit, Inject  } from '@angular/core';
import { NiceHashService } from 'app/services/nicehash.service';
import * as Chartist from 'chartist';
import { BehaviorSubject } from 'rxjs';
import {Device, MiningRig, NiceHashObject, Wallet} from '../app-nicehash.module'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MESSAGES } from 'app/enum/messages.enum';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  results:NiceHashObject
  changeRate: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  changeRateEth: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  profitability: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  profitabilityEuros: BehaviorSubject<string> = new BehaviorSubject<string>("");
  euros: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  eurosMonth: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  eurosWeek: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  eurosYear: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  unpaidAmount: BehaviorSubject<string> = new BehaviorSubject<string>("");
  unpaidEuros: BehaviorSubject<string> = new BehaviorSubject<string>("");
  eurosCg: BehaviorSubject<string> = new BehaviorSubject<string>("");
  balance: BehaviorSubject<string> = new BehaviorSubject<string>(""); ;
  balanceBTC: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  pTotal: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  hTotal: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  eTotal: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  oRigs: BehaviorSubject<MiningRig[]> = new BehaviorSubject<MiningRig[]>(null)
  devices: BehaviorSubject<Device[]> = new BehaviorSubject<Device[]>([])
  breakpoint: number;
  dashboardClass: string = '';
  breakpointRig: number;
  breakpointWidth: number = 700;
  nbMiners: number = 5;


  constructor(private niceHashService: NiceHashService) { }


  ngOnInit() {
    this.breakpoint = (window.innerWidth <= this.breakpointWidth) ? 3 : 5;
    this.breakpointRig =  (window.innerWidth <= this.breakpointWidth) ? 7 : 8;
    this.dashboardClass = this.breakpoint > 3 ? 'dashboard' : 'dashboard-smartphone' ;
    this.loadDashboard();
    setInterval(() => this.loadDashboard(), 30000);
  }
  

  loadDashboard() {
    this.clearTotal()
    this.getInfosBtcAddress();
  }

  clearTotal(){
    this.pTotal.next(0);
    this.hTotal.next(0);
    this.eTotal.next(0);
  }

  getInfosBtcAddress(){
    this.niceHashService.getInfosFromBtcAddress().subscribe({
      next: value => {
        this.results = <NiceHashObject>value;
        if(this.results.totalProfitability !== undefined){
          this.profitability.next(Number(this.results.totalProfitability.toFixed(10)))
        }else{
          this.profitability.next(Number(0))
        }
        this.unpaidAmount.next(this.results.unpaidAmount)
        this.oRigs.next(this.results.miningRigs) 
        if(this.results.miningRigs !== undefined){
          this.results.miningRigs.map( rig => {
            rig.devices.forEach(device => {
              if(device.powerUsage > 0){
                this.devices.getValue().push(device)
              }
              if(device === undefined){
                this.pTotal.next(this.pTotal.getValue()+0)
                this.hTotal.next(this.hTotal.getValue()+0)
                this.eTotal.next(this.eTotal.getValue()+0)  
              }else{
                this.pTotal.next(this.pTotal.getValue()+device.powerUsage)
                if(device.speeds[0] !== undefined){
                  this.hTotal.next(this.hTotal.getValue()+Number.parseInt(device.speeds[0].speed.substring(0,8)))
                } else {
                  this.hTotal.next(this.hTotal.getValue()+0)
                }
                this.eTotal.next(Number((this.eTotal.getValue()+(((24*device.powerUsage)/1000)*0.17)).toFixed(2)))  
              }
            })
          })
        }else{
          this.pTotal.next(this.pTotal.getValue()+0)
          this.hTotal.next(this.hTotal.getValue()+0)
          this.eTotal.next(this.eTotal.getValue()+0)  
        }
      },
      error: err => {
        //this.snackBar.open(MESSAGES.ApiBtcAddressFailed,"",{duration: 2000} )
        console.log("Erreur communication api : "+err)
      },
      complete: () => {
        //this.snackBar.open(MESSAGES.ApiBtcAddressSuccess,"",{ panelClass: "maja-ok-snack-bar",duration: 2000} )
        this.getInfosWallet()
      }
    });
  }


  getInfosWallet(){
    this.niceHashService.getInfosWallet().subscribe({
      next: value => {
        var wallet = <Wallet>value
        this.balanceBTC.next(Number(wallet.totalBalance.substring(0,10)))
        var shared = Number(wallet.totalBalance.substring(0,10))/this.nbMiners
      },
      error: err => {
        console.log("Erreur communication api privée : "+err)
        //this.snackBar.open(MESSAGES.ApiWalletFailed,"",{duration: 2000} )
      },
      complete: () => {
        this.getChangeRate();
        this.getChangeRateEth();
        //this.snackBar.open(MESSAGES.ApiWalletSuccess,"",{ panelClass: "maja-ok-snack-bar",duration: 2000} )
      }
    })
  }

  getChangeRate(){
    this.niceHashService.getChangeRate().subscribe({
      next: value => {
        this.changeRate.next(<number>value)
        this.euros.next((this.profitability.getValue()/this.changeRate.getValue()))
        this.unpaidEuros.next((Number(this.unpaidAmount.getValue())/this.changeRate.getValue()).toFixed(2))
        this.eurosMonth.next(this.euros.getValue()*30)
        this.eurosWeek.next(this.euros.getValue()*7)
        this.eurosYear.next((this.euros.getValue()*30)*12)
        this.profitabilityEuros.next((this.profitability.getValue()/this.changeRate.getValue()).toFixed(2))
        this.balance.next((this.balanceBTC.getValue()/this.changeRate.getValue()).toFixed(2))
      },
      error: err => {
        console.log("Erreur communication api change rate : "+err)
        //this.snackBar.open(MESSAGES.ApiChangeRateFailed,"",{duration: 2000} )
      },
      complete: () => {
        //this.snackBar.open(MESSAGES.ApiChangeRateSuccess,"",{ panelClass: "maja-ok-snack-bar",duration: 2000} )
      }
    })
  }

  getChangeRateEth(){
    this.niceHashService.getChangeRateEth().subscribe({
      next: value => {
        this.changeRateEth.next(<number>value['EUR'])
      },
      error: err => {
        console.log("Erreur communication api change rate : "+err)
        //this.snackBar.open(MESSAGES.ApiChangeRateFailed,"",{duration: 2000} )
      },
      complete: () => {
        //this.snackBar.open(MESSAGES.ApiChangeRateSuccess,"",{ panelClass: "maja-ok-snack-bar",duration: 2000} )
      }
    })
  }
}
