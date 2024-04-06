import {Component, inject, Input, OnDestroy} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MeetupsServicesService} from "../../Services/MeetupsServices/meetups-services.service";
import {Subscription} from "rxjs";
import {futureDateValidator, timeValidator} from "../../function/dateValidators";
import {CreateBody} from "../../Interfaces/meetups";

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
export class EditMeetupsComponent implements OnDestroy{

  private router = inject(Router)
  private meetupService = inject(MeetupsServicesService)
  private editSubscription: Subscription | null = null;

  @Input() meetup!: CreateBody;

  public formMeetups = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    time_code: new FormControl("", [Validators.required, timeValidator()]),
    date: new FormControl('', [Validators.required, futureDateValidator()]),
    duration: new FormControl(0,  [Validators.required, Validators.min(30), Validators.max(120)]),
    location: new FormControl("", [Validators.required]),
    target_audience: new FormControl("", [Validators.required]),
    need_to_know: new FormControl("", [Validators.required]),
    will_happen: new FormControl("", [Validators.required]),
    reason_to_come: new FormControl("", [Validators.required])
  })

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

  }

  public backStr() {
    this.router.navigate(['/allmeetups']);
  }

  ngOnDestroy() {
    if (this.editSubscription) this.editSubscription?.unsubscribe();
  }

  protected readonly location = location;
}
