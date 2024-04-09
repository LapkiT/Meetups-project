import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {UserItemComponent} from "../../Shared/Components/user-item/user-item.component";
import {AdminService} from "../../Shared/Services/AdminServices/admin.service";
import {Subscription} from "rxjs";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-users-meetups-all',
  standalone: true,
  imports: [
    UserItemComponent,
    NgForOf
  ],
  templateUrl: './users-meetups-all.component.html',
  styleUrl: './users-meetups-all.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersMeetupsAllComponent implements OnInit, OnDestroy {
  public adminService = inject(AdminService);
  private allUsersSubscription: Subscription | null = null;
  private cdr = inject(ChangeDetectorRef);

  ngOnDestroy() {
    if (this.allUsersSubscription) {
      this.allUsersSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.allUsersSubscription = this.adminService.fetchUsers().subscribe({
      next: (res) => {
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

}
