import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgWhiteboardModule } from 'ng-whiteboard';

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
import { CoursePageComponent } from './courses/course-page/course-page.component';
import { SignUpPopUpComponent } from './sign-up-pop-up/sign-up-pop-up.component';
import {ReactiveFormsModule} from "@angular/forms";
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { HttpClientModule } from '@angular/common/http';
import {NgxTypedJsModule} from 'ngx-typed-js';
import { AlertComponent } from './alert/alert.component';
import { CourseChapterComponent } from './courses/course-page/course-chapter/course-chapter.component';
import { CourseContentComponent } from './courses/course-page/course-content/course-content.component';
import {MatTableModule} from "@angular/material/table";
import { EditProfilePopUpComponent } from './edit-profile-pop-up/edit-profile-pop-up.component';
import { SubscriptionPopUpComponent } from './subscription-pop-up/subscription-pop-up.component';
import { ExerciseComponent } from './exercises/exercise/exercise.component';
import { ExerciseContentComponent } from './exercises/exercise-content/exercise-content.component';

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
    LoginPopUpComponent,
    CoursePageComponent,
    SignUpPopUpComponent,
    UserSettingsComponent,
    CourseChapterComponent,
    CourseContentComponent,
    EditProfilePopUpComponent,
    SubscriptionPopUpComponent,
    ExerciseComponent,
    ExerciseContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxTypedJsModule,
    AlertComponent,
    NgWhiteboardModule,
    MatTableModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
