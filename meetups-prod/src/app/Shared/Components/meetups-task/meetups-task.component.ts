import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Meetup} from "../../Interfaces/meetups";
import {MeetupsServicesService} from "../../Services/MeetupsServices/meetups-services.service";
import {UserLogRegService} from "../../Services/UsersServices/user-log-reg.service";
import {Subscription} from "rxjs";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
@Component({
  selector: 'app-meetups-task',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './meetups-task.component.html',
  styleUrl: './meetups-task.component.scss'
})
export class MeetupsTaskComponent implements OnDestroy {

  isListExpanded = false;

  private router = inject(Router)

  userService = inject(UserLogRegService)
  public meetupsService = inject(MeetupsServicesService);

  @Input() meetups!: Meetup;

  public subscriptionBtn: boolean | null = null;

  public MeetupSubscription: Subscription | null = null;
  public unsubscribeFromMeetupSubscription: Subscription | null = null;
  public deleteMeetupSubscription: Subscription | null = null;



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

  public isOwner(): boolean {
    return this.meetups.owner.id === this.userService.userId;
  }

  public deleteMeetup(meetupId: number) {
    this.meetupsService.HttpDeleteMeetup(meetupId).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: err => console.error(err)
    });
  }

  public editMeetup() {
      this.router.navigate([`edit/${this.meetups.id}`]);
  }

  ngOnDestroy() {
    if (this.MeetupSubscription) {
      this.MeetupSubscription.unsubscribe();
    }
    if (this.unsubscribeFromMeetupSubscription) {
      this.unsubscribeFromMeetupSubscription.unsubscribe()
    }
    if (this.deleteMeetupSubscription) {
      this.deleteMeetupSubscription.unsubscribe();
    }
  }

  protected readonly UserLogRegService = UserLogRegService;
}
