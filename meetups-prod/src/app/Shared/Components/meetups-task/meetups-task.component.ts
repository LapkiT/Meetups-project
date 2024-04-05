import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Meetup} from "../../Interfaces/meetups";
import {MeetupsServicesService} from "../../Services/MeetupsServices/meetups-services.service";
import {UserLogRegService} from "../../Services/UsersServices/user-log-reg.service";
import {User} from "../../Interfaces/user";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Subscription} from "rxjs";
import {NgIf} from "@angular/common";
@Component({
  selector: 'app-meetups-task',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './meetups-task.component.html',
  styleUrl: './meetups-task.component.scss'
})
export class MeetupsTaskComponent implements OnInit, OnDestroy{

  token: string | null = localStorage.getItem('jwt_token');
  isListExpanded = false;
  userService = inject(UserLogRegService)
  public meetupsService = inject(MeetupsServicesService);

  @Input() meetups!: Meetup;

  public subscriptionBtn: boolean | null = null;

  public MeetupSubscription: Subscription | null = null;
  public unsubscribeFromMeetupSubscription: Subscription | null = null;



  public datePipeFin(dateStr: string): string {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().substr(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
    return formattedDate;
  }

  public subscribeMeetup() {
    this.MeetupSubscription = this.meetupsService
      .httpMeetupSub(this.meetups.id, this.userService.userId)
      .subscribe({
        next: (res) => {
          this.subscriptionBtn = true;
        },
        error: err => console.error(err)
      })
    }
  public unsubscribeFromMeetup() {
    this.unsubscribeFromMeetupSubscription = this.meetupsService
            .httpMeetupUnSub(this.meetups.id, this.userService.userId)
             .subscribe({
               next: (res) => {
                 this.subscriptionBtn = false;
               },
               error: err => console.error(err)
             })
  }

  toggleList(): void {
    console.log(this.datePipeFin(this.meetups.time))
    this.isListExpanded = !this.isListExpanded;
  }

  public isSubscribed(): boolean {
    return this.meetups.users.some(user => user.id === this.userService.userId);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.MeetupSubscription) {
      this.MeetupSubscription.unsubscribe();
    }
    if (this.unsubscribeFromMeetupSubscription) {
      this.unsubscribeFromMeetupSubscription.unsubscribe()
    }
  }

  protected readonly UserLogRegService = UserLogRegService;
}
