import { Routes } from '@angular/router';
import {AllMeetupsPegesComponent} from "./Pages/all-meetups-peges/all-meetups-peges.component";
import {LoginMeetupsComponent} from "./Pages/login-meetups/login-meetups.component";
import {AddingTasksComponent} from "./Pages/adding-tasks/adding-tasks.component";

export const routes: Routes = [
  {path: "allmeetups", component: AllMeetupsPegesComponent},
  {path: "addtask", component: AddingTasksComponent},
  {path: "login", component: LoginMeetupsComponent}
];
