import {ChangeDetectorRef, Component, inject, OnDestroy, OnInit, Query} from '@angular/core';
import {MeetupsTaskComponent} from "../../Shared/Components/meetups-task/meetups-task.component";
import {MeetupsServicesService} from "../../Shared/Services/MeetupsServices/meetups-services.service";
import { Subscription} from "rxjs";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {UserLogRegService} from "../../Shared/Services/UsersServices/user-log-reg.service";
import {SearchMeetupsComponent} from "../../Shared/Components/search-meetups/search-meetups.component";

@Component({
  selector: 'app-all-meetups-peges',
  standalone: true,
  imports: [
    MeetupsTaskComponent,
    NgForOf,
    SearchMeetupsComponent
  ],
  templateUrl: './all-meetups-peges.component.html',
  styleUrl: './all-meetups-peges.component.scss'
})
export class AllMeetupsPegesComponent implements OnDestroy, OnInit{
  public userService = inject(UserLogRegService)
  meetupServices = inject(MeetupsServicesService);
  private subscription: Subscription | null = null;
  private router = inject(Router);


  ngOnInit(): void {
    this.subscription = this.meetupServices.httpMeetupsAll().subscribe({
      next: (res) => {

      },
      error: (err) => {
        console.error(err)
      },
    });

    this.userService.checkToken();
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    this.meetupServices.filteredMeetups = this.meetupServices.meetups;
  }
}
