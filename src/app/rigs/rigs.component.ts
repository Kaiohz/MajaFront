import { Component, OnInit, Inject  } from '@angular/core';
import { NiceHashService } from 'app/services/nicehash.service';
import * as Chartist from 'chartist';
import { BehaviorSubject } from 'rxjs';
import {Avg, Device, MiningRig, NiceHashObject, Wallet} from '../app-nicehash.module'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MESSAGES } from 'app/enum/messages.enum';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './rigs.component.html',
  styleUrls: ['./rigs.component.css']
})
export class RigsComponent implements OnInit {

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
  averageProfit: BehaviorSubject<String> = new BehaviorSubject<String>("");
  averageProfitEuros: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  averageHashrate: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  oRigs: BehaviorSubject<MiningRig[]> = new BehaviorSubject<MiningRig[]>(null)
  devices: BehaviorSubject<Device[]> = new BehaviorSubject<Device[]>([])
  breakpoint: number;
  dashboardClass: string = '';
  breakpointRig: number;
  breakpointWidth: number = 700;
  //work as percentage, i'm lazy don't want to change variable name
  nbMiners: number = 5;
  energyPrice = 0.19


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

  getChangeRate(){
    this.niceHashService.getChangeRate().subscribe({
      next: value => {
        this.changeRate.next(value['EUR'])
      },
      error: err => {
        console.log("Erreur communication api change rate : "+err)
      }
    })
  }

  getUptime(rig: string){
    return this.niceHashService.getUpTime(rig.toLocaleLowerCase())
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
              }else if(device.powerUsage > 0 && device.speeds[0] != undefined){
                  this.hTotal.next(this.hTotal.getValue()+Number.parseInt(device.speeds[0].speed.substring(0,8)))
                  this.pTotal.next(this.pTotal.getValue()+device.powerUsage)
                  this.eTotal.next(Number((this.eTotal.getValue()+(((24*device.powerUsage)/1000)*this.energyPrice)).toFixed(2)))  
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
        console.log("Erreur communication api : "+err)
      }, 
      complete: () => {
        this.getChangeRate()
        this.oRigs.getValue().forEach(async each => {
          await this.getUptime(each.name).subscribe({
            next: value => {
              each.upTime = Number(value['result'])
            }
          })
        })
      }
    });
  }
}
