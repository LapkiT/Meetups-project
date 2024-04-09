import { Routes } from '@angular/router';
import {AllMeetupsPegesComponent} from "./Pages/all-meetups-peges/all-meetups-peges.component";
import {LoginMeetupsComponent} from "./Pages/login-meetups/login-meetups.component";
import {AddingTasksComponent} from "./Shared/Components/adding-tasks/adding-tasks.component";
import {RegisterMeetupsComponent} from "./Pages/register-meetups/register-meetups.component";
import {UsersMeetupsAllComponent} from "./Pages/users-meetups-all/users-meetups-all.component";
import {MyMeetupsComponent} from "./Pages/my-meetups/my-meetups.component";
import {EditMeetupsComponent} from "./Shared/Components/edit-meetups/edit-meetups.component";
import {authGuard} from "./Shared/Guard/auth-guard/auth.guard";
import {editGuard} from "./Shared/Guard/edit-guard/edit.guard";
import {authLogoutGuard} from "./Shared/Guard/logout-guard/auth-logout.guard";
import {adminUserGuard} from "./Shared/Guard/admin-guard/admin-user.guard";

export const routes: Routes = [
  {path: "allmeetups", component: AllMeetupsPegesComponent, canActivate: [authLogoutGuard]},
  {path: "addtask", component: AddingTasksComponent,  canActivate: [authLogoutGuard]},
  {path: "", component: LoginMeetupsComponent, canActivate: [authGuard]},
  {path: "register", component: RegisterMeetupsComponent, canActivate: [authGuard]},
  {path: "users", component: UsersMeetupsAllComponent, canActivate: [adminUserGuard]},
  {path: "mymeetups", component: MyMeetupsComponent, canActivate: [authLogoutGuard]},
  {path: 'edit/:id', component: EditMeetupsComponent, canActivate: [editGuard]}
];
