import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MeetupsTaskComponent} from "../../Shared/Components/meetups-task/meetups-task.component";
import { Subscription } from "rxjs";
import {MeetupsServicesService} from "../../Shared/Services/MeetupsServices/meetups-services.service";
import {NgForOf} from "@angular/common";
import {UserLogRegService} from "../../Shared/Services/UsersServices/user-log-reg.service";

@Component({
  selector: 'app-my-meetups',
  standalone: true,
  imports: [
    MeetupsTaskComponent,
    NgForOf
  ],
  templateUrl: './my-meetups.component.html',
  styleUrl: './my-meetups.component.scss',
})
export class MyMeetupsComponent implements OnInit, OnDestroy {
  public userService = inject(UserLogRegService)z
  private subscription: Subscription | null = null;
  public meetupServices = inject(MeetupsServicesService);
  ngOnInit(): void {
    this.meetupServices.httpMeetupMyMeetup().subscribe({
      next: (res) => {
      },
      error: (err) => console.error(err),
    });

    this.userService.checkToken();
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
