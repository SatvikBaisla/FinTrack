import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, filter, finalize, switchMap, take, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../service/auth.service';

let isRefreshing: boolean = false;
const refreshTokenSubject$ = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const refreshUrl = `${environment.apiUrl}/auth/refreshtoken`;
  if (refreshUrl == req.url) {
    return next(req);
  }

  const accessToken = localStorage.getItem('access_token');
  const authReq = accessToken ? req.clone({ setHeaders: { Authorization: `Berear ${accessToken}` } }) : req;
  
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(authReq).pipe(
    catchError(error => {
      if (error.status !== 401) return throwError(() => error);

      if (!isRefreshing) {
        isRefreshing = true;
        refreshTokenSubject$.next(null); 

        return authService.refreshAccessToken().pipe(
          switchMap(response => {
            const newAccessToken = response.token;
            if (newAccessToken) {
              localStorage.setItem('access_token', newAccessToken);
              refreshTokenSubject$.next(newAccessToken);
            }
            return next(
              req.clone({ setHeaders: { Authorization: `Bearer ${newAccessToken}` }})
            );
          }),
          catchError(refreshError => {
            localStorage.removeItem('access_token');
            router.navigate(['/login']);
            return throwError(() => refreshError); 
          }),
          finalize(() => {
            isRefreshing = false;
          })
        );
      }

      return refreshTokenSubject$.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => {
          return next(
            req.clone({ setHeaders: { Authorization: `Bearer ${token}` }})
          );
        })
      );
    })
  );
};
