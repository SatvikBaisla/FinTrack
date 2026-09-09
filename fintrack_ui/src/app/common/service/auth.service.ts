import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse, ILoginRequestBody, ILoginResponseBody } from '../interface/common';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  userLogin(requestBody: ILoginRequestBody) {
    return this.http.post<IApiResponse<ILoginResponseBody>>(`${environment.apiUrl}/auth/login`, requestBody);
  }
}
