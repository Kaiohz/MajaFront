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

  changeRate: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  results:WithdrawalAdresses
  oResults: BehaviorSubject<ListEntity[]> = new BehaviorSubject<ListEntity[]>(null);
  breakpoint: number;
  dashboardClass: string = '';
  breakpointRig: number;
  breakpointWidth: number = 700;
  nbMiners: number = 5;
  private width = "400px"
  percentages = new Map<string, string>([
    ["a4fc30a2-1421-4df5-a15d-52c5dda66102", "0.11"],
    ["c3075fed-dd32-4dfb-9c52-3339e5c2bde1", "0.11"],
    ["b958eb07-77f6-4e7a-9cfd-b137a717a2cd","0.33"],
    ["b0f07a3b-0172-4802-9b3a-88703beb617a","0.11"],
    ["165c1ff4-fb2a-462a-92a8-51299ea5a8a6","0.33"]
]);
public wallet: BehaviorSubject<Number> = new BehaviorSubject<Number>(null);

  constructor(private niceHashService: NiceHashService,public dialog: MatDialog,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadDashboard();
    setInterval(() => this.loadDashboard(), 60000);
  }

  loadDashboard() {
    this.getWithdrawalAdresses()
    this.getChangeRate()

  }


  getChangeRate(){
    this.niceHashService.getChangeRate().subscribe({
      next: value => {
        this.changeRate.next(<number>value['EUR'])
      },
      error: err => {
        console.log("Erreur communication api change rate : "+err)
      }
    })
  }
  
 modalWithdrawal(id: String,changeRate: Number){
    this.dialog.open(DialogComponent,{
      width: this.width,
      data: {id: id,password: true, changeRate: changeRate, amount: 0} 
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
          }
        });
      }else{
        this.snackBar.open(MESSAGES.WrongIdOrAmount,"",{duration: 2000} )
      }
    })
  }

  getWithdrawalAdresses(){
    this.niceHashService.getWithdrawalAdresses().subscribe({
      next: value => {       
        this.results = <WithdrawalAdresses>value;
        this.oResults.next(this.results.list.filter(l => this.percentages.has(l.id)))
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
