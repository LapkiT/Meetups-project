import {Component, inject, OnDestroy} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {logUser} from "../../Shared/Interfaces/user";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserLogRegService} from "../../Shared/Services/UsersServices/user-log-reg.service";
import {CommonModule, NgIf} from "@angular/common";
import {ErrorProcessingService} from "../../Shared/Services/ErrorServices/error-processing.service";

@Component({
  selector: 'app-register-meetups',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './register-meetups.component.html',
  styleUrl: './register-meetups.component.scss'
})
export class RegisterMeetupsComponent implements OnDestroy{

  errorService = inject(ErrorProcessingService);
  public errorMessage = "";

  router = inject(Router)
  authService = inject(UserLogRegService)
  registerUser!: logUser;
  private subscription: Subscription | null = null;

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    fio: new  FormControl('', [Validators.required])
  })

  public register() {
    if (this.registerForm.invalid) {
      return;
    }
    this.registerUser = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      fio: this.registerForm.value.fio
    } as logUser
    this.registerForm.reset();
    this.submit(this.registerUser)
  }

  public submit(value: logUser) {
    this.authService
      .register(value)
      .subscribe({
       next: () => {
         alert("Регистрация прошла успешно!");
         this.router.navigate(['/']);
       },
        error: (err) => {
          this.errorMessage = this.errorService.processError(err);
        }
      })
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
