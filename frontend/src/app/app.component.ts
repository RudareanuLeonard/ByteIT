import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'TW-Frontend';

  currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;


  checkedTheme!: boolean;
  constructor(private authService: AuthenticationService) {

  }

  ngOnInit(): void {



    if (this.currentTheme) {
      document.documentElement.setAttribute('data-theme', this.currentTheme);
      this.checkedTheme = this.currentTheme != "dark";

    }

  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // @ts-ignore
  switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light'); //add this
      console.log("light");
    }
    else {

      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark'); //add this
      console.log("dark");
    }
  }





}
