import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MeetupsServicesService} from "../../Services/MeetupsServices/meetups-services.service";

@Component({
  selector: 'app-search-meetups',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './search-meetups.component.html',
  styleUrl: './search-meetups.component.scss'
})
export class SearchMeetupsComponent {
  public meetupService = inject(MeetupsServicesService);

  searchForm = new FormGroup({
    searchText: new FormControl(''),
    dateFrom: new FormControl(''),
    dateTo: new FormControl(''),
  });

  onSubmit() {
    const searchText = this.searchForm.value.searchText || '';
    const dateFrom = this.searchForm.value.dateFrom || '';
    const dateTo = this.searchForm.value.dateTo || '';

    this.meetupService.filterMeetups(searchText, dateFrom, dateTo);
  }
}
