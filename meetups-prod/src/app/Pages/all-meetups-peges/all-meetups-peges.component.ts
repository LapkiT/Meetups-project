import {ChangeDetectorRef, Component, inject, OnDestroy, OnInit, Query} from '@angular/core';
import {MeetupsTaskComponent} from "../../Shared/Components/meetups-task/meetups-task.component";
import {MeetupsServicesService} from "../../Shared/Services/MeetupsServices/meetups-services.service";
import { Subscription} from "rxjs";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {Meetup} from "../../Shared/Interfaces/meetups";
import {ChangeDetection} from "@angular/cli/lib/config/workspace-schema";
import {UserLogRegService} from "../../Shared/Services/UsersServices/user-log-reg.service";

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
  public userService = inject(UserLogRegService)
  meetupServices = inject(MeetupsServicesService);
  private subscription: Subscription | null = null;
  private router = inject(Router);
  private changeDetector = inject(ChangeDetectorRef);


  ngOnInit(): void {
    this.subscription = this.meetupServices.httpMeetupsAll().subscribe({
      next: (res) => {
        this.changeDetector.detectChanges(); // Обновление представления
      },
      error: (err) => console.error(err),
    });

    this.userService.checkToken();
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
