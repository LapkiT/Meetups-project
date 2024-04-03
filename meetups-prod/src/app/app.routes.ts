import { Routes } from '@angular/router';
import {AllMeetupsPegesComponent} from "./Pages/all-meetups-peges/all-meetups-peges.component";
import {LoginMeetupsComponent} from "./Shared/Components/login-meetups/login-meetups.component";
import {AddingTasksComponent} from "./Shared/Components/adding-tasks/adding-tasks.component";

export const routes: Routes = [
  {path: "allmeetups", component: AllMeetupsPegesComponent},
  {path: "addtask", component: AddingTasksComponent},
  {path: "", component: LoginMeetupsComponent}
];
