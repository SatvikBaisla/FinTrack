import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../common/service/navigation.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit{
  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.navigationService.activeNavOption = 'settings';
  }
}
