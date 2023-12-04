import { Component } from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {HttpClientModule} from "@angular/common/http";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TW-Frontend';

  constructor(private authService: AuthenticationService, ) {
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
