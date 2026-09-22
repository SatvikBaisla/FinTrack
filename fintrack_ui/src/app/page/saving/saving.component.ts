import { Component, OnInit } from '@angular/core';
import { IAddSaving, IUserAccount, IUserSaving } from '../../common/interface/common';
import { NavigationService } from '../../common/service/navigation.service';
import { FinanceService } from '../../common/service/finance.service';
import { UserService } from '../../common/service/user.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-saving',
  templateUrl: './saving.component.html',
  styleUrl: './saving.component.css'
})
export class SavingComponent implements OnInit{
  userSavings: IUserSaving[] = [];
  isAddSection: boolean = false;
  userAccounts: IUserAccount[] = [];

  addSavingForm: FormGroup = new FormGroup({
    account_id: new FormControl<number>(0),
    amount: new FormControl<number>(0)
  })

  constructor(
    private navigationService: NavigationService,
    private financeService: FinanceService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.navigationService.activeNavOption = 'savings';
    this.getAllSavings();
    this.getUserAccounts();
  }

  getAllSavings() {
    this.financeService.getAllSavings().subscribe(response => {
      this.userSavings = response.data ?? [];
    })
  }

  getUserAccounts(){
    this.userService.getAllUserAccounts().subscribe(response => {
      this.userAccounts = response.data ?? [];
    })
  }

  addNewSaving(){
    const reqBody: IAddSaving = {
      account_id: this.addSavingForm.value.account_id,
      amount: this.addSavingForm.value.amount
    };

    this.financeService.addSaving(reqBody).subscribe(response => {
      console.log(response.data);
      this.getAllSavings();

      this.addSavingForm.setValue({
        account_id: 0,
        amount: 0
      })

      this.isAddSection = false;
    })
  }

  showAddSection() {
    this.isAddSection = true;
  }
  cancelForm() {
    this.isAddSection = false;
  }
}
