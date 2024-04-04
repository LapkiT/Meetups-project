import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-register-meetups',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './register-meetups.component.html',
  styleUrl: './register-meetups.component.scss'
})
export class RegisterMeetupsComponent {

}
