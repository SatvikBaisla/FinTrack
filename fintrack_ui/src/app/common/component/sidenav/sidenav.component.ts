import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TNavOptions } from '../../interface/type';
import { NavigationService } from '../../service/navigation.service';

interface INavItems {
  name: TNavOptions;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit{
  activeNavOption!: TNavOptions;
  navItems: INavItems[] = [
    {
      name: 'dashboard',
      label: 'Dashboard',
      icon: 'fa-th-large'
    },
    {
      name: 'accounts',
      label: 'Accounts',
      icon: 'fa-users'
    },
    {
      name: 'goals',
      label: 'Goals',
      icon: 'fa-pie-chart'
    },
    {
      name: 'emisubscriptions',
      label: 'Emi/Subscriptions',
      icon: 'fa-credit-card'
    },
    {
      name: 'debt',
      label: 'Debt',
      icon: 'fa-handshake'
    },
    {
      name: 'savings',
      label: 'Savings',
      icon: 'fa-university'
    },
    {
      name: 'settings',
      label: 'Settings',
      icon: 'fa-cogs'
    }
  ];

  constructor(private router: Router, private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.activeNavOption = this.navigationService.activeNavOption;
  }
  
  changeOption(option: string) {
    switch (option) {
      case 'dashboard':
        this.activeNavOption = option;
        this.router.navigate(['/home']);
        break;
      case 'accounts':
        this.activeNavOption = option;
        this.router.navigate(['/account']);
        break;
      case 'goals':
        this.activeNavOption = option;
        break;
      case 'emisubscriptions':
        this.activeNavOption = option;
        this.router.navigate(['/emisubscription']);
        break;
      case 'debt':
        this.activeNavOption = option;
        break;
      case 'savings':
        this.activeNavOption = option;
        break;
      case 'settings':
        this.activeNavOption = option;
        break;
      default:
        console.log('No nav option found');
        break;
    }
  }
}
