import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  activeMonths: string[] = [];
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);

  constructor() { }

  monthSelected(month: string): void {
    const index = this.activeMonths.indexOf(month);
    if (index > -1) {
      this.activeMonths.splice(index, 1);
    } else {
      this.activeMonths.push(month);
    }
    console.log('Active Months: ' + this.activeMonths);
  }
}
