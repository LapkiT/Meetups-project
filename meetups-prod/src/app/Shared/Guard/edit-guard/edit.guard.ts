import {CanActivateFn, Router} from '@angular/router';
import {MeetupsServicesService} from "../../Services/MeetupsServices/meetups-services.service";
import {inject} from "@angular/core";
import {UserLogRegService} from "../../Services/UsersServices/user-log-reg.service";

export const editGuard: CanActivateFn = (route) => {
  const userService = inject(UserLogRegService);
  const meetupsService = inject(MeetupsServicesService);
  const router = inject(Router)


  userService.checkToken();
  const currentUser = userService.Users;
  if (!currentUser) {
    return false;
  }


  const meetupId = route.paramMap.get('id');
  if (!meetupId) {
    return false;
  }


  const meetupToEdit = meetupsService.meetups.find(meetup => meetup.id.toString() === meetupId);
  if (meetupToEdit && meetupToEdit.createdBy === currentUser.id) {
    return true;
  } else {
    router.navigate(['/allmeetups']);
    return false;
  }
};
