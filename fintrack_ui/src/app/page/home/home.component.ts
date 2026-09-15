import { Component, OnInit } from '@angular/core';
import { UserService } from '../../common/service/user.service';
import { IUserAccount } from '../../common/interface/common';
import { FormControl, FormGroup } from '@angular/forms';
import { TAccountTypes } from '../../common/interface/type';
import { NavigationService } from '../../common/service/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  activeMonths: string[] = [];
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  userAccounts: IUserAccount[] = [];

  selectedAccount: any = {
    account_id: 0,
    name: '',
    ref_number: '',
    type: 'cash',
    opening_balance: 0,
    current_balance: 0
  }

  addAccountForm: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    type: new FormControl<TAccountTypes>('cash'),
    opening_balance: new FormControl<number>(0),
    current_balance: new FormControl<number>(0)
  })

  accountTypes: { value: TAccountTypes; label: string }[] = [
    { value: 'cash', label: 'Cash' },
    { value: 'bank', label: 'Bank' },
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'wallet', label: 'Wallet' }
  ];

  constructor(private userService: UserService, private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.navigationService.activeNavOption = 'dashboard';
    this.getAllUserAccounts();
  }

  getAllUserAccounts() {
    this.userService.getAllUserAccounts().subscribe({
      next: response => {
        this.userAccounts = response.data ?? [];
      },
      error: error => {
        console.log(error.error.message);
      }
    })
  }

  monthSelected(month: string): void {
    const index = this.activeMonths.indexOf(month);
    if (index > -1) {
      this.activeMonths.splice(index, 1);
    } else {
      this.activeMonths.push(month);
    }
    console.log('Active Months: ' + this.activeMonths);
  }

  addNewAccount(){
    const reqBody = this.addAccountForm.value;
    console.log(reqBody);

    this.userService.addNewAccount(reqBody).subscribe(response => {
      if(!response.success) return console.log(response.message);

      this.getAllUserAccounts();
    })
  }
}
