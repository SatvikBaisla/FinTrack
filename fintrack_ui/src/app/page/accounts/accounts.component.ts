import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TAccountTypes, TCardType } from '../../common/interface/type';
import { UserService } from '../../common/service/user.service';
import { ICard, ICardAddReqBody, IUpdateFundReqBody, IUser, IUserAccount } from '../../common/interface/common';
import { NavigationService } from '../../common/service/navigation.service';
import { FinanceService } from '../../common/service/finance.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit {
  userAccounts: IUserAccount[] = [];
  isAddAccountSection: boolean = false; 
  isAddFundSection: boolean = false;
  isCardSection: boolean = true;
  maxTransferLimit: number = 0;
  toAccountError: string = '';
  fromAccountError: string = '';
  amountError: string = '';
  userCards: ICard[] = [];
  user!: IUser;
  
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
  fundForm: FormGroup = new FormGroup({
    to_account_id: new FormControl<number>(0),
    from_account_id: new FormControl<number>(0),
    transfer_amount: new FormControl<number>(0)
  });
  cardForm: FormGroup = new FormGroup({
    account_id: new FormControl<number>(0),
    number: new FormControl<string>(''),
    type: new FormControl<TCardType>('debit'),
    ex_month: new FormControl<string>(''),
    ex_year: new FormControl<string>(''),
    pin: new FormControl<number>(123),
    note: new FormControl<string>(''),
    used_amount: new FormControl<number | null>(null),
    card_limit: new FormControl<number | null>(null)
  });
  cardType: { label: string, value: TCardType }[] = [
    { label: 'Credit Card', value: 'credit' },
    { label: 'Debit Card', value: 'debit' }
  ];
  
  constructor(
    private userService: UserService, 
    private navigationService: NavigationService,
    private financeService: FinanceService
  ) { }

  ngOnInit(): void {
    this.navigationService.activeNavOption = 'accounts';
    const userString = localStorage.getItem('user');
    if(userString) this.user = JSON.parse(userString);
    this.getAllUserAccounts();
    this.getAllCards();
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

  getAllCards() {
    this.financeService.getAllCards().subscribe(response => {
      this.userCards = response.data ?? [];
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

  updateTransferLimit(){
    const accountId = this.fundForm.value.fromAccountId;
    if(accountId != 0){
      for(let item of this.userAccounts){
        if(item.account_id == accountId){
          this.maxTransferLimit = item.current_balance;
        }
      }
    }
    else{
      this.maxTransferLimit = 0;
    }
  }

  checkFundForm(){
    if(this.fundForm.value.to_account_id == 0){
      this.toAccountError = 'Please select a account.'
    }
    else{
      this.toAccountError = ''
    }

    if(this.fundForm.value.from_account_id == this.fundForm.value.to_account_id){
      this.fromAccountError = `Can't be same as to account`
    }
    else{
      this.fromAccountError = ''
    }

    if(this.fundForm.value.transfer_amount == 0){
      this.amountError = `Transfer amount can't be 0`;
    }
    else{
      this.amountError = ''
    }
  }

  updateFund(){
    if(this.toAccountError != '' || this.fromAccountError != '' || this.amountError != '') return;
    
    const reqBody: IUpdateFundReqBody = {
      to_account_id: this.fundForm.value.to_account_id,
      from_account_id: this.fundForm.value.from_account_id,
      transfer_amount: this.fundForm.value.transfer_amount
    }
    this.financeService.updateFund(reqBody).subscribe(response => {
      console.log(response.data);
      this.isAddFundSection = false;
      this.getAllUserAccounts();
    })
  }

  addNewCard() {
    const reqBody: ICardAddReqBody = {
      account_id: this.cardForm.value.account_id,
      card_number: this.cardForm.value.number,
      card_type: this.cardForm.value.type,
      ex_month: this.cardForm.value.ex_month,
      ex_year: this.cardForm.value.ex_year,
      pin: this.cardForm.value.pin,
      note: this.cardForm.value.note,
      used_amount: this.cardForm.value.used_amount == null ? 0 : this.cardForm.value.used_amount,
      card_limit: this.cardForm.value.card_limit
    }

    this.financeService.addNewCard(reqBody).subscribe(response => {
      this.getAllCards();
      this.isCardSection = false;
    })
  }

  formatCardNumber(number: string): string {
    return number.replace(/(.{4})/g, '$1 ').trim();
  }

  showAddAccountSection() {
    this.isAddAccountSection = true;
  }
  cancelForm() {
    this.isAddAccountSection = false;
  }
}
