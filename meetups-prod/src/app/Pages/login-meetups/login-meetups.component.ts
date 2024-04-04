import {Component, inject, OnDestroy} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {logUser} from "../../Shared/Interfaces/user";
import {Subscription} from "rxjs";
import {UserLogRegService} from "../../Shared/Services/UsersServices/user-log-reg.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-login-meetups',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login-meetups.component.html',
  styleUrl: './login-meetups.component.scss'
})
export class LoginMeetupsComponent implements OnDestroy{
  loginUser!: logUser;
  router = inject(Router)
  authService = inject(UserLogRegService)
  private subscription: Subscription | null = null;

  loginForm = new FormGroup({
    email: new FormControl('jim@dundermifflin.com', [Validators.required, Validators.email]),
    password: new FormControl('password', [Validators.required, Validators.minLength(6)]),
    fio: new FormControl('fio', [Validators.required])
    }
  )


  public login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginUser = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      fio: this.loginForm.value.fio
    } as logUser
    this.loginForm.reset();
    this.submit(this.loginUser)
  }


  public submit(value: logUser) {
    this.authService
      .login(value)
      .subscribe((result) => {
        if (result) {
          this.router.navigate(['/allmeetups']);
          this.authService.wasLogin = true;
        } else {
          alert("Возможно введены некорректные данные!");
        }
      })
  }

  ngOnDestroy(): void {
    //отписываемся от потока, чтобы избежать утечек памяти
    if (this.subscription) this.subscription.unsubscribe();
  }
}
