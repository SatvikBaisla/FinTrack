import { Injectable } from '@angular/core';
import { TNavOptions } from '../interface/type';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  activeNavOption: TNavOptions = 'dashboard';
  constructor() { }
}
