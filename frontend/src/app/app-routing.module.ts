import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {CoursesComponent} from "./courses/courses.component";

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'courses', component: CoursesComponent},
  { path: '', redirectTo: '/welcome', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [WelcomeComponent, CoursesComponent]
