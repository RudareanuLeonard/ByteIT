import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {NgOptimizedImage} from "@angular/common";
import { WelcomeComponent } from './welcome/welcome.component';
import { DescriptionComponent } from './welcome/description/description.component';
import { FeaturesComponent } from './welcome/features/features.component';
import { FeatureBoxComponent } from './welcome/features/feature-box/feature-box.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    WelcomeComponent,
    DescriptionComponent,
    FeaturesComponent,
    FeatureBoxComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
