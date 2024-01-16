import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as ace from "ace-builds";
import {HttpClient} from "@angular/common/http";
import * as $ from 'jquery';
import {AlertType} from "../enums/alert-type";
import {AlertService} from "../services/alert.service";
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";


@Component({
  selector: 'app-compiler',
  templateUrl: './compiler.component.html',
  styleUrls: ['./compiler.component.css']
})
export class CompilerComponent implements  AfterViewInit, OnInit{
  title: string | null = '';
  loggedUser: any;
  editor:any;
  ngAfterViewInit(): void {
      this.editor = ace.edit("editor");
  }


  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private activatedRoute:ActivatedRoute,
    private authService:AuthenticationService
  ) {}

  ngOnInit(): void {
    this.title = this.activatedRoute.snapshot.paramMap.get('title');
    this.loggedUser = this.authService.loggedUser;
  }

  showAlert(type:AlertType, text:String){
    this.alertService.setAlert({
      type: type,
      text : text,
    });
  }



  executeCode() {
    const url = "http://localhost/backend/compiler.php";  // Replace 'your_api_url' with the actual API endpoint


    const data = {
      language: "py",
      code: this.editor.getSession().getValue()
    };

    console.log(data);

    this.http.post(url, data)
      .subscribe(
        (response: any) => {
          // Handle the success response here
          $(".output").text(response.output)
          console.log(response);

          const url02 = "http://localhost/backend/check_solution.php"

          const data02 = {
            title: this.title,
            username: this.loggedUser.username,
            solution: response.output
          };

          console.log(data02);

          this.http.post(url02,data02,{responseType: 'text'}).subscribe(
            (response)=>{
              if(response.includes("failed")){
                this.showAlert(AlertType.ERROR,'SOLUTION INCORRECT');
              }
              else{
                this.showAlert(AlertType.SUCCESS,'Exercise solved!');
              }

            },
            (error:any)=>{
              console.error('Error:', error);
              this.showAlert(AlertType.ERROR,'SOLUTION INCORRECT');
            }
          )
        },
        (error: any) => {
          // Handle the error response here
          console.error('Error:', error);
        }
      );


  }

}

