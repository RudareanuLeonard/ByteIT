import { Injectable } from '@angular/core';
import {Alert} from "../entities/alert";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alert$ = new Subject<Alert>();

  constructor() { }

  setAlert(alert: Alert): void{
    this.alert$.next(alert);
  }

  getAlert(): Observable<Alert>{
    return this.alert$.asObservable();
  }

}
