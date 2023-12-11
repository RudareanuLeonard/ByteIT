import {Component, OnInit} from '@angular/core';
import {Alert} from "../entities/alert";
import {CommonModule} from "@angular/common";
import {AlertService} from "../services/alert.service";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  standalone:true,
  imports:[CommonModule]
})
export class AlertComponent implements OnInit{
  alert?:Alert
  timeout?: number

  constructor(private alertService: AlertService) {
  }
  ngOnInit(): void {
    this.alertService.getAlert().subscribe(alert =>{
      this.alert = alert;
      this.resetTimer();
    });
  }

  resetTimer(): void{
    if(this.timeout){
      window.clearTimeout(this.timeout)
    }
    this.timeout = window.setTimeout(() => {
      this.alert = undefined;
    }, 3000);
  }
}
