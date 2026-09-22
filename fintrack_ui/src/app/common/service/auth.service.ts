import { HttpClient } from '@angular/common/http';
import { AbstractType, Injectable } from '@angular/core';
import { IApiResponse, ILoginRequestBody, ILoginResponseBody, IRegisterRequestBody, IRegisterResponseBody } from '../interface/common';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  userLogin(requestBody: ILoginRequestBody) {
    return this.http.post<IApiResponse<ILoginResponseBody>>(`${environment.apiUrl}/auth/login`, requestBody);
  }

  userRegister(requestBody: IRegisterRequestBody) {
    return this.http.post<IApiResponse<IRegisterResponseBody>>(`${environment.apiUrl}/auth/register`, requestBody);
  }
}
