import {Component, inject, OnDestroy, OnInit, Query} from '@angular/core';
import {MeetupsTaskComponent} from "../../Shared/Components/meetups-task/meetups-task.component";
import {MeetupsServicesService} from "../../Shared/Services/MeetupsServices/meetups-services.service";
import { Subscription} from "rxjs";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-meetups-peges',
  standalone: true,
  imports: [
    MeetupsTaskComponent,
    NgForOf
  ],
  templateUrl: './all-meetups-peges.component.html',
  styleUrl: './all-meetups-peges.component.scss'
})
export class AllMeetupsPegesComponent implements OnDestroy, OnInit{
  meetupServices = inject(MeetupsServicesService);
  private subscription: Subscription | null = null;
  private router = inject(Router);


  ngOnInit(): void {
    this.meetupServices.httpMeetupsAll().subscribe((res) => console.log(res));
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
