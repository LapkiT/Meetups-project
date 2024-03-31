import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderMeetupsComponent} from "./Shared/Components/header-meetups/header-meetups.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderMeetupsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'meetups-prod';
}
