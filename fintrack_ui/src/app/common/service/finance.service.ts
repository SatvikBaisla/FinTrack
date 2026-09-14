import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAddSubscriptionResBody, IApiResponse } from '../interface/common';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private http: HttpClient) { }

  getAllSubscription() {
    return this.http.get<IApiResponse<IAddSubscriptionResBody[]>>(`${environment.apiUrl}/finance/subscription`);
  }

  addNewSubscriptions(reqBody: any) {
    return this.http.post<IApiResponse<IAddSubscriptionResBody>>(`${environment.apiUrl}/finance/subscription`, reqBody);
  }
}
