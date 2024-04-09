import {CanActivateFn, Router} from '@angular/router';
import {UserLogRegService} from "../../Services/UsersServices/user-log-reg.service";
import {inject} from "@angular/core";

export const adminUserGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserLogRegService);
  const router = inject(Router);

  if (!userService.userRole) {
    router.navigate(['allmeetups']);
    return false;
  }

  return true;
};
