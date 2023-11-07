import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {NgOptimizedImage} from "@angular/common";
import { DescriptionComponent } from './welcome/description/description.component';
import { FeaturesComponent } from './welcome/features/features.component';
import { FeatureBoxComponent } from './welcome/features/feature-box/feature-box.component';
import { FooterComponent } from './footer/footer.component';
import { CourseBoxComponent } from './courses/course-box/course-box.component';
import { LoginPopUpComponent } from './login-pop-up/login-pop-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DescriptionComponent,
    FeaturesComponent,
    FeatureBoxComponent,
    FooterComponent,
    routingComponents,
    CourseBoxComponent,
    LoginPopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
