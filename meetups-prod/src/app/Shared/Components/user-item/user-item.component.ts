import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {AdminService} from "../../Services/AdminServices/admin.service";
import {Subscription} from "rxjs";
import {EditUser, UsFetchData} from "../../Interfaces/user";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserItemComponent implements OnInit, OnDestroy {
  public adminService = inject(AdminService);
  @Input() user!: UsFetchData;
  private deleteUserSubscription: Subscription | null = null;
  private upUserSubscription: Subscription | null = null;
  private cRoleSubscription: Subscription | null = null;

  private cdr = inject(ChangeDetectorRef);

  public name!: FormControl<string | null>;
  public email!: FormControl<string | null>;
  public roles!: FormControl<string | null>;

  public isEditing = false;

  ngOnInit(): void {
    this.name = new FormControl(this.user.fio, [Validators.required]);

    this.email = new FormControl(this.user.email, [
      Validators.required,
      Validators.email,
    ]);

    this.roles = new FormControl(
      this.user.roles.find((role) => role.name === 'ADMIN') ? 'ADMIN' : 'USER',
      [Validators.required]
    );

    this.disableForm();
  }

  public deleteUser() {
    this.deleteUserSubscription = this.adminService
      .deleteUser(this.user.id)
      .subscribe(() => this.cdr.markForCheck());
  }

  public editUser() {
    this.isEditing = true;
    this.FormEbable();
  }

  public confirmEditUser() {
    if (!this.Valid()) return;

    const userData: EditUser = {
      id: this.user.id,
      email: <string>this.email.value,
      fio: <string>this.name.value,
    };

    this.upUserSubscription = this.adminService
      .editUser(userData)
      .subscribe(() => this.cdr.markForCheck());

    this.upUserSubscription = this.adminService
      .changeRole(userData.id, <string>this.roles.value)
      .subscribe(() => this.cdr.markForCheck());
    this.cRoleSubscription = this.adminService
      .changeRole(userData.id, <string>this.roles.value)
      .subscribe(() => this.cdr.markForCheck());
  }

  private disableForm() {
    this.name.disable();
    this.email.disable();
    this.roles.disable();
  }


  ngOnDestroy(): void {
    if (this.deleteUserSubscription) this.deleteUserSubscription.unsubscribe();
    if (this.upUserSubscription) this.upUserSubscription.unsubscribe();
    if (this.cRoleSubscription) this.cRoleSubscription.unsubscribe();


  }

  private FormEbable() {
    this.name.enable();
    this.email.enable();
    this.roles.enable();
  }

  private Valid() {
    return (
      this.name.valid &&
      this.email.valid &&
      this.roles.valid
    );
  }

}
