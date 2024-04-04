import { Component } from '@angular/core';
import {UserItemComponent} from "../../Shared/Components/user-item/user-item.component";

@Component({
  selector: 'app-users-meetups-all',
  standalone: true,
  imports: [
    UserItemComponent
  ],
  templateUrl: './users-meetups-all.component.html',
  styleUrl: './users-meetups-all.component.scss'
})
export class UsersMeetupsAllComponent {

}
