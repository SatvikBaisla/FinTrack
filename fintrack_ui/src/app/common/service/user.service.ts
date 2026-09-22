import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { IAddNewAccountRequestBody, IApiResponse, IUser, IUserAccount } from '../interface/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user!: IUser;

  constructor(private http: HttpClient) { }

  getUserFromLocalstorage(){
    const userString = localStorage.getItem('user');
    if(userString) this.user = JSON.parse(userString);
  }

  getAllUserAccounts(){
    return this.http.get<IApiResponse<IUserAccount[]>>(`${environment.apiUrl}/user/accounts`);
  }
  addNewAccount(reqBody: IAddNewAccountRequestBody){
    return this.http.post<IApiResponse<IUserAccount>>(`${environment.apiUrl}/user/accounts`, reqBody);
  }
}
