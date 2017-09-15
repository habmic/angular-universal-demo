import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor() {
    let str = '123';
    console.time('angular-load');
    for (let i = 0; i < 9999999; i++) {
      str += '123';
    }
    console.timeEnd('angular-load');
  }
}
