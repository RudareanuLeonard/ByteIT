import {Injectable} from '@angular/core';
import {User} from "../entities/user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn = false;
  // @ts-ignore
  private _loggedUser: any = JSON.parse(localStorage.getItem("loggedUser"));
  constructor(
    private http:HttpClient,
  ) { }

  isLoggedIn() {
    this.loggedIn = localStorage.getItem("loggedUser") != null;
    return this.loggedIn;
  }

  get loggedUser(): any {
    return this._loggedUser;
  }

  set loggedUser(value: any) {
    this._loggedUser = value;
  }

  authenticateUser(username: string){
    const url = "http://localhost/backend/user-settings.php?username=" + username;
    return this.http.get<any>(url);
  }

  getLoggedUser():Observable<User>{
    const username = this.loggedUser.username;
    const url = "http://localhost/backend/user-settings.php?username=" + username;
    return this.http.get<User>(url);
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem("loggedUser");
    // this.notificationService.showDefaultNotification("Logged out successfully")
  }

  getAllUsers(){
      const url = "http://localhost/backend/leaderboard.php";

      return this.http.get<any>(url);
  }

}


