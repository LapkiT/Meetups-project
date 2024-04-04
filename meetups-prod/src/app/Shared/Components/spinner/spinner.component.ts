import {Component, inject} from '@angular/core';
import {LoaderService} from "../../Services/loaderServices/loader.service";
import {CommonModule, NgIf} from "@angular/common";
@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [
    NgIf,
    CommonModule
  ],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  loader = inject(LoaderService);
}
