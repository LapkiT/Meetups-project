import {inject, Injectable, OnInit} from '@angular/core';
import {Meetup} from "../../Interfaces/meetups";
import {catchError, map, Observable, of, tap} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MeetupsServicesService {
  public meetups: Meetup[] = [];
  private httpClient = inject(HttpClient)

  public httpMeetupsAll(): Observable<Meetup[]> {
    return this.httpClient.get<Meetup[]>(environment.backendOrigin + "/meetup").pipe(
      tap((res: Meetup[]) => {
        this.meetups = res;
      })
    )
  }
}
