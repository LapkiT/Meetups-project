import { HttpInterceptorFn } from '@angular/common/http';
import {finalize} from "rxjs";
import {inject} from "@angular/core";
import {LoaderService} from "../Services/loaderServices/loader.service";

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  let totalRequests = 0;
  const loaderService = inject(LoaderService);

  totalRequests++;
  loaderService.isLoading = true;

  return next(req).pipe(
    finalize(() => {
      totalRequests--;

      if (totalRequests === 0) {
        loaderService.isLoading = false;
      }
    })
  );
};
