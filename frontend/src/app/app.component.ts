import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'TW-Frontend';

  currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
  constructor() {

  }


  ngOnInit(): void {
    if (this.currentTheme) {
      document.documentElement.setAttribute('data-theme', this.currentTheme);
    }
  }






}
