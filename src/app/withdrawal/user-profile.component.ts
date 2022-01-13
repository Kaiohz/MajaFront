import { Component, OnInit, Inject } from '@angular/core';
import { ListEntity, Wallet, WithdrawalAdresses } from 'app/app-nicehash.module';
import { MESSAGES } from 'app/enum/messages.enum';
import { NiceHashService } from 'app/services/nicehash.service';
import { BehaviorSubject } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  results:WithdrawalAdresses
  oResults: BehaviorSubject<ListEntity[]> = new BehaviorSubject<ListEntity[]>(null);
  breakpoint: number;
  dashboardClass: string = '';
  breakpointRig: number;
  breakpointWidth: number = 700;
  nbMiners: number = 5;
  private width = "400px"
  percentages = new Map<string, string>([
    ["e6db0a2f-d53a-4c61-afb5-d64604566691", "0.11"],
    ["467c788e-b2a3-4019-86d0-770512bb4296", "0.11"],
    ["f5b90c9b-5199-40fb-92cd-640eae600378","0.33"],
    ["85870226-6556-4ca2-8632-c2af430e8b96","0.11"],
    ["165c1ff4-fb2a-462a-92a8-51299ea5a8a6","0.33"]
]);
public wallet: BehaviorSubject<Number> = new BehaviorSubject<Number>(null);

  constructor(private niceHashService: NiceHashService,public dialog: MatDialog,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadDashboard();
    setInterval(() => this.loadDashboard(), 30000);
  }

  loadDashboard() {
    this.getWithdrawalAdresses()
  }

  
 modalWithdrawal(id: String){
    this.dialog.open(DialogComponent,{
      width: this.width,
      data: {str: "",password: true} 
    }).afterClosed().subscribe( result  => {
      var tempResult = <string>result
      var id = tempResult.split(";")[0]
      var amount = Number(tempResult.split(";")[1])
      if(id!==null && id!==undefined && amount!==null && amount!==undefined && amount>=0.0005){
        this.niceHashService.sendOrder(id,amount).subscribe({
          next: value => {       
          },
          error: err => {
            console.log("Erreur communication api : "+err)
            this.snackBar.open(MESSAGES.WithdrawalNOk,"",{duration: 2000} )
          },
          complete: () => {
            
          }
        });
      }else{
        this.snackBar.open(MESSAGES.WrongIdOrAmount,"",{duration: 2000} )
      }
    })
  }

  modalCron(){
    this.dialog.open(DialogComponent,{
      width: this.width,
      data: {str: "",login: true} 
    }).afterClosed().subscribe( result  => {
      if(result==="valid"){
        this.insertOrders()
      }
    })
  }

  getWithdrawalAdresses(){
    this.niceHashService.getWithdrawalAdresses().subscribe({
      next: value => {       
        this.results = <WithdrawalAdresses>value;
        this.oResults.next(this.results.list.filter(l => !this.percentages.has(l.id)))
      },
      error: err => {
        this.snackBar.open(MESSAGES.ApiBtcAddressFailed,"",{duration: 2000} )
        console.log("Erreur communication api : "+err)
      },
      complete: () => {
        //this.snackBar.open(MESSAGES.ApiBtcAddressSuccess,"",{ panelClass: "maja-ok-snack-bar",duration: 2000} )
      }
    });
  }

  insertOrders(){
    this.niceHashService.getInfosWallet().subscribe({
      next: value => {
        var wallet = <Wallet>value
        this.wallet.next(Number(wallet.totalBalance.substring(0,10)))
      },
      error: err => {
        console.log("Erreur communication api privée : "+err)
        this.snackBar.open(MESSAGES.ApiWalletFailed,"",{duration: 2000} )
      },
      complete: () => {
        var accounts = this.oResults.getValue();
        accounts.forEach(account => {
          var amount = Number(this.wallet.getValue())*Number(this.percentages.get(account.id))
          this.niceHashService.insertOrder(account.id,account.address,amount).subscribe({
            next: value => {     
              this.snackBar.open(MESSAGES.CronWithdrawalOk,"",{ panelClass: "maja-ok-snack-bar",duration: 2000} )
            },
            error: err => {
              this.snackBar.open(MESSAGES.CronWithdrawlNok,"",{duration: 2000} )
              console.log("Erreur communication api cron withdrawals "+err)
            },
            complete: () => {
              this.snackBar.open(MESSAGES.ApiBtcAddressSuccess,"",{ panelClass: "maja-ok-snack-bar",duration: 2000} )
            }
          });
        })
      }
    })
  }

}

export interface DialogData {
  id: string;
  amount: String;
  login: boolean;
  password: boolean;
}

@Component({
  selector: 'user-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {

  public hide = true;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  
}}
