import { Component, OnInit, Inject  } from '@angular/core';
import { NiceHashService } from 'app/services/nicehash.service';
import * as Chartist from 'chartist';
import { BehaviorSubject } from 'rxjs';
import {Avg, Device, MiningRig, NiceHashObject, result, stats, Wallet} from '../app-nicehash.module'
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
  revenues: BehaviorSubject<number> = new BehaviorSubject<number>(0);
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
  devicesMining: BehaviorSubject<Number> = new BehaviorSubject<Number>(0)
  devicesOffline: BehaviorSubject<Number> = new BehaviorSubject<Number>(0)
  rigMining: BehaviorSubject<Number> = new BehaviorSubject<Number>(0)
  rigOffline: BehaviorSubject<Number> = new BehaviorSubject<Number>(0)
  nextPayout: BehaviorSubject<string> = new BehaviorSubject<string>("")
  breakpoint: number;
  dashboardClass: string = '';
  breakpointRig: number;
  breakpointWidth: number = 700;
  //work as percentage, i'm lazy don't want to change variable name
  nbMiners: number = 5;
  energyPrice = 0.23
  chartTime: BehaviorSubject<number> = new BehaviorSubject<number>(36);
  chartTimeHashrate: BehaviorSubject<number> = new BehaviorSubject<number>(36);


  constructor(private niceHashService: NiceHashService) { }


  profitChart(serie,labels,time){
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
      const dataDailySalesChart: any = {
        labels: [],
        series: [
            serie.slice(-time),
            serie.map( () => this.eTotal.getValue().toString()).slice(-time),
            serie.map( () => this.averageProfitEuros.getValue().toString()).slice(-time)
        ]
    };

    const optionsDailySalesChart: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: Math.min(...serie)-Math.min(...serie)*0.1,
        high: Math.max(...serie)+Math.max(...serie)*0.1, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
    }

    var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);
  }

  hashrateChart(serie,labels,time){
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    const dataDailySalesChart: any = {
      labels: [],
      series: [
        serie.slice(-time)
      ]
  };

  const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
      }),
      low: Math.min(...serie),
      high: Math.max(...serie)+Math.max(...serie)*0.1, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
  }

  var dailySalesChart = new Chartist.Line('#dailySalesChart2', dataDailySalesChart, optionsDailySalesChart);

  this.startAnimationForLineChart(dailySalesChart);
}

  startAnimationForLineChart(chart){
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function(data) {
      if(data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if(data.type === 'point') {
            seq++;
            data.element.animate({
              opacity: {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
    });

    seq = 0;
};

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= this.breakpointWidth) ? 3 : 5;
    this.breakpointRig =  (window.innerWidth <= this.breakpointWidth) ? 7 : 8;
    this.dashboardClass = this.breakpoint > 3 ? 'dashboard' : 'dashboard-smartphone' ;
    this.loadDashboard();
    setInterval(() => this.loadDashboard(), 60000);
  }
  

  loadDashboard() {
    this.clearTotal()
    this.getInfosBtcAddress();
  }

  getAverages() {
    this.niceHashService.getAverageProfit().subscribe({
      next: value => {
        var profit = <Avg>value
        this.averageProfit.next(profit.value.toString().substring(0,8))
        var btc = Number(this.averageProfit.getValue())
        var eurosBtc = 1/this.changeRate.getValue()
        this.averageProfitEuros.next(btc*eurosBtc)
      },error: err => {
        console.log("Erreur communication bdd : "+err)
      }
    })

    this.niceHashService.getAverageHashrate().subscribe({
      next: value => {
        var hashrate = <Avg>value
        this.averageHashrate.next(Number(hashrate.value))
      },error: err => {
        console.log("Erreur communication bdd : "+err)
      }
    })
  }

  getStatsProfit(time) {
    this.niceHashService.getProfitStats("global").subscribe({
      next: value => {
        var profitStats = <result>value
        var serie = profitStats.result.map( row => row.value).map( str => Number(str)).map( btc => btc*(1/this.changeRate.getValue())).reverse()
        var labels = profitStats.result.map( row => row.timestamp).reverse()
        this.profitChart(serie,labels,time);
        this.chartTime.next(time)
      },error: err => {
        console.log("Erreur communication bdd stats  profit : "+err)
      }
    })
  }

  getStatsHashrate(time) {  
    this.niceHashService.getHashrateStats("global").subscribe({
      next: value => {
        var hashrateStats = <result>value
        var serie = hashrateStats.result.map( row => row.value).map( str => Number(str)).reverse()
        var labels = hashrateStats.result.map( row => row.timestamp).reverse()
        this.hashrateChart(serie,labels,time);
        this.chartTimeHashrate.next(time)
      },error: err => {
        console.log("Erreur communication bdd stats hashrate : "+err)
      }
    })
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
        var next = new Date(this.results.nextPayoutTimestamp).getTime()/1000
        var now = new Date().getTime()/1000
        var remainingTime = next - now
        var hours = remainingTime/3600
        var minutes  = 60 - new Date().getUTCMinutes()
        this.nextPayout.next(hours.toString().split(".")[0]+"h "+minutes+" m")
        this.devicesMining.next(this.results.devicesStatuses.MINING)
        this.rigMining.next(this.results.minerStatuses.MINING)
        this.rigOffline.next(this.results.minerStatuses.OFFLINE)
        if(this.results.devicesStatuses.OFFLINE>0){
          this.devicesOffline.next(this.results.devicesStatuses.OFFLINE)
        }else{
          this.devicesOffline.next(this.results.devicesStatuses.OFFLINE)
        }
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
              if(device === undefined){
                this.pTotal.next(this.pTotal.getValue()+0)
                this.hTotal.next(this.hTotal.getValue()+0)
                this.eTotal.next(this.eTotal.getValue()+0)  
              }else if(device.powerUsage > 0 && device.speeds[0] != undefined && device.status.enumName === "MINING"){
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
      },
      complete: () => {
        this.getChangeRate();
        this.getChangeRateEth();
      }
    })
  }

  getChangeRate(){
    this.niceHashService.getChangeRate().subscribe({
      next: value => {
        this.changeRate.next(<number>value['EUR'])
        this.euros.next((this.profitability.getValue()/this.changeRate.getValue()))
        var revenue = this.euros.getValue() - this.eTotal.getValue()
        this.revenues.next(Number(revenue.toFixed(2)))
        this.unpaidEuros.next((Number(this.unpaidAmount.getValue())/this.changeRate.getValue()).toFixed(2))
        this.eurosMonth.next(this.euros.getValue()*30)
        this.eurosWeek.next(this.euros.getValue()*7)
        this.eurosYear.next((this.euros.getValue()*30)*12)
        this.profitabilityEuros.next((this.profitability.getValue()/this.changeRate.getValue()).toFixed(2))
        this.balance.next((this.balanceBTC.getValue()/this.changeRate.getValue()).toFixed(2))
      },
      error: err => {
        console.log("Erreur communication api change rate : "+err)
      }
      ,complete: () => {
        this.getAverages();
        this.getStatsProfit(this.chartTime.getValue())
        this.getStatsHashrate(this.chartTimeHashrate.getValue())
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
      }
    })
  }
}
