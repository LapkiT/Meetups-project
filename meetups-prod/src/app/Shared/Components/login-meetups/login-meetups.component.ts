import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login-meetups',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './login-meetups.component.html',
  styleUrl: './login-meetups.component.scss'
})
export class LoginMeetupsComponent {

}
