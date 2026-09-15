import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TAccountTypes } from '../../common/interface/type';
import { UserService } from '../../common/service/user.service';
import { IUserAccount } from '../../common/interface/common';
import { NavigationService } from '../../common/service/navigation.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit {
  userAccounts: IUserAccount[] = [];
  isAddAccountSection: boolean = false; 
  
  accountTypes: { value: TAccountTypes; label: string }[] = [
    { value: 'cash', label: 'Cash' },
    { value: 'bank', label: 'Bank' },
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'wallet', label: 'Wallet' }
  ];
  
  addAccountForm: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    ref_number: new FormControl<string>(''),
    type: new FormControl<TAccountTypes>('cash'),
    opening_balance: new FormControl<number>(0),
    current_balance: new FormControl<number>(0)
  });
  
  constructor(private userService: UserService, private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.navigationService.activeNavOption = 'accounts';
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

  addNewAccount(){
    const reqBody = this.addAccountForm.value;
    console.log(reqBody);

    this.userService.addNewAccount(reqBody).subscribe(response => {
      if(!response.success) return console.log(response.message);

      this.getAllUserAccounts();
      this.isAddAccountSection = false;
    })
  }

  showAddAccountSection() {
    this.isAddAccountSection = true;
  }
  cancelForm() {
    this.isAddAccountSection = false;
  }
}
