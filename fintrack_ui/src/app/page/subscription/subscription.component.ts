import { Component } from '@angular/core';
import { IAddSubscriptionReqBody, IAddSubscriptionResBody } from '../../common/interface/common';
import { NavigationService } from '../../common/service/navigation.service';
import { FinanceService } from '../../common/service/finance.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent {
  userSubscriptions: IAddSubscriptionResBody[] = [];
  isAddSubscription: boolean = false;

  subscriptionForm: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    sub_amount: new FormControl<number | null>(null),
    sub_date: new FormControl<Date | null>(null),
    start_date: new FormControl<Date | null>(null),
    end_date: new FormControl<Date | null>(null)
  })

  constructor(
    private navigationService: NavigationService,
    private financeService: FinanceService
  ){ }

  ngOnInit(): void {
    this.navigationService.activeNavOption = 'emisubscriptions';
    this.getAllSubscriptions();
  }

  getAllSubscriptions() {
    this.financeService.getAllSubscription().subscribe(response => {
      this.userSubscriptions = response.data ?? [];
    })
  }

  addNewSubscriptions() {
    const reqBody: IAddSubscriptionReqBody = this.subscriptionForm.value;

    this.financeService.addNewSubscriptions(reqBody).subscribe(response => {
      console.log(response.data);
      this.getAllSubscriptions();
      this.isAddSubscription = false;
    })
  }

  showAddSubscription() {
    this.isAddSubscription = true;
  }
  cancelForm() {
    this.isAddSubscription = false;
  }
}
