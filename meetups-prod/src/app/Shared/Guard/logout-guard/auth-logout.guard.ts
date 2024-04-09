import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserLogRegService} from "../../Services/UsersServices/user-log-reg.service";

export const authLogoutGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserLogRegService);
  const router = inject(Router);

  userService.checkToken();

  if (!userService.Users) {
    router.navigate([''])
    return false;
  }

  return true;
};
