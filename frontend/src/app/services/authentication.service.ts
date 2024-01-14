import {Injectable} from '@angular/core';
import {User} from "../entities/user";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn = false;
  // @ts-ignore
  private _loggedUser: any = JSON.parse(localStorage.getItem("loggedUser"));
  constructor() { }

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

  authenticateUser(fullname: string, username: string, email: string, subscription: number, level: number){
    let loggedUser:User = {
      id:1,
      username:username,
      name:fullname,
      email:email,
      subscription:subscription,
      level:level,
      pictureUrl:"https://robohash.org/hehehe?bgset=bg1"
    }
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem("loggedUser");
    // this.notificationService.showDefaultNotification("Logged out successfully")
  }
}


