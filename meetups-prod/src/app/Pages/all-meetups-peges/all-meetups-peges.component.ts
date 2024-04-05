import {Component, inject, OnInit} from '@angular/core';
import {MeetupsTaskComponent} from "../../Shared/Components/meetups-task/meetups-task.component";
import {MeetupsServicesService} from "../../Shared/Services/MeetupsServices/meetups-services.service";

@Component({
  selector: 'app-all-meetups-peges',
  standalone: true,
  imports: [
    MeetupsTaskComponent
  ],
  templateUrl: './all-meetups-peges.component.html',
  styleUrl: './all-meetups-peges.component.scss'
})
export class AllMeetupsPegesComponent implements OnInit{
  meetupServices = inject(MeetupsServicesService)

  ngOnInit() {
    this.meetupServices.httpMeetupsAll().subscribe();
  }
}
