import { Component, OnInit } from '@angular/core';
import { UserService } from '../../common/service/user.service';
import { IUserAccount, IUserDebt, IUserSaving } from '../../common/interface/common';
import { NavigationService } from '../../common/service/navigation.service';
import { FinanceService } from '../../common/service/finance.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  totalIncome: number = 70000;
  numberOfIncome: number = 2;
  fixedExpenses: number = 0;
  numberOfExpenses: number = 0;
  debtBalance: number = 0;
  numberOfDebts: number = 0;
  totalSaving: number = 0;
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
      },
      error: error => {
        console.log(error.error.message);
      }
    })
  }

  cardCalculations(){
    // Fixed Expenses
    this.fixedExpenses = 0;
    this.numberOfExpenses = 0;
    for(let item of this.userSubscribtions){
      this.fixedExpenses = this.fixedExpenses + Number(item.sub_amount);
      this.numberOfExpenses = this.numberOfExpenses + 1;
    }

    // Active Debt/Lend
    this.debtBalance = 0;
    this.numberOfDebts = 0;
    for(let item of this.userDebts){
      if(item.type == 'debtor'){
        this.debtBalance = this.debtBalance + Number(item.amount);
      }
      else{
        this.debtBalance = this.debtBalance - Number(item.amount);
      }
      this.numberOfDebts = this.numberOfDebts + 1;
    }

    // Total Savings
    this.totalSaving = 0;
    for(let item of this.userSavings){
      this.totalSaving = this.totalSaving + Number(item.saving_amount);
    }
  }
}
