import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { RegisterComponent } from './page/register/register.component';
import { UpdateComponent } from './page/update/update.component';
import { AccountsComponent } from './page/accounts/accounts.component';
import { SubscriptionComponent } from './page/subscription/subscription.component';
import { DebtsComponent } from './page/debts/debts.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'account',
    component: AccountsComponent
  },
  {
    path: 'emisubscription',
    component: SubscriptionComponent
  },
  {
    path: 'update',
    component: UpdateComponent
  },
  {
    path: 'debts',
    component: DebtsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
