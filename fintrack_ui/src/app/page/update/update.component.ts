import { Component, OnInit } from '@angular/core';
import { TAccountTypes } from '../../common/interface/type';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../common/service/user.service';
import { IGetAllAccountsResponseBody, IUserAccount } from '../../common/interface/common';

type actionTypes = 'add' | 'edit';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit{
  selectedAction: string = 'Income Source';
  selectedRecord!: IUserAccount | null;
  activeAction: actionTypes = 'add';
  userAccounts: IGetAllAccountsResponseBody[] = [];

  actionList: string[] = [
    'Income Source',
    'Emi/Subscriptions',
    'Debt',
    'Saving',
    'Accounts'
  ];
  accountTypes: { value: TAccountTypes; label: string }[] = [
    { value: 'cash', label: 'Cash' },
    { value: 'bank', label: 'Bank' },
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'wallet', label: 'Wallet' }
  ];

  addAccountForm: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    type: new FormControl<TAccountTypes>('cash'),
    opening_balance: new FormControl<number>(0),
    current_balance: new FormControl<number>(0)
  });

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.selectedRecord = null;
  }

  actionClicked(action: string) {
    this.selectedAction = action;
    if (action == 'Accounts') {
      this.getAllUserAccounts();
    }
  }

  recordClicked(record: any) {
    this.activeAction = 'edit';
    this.selectedRecord = record;
    console.log(this.selectedRecord);

    if (this.selectedAction == 'Accounts') {
      this.addAccountForm.setValue({
        name: record.name,
        type: record.type,
        opening_balance: record.opening_balance,
        current_balance: record.current_balance
      });
    }
  }

  clearRecord() {
    this.selectedRecord = null;
    this.activeAction = 'add';

    if (this.selectedAction == 'Accounts') {
      this.addAccountForm.setValue({
        name: '',
        type: 'cash',
        opening_balance: 0,
        current_balance: 0
      });
    }
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
    })
  }
}
