import { Component, OnInit } from '@angular/core';
import { UserService } from '../../common/service/user.service';
import { IUser, IUserAccount, IUserDebt, IUserSaving } from '../../common/interface/common';
import { NavigationService } from '../../common/service/navigation.service';
import { FinanceService } from '../../common/service/finance.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  user!: IUser;
  totalIncome: number = 0;
  numberOfIncome: number = 1;
  fixedExpenses: number = 0;
  numberOfExpenses: number = 0;
  debtBalance: number = 0;
  numberOfDebts: number = 0;
  numberOfLends: number = 0;
  totalSaving: number = 0;
  lastMonthSaving: number = 0;
  currentBalance: number = 50000;
  userAccounts: IUserAccount[] = [];
  userSubscribtions: any[] = [];
  userDebts: IUserDebt[] =[];
  userSavings: IUserSaving[] = [];

  constructor(
    private userService: UserService, 
    private navigationService: NavigationService,
    private financeService: FinanceService
  ) { }

  ngOnInit(): void {
    this.navigationService.activeNavOption = 'dashboard';
    this.userService.getUserFromLocalstorage();
    this.user = this.userService.user;
    this.totalIncome = this.user.income;

    forkJoin({
      accounts: this.userService.getAllUserAccounts(),
      subscriptions: this.financeService.getAllSubscription(),
      debts: this.financeService.getAllDebts(),
      savings: this.financeService.getAllSavings()
    }).subscribe({
      next: response => {
        this.userAccounts = response.accounts.data ?? [];
        this.userSubscribtions = response.subscriptions.data ?? [];
        this.userDebts = response.debts.data ?? [];
        this.userSavings = response.savings.data ?? [];

        this.cardCalculations();
        this.currentBalanceCalculation();
      },
      error: error => {
        console.log(error.error.message);
      }
    })
  }

  cardCalculations(){
    // Fixed Expenses card
    this.fixedExpenses = 0;
    this.numberOfExpenses = 0;
    for(let item of this.userSubscribtions){
      this.fixedExpenses = this.fixedExpenses + Number(item.sub_amount);
      this.numberOfExpenses = this.numberOfExpenses + 1;
    }

    // Active Debt/Lend card
    this.debtBalance = 0;
    this.numberOfDebts = 0;
    this.numberOfLends = 0;
    for(let item of this.userDebts){
      if(item.type == 'debtor'){
        this.debtBalance = this.debtBalance + Number(item.amount);
        this.numberOfDebts = this.numberOfDebts + 1;
      }
      else{
        this.debtBalance = this.debtBalance - Number(item.amount);
        this.numberOfLends = this.numberOfLends + 1;
      }
    }

    // Total Savings card 
    this.totalSaving = 0;
    const activeMonth = new Date().getMonth() + 1;
    console.log(activeMonth);
    for(let item of this.userSavings){
      this.totalSaving = this.totalSaving + Number(item.saving_amount);

      const dbDateMonth = new Date(item.created_at).getMonth() + 1;
      if(dbDateMonth < activeMonth){
        this.lastMonthSaving = this.lastMonthSaving + Number(item.saving_amount);
      }
    }
  }

  currentBalanceCalculation(){
    const today = new Date();
    let dbdate;

    console.log(this.userSubscribtions);

    for(let item of this.userSubscribtions){
      if(item.status == 'active'){
        dbdate = new Date(item.sub_date);

        if(dbdate.getDate() + 1 <= today.getDate() + 1){
          this.currentBalance = this.currentBalance - item.sub_amount;
        }
      }
    }
  }
}
