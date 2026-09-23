import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISubscription, IApiResponse, IUserDebt, IUserDebtReqBody, IUserSaving, IAddSavingReqBody, IUpdateFundReqBody, IUserAccount, ICard, ICardAddReqBody } from '../interface/common';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private http: HttpClient) { }

  // subscriptions
  getAllSubscription() {
    return this.http.get<IApiResponse<ISubscription[]>>(`${environment.apiUrl}/finance/subscription`);
  }

  addNewSubscriptions(reqBody: any) {
    return this.http.post<IApiResponse<ISubscription>>(`${environment.apiUrl}/finance/subscription`, reqBody);
  }

  // debts
  getAllDebts() {
    return this.http.get<IApiResponse<IUserDebt[]>>(`${environment.apiUrl}/finance/debts`);
  }
  addNewDebt(reqBody: IUserDebtReqBody) {
    return this.http.post<IApiResponse<IUserDebt>>(`${environment.apiUrl}/finance/debts`, reqBody)
  }

  // savings
  getAllSavings() {
    return this.http.get<IApiResponse<IUserSaving[]>>(`${environment.apiUrl}/finance/savings`);
  }
  addSaving(reqBody: IAddSavingReqBody){
    return this.http.post<IApiResponse<any>>(`${environment.apiUrl}/finance/savings`, reqBody);
  }

  // funds
  updateFund(reqBody: IUpdateFundReqBody){
    return this.http.put<IApiResponse<IUserAccount>>(`${environment.apiUrl}/finance/funds`, reqBody);
  }

  // cards
  getAllCards() {
    return this.http.get<IApiResponse<ICard[]>>(`${environment.apiUrl}/user/cards`);
  }
  addNewCard(reqBody: ICardAddReqBody) {
    return this.http.post<IApiResponse<ICard>>(`${environment.apiUrl}/user/cards`, reqBody);
  }
}
