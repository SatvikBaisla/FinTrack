import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { IAddNewAccountRequestBody, IAddNewAccountResponseBody, IApiResponse, IGetAllAccountsRequestBody } from '../interface/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUserAccounts(){
    return this.http.get<IApiResponse<IGetAllAccountsRequestBody[]>>(`${environment.apiUrl}/user/accounts`);
  }
  addNewAccount(reqBody: IAddNewAccountRequestBody){
    return this.http.post<IApiResponse<IAddNewAccountResponseBody>>(`${environment.apiUrl}/user/accounts`, reqBody);
  }
}
