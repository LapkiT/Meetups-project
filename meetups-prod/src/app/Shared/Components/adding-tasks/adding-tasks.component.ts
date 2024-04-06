import {Component, inject, OnDestroy} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import {MeetupsServicesService} from "../../Services/MeetupsServices/meetups-services.service";
import {Subscription} from "rxjs";
import {CreateBody} from "../../Interfaces/meetups";
import {NgIf} from "@angular/common";
import {dateTimeInvalid} from "../../function/dateValidators";

@Component({
  selector: 'app-adding-tasks',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './adding-tasks.component.html',
  styleUrl: './adding-tasks.component.scss'
})
export class AddingTasksComponent implements OnDestroy{

  private router = inject(Router)
  private meetupService = inject(MeetupsServicesService)

  private creationSubscription: Subscription | null = null;


  public formMeetups = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    time_code: new FormControl("", [Validators.required]),
    date: new FormControl('', [Validators.required]),
    duration: new FormControl(0,  [Validators.required, Validators.min(30), Validators.max(120)]),
    location: new FormControl("", [Validators.required]),
    target_audience: new FormControl("", [Validators.required]),
    need_to_know: new FormControl("", [Validators.required]),
    will_happen: new FormControl("", [Validators.required]),
    reason_to_come: new FormControl("", [Validators.required])
  }, { validators: dateTimeInvalid })

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

    this.creationSubscription = this.meetupService.createMeetup(dataToSend).subscribe({
      next: (response) => {
        console.log('Meetup created successfully', response);
        this.router.navigate(['/mymeetups']);
      },
      error: (error) => {
        console.error('Error creating meetup', error);
      }
    });
  }

  public backStr() {
    this.router.navigate(['/allmeetups']);
  }

  ngOnDestroy() {
    if (this.creationSubscription) this.creationSubscription?.unsubscribe();
  }

  protected readonly location = location;
}
