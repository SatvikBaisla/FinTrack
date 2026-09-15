import { Component, OnInit } from '@angular/core';
import { IUserSaving } from '../../common/interface/common';
import { TAccountTypes } from '../../common/interface/type';
import { NavigationService } from '../../common/service/navigation.service';
import { FinanceService } from '../../common/service/finance.service';

@Component({
  selector: 'app-saving',
  templateUrl: './saving.component.html',
  styleUrl: './saving.component.css'
})
export class SavingComponent implements OnInit{
  userSavings: IUserSaving[] = [];
  isAddSection: boolean = true;

  accountTypes: { value: TAccountTypes; label: string }[] = [
    { value: 'cash', label: 'Cash' },
    { value: 'bank', label: 'Bank' },
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'wallet', label: 'Wallet' }
  ];

  constructor(
    private navigationService: NavigationService,
    private financeService: FinanceService
  ) { }

  ngOnInit(): void {
    this.navigationService.activeNavOption = 'savings';
    this.getAllSavings();
  }

  getAllSavings() {
    this.financeService.getAllSavings().subscribe(response => {
      this.userSavings = response.data ?? [];
    })
  }

  showAddSection() {
    this.isAddSection = true;
  }
  cancelForm() {
    this.isAddSection = false;
  }
}
