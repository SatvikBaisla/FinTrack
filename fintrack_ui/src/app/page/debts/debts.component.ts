import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IUserDebt, IUserDebtReqBody } from '../../common/interface/common';
import { TDebtType } from '../../common/interface/type';
import { NavigationService } from '../../common/service/navigation.service';
import { FinanceService } from '../../common/service/finance.service';

@Component({
  selector: 'app-debts',
  templateUrl: './debts.component.html',
  styleUrl: './debts.component.css'
})
export class DebtsComponent implements OnInit {
  userDebts: IUserDebt[] = [];
  isAddSection: boolean = false;

  numberDebtorLender: number = 0;
  numberDebtor: number = 0;
  numberLender: number = 0;
  debtorTotal: number = 0;
  lenderTotal: number = 0;

  debtTypes: { value: TDebtType; label: string }[] = [
    { value: 'lender', label: 'Lender' },
    { value: 'debtor', label: 'Debtor' }
  ];

  addDebtForm: FormGroup = new FormGroup({
    person_name: new FormControl<string>(''),
    type: new FormControl<TDebtType>('lender'),
    amount: new FormControl<number | null>(null),
    date: new FormControl<Date | null>(null),
    end_date: new FormControl<Date | null>(null)
  })

  constructor(private financeService: FinanceService, private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.navigationService.activeNavOption = 'debt';
    this.getAllDebts();
  }

  getAllDebts() {
    this.financeService.getAllDebts().subscribe(response => {
      this.userDebts = response.data ?? [];
      this.calculateInfo();
    });
  }

  addNewDebt() {
    const reqBody: IUserDebtReqBody = {
      person_name: this.addDebtForm.value.person_name,
      type: this.addDebtForm.value.type,
      amount: this.addDebtForm.value.amount,
      date: this.addDebtForm.value.date,
      end_date: this.addDebtForm.value.end_date
    };

    this.financeService.addNewDebt(reqBody).subscribe(response => {
      console.log(response.data);
      this.isAddSection = false;
      this.getAllDebts();
    });
  }

  calculateInfo() {
    this.numberDebtorLender = 0;
    this.numberDebtor = 0;
    this.numberLender = 0;
    this.debtorTotal = 0;
    this.lenderTotal = 0;

    for (let item of this.userDebts) {
      if (item.type == 'debtor') {
        this.numberDebtor++;
        this.debtorTotal = this.debtorTotal + Number(item.amount);
      }
      else if (item.type == 'lender') {
        this.numberLender++;
        this.lenderTotal = this.lenderTotal + Number(item.amount);
      }
      else {
        console.log('something went wrong in debts/calculateInfo fn');
      }
    }

    this.numberDebtorLender = this.numberDebtor + this.numberLender;
  }

  showAddSection() {
    this.isAddSection = true;
  }
  cancelForm() {
    this.isAddSection = false;
  }
}
