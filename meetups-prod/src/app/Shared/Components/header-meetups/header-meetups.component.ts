import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {UserLogRegService} from "../../Services/UsersServices/user-log-reg.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header-meetups',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './header-meetups.component.html',
  styleUrl: './header-meetups.component.scss'
})
export class HeaderMeetupsComponent implements OnInit {
  public userService = inject(UserLogRegService);
  private router = inject(Router);

  ngOnInit(): void {
    this.userService.checkToken();
  }
  public logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }
}
