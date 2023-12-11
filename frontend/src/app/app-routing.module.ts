import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {CoursesComponent} from "./courses/courses.component";
import {CoursePageComponent} from "./courses/course-page/course-page.component";
import {UserSettingsComponent} from "./user-settings/user-settings.component";
import {LeaderboardComponent} from "./leaderboard/leaderboard.component";

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'courses/:title', component: CoursePageComponent},
  {path: 'leaderboard', component: LeaderboardComponent},
  {path: 'settings', component: UserSettingsComponent},
  { path: '', redirectTo: '/welcome', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [WelcomeComponent, CoursesComponent,CoursePageComponent, UserSettingsComponent, LeaderboardComponent]
