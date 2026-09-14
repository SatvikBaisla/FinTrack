import { Component } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrl: './paging.component.css'
})
export class PagingComponent {
  activePage: number = 1;

  pageList: number[] = [1, 2, 3, 4, 5];

  changePage(action: string, pageNo?: number) {
    if (action == '' && pageNo) {
      this.activePage = pageNo;
    }
    else if (action == 'in' && this.activePage < this.pageList.length) {
      this.activePage++;
    }
    else if (action == 'de' && this.activePage > 1) {
      this.activePage--;
    }
  }
}
