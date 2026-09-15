import { Component } from '@angular/core';
import { IAddSubscriptionReqBody, ISubscription, IUserAccount } from '../../common/interface/common';
import { NavigationService } from '../../common/service/navigation.service';
import { FinanceService } from '../../common/service/finance.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ChartConfiguration, ChartData } from 'chart.js';
import { UserService } from '../../common/service/user.service';
import { TSubscriptionStatus } from '../../common/interface/type';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent {
  userSubscriptions: ISubscription[] = [];
  userAccounts: IUserAccount[] = [];
  isAddSubscription: boolean = false;
  totalSubsCost: number = 0;
  maxSubsGoal: number = 20000;

  subscriptionStatus: { label: string; value: TSubscriptionStatus }[] = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Paused', value: 'paused' }
  ]

  subscriptionForm: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    account_id: new FormControl<number>(0),
    sub_amount: new FormControl<number | null>(null),
    sub_date: new FormControl<Date | null>(null),
    start_date: new FormControl<Date | null>(null),
    end_date: new FormControl<Date | null>(null),
    status: new FormControl<TSubscriptionStatus>('active')
  });

  public pieChartData: ChartData<'pie'> = {
    // labels: ['Subs Total', 'Amount left'],
    datasets: [
      { data: [this.totalSubsCost, (this.maxSubsGoal - this.totalSubsCost)] }
    ]
  };
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  constructor(
    private navigationService: NavigationService,
    private financeService: FinanceService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.navigationService.activeNavOption = 'emisubscriptions';
    this.getAllSubscriptions();
    this.getAllUserAccounts();
  }

  getAllSubscriptions() {
    this.financeService.getAllSubscription().subscribe(response => {
      this.userSubscriptions = response.data ?? [];
      this.calculateTotalSubCost();
      this.pieChartData = {
        datasets: [
          { data: [this.totalSubsCost, (this.maxSubsGoal - this.totalSubsCost)] }
        ]
      }
    })
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

  addNewSubscriptions() {
    const reqBody: IAddSubscriptionReqBody = this.subscriptionForm.value;

    this.financeService.addNewSubscriptions(reqBody).subscribe(response => {
      console.log(response.data);
      this.getAllSubscriptions();
      this.isAddSubscription = false;
    })
  }

  calculateTotalSubCost() {
    this.totalSubsCost = 0;
    for (let item of this.userSubscriptions) {
      this.totalSubsCost = this.totalSubsCost + Number(item.sub_amount);
    }
  }

  showAddSubscription() {
    this.isAddSubscription = true;
  }
  cancelForm() {
    this.isAddSubscription = false;
  }
}
