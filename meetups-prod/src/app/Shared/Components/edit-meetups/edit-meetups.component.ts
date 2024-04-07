import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MeetupsServicesService} from "../../Services/MeetupsServices/meetups-services.service";
import {Subscription} from "rxjs";
import { dateTimeInvalid } from "../../function/dateValidators";
import {CreateBody, Meetup} from "../../Interfaces/meetups";
import {routes} from "../../../app.routes";

@Component({
  selector: 'app-edit-meetups',
  standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './edit-meetups.component.html',
  styleUrl: './edit-meetups.component.scss'
})
export class EditMeetupsComponent implements OnDestroy, OnInit{

  private router = inject(Router)
  private meetupService = inject(MeetupsServicesService)

  private editSubscription: Subscription | null = null;
  private subscribeAllMeetupDataId: Subscription | null = null;
  private deleteMeetup: Subscription | null = null;

  public meetups!: Meetup;
  public route = inject(ActivatedRoute);
  public routeMeetupToEditId = this.route.snapshot.paramMap.get('id');


  public formMeetups = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    time_code: new FormControl("", [Validators.required]),
    date: new FormControl('', [Validators.required]),
    duration: new FormControl(30,  [Validators.required, Validators.min(30), Validators.max(120)]),
    location: new FormControl("", [Validators.required]),
    target_audience: new FormControl("", [Validators.required]),
    need_to_know: new FormControl("", [Validators.required]),
    will_happen: new FormControl("", [Validators.required]),
    reason_to_come: new FormControl("", [Validators.required])
  },  { validators: dateTimeInvalid })

  submitForm() {
    const formData = this.formMeetups.getRawValue();

    const dateTime = `${formData.date}T${formData.time_code}`;

    const dataToSend: CreateBody = {
      name: formData.name ?? '',
      description: formData.description ?? '',
      time: dateTime,
      duration: formData.duration ?? 0,
      location: formData.location ?? '',
      target_audience: formData.target_audience ?? '',
      need_to_know: formData.need_to_know ?? '',
      will_happen: formData.will_happen ?? '',
      reason_to_come: formData.reason_to_come ?? ''
    };

    this.editSubscription = this.meetupService.editMeetup(Number(this.routeMeetupToEditId), dataToSend)
      .subscribe({
        next: (response) => {
          console.log('Meetup created successfully', response);
          this.router.navigate(['/mymeetups']);
        },
        error: (error) => {
          console.error('Error creating meetup', error);
        }
      })
  }

  public backStr() {
    this.router.navigate(['/allmeetups']);
  }

  public deleteMeetupBtn(meetupId: number) {
    this.deleteMeetup = this.meetupService.HttpDeleteMeetup(meetupId).subscribe({
      next: (res) => {
        this.router.navigate(['/mymeetups'])
      },
      error: err => console.error(err)
    });
  }

  ngOnDestroy() {
    if (this.editSubscription) this.editSubscription?.unsubscribe();
    if (this.subscribeAllMeetupDataId) this.subscribeAllMeetupDataId.unsubscribe();
    if (this.deleteMeetup) this.deleteMeetup.unsubscribe();
  }

  ngOnInit() {
    this.subscribeAllMeetupDataId = this.meetupService.httpMeetupsAll().subscribe((res) => {
    const meetup = res.find((meetup) => meetup.id == Number(this.routeMeetupToEditId));
    if (meetup) {
      console.log(meetup);


      const meetupDate = new Date(meetup.time);
      const year = meetupDate.getFullYear();
      const month = meetupDate.getMonth() + 1;
      const date = meetupDate.getDate();
      const hours = meetupDate.getHours();
      const minutes = meetupDate.getMinutes();


      const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

      this.formMeetups.patchValue({
        name: meetup.name,
        description: meetup.description,
        date: formattedDate,
        time_code: formattedTime,
        duration: meetup.duration,
        location: meetup.location,
        target_audience: meetup.target_audience,
        need_to_know: meetup.need_to_know,
        will_happen: meetup.will_happen,
        reason_to_come: meetup.reason_to_come
      });

      this.meetups = meetup;
    }
  });
  }

  protected readonly location = location;
}
