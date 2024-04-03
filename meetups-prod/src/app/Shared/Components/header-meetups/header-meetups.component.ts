import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-header-meetups',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header-meetups.component.html',
  styleUrl: './header-meetups.component.scss'
})
export class HeaderMeetupsComponent {

}
