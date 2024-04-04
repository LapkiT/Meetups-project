import { Routes } from '@angular/router';
import {AllMeetupsPegesComponent} from "./Pages/all-meetups-peges/all-meetups-peges.component";
import {LoginMeetupsComponent} from "./Shared/Components/login-meetups/login-meetups.component";
import {AddingTasksComponent} from "./Shared/Components/adding-tasks/adding-tasks.component";
import {RegisterMeetupsComponent} from "./Shared/Components/register-meetups/register-meetups.component";
import {UsersMeetupsAllComponent} from "./Pages/users-meetups-all/users-meetups-all.component";

export const routes: Routes = [
  {path: "allmeetups", component: AllMeetupsPegesComponent},
  {path: "addtask", component: AddingTasksComponent},
  {path: "", component: LoginMeetupsComponent},
  {path: "register", component: RegisterMeetupsComponent},
  {path: "users", component: UsersMeetupsAllComponent}
];
