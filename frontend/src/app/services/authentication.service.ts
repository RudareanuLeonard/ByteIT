import {Injectable} from '@angular/core';
import {User} from "../entities/user";
import {Subscriptions} from "../enums/subscriptions";
import {Levels} from "../enums/levels";

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

  authenticateUser(fullname: string, username: string, email: string){
    let loggedUser:User = {
      id:1,
      username:username,
      name:fullname,
      email:email,
      subscription:Subscriptions.NONE,
      level:Levels.BEGINNER,
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


