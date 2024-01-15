import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as ace from "ace-builds";
import {HttpClient} from "@angular/common/http";
import * as $ from 'jquery';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import { AlertType } from '../enums/alert-type';
import {Router} from "@angular/router";
import { response } from 'express';


@Component({
  selector: 'app-compiler',
  templateUrl: './compiler.component.html',
  styleUrls: ['./compiler.component.css']
})
export class CompilerComponent implements  AfterViewInit, OnInit{
  pythonOutput: string ='dfgdfag';
  //@ts-ignore
  @ViewChild("editor") private editor: ElementRef<HTMLElement>;
  aceEditor:any;
  ngAfterViewInit(): void {
    ace.config.set("fontSize", "14px");
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.session.setValue("<h1>Ace Editor works great in Angular!</h1>");


  }


  

  constructor(private http: HttpClient,
    private authService: AuthenticationService,
    private router: Router,
    private alertService: AlertService,) {
    // Initialize other components, services, etc.
  }
  ngOnInit(): void {

    
    this.getResponePythonCode();
  }

  showAlert(type:AlertType, text:String){
    this.alertService.setAlert({
      type: type,
      text : text,
    });
  }


  executeCode() {
    const url = 'http://localhost/backend/compiler.php';


    const data = {
      language: "python",
      code: this.aceEditor.getSession().getValue()
    };


    // this.http.post(url, data)
    //   .subscribe(
    //     (response: any) => {
    //       // Handle the success response here
    //       $(".output").text(response);
    //     },
    //     (error: any) => {
    //       // Handle the error response here
    //       console.error('Error:', error);
    //     }
    //   );


    this.http.post<any>(url, data, {responseType: "json"}).subscribe(
      (response) => {

        if(response["success"] == 0){
          this.showAlert(AlertType.ERROR,'Compiler error at respone!');
        }
        else{
          console.log(data.code);
        }

          setTimeout(() => {

          }, 1500);
          // Reload the page after showing the notification
          const currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
          });
      },
      (error) => {
        console.log("TS Error =", error);
        this.showAlert(AlertType.ERROR,'Compiler error!');
      }
    );


  }


  getResponePythonCode(){
    const url = 'http://localhost/backend/compiler.php';
    this.http.get<any>(url).subscribe(
      response =>{
        this.pythonOutput = response.output;
        console.log("OUTPUT = ", this.pythonOutput);
      },
      error => {
        console.error("GET RESPONSE PYTOHON = ", error);
      }
    )
  }

}

