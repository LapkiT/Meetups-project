import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header-meetups',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header-meetups.component.html',
  styleUrl: './header-meetups.component.scss'
})
export class HeaderMeetupsComponent {

}
