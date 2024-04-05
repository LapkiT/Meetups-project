import {Component, inject, Input} from '@angular/core';
import {Meetup} from "../../Interfaces/meetups";
import {MeetupsServicesService} from "../../Services/MeetupsServices/meetups-services.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-meetups-task',
  standalone: true,
  imports: [],
  templateUrl: './meetups-task.component.html',
  styleUrl: './meetups-task.component.scss'
})
export class MeetupsTaskComponent {
  isListExpanded = false;
  public meetupsService = inject(MeetupsServicesService);
  @Input() meetups!: Meetup;


  public datePipeFin(dateStr: string): string {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().substr(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
    return formattedDate;
  }

  toggleList(): void {
    console.log(this.datePipeFin(this.meetups.time))
    this.isListExpanded = !this.isListExpanded;
  }
}
