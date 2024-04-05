import {inject, Injectable, OnInit} from '@angular/core';
import {Meetup} from "../../Interfaces/meetups";
import {catchError, map, Observable, of, tap} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserLogRegService} from "../UsersServices/user-log-reg.service";

@Injectable({
  providedIn: 'root'
})
export class MeetupsServicesService {
  public meetups: Meetup[] = [];
  public userService = inject(UserLogRegService);
  private httpClient = inject(HttpClient);

  public httpMeetupsAll(): Observable<Meetup[]> {
    return this.httpClient.get<Meetup[]>(environment.backendOrigin + "/meetup").pipe(
      tap((res: Meetup[]) => {
        this.meetups = res;
      })
    )
  }

  public httpMeetupSub(idMeetup: number, idUser: number ): Observable<Meetup> {
    return this.httpClient.put<Meetup>(environment.backendOrigin + "/meetup", {
      idMeetup: idMeetup,
      idUser: idUser
    }).pipe(
      tap((res: Meetup) => {
        this.meetups = this.meetups.map(m => m.id === res.id ? res : m)
      }),
    )
  }

  public httpMeetupUnSub(idMeetup: number, idUser: number ): Observable<Meetup> {
    return this.httpClient.delete<Meetup>(environment.backendOrigin + "/meetup", {
      body: { idMeetup, idUser}
    }).pipe(
      tap((res: Meetup) => {
        this.meetups = this.meetups.map(m => m.id === res.id ? res : m)
      })
    )
  }
}
