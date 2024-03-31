import { Component } from '@angular/core';
import {MeetupsTaskComponent} from "../../Shared/Components/meetups-task/meetups-task.component";

@Component({
  selector: 'app-all-meetups-peges',
  standalone: true,
  imports: [
    MeetupsTaskComponent
  ],
  templateUrl: './all-meetups-peges.component.html',
  styleUrl: './all-meetups-peges.component.scss'
})
export class AllMeetupsPegesComponent {

}
