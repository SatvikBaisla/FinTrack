import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './page/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './page/home/home.component';
import { RegisterComponent } from './page/register/register.component';
import { UpdateComponent } from './page/update/update.component';
import { SidenavComponent } from './common/component/sidenav/sidenav.component';
import { AccountsComponent } from './page/accounts/accounts.component';
import { PagingComponent } from './common/component/paging/paging.component';
import { SubscriptionComponent } from './page/subscription/subscription.component';
import { BaseChartDirective } from 'ng2-charts';
import { DebtsComponent } from './page/debts/debts.component';
import { SavingComponent } from './page/saving/saving.component';
import { SettingsComponent } from './page/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    UpdateComponent,
    SidenavComponent,
    AccountsComponent,
    PagingComponent,
    SubscriptionComponent,
    DebtsComponent,
    SavingComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BaseChartDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
